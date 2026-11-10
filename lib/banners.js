// 홈 슬라이더 사진 목록
// data/banners.json 은 tools/sync-drive.mjs 가 구글 드라이브 current_banner 폴더에서 만들어요.
// 아직 동기화 전이면 디자인에 있던 사진 한 장을 보여줘요.
import data from '@/data/banners.json';

const FALLBACK = [{ src: '/_blob/c03a3e2bcf9d8de53ca200225920f242', alt: '예수원교회 청년부 단체 사진' }];

export const BANNERS = data.items && data.items.length ? data.items : FALLBACK;
