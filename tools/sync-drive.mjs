// 구글 드라이브 current_banner 폴더 → 홈 슬라이더 사진
//
// 하는 일
//   1. 폴더 안의 사진 목록을 읽어요 (파일 이름 순서 = 슬라이더 순서)
//   2. 새로 생기거나 바뀐 사진만 내려받아요
//   3. 화면용 크기(가로 1920px, JPG)로 줄여서 public/drive/banner/ 에 저장해요
//   4. data/banners.json 을 새로 써요
//
// 필요한 것
//   둘 중 하나:
//   GOOGLE_API_KEY              : API 키. 폴더가 "링크가 있는 모든 사용자" 공개일 때만 동작
//   GOOGLE_SERVICE_ACCOUNT_FILE : 서비스 계정 JSON 키 파일 경로. 폴더를 비공개로 두고
//                                 서비스 계정 이메일에만 "뷰어"로 공유했을 때 사용
//   (GitHub Actions 에서는 파일 대신 GOOGLE_SERVICE_ACCOUNT_JSON 에 JSON 내용을 통째로)
//   BANNER_FOLDER_ID : (선택) 폴더 ID. 없으면 아래 기본값
//
// 폴더는 "링크가 있는 모든 사용자: 뷰어" 로 공유되어 있어야 해요.
// 사용법: npm run start (또는 npm run dev / npm run build) 할 때 자동으로 먼저 실행돼요.
//         키는 .env.local 파일의 GOOGLE_API_KEY=... 에서 읽어요.
// --soft : 키가 없거나 실패해도 멈추지 않고, 기존(또는 빈) 목록으로 계속 진행
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); // 윈도우에서도 맞는 경로
const SOFT = process.argv.includes('--soft');

// .env.local 읽기 (이미 환경변수에 있으면 그게 우선)
for (const f of ['.env.local', '.env']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const KEY = process.env.GOOGLE_API_KEY;

// 서비스 계정 (비공개 폴더용)
function loadServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const f = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
  if (f) {
    const p = path.resolve(ROOT, f);
    if (!fs.existsSync(p)) {
      console.log(`[드라이브] 서비스 계정 키 파일이 없어요: ${p} (API 키가 있으면 API 키로 진행해요)`);
      return null;
    }
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  return null;
}
const SA = loadServiceAccount();
let TOKEN = null;

// 서비스 계정 → 1시간짜리 접근 토큰 (라이브러리 없이 JWT 직접 서명)
async function getToken() {
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: SA.client_email, scope: 'https://www.googleapis.com/auth/drive.readonly',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`;
  const sig = crypto.sign('RSA-SHA256', Buffer.from(unsigned), SA.private_key).toString('base64url');
  const res = await fetch(process.env.GOOGLE_TOKEN_URL || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
  });
  if (!res.ok) throw new Error(`서비스 계정 토큰 발급 실패: ${res.status} ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).access_token;
}

// 요청마다 붙일 인증: 서비스 계정이면 토큰, 아니면 API 키
const auth = () => (SA ? {} : { key: KEY });
const FOLDER = process.env.BANNER_FOLDER_ID || '15E4PK8IUAO2puIb1HgPRPeORSRlrlpn2';
const API = process.env.DRIVE_API_BASE || 'https://www.googleapis.com/drive/v3';
const OUT_DIR = path.join(ROOT, 'public/drive/banner');
const JSON_PATH = path.join(ROOT, 'data/banners.json');

// 목록 파일이 없으면 빈 목록을 만들어 둬요 (사이트는 기본 사진 한 장을 보여줌)
function ensureJson() {
  if (!fs.existsSync(JSON_PATH)) {
    fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true });
    fs.writeFileSync(JSON_PATH, JSON.stringify({ updatedAt: null, folderId: null, items: [] }, null, 2) + '\n');
  }
}

if (!KEY && !SA) {
  console.log('[드라이브] GOOGLE_API_KEY / 서비스 계정이 없어서 배너 동기화를 건너뛰어요. (.env.local 에 넣으면 동작해요)');
  ensureJson();
  process.exit(0);
}

