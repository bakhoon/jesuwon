# CLAUDE.md

예수원교회(Jesuwon Community Church, ARPC, Horsham PA) 홈페이지. Next.js 정적 사이트를 GitHub Pages에 배포해요.

## 작업 규칙

- **PR로 작업**: `main`에 직접 push 하지 않아요. 작업마다 `feature/...`, `fix/...`, `chore/...` 브랜치를 만들고 PR을 열어요. PR에서 `PR build check`가 통과해야 Merge.
- **한국어로 대화**: 사용자(Jeremy, 박지훈)는 한국어로 이야기해요. 답변, 커밋 메시지, PR 설명, 코드 주석 모두 한국어.
- **문체**: 글에 em dash(—)를 쓰지 않아요. "~이며"도 쓰지 않아요.
- **비밀값**: `.env.local`, `secrets/` 는 절대 커밋하지 않아요 (`.gitignore` 에 있음). `git add -A` 전에 `git status` 확인.

## 실행

```bash
npm install
npm run start      # 드라이브 배너 동기화 → next dev
npm run build      # 동기화 → 정적 빌드 (out/)
npm run convert    # design/*.dc.html → app/**/page.js 다시 생성
```

## 구조

- `design/*.dc.html`: 원본 화면. claude.ai 디자인 캔버스에서 만든 파일이에요. **화면을 고칠 때는 여기를 고치고 `npm run convert`**.
- `tools/convert-design.mjs`: design → React 페이지 변환기. `TEMPLATE_PATCHES`(HTML 치환), `PATCHES`(로직 치환)로 디자인 파일을 건드리지 않고 동작을 바꿔요 (예: 홈 슬라이더, 체험용 로그인).
- `app/**/page.js`: 변환기가 만든 파일. **직접 고치면 다음 convert 때 덮어써져요.**
- `lib/dc.js`: 변환된 페이지의 런타임 (`useDC` 훅, `css()`, `asset()`, `route()`, `<A>` 링크). `ROUTES` 에 디자인 파일명 → 주소 매핑.
- `lib/banners.js` + `tools/sync-drive.mjs`: 홈 슬라이더 사진을 구글 드라이브 `current_banner` 폴더(ID `15E4PK8IUAO2puIb1HgPRPeORSRlrlpn2`, jesuwon.com 공유 드라이브)에서 가져와 1920px JPG로 줄여 `public/drive/banner/` 에 저장, `data/banners.json` 생성. 둘 다 생성물이라 git 제외.
  - 인증: 서비스 계정(`jesuwon-site@jesuwon-website.iam.gserviceaccount.com`, 키는 `secrets/service-account.json`) 우선, 없으면 `GOOGLE_API_KEY`(폴더가 링크 공개일 때만 동작).
  - 폴더가 0개로 보이면 기존 배너를 지우지 않음 (권한 문제 보호).
  - GitHub Actions 비밀값: `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_API_KEY`.
- `public/img/<id>.<ext>`: 디자인에서 쓰던 사진들. `lib/assets.js` 에 확장자 목록.

## 주소

| 구분 | 주소 |
|---|---|
| 비로그인 | `/`, `/about/`, `/serve/`, `/words/`, `/mokjang/`, `/ufeedem/`, `/rest/`, `/login/`, `/signup/` |
| 교인 | `/member/`, `/member/edu/`, `/member/words/`, `/member/mokjang/`, `/member/ufeedem/`, `/member/rest/` |
| 관리자 | `/admin/`, `/admin/homepage/`, `/admin/members/`, `/admin/members/edit/`, `/admin/banners/`, `/admin/popups/`, `/admin/about/`, `/admin/serve/` |

로그인은 체험용이에요: 아이디 `admin` → 관리자, 그 외 → 교인 화면.

## 결정된 것

- 권한은 세 가지뿐: 미로그인 / 로그인 유저(교인) / 관리자. 레벨(1~10) 없음.
- 회원정보 수정에서 메모, 서명, 자기소개, 탈퇴일자, 수신·공개 설정은 뺐음.
- 사진: 자주 바뀌는 것(배너, 앨범)은 드라이브, 거의 안 바뀌는 것(로고, 섬기는 분들)은 저장소, 영상은 유튜브 링크.
- 나중 단계 로그인/DB는 Supabase 예정. 시작용 코드가 별도로 있음 (role: member/admin, RLS).

## 아직 안 된 것

- 홈 바로가기 카드 중 "예배/모임 안내", "새가족 환영" 은 연결할 페이지가 아직 없음 (`href="#"`).
- 교회안내 › 예배 안내, 찾아오시는 길 페이지 없음.
- 공통 헤더/푸터 컴포넌트 분리, 샘플 데이터 `data/` 분리.
- 사진 앨범 드라이브 연동 (비공개 폴더 + 서비스 계정).
