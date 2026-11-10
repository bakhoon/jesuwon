// 구글 드라이브 current_banner 폴더 → 홈 슬라이더 사진
//
// 하는 일
//   1. 폴더 안의 사진 목록을 읽어요 (파일 이름 순서 = 슬라이더 순서)
//   2. 새로 생기거나 바뀐 사진만 내려받아요
//   3. 화면용 크기(가로 1920px, JPG)로 줄여서 public/drive/banner/ 에 저장해요
//   4. data/banners.json 을 새로 써요
//
// 필요한 것
//   GOOGLE_API_KEY   : Google Cloud 에서 만든 API 키 (Drive API 사용 설정)
//   BANNER_FOLDER_ID : (선택) 폴더 ID. 없으면 아래 기본값
//
// 폴더는 "링크가 있는 모든 사용자: 뷰어" 로 공유되어 있어야 해요.
// 사용법: GOOGLE_API_KEY=... node tools/sync-drive.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const KEY = process.env.GOOGLE_API_KEY;
const FOLDER = process.env.BANNER_FOLDER_ID || '15E4PK8IUAO2puIb1HgPRPeORSRlrlpn2';
const API = process.env.DRIVE_API_BASE || 'https://www.googleapis.com/drive/v3';
const OUT_DIR = path.join(ROOT, 'public/drive/banner');
const JSON_PATH = path.join(ROOT, 'data/banners.json');

if (!KEY) {
  console.log('GOOGLE_API_KEY 가 없어서 드라이브 동기화를 건너뛰어요. (기존 data/banners.json 사용)');
  process.exit(0);
}

async function get(url, as = 'json') {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText} ← ${url.replace(KEY, '***')}\n${body.slice(0, 400)}`);
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
      q, fields, orderBy: 'name', pageSize: '100', key: KEY,
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

  const files = await listFolder(FOLDER);
  console.log(`폴더에서 ${files.length}개 찾음`);

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
      const params = new URLSearchParams({ alt: 'media', key: KEY, supportsAllDrives: 'true' });
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
  console.log(`data/banners.json 에 ${items.length}장 저장`);
}

main().catch((e) => {
  console.error('드라이브 동기화 실패:', e.message);
  process.exit(1);
});