async function get(url, as = 'json') {
  const res = await fetch(url, TOKEN ? { headers: { Authorization: `Bearer ${TOKEN}` } } : undefined);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText} ← ${(KEY ? url.replace(KEY, '***') : url)}\n${body.slice(0, 400)}`);
  }
  return as === 'json' ? res.json() : Buffer.from(await res.arrayBuffer());
}

async function listFolder(folderId) {
  const q = `'${folderId}' in parents and trashed = false and (mimeType contains 'image/' or mimeType = 'application/vnd.google-apps.shortcut')`;
  const fields = 'nextPageToken,files(id,name,mimeType,modifiedTime,md5Checksum,shortcutDetails(targetId,targetMimeType))';
  const files = [];
  let pageToken = '';
  do {
    const params = new URLSearchParams({
      q, fields, orderBy: 'name', pageSize: '100', ...auth(),
      supportsAllDrives: 'true', includeItemsFromAllDrives: 'true',
      ...(pageToken ? { pageToken } : {}),
    });
    const data = await get(`${API}/files?${params}`);
    files.push(...(data.files || []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return files;
}

// "01_탄자니아 선교.jpg" → "탄자니아 선교" / 업체가 붙인 무작위 이름이면 기본 문구
function altFromName(name) {
  const base = name.replace(/\.[^.]+$/, '').replace(/^\d+[_\-.\s]+/, '').trim();
  if (!base || /^[A-Za-z0-9]{6,}_[0-9a-f]{20,}$/i.test(base) || /^[0-9a-f]{16,}$/i.test(base)) return '예수원교회 배너 사진';
  return base;
}

async function main() {
  const prev = fs.existsSync(JSON_PATH) ? JSON.parse(fs.readFileSync(JSON_PATH, 'utf8')) : { items: [] };
  const prevById = Object.fromEntries((prev.items || []).map((it) => [it.id, it]));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (SA) {
    TOKEN = await getToken();
    console.log(`[드라이브] 서비스 계정으로 접속: ${SA.client_email}`);
  }
  const files = await listFolder(FOLDER);
  console.log(`[드라이브] 폴더에서 ${files.length}개 찾음`);

  // 0개면 대부분 "폴더가 비공개로 바뀌어 이 열쇠로는 안 보임" 이에요.
  // 이때 기존 배너를 지우면 홈이 텅 비니까, 지우지 않고 그대로 둬요.
  if (files.length === 0 && (prev.items || []).length > 0) {
    console.log('[드라이브] ⚠ 폴더가 비어 보여요. 폴더 공유가 바뀌었거나 열쇠(API 키/서비스 계정)에 권한이 없을 수 있어요.');
    console.log(`[드라이브]   기존 배너 ${prev.items.length}장을 그대로 유지할게요. 정말 다 내리려면 data/banners.json 을 지우고 다시 실행하세요.`);
    return;
  }

  const items = [];
  for (const f of files) {
    // 바로가기면 원본 파일을 가져와요
    const isShortcut = f.mimeType === 'application/vnd.google-apps.shortcut';
    if (isShortcut && !(f.shortcutDetails?.targetMimeType || '').startsWith('image/')) continue;
    const id = isShortcut ? f.shortcutDetails.targetId : f.id;
    const version = f.md5Checksum || f.modifiedTime;
    const file = path.join(OUT_DIR, `${id}.jpg`);
    const old = prevById[id];

    let w, h;
    if (old && old.version === version && fs.existsSync(file)) {
      ({ w, h } = old);
      console.log(`  = ${f.name} (변경 없음)`);
    } else {
      const params = new URLSearchParams({ alt: 'media', ...auth(), supportsAllDrives: 'true' });
      const buf = await get(`${API}/files/${id}?${params}`, 'buffer');
      const out = await sharp(buf).rotate().resize({ width: 1920, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer({ resolveWithObject: true });
      fs.writeFileSync(file, out.data);
      ({ width: w, height: h } = out.info);
      console.log(`  + ${f.name} → ${Math.round(buf.length / 1024)}KB → ${Math.round(out.data.length / 1024)}KB`);
    }
    items.push({ id, name: f.name, alt: altFromName(f.name), src: `/drive/banner/${id}.jpg`, w, h, version });
  }

  // 폴더에서 빠진 사진 파일은 지워요
  const keep = new Set(items.map((it) => `${it.id}.jpg`));
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (!keep.has(f)) {
      fs.unlinkSync(path.join(OUT_DIR, f));
      console.log(`  - ${f} (폴더에서 빠짐)`);
    }
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify({ updatedAt: new Date().toISOString(), folderId: FOLDER, items }, null, 2) + '\n');
  console.log(`[드라이브] 배너 ${items.length}장 준비 완료`);
}

main().catch((e) => {
  console.error('[드라이브] 배너 동기화 실패:', e.message);
  ensureJson();
  process.exit(SOFT ? 0 : 1);
});
