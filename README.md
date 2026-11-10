# 예수원교회 웹사이트

Next.js(React)로 만든 예수원교회 홈페이지예요. 지금은 **외부 서비스 없이** 돌아가는 1단계 버전이에요.

- 데이터(설교, 게시판, 회원 등)는 각 페이지 코드 안의 샘플 데이터예요.
- 로그인은 **체험용**이에요. 로그인 화면에서 아무 아이디나 넣으면 교인 화면으로, 아이디를 `admin`으로 넣으면 관리자 화면으로 이동해요. (비밀번호는 아무거나)
- 관리자 화면에서 바꾼 내용은 저장되지 않아요. 새로고침하면 처음으로 돌아가요.

## 페이지 주소

| 구분 | 주소 |
|---|---|
| 비로그인 | `/` 홈, `/about/`, `/serve/`, `/words/`, `/mokjang/`, `/ufeedem/`, `/rest/`, `/login/`, `/signup/` |
| 로그인(교인) | `/member/`, `/member/edu/`, `/member/words/`, `/member/mokjang/`, `/member/ufeedem/`, `/member/rest/` |
| 관리자 | `/admin/`, `/admin/homepage/`, `/admin/members/`, `/admin/members/edit/`, `/admin/banners/`, `/admin/popups/`, `/admin/about/`, `/admin/serve/` |

## 내 컴퓨터에서 실행하기

```bash
npm install
npm run start
```

`npm run start` 하나로 구글 드라이브 배너 사진을 먼저 가져온 다음 사이트를 띄워요.
드라이브 사진까지 보려면 `.env.local.example` 을 `.env.local` 로 복사하고 `GOOGLE_API_KEY=` 뒤에 키를 넣으세요.
(키가 없어도 사이트는 기본 사진 한 장으로 잘 떠요.)

http://localhost:3000 을 열면 돼요.

## 배포 (GitHub Pages)

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 자동으로 빌드해서 올려요.
처음 한 번만 GitHub 저장소의 **Settings › Pages › Build and deployment › Source** 를 **GitHub Actions** 로 바꿔 주세요.

주소: `https://<계정>.github.io/<저장소이름>/`

## 홈 배너 사진 (구글 드라이브)

홈 첫 화면 슬라이더는 구글 드라이브 `home/banner/current_banner` 폴더의 사진을 보여줘요.

- **사진 바꾸기:** 폴더에 사진을 넣거나 빼면 돼요. 내린 배너는 `old_banner` 로 옮겨 두세요.
- **순서:** 파일 이름 순서예요. `01_`, `02_` 처럼 앞에 숫자를 붙이면 원하는 순서가 돼요.
- **설명 문구:** `01_탄자니아 선교.jpg` → 화면 읽기용 설명이 "탄자니아 선교"가 돼요.
- **반영 시간:** 매일 새벽 한 번 자동으로 가져와요. 바로 반영하려면 GitHub 저장소 **Actions › Deploy to GitHub Pages › Run workflow** 를 누르세요 (3~5분).
- **원본 그대로:** 큰 원본을 넣어도 자동으로 가로 1920px JPG로 줄여서 올려요.

폴더 공유 방식에 따라 열쇠가 달라요.

| 폴더 공유 | 필요한 것 | GitHub Secret 이름 |
|---|---|---|
| 링크가 있는 모든 사용자 (공개) | API 키 | `GOOGLE_API_KEY` |
| 비공개 + 서비스 계정 이메일만 뷰어 | 서비스 계정 JSON 키 | `GOOGLE_SERVICE_ACCOUNT_JSON` (JSON 내용 통째로) |

API 키는 "누가 만든 키인지"와 상관없이 공개 파일만 읽을 수 있어요. 비공개 폴더는 서비스 계정이 필요해요.

처음 한 번 설정: 내 컴퓨터에서는 `.env.local` 에, GitHub 배포용으로는 저장소 **Settings › Secrets and variables › Actions** 에 `GOOGLE_API_KEY` 를 추가해야 해요.
키가 없으면 동기화를 건너뛰고 기본 사진 한 장을 보여줘요.

## 폴더 구조

```
design/                 디자인 캔버스에서 가져온 원본 화면 (*.dc.html)
tools/convert-design.mjs  design → app 페이지로 바꿔주는 변환 스크립트
app/**/page.js          실제 페이지 (변환 스크립트가 만든 파일)
lib/dc.js               변환된 페이지가 쓰는 도우미 (주소 변환, 스타일, 상태 관리)
lib/assets.js           이미지 목록
lib/banners.js          홈 슬라이더 사진 목록 (data/banners.json 읽기)
tools/sync-drive.mjs    구글 드라이브 → 배너 사진 동기화
public/img/             사진 파일
```

### 화면을 고치는 방법

지금 페이지들은 디자인 파일을 그대로 옮긴 거라서, 화면을 고칠 때는

1. `design/` 안의 해당 파일을 고치고
2. `npm run convert` 를 실행하면
3. `app/` 페이지가 새로 만들어져요.

`app/` 파일을 직접 고치면 다음 변환 때 덮어써지니 주의하세요.

## 작업 방식 (PR)

`main` 에 바로 올리지 않고, 작업마다 브랜치를 만들어 PR 로 합쳐요.

1. 브랜치 만들기: `git checkout -b feature/작업이름`
2. 작업하고 commit, `git push -u origin feature/작업이름`
3. GitHub 에서 PR 열기 → **PR build check** 가 초록불인지 확인
4. 확인되면 **Merge** → `main` 에 합쳐지는 순간 자동 배포

`main` 에 합쳐진 뒤 내 컴퓨터는 `git checkout main && git pull` 로 최신으로 맞춰요.

## 다음 단계

1. 공통 부분(상단 메뉴, 푸터)을 컴포넌트로 빼고, 샘플 데이터를 `data/` 파일로 분리
2. 로그인 · 데이터베이스 연결 (Supabase)
3. 유튜브 · 구글 드라이브 연결
4. 카카오톡 가입 승인 알림
