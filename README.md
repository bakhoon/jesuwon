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
npm run dev
```

http://localhost:3000 을 열면 돼요.

## 배포 (GitHub Pages)

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 자동으로 빌드해서 올려요.
처음 한 번만 GitHub 저장소의 **Settings › Pages › Build and deployment › Source** 를 **GitHub Actions** 로 바꿔 주세요.

주소: `https://<계정>.github.io/<저장소이름>/`

## 폴더 구조

```
design/                 디자인 캔버스에서 가져온 원본 화면 (*.dc.html)
tools/convert-design.mjs  design → app 페이지로 바꿔주는 변환 스크립트
app/**/page.js          실제 페이지 (변환 스크립트가 만든 파일)
lib/dc.js               변환된 페이지가 쓰는 도우미 (주소 변환, 스타일, 상태 관리)
lib/assets.js           이미지 목록
public/img/             사진 파일
```

### 화면을 고치는 방법

지금 페이지들은 디자인 파일을 그대로 옮긴 거라서, 화면을 고칠 때는

1. `design/` 안의 해당 파일을 고치고
2. `npm run convert` 를 실행하면
3. `app/` 페이지가 새로 만들어져요.

`app/` 파일을 직접 고치면 다음 변환 때 덮어써지니 주의하세요.

## 다음 단계

1. 공통 부분(상단 메뉴, 푸터)을 컴포넌트로 빼고, 샘플 데이터를 `data/` 파일로 분리
2. 로그인 · 데이터베이스 연결 (Supabase)
3. 유튜브 · 구글 드라이브 연결
4. 카카오톡 가입 승인 알림
