/** GitHub Pages 용 정적 사이트 설정 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',        // out/ 폴더에 순수 HTML 로 뽑아요 (서버 필요 없음)
  trailingSlash: true,     // /about/ → about/index.html (GitHub Pages 에 맞춤)
  basePath,                // https://bakhoon.github.io/jesuwon/ 처럼 하위 경로일 때
  images: { unoptimized: true },
};

export default nextConfig;
