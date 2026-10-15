'use client';
// 이 파일은 tools/convert-design.mjs 가 design/MemberWords.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.tab-btn:hover{background:#EEF6E3}\n.row-btn{transition:background .15s}\n.row-btn:hover{background:#F3F8EC}\n.row-btn:hover .row-title{color:#2F5E17;text-decoration:underline}\n.page-btn:hover{background:#EEF6E3}\n.cmt textarea:focus,.series select:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list{transition:none !important}}\n@media (max-width: 860px){\n  .nav-links{display:none !important}\n  .nav-burger{display:flex !important}\n  .page-title{font-size:34px !important}\n  .col-hide{display:none !important}\n}\n";

class Component extends DCLogic {
  renderVals() {
    const primary = this.props.primary ?? '#8BC34A';
    const st = this.state || {};
    const tab = st.tab || 'sermon';
    const sel = st.sel === undefined ? null : st.sel;
    const q = st.q || '';
    const page = st.page || 1;
    const series = st.series || '전체';
    const openSub = st.openSub || null;
    const draft = st.draft || '';
    const secret = !!st.secret;
    const allComments = st.comments || {};
    const PER = 16;

    const P = '윤성종 목사';
    const OT = '구약이야기 시리즈', MT = '마태복음 시리즈', COL = '골로새서 강해', ETC = '기타';
    // [date, title, ref, preacher, series]
    const SERMONS = [
      ['2026-10-11', '우리를 불쌍히 여기소서', '[마태복음시리즈82]: 마태복음 20장 29-34절', P, MT],
      ['2026-10-04', '교회가 받은 3가지 사명', '마태복음 28장 16-20절', P, ETC],
      ['2026-09-27', '"시선"', '마태복음 14장 22-33절', '박영균 목사', ETC],
      ['2026-09-20', '"드러난 죄, 열린 소망의 문"', '여호수아 7장 10-23절', '박정호 목사', ETC],
      ['2026-09-13', '낮아짐에 최선을 다합시다', '마태복음시리즈[81] 마태복음 20장 17-28절', P, MT],
      ['2026-09-06', '선교적 삶: 일과 영성[2]', '골로새서강해[15]: 골로새서 3장 22 - 4장 1절', P, COL],
      ['2026-08-30', '욥[1]: 더 높은 신앙을 추구하라', '구약이야기시리즈[99]: 욥기 1장 - 3장', P, OT],
      ['2026-08-23', '아버지의 포도원', '마태복음 20절 1-16절', '안진성 목사', ETC],
      ['2026-08-16', '가팔와따: 이 세상이 끝이 아니라면...', '마태복음시리즈[80] 마태복음 19장 16-30절', P, MT],
      ['2026-08-09', '하나님 나라의 회복 원리: 회개와 용서', '마태복음시리즈[79]: 마태복음 18장 15-35절', P, MT],
      ['2026-08-02', '선교적 삶: 일과 영성[1]', '골로새서강해[14]: 골로새서 3장 22절 4장 1절', P, COL],
      ['2026-07-26', '교회의 영광:그리스도의 신부로 선택 받다', '구약이야기시리즈[98]: 이사야 62장 1-5절', P, OT],
      ['2026-07-19', '복음에 빚진 자', '로마서 1장 14절', '김종철 선교사', ETC],
      ['2026-07-12', '예.소.우.소', '마태복음시리즈[78]: 마태복음 18장 6-11절', P, MT],
      ['2026-07-05', '너희가 새 사람을 입었으니...', '골로새서강해[13]: 골로새서 3장 5 - 11절', P, COL],
      ['2026-06-28', '닮기&담기', '창세기 1장 26-31절', '추기성 선교사', ETC],
      ['2026-01-04', '느헤미야[3]: 신앙 개혁, 성경으로 돌아가자', '느헤미야 8장-13장', P, OT],
      ['2025-12-28', '느헤미야[2]: 사명자에겐 오직 충성뿐이다', '느헤미야 1장-7장', P, OT],
      ['2025-11-30', '느헤미야[1]: 하나님의 소원에 인생을 던지다', '느헤미야 1장 - 7장', P, OT],
      ['2025-10-26', '요시아 왕:전심으로 여호와의 길을 걷다가...[…', '구약이야기시리즈[93]: 역대하 34장 1절-35장 27절', P, OT],
      ['2025-07-27', '여호사밧 왕: 진심으로 여호와의 길을 걷다가…', '역대하 19장 1절 - 20장 37절 [19:1-3, 20:1-4]', P, OT],
      ['2025-06-29', '여호사밧 왕: 전심으로 여호와의 길을 걷다가…', '구약이야기시리즈[91]: 역대하 17장 1절 - 20장 1절', P, OT],
      ['2025-03-30', '아사왕: 참된 평안과 형통은 어디에서 오는가…', '역대하 14장 1절 - 16장 14절 [14:1-7]', P, OT],
      ['2024-12-29', '히스기야 왕[2]: 바른 신앙만이 살 길이다[2]', '열왕기하 18장 1-6절', P, OT],
      ['2024-10-27', '히스기야 왕[1]: 바른 신앙만이 답이다', '열왕기하 18장 1-8절', P, OT],
      ['2024-08-25', '나아만 장관: 요단강에서 일곱번 씻으라', '열왕기하 5장 1-19절', P, OT],
      ['2024-07-28', '나봇의 포도원: 오직 충성', '열왕기상 21장: 1-26절 [1-10]', P, OT],
      ['2024-06-30', '엘리야[4]: 네가 어찌하여 여기 있느냐', '구약이야기시리즈[85]: 열왕기상 19장 1-18절[1-8]', P, OT],
      ['2024-04-28', '엘리야[3]: 두 주인은 없다. 한 분만 택하라!', '구약이야기시리즈[84]: 열왕기상 18장 1-40절[1-2, 16-19]', P, OT],
      ['2024-03-03', '엘리야[2]: 오직 하나님만 참 신이시다', '구약이야기시리즈[83]: 열왕기상 17장 1-24절 [1-7]', P, OT]
    ];
    const SERIES = ['전체', OT, '누가복음 시리즈', MT, '요나서 강해', '베드로전서 강해', '갈라디아서 강해', '빌립보서 강해', '데살로니가전서 강해', '야고보서 강해', COL, '요한계시록 7시리즈', '코로나 시리즈', ETC];

    const COLUMNS = [
      [569, '환대2: 빈손으로 방문하기 운동', '10-10', { views: '7', datetime: '26-10-10 06:36', paras: [
        '매년 이맘 때가 되면 간절한 마음으로 이 운동을 해보자고 외치고 있습니다. 예수원교회 성도님들을 떠올려 보면, 제가 섬겨왔던 교회들과 비교해서 유별난 것들이 많습니다. 그 중의 하나가 환대하는 문화인 것 같습니다. 하루가 멀다하고 섬김과 교제로 서로를 환대하는 열기가 식지 않고 있습니다. 작은 교회인데도 식당가면 예수원교회 성도님들의 교제하는 광경을 자주 목격하게 될 정도입니다. 목자 목우님들은 더하시지만, 예수원 성도님들의 평균치를 본다면 목장 모임을 포함해서 매 주 2-3번은 식탁 교제를 하신다고 판단됩니다.',
        '다른 교회 같으면 이런 문화는 만들기도 힘든 예수원의 매력입니다만 담임 목사로서는 마음에 걸리는 부분이 있습니다. 섬기는 자나 초대 받아 집으로 방문하시는 성도님들의 경제적 부담이 크다는 것을 알기 때문입니다. 그래서 뭔가 부담을 조금이라도 덜어 드릴 방법이 없을까를 생각하다가 ‘빈손 운동’을 몇 해 전부터 전개하게 되었습니다. 초대를 받으면 한국인의 정서상 뭔가 풍성하게 들고 가셔야 하는 예의가 부담을 주기 때문입니다(물론 지독하게도 안고쳐 집니다) 예수원 성도들과의 교제와 관련하여 방문하실 때 원칙은 다음과 같습니다.',
        '#1. 목장 모임: 모든 방문자는 ‘제발’ 빈 손으로 가시기 바랍니다. 단, vip가 처음으로 집을 공개하셨거나, 목원이 이사를 하신 후 처음 방문일 경우는 예외로 합니다. 이 때에도 휴지나 페이퍼 타올 수준 이상을 넘지 않아야 합니다.',
        '#2. 주 중 식탁 교제: 식사 초대가 집이든, 식당이든 특별한 이유가 없는 한 빈 손으로 갑니다. 특별한 이유란 누가 들어도 특별한 사연이 있을 경우입니다. 이 부분은 논란이 있습니다만, 우리 교회는 너무 풍성하기 때문에 초대 받을 때 만큼은 서로 빈손으로 가보자는 겁니다. 어떤 예의 바르신 성도님들은 식당에서 만났을 때 조차도 트렁크에 식사 값에 해당되는 선물을 꼭 싣고 오셔서 감사의 마음을 전해 주십니다. 이제 이후로는 빈손으로 담대하게 교제의 자리에 함께 해 보시길 바랍니다. 집에서 초대하시는 호스트의 경우는 빈손들고 방문하시는 분들이 불편하지 않도록 “빈 손으로 오세요!”를 초대하실 적에 항상 강조해 주셨으면 합니다. 이렇게 말씀해 주심으로써, 그 누구도 빈손으로 방문함에 죄송스러움이 없게 해 주신다면, 더 좋은 호스트의 환대가 되리라 확신합니다.',
        '경제적 어려움으로 한달 50불 저축 여유가 없으신 성도님을 생각해 봅시다. 한달에 5번 초대를 받으실 적에 10불짜리 빵을 사가기만 한다 해도 그 분의 생활 경제는 고통 단계로 접어듭니다(저도 이런 시절이 꽤 오랫동안 유지되었던 과거가 있습니다). 이런 분에게 초대는 짐스러움을 넘어 교회를 옮겨야 하나 라고 할 만큼의 큰 염려가 될 수 있습니다. 결국 “돈 없어서 예수원 못다니겠다”라고 하실 이유가 될 수도 있다는 뜻입니다. 그래서 초대하시는 분들은 진짜 환대가 될 수 있도록 빈손으로 오시라고 먼저 부탁해 주셔야 합니다. 그러나 ‘빈손 운동’이 우리를 하나님과 이웃에게 더욱 인색해지는 쪽으로 효과를 나타낸다면 슬픈 일이 될 것입니다. 환대, 남에게 풍성히 베풂은 예수님이 가르치신 제자도이기 때문입니다.',
        '또한 섬기는 입장에서의 환대란 각자의 형편에 맞는 베풂이어야 합니다. 국수든 된장국 백반이든 문제될 것이 전.혀 없습니다! 약한 자를 배려하고, 만남의 본질에 집중하기 위한 ‘빈 손으로 가기 운동’에 적극 동참해 주시길 부탁 드립니다.'
      ] }],
      [568, '환대: 믿음의 증거이자 신자됨의 증표', '10-03'], [567, '기우(杞憂) ...손석진 목사', '09-26'],
      [566, '잘 다녀오겠습니다', '09-12'], [565, '26 목장별 911 운동 오픈', '09-05'],
      [564, '탄자니아 단기 선교 여행을 앞에 두고...', '08-22'], [563, '목장의 존재 목적을 기억합시다', '08-15'],
      [562, '가을철 성경 통독 55일 대회', '08-08'], [561, '신앙 생활 행복 하십니까?...이재천 집사님의 …', '08-01'],
      [560, '주를 순종함으로만 살고 싶습니다...김수현 …', '07-25'], [559, '예수원다움...이정훈 형제님의 글', '07-18'],
      [558, '주님의 마음을 조금 배웠습니다...박현수 형…', '07-11'], [557, '믿음으로 바라보니 감사가 되었습니다....정…', '07-04'],
      [556, '목장 개편에 따른 감사와 부탁의 말씀', '06-27'], [555, '신앙 전승을 위한 1세 교회의 고민[2]', '06-20'],
      [554, '공동체가 화평하려면...', '06-13']
    ];

    const VIDEO = [
      ['2020-12-29', '소통의 삶[14]: 분노 다스리기'], ['2020-12-15', '소통의 삶[13]: 갈등언어 죽이기'], ['2020-12-09', '소통의 삶[12]: 말씨'],
      ['2020-12-01', '소통의 삶[11]: 소통의 매너'], ['2020-11-17', '소통의 삶[10]: 조급한 말, 사려깊은 말'], ['2020-11-10', '소통의 삶[9] - 거짓된 말, 진실한 말'],
      ['2020-11-03', '소통의 삶[8] - 수다스러운 말, 침묵하는 말'], ['2020-10-20', '소통의 삶[7]: 중상하는 말'], ['2020-10-14', '소통의 삶[6]: 비난하는 말, 세워주는 말'],
      ['2020-10-07', '소통의 삶[5]: 아는 체하는 말'], ['2020-09-22', '소통의 삶[4]: 솔직한 말?'], ['2020-09-15', '소통의 삶[3]: 무례한 말 : 대접하는 말'],
      ['2020-09-08', '소통의 삶[2]: 자아에 골똘한 말: 상대를 돌아…'], ['2020-09-01', '소통의 삶[1]: 낙담시키는 말: 격려하는 말 (1)']
    ];
    const DOCTRINE = [
      ['2020-11-19', '[7교산 11강] 웨스트민스터 소요리문답'], ['2020-11-05', '[7교산 10강] 웨스트민스터 소요리문답 36'], ['2020-10-22', '[7교산 9강] 웨스트민스터 소요리문답 39문'],
      ['2020-10-15', '[7교산 8강] 웨스트민스터 소요리문답 38문'], ['2020-10-08', '[7교산 7강] 웨스트민스터 소요리문답 37문'], ['2020-10-01', '[7교산 6강] 웨스트민스터 소요리문답 34문'],
      ['2020-09-24', '[7교산 5강] 웨스트민스터 소요리문답 33문'], ['2020-09-17', '[7교산 4강] 웨스트민스터 소요리문답 21문'], ['2020-09-11', '[7교산 3강] 웨스트민스터 소요리문답 16문'],
      ['2020-09-03', '[7교산 2강] 웨스트민스터 소요리문답 7문'], ['2020-08-27', '[7교산 1강] 웨스트민스터 소요리문답 1문']
    ];

    const META = {
      sermon: { label: '설교듣기', eyebrow: 'SERMONS' },
      column: { label: '예수원칼럼', eyebrow: 'JESUWON COLUMN' },
      video: { label: '영상칼럼', eyebrow: 'VIDEO COLUMN' },
      doctrine: { label: '교리강좌', eyebrow: 'DOCTRINE CLASS' }
    };
    const toTop = () => { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {} };
    const go = (id) => (e) => {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ tab: id, sel: null, q: '', page: 1, series: '전체', openSub: null, draft: '' });
    };
    const base = 'flex-shrink: 0; min-height: 56px; padding: 0 22px; border: none; background: transparent; font-family: inherit; font-size: 16px; cursor: pointer; white-space: nowrap;';
    const tabs = ['sermon', 'column', 'video', 'doctrine'].map((id) => {
      const on = id === tab;
      return {
        label: META[id].label, selected: on ? 'true' : 'false',
        style: base + (on ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 ' + primary + ';' : ' color: #56634F; font-weight: 500;'),
        pick: go(id)
      };
    });

    const needle = q.trim().toLowerCase();
    const rowBase = 'width: 100%; display: flex; align-items: center; gap: 16px; padding: 14px 20px; border: none; border-top: 1px solid #EDF1E6; font-family: inherit; cursor: pointer; text-align: left;';
    let all = [];
    if (tab === 'sermon') {
      all = SERMONS.map((s, i) => ({ key: 's' + i, i, date: s[0], title: s[1], sub: s[2] + ' · ' + s[3], series: s[4], hasThumb: true, hasYt: true, hasNo: false }))
        .filter((r) => series === '전체' || r.series === series);
    } else if (tab === 'column') {
      all = COLUMNS.map((c, i) => ({ key: 'c' + c[0], i, no: String(c[0]), date: c[2], title: c[1], sub: '웹섬김…', hasThumb: false, hasYt: false, hasNo: true }));
    } else {
      const src = tab === 'video' ? VIDEO : DOCTRINE;
      all = src.map((v, i) => ({ key: tab[0] + i, i, date: v[0], title: v[1], sub: tab === 'video' ? '소통의 삶 · Jesuwon Discipleship' : '칠교산 시리즈 · Jesuwon Discipleship', hasThumb: true, hasYt: true, hasNo: false }));
    }
    const filtered = needle ? all.filter((r) => r.title.toLowerCase().includes(needle)) : all;
    const nPages = Math.max(1, Math.ceil(filtered.length / PER));
    const pg = Math.min(page, nPages);
    const rows = filtered.slice((pg - 1) * PER, pg * PER).map((r, k) => Object.assign({}, r, {
      style: rowBase + (k === 0 ? ' border-top: none;' : '') + (sel === r.key ? ' background: #EEF6E3;' : ' background: transparent;'),
      pick: () => { this.setState({ sel: r.key, draft: '' }); toTop(); }
    }));
    const pages = Array.from({ length: nPages }, (_, k) => {
      const n = k + 1; const on = n === pg;
      return {
        n: String(n), current: on ? 'page' : 'false',
        style: 'min-width: 44px; height: 44px; border-radius: 10px; font-family: inherit; font-size: 15px; cursor: pointer; ' + (on ? 'border: none; background: #1F3B16; color: #FFFFFF; font-weight: 700;' : 'border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516;'),
        pick: () => { this.setState({ page: n, sel: null }); toTop(); }
      };
    });

    // detail
    let d = { title: '', series: '', hasSeries: false, meta: [], isVideo: false, isText: false, isEmpty: false, paras: [], videoTitle: '', channel: '' };
    if (sel !== null) {
      if (sel[0] === 's') {
        const s = SERMONS[Number(sel.slice(1))];
        if (s) d = Object.assign(d, {
          title: s[1], series: s[4], hasSeries: s[4] !== ETC,
          meta: [{ k: '설교자', v: s[3] }, { k: '본문', v: s[2] }, { k: '설교일', v: s[0] }],
          isVideo: true, videoTitle: s[0].slice(5).replace('-', '/') + '/' + s[0].slice(0, 4) + ' · ' + s[1], channel: 'Jesuwon Sermon'
        });
      } else if (sel[0] === 'c') {
        const c = COLUMNS.find((x) => 'c' + x[0] === sel);
        if (c) {
          const ex = c[3];
          d = Object.assign(d, {
            title: c[1],
            meta: [{ k: '작성자', v: '웹섬김…' }, { k: '조회', v: ex ? ex.views : '0' }, { k: '', v: ex ? ex.datetime : c[2] }],
            isText: !!ex, isEmpty: !ex,
            paras: ex ? ex.paras.map((t) => t[0] === '#'
              ? { text: t.slice(1), style: 'margin: 0; padding: 16px 20px; background: #EEF6E3; border-radius: 12px; color: #1F3B16;' }
              : { text: t, style: 'margin: 0;' }) : []
          });
        }
      } else {
        const src = sel[0] === 'v' ? VIDEO : DOCTRINE;
        const v = src[Number(sel.slice(1))];
        if (v) d = Object.assign(d, {
          title: v[1], series: sel[0] === 'v' ? '소통의 삶' : '칠교산 시리즈', hasSeries: true,
          meta: [{ k: '설교일', v: v[0] }], isVideo: true, videoTitle: v[1], channel: 'Jesuwon Discipleship'
        });
      }
    }
    const comments = (allComments[sel] || []).map((c) => ({ text: c.text, secret: c.secret }));

    return {
      primary, tabs, rows, pages, q, series, draft, secret, d, comments,
      commentCount: String(comments.length),
      eyebrow: META[tab].eyebrow, pageTitle: META[tab].label,
      isSermon: tab === 'sermon',
      seriesOpts: SERIES.map((v) => ({ v })),
      isEmpty: rows.length === 0,
      emptyText: needle ? '"' + q + '"에 맞는 글이 없어요.' : '이 시리즈에 아직 등록된 설교가 없어요.',
      hasPages: nPages > 1,
      hasDetail: sel !== null,
      closeDetail: () => this.setState({ sel: null }),
      onQ: (e) => this.setState({ q: e.target.value, page: 1 }),
      onSeries: (e) => this.setState({ series: e.target.value, page: 1, sel: null }),
      noSubmit: (e) => { if (e && e.preventDefault) e.preventDefault(); },
      onDraft: (e) => this.setState({ draft: e.target.value }),
      toggleSecret: () => this.setState({ secret: !secret }),
      addComment: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const t = draft.trim(); if (!t || sel === null) return;
        const list = (allComments[sel] || []).concat([{ text: t, secret }]);
        this.setState({ comments: Object.assign({}, allComments, { [sel]: list }), draft: '', secret: false });
      },
      goSermon: go('sermon'), goColumn: go('column'), goVideo: go('video'), goDoctrine: go('doctrine'),
      aboutCls: openSub === 'about' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "예배와 말씀 (로그인)"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16")}>
          <img src={asset("/_blob/72151afb0684f751baac66b3cb43fee2")} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover")} />
          <div style={css("position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,38,14,0.88) 0%, rgba(20,38,14,0.72) 100%)")} />
          <div className="util-bar" style={css("position: relative; display: flex; justify-content: flex-end; align-items: center; gap: 20px; padding: 14px 40px 0; font-size: 13px")}>
            <span style={css(`color: ${v.primary ?? ""}; font-weight: 600`)}>
              {"[이름]님 환영합니다"}
            </span>
            <A href="MemberMain.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"홈"}
            </A>
            <A href="#" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"정보수정"}
            </A>
            <A href="Main.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"로그아웃"}
            </A>
          </div>
          <header className="site-header" style={css("position: relative; z-index: 30; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 40px 0; flex-wrap: wrap")}>
            <A href="MemberMain.dc.html" style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF")}>
              <span style={css("display: flex; flex-direction: column; align-items: flex-start; gap: 5px")}>
                <img src={asset("/_blob/122f04b2c3721aa4a0194f5dc7c5de6e")} alt="예수원교회" style={css("height: 40px; width: auto; display: block")} />
                <span style={css("font-size: 11px; letter-spacing: 0.04em; opacity: 0.85")}>
                  {"Jesuwon Community Church (ARPC)"}
                </span>
              </span>
            </A>
            <nav className="nav-links" aria-label="주 메뉴" style={css("display: flex; gap: 30px; font-size: 17px; font-weight: 500")}>
              <div className="nav-item" style={css("position: relative")} onMouseLeave={v.closeSub}>
                <A href="About.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 교회안내 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <div className={`sub-group ${v.aboutCls ?? ""}`} onMouseEnter={v.openAbout}>
                      <A href="About.dc.html" aria-haspopup="true" style={css("display: flex; align-items: center; justify-content: space-between; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                        {" 예수원교회는 "}
                        <svg className="sub-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.25s")}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </A>
                      <div className="sub-list" style={css("background: #EEF6E3; border-radius: 10px; margin: 0 4px")}>
                        <A href="About.dc.html" style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
                          {"예수원 소개"}
                        </A>
                        <A href="About.dc.html" style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
                          {"목회관 & 구조"}
                        </A>
                        <A href="About.dc.html" style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
                          {"2세를 향한 비전"}
                        </A>
                        <A href="About.dc.html" style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
                          {"예수원의 신앙고백"}
                        </A>
                      </div>
                    </div>
                    <A href="#" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"예배 안내"}
                    </A>
                    <A href="Serve.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"섬기는 분들"}
                    </A>
                    <A href="MemberMain.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"찾아오시는 길"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="#" aria-current="page" aria-haspopup="true" style={css(`display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0; box-shadow: inset 0 -3px 0 ${v.primary ?? ""}`)}>
                  {" 예배와 말씀 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="#" onClick={v.goSermon} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"설교듣기"}
                    </A>
                    <A href="#" onClick={v.goColumn} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"예수원칼럼"}
                    </A>
                    <A href="#" onClick={v.goVideo} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"영상칼럼"}
                    </A>
                    <A href="#" onClick={v.goDoctrine} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"교리강좌"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="MemberMokjang.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 목장 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="MemberMokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"장년목장"}
                    </A>
                    <A href="MemberMokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"탄자니아초원"}
                    </A>
                    <A href="MemberMokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"인디오초원"}
                    </A>
                    <A href="MemberMokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"주일학교"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="MemberUfeedem.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" Ufeedem "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="MemberUfeedem.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"선교지 소식"}
                    </A>
                    <A href="MemberUfeedem.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"사랑의 나눔"}
                    </A>
                    <A href="MemberUfeedem.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"GST 신학교"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="Edu.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 교육과 훈련 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="Edu.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"예수원 새가족반"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="MemberRest.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 쉴만한 물가 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; right: 0; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="MemberRest.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"사진 앨범"}
                    </A>
                    <A href="MemberRest.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"동영상 앨범"}
                    </A>
                    <A href="MemberRest.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"예수원 게시판"}
                    </A>
                    <A href="MemberRest.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"교회소식"}
                    </A>
                  </div>
                </div>
              </div>
            </nav>
            <button className="nav-burger" aria-label="메뉴 열기" style={css("width: 44px; height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.5); background: transparent; color: #FFFFFF; align-items: center; justify-content: center; cursor: pointer")}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
          </header>
          <div style={css("position: relative; max-width: 1200px; margin: 0 auto; padding: 72px 40px 64px; box-sizing: border-box")}>
            <p style={css(`margin: 0 0 12px; font-size: 14px; letter-spacing: 0.14em; color: ${v.primary ?? ""}; font-weight: 700`)}>
              {v.eyebrow}
            </p>
            <h1 className="page-title" style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 48px; font-weight: 700")}>
              {v.pageTitle}
            </h1>
            <nav aria-label="현재 위치" style={css("display: flex; align-items: center; gap: 10px; margin-top: 18px; font-size: 14px; color: rgba(255,255,255,0.8)")}>
              <A href="MemberMain.dc.html" style={css("color: rgba(255,255,255,0.85); text-decoration: none")}>
                {"홈"}
              </A>
              <span aria-hidden="true">
                {"›"}
              </span>
              <span>
                {"예배와 말씀"}
              </span>
              <span aria-hidden="true">
                {"›"}
              </span>
              <span style={css("color: #FFFFFF; font-weight: 600")}>
                {v.pageTitle}
              </span>
            </nav>
          </div>
        </section>
        <div style={css("background: #FFFFFF; border-bottom: 1px solid #E1E8D6")}>
          <div role="tablist" aria-label="예배와 말씀" style={css("max-width: 1200px; margin: 0 auto; padding: 0 40px; box-sizing: border-box; display: flex; gap: 4px; overflow-x: auto")}>
            {(v.tabs || []).map((t, _i0) => (
              <React.Fragment key={_i0}>
                <button className="tab-btn" role="tab" aria-selected={t.selected} onClick={t.pick} style={css(t.style)}>
                  {t.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
        <main style={css("max-width: 1100px; margin: 0 auto; padding: 56px 40px 96px; box-sizing: border-box")}>
          {(v.hasDetail) ? (
            <>
            <article style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px; margin-bottom: 48px")}>
              {(v.d.hasSeries) ? (
                <>
                <span style={css(`display: inline-block; margin-bottom: 10px; font-size: 13px; font-weight: 700; color: #1B2516; background: ${v.primary ?? ""}; padding: 5px 12px; border-radius: 999px`)}>
                  {v.d.series}
                </span>
                </>
              ) : null}
              <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700; line-height: 1.35")}>
                {v.d.title}
              </h2>
              <div style={css("display: flex; gap: 18px; flex-wrap: wrap; margin-top: 12px; padding-bottom: 20px; border-bottom: 1px solid #EDF1E6; font-size: 14px; color: #56634F")}>
                {(v.d.meta || []).map((m, _i1) => (
                  <React.Fragment key={_i1}>
                    <span>
                      {m.k}{" "}
                      <b style={css("color: #1B2516; font-weight: 600")}>
                        {m.v}
                      </b>
                    </span>
                  </React.Fragment>
                ))}
              </div>
              {(v.d.isVideo) ? (
                <>
                <div style={css("margin-top: 28px; position: relative; aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; background: #14240E; display: flex; align-items: center; justify-content: center")}>
                  <div style={css("position: absolute; left: 20px; top: 18px; display: flex; flex-direction: column; color: #FFFFFF; line-height: 1.3")}>
                    <span style={css("font-size: 15px; font-weight: 600")}>
                      {v.d.videoTitle}
                    </span>
                    <span style={css("font-size: 12px; color: rgba(255,255,255,0.7)")}>
                      {v.d.channel}
                    </span>
                  </div>
                  <button aria-label="영상 재생" style={css("width: 80px; height: 80px; border-radius: 999px; border: none; background: #FFFFFF; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.35)")}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <span style={css("position: absolute; right: 18px; bottom: 14px; font-size: 13px; color: rgba(255,255,255,0.75)")}>
                    {"YouTube 영상 임베드"}
                  </span>
                </div>
                </>
              ) : null}
              {(v.d.isText) ? (
                <>
                <div style={css("margin-top: 28px; display: flex; flex-direction: column; gap: 16px; font-size: 16px; line-height: 1.95; color: #2E3A28")}>
                  {(v.d.paras || []).map((pa, _i2) => (
                    <React.Fragment key={_i2}>
                      <p style={css(pa.style)}>
                        {pa.text}
                      </p>
                    </React.Fragment>
                  ))}
                </div>
                </>
              ) : null}
              {(v.d.isEmpty) ? (
                <>
                <p style={css("margin: 28px 0 0; padding: 40px; text-align: center; background: #F6F9F1; border-radius: 14px; font-size: 15px; color: #56634F")}>
                  {"[칼럼 본문] 관리자 페이지에서 올린 글이 여기에 표시됩니다."}
                </p>
                </>
              ) : null}
              <div style={css("display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px")}>
                <button onClick={v.closeDetail} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 18px; border-radius: 10px; border: none; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </svg>
                  {" 목록 "}
                </button>
              </div>
              <section aria-label="댓글" style={css("margin-top: 32px; padding-top: 24px; border-top: 1px solid #EDF1E6")}>
                <h3 style={css("margin: 0 0 16px; font-size: 17px; font-weight: 700; display: flex; align-items: center; gap: 8px")}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3F7A1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
                  </svg>
                  {" 댓글 "}
                  <span style={css("color: #3F7A1C")}>
                    {v.commentCount}
                  </span>
                </h3>
                <div style={css("display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px")}>
                  {(v.comments || []).map((c, _i3) => (
                    <React.Fragment key={_i3}>
                      <div style={css("padding: 14px 16px; background: #F6F9F1; border-radius: 12px")}>
                        <div style={css("display: flex; gap: 10px; align-items: center; font-size: 13px; color: #56634F")}>
                          <b style={css("color: #1B2516; font-size: 14px")}>
                            {"[이름]"}
                          </b>
                          <span>
                            {"방금 전"}
                          </span>
                          {(c.secret) ? (
                            <>
                            <span style={css("display: inline-flex; align-items: center; gap: 4px; color: #8A6514; font-weight: 600")}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="5" y="11" width="14" height="10" rx="2" />
                                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                              </svg>
                              {" 비밀글 "}
                            </span>
                            </>
                          ) : null}
                        </div>
                        <p style={css("margin: 6px 0 0; font-size: 15px; line-height: 1.7; white-space: pre-line")}>
                          {c.text}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <form className="cmt" onSubmit={v.addComment} style={css("display: flex; flex-direction: column; gap: 10px")}>
                  <label htmlFor="cmt-text" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                    {"댓글 내용"}
                  </label>
                  <textarea id="cmt-text" rows="3" placeholder="댓글을 남겨주세요" value={v.draft ?? ''} onChange={v.onDraft} style={css("width: 100%; box-sizing: border-box; padding: 12px 14px; border: 1px solid #C9D3BC; border-radius: 12px; font-family: inherit; font-size: 15px; line-height: 1.6; resize: vertical")} />
                  <div style={css("display: flex; justify-content: flex-end; align-items: center; gap: 14px")}>
                    <label style={css("display: flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; min-height: 40px")}>
                      <input type="checkbox" checked={!!(v.secret) && v.secret !== 'false'} onChange={v.toggleSecret} style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                      {" 비밀글 "}
                    </label>
                    <button type="submit" style={css(`min-height: 44px; padding: 0 20px; border: none; border-radius: 10px; background: ${v.primary ?? ""}; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer`)}>
                      {"댓글입력"}
                    </button>
                  </div>
                </form>
              </section>
            </article>
            </>
          ) : null}
          <section>
            <div style={css("display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 20px")}>
              <div>
                <p style={css("margin: 0 0 6px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {v.eyebrow}
                </p>
                <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                  {v.pageTitle}
                </h2>
              </div>
              <div style={css("display: flex; gap: 8px; flex-wrap: wrap; align-items: center")}>
                {(v.isSermon) ? (
                  <>
                  <div className="series">
                    <label htmlFor="series-sel" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                      {"설교 시리즈"}
                    </label>
                    <select id="series-sel" value={v.series ?? ''} onChange={v.onSeries} style={css("min-height: 44px; padding: 0 36px 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; background: #FFFFFF; font-family: inherit; font-size: 15px; color: #1B2516; cursor: pointer")}>
                      {(v.seriesOpts || []).map((o, _i4) => (
                        <React.Fragment key={_i4}>
                          <option value={o.v}>
                            {o.v}
                          </option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                  </>
                ) : null}
                <form role="search" style={css("display: flex; align-items: center")} onSubmit={v.noSubmit}>
                  <label htmlFor="mw-search" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                    {"제목 검색"}
                  </label>
                  <div style={css("display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; width: 240px; max-width: 100%; box-sizing: border-box")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56634F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-3.5-3.5" />
                    </svg>
                    <input id="mw-search" type="search" placeholder="제목으로 검색" value={v.q ?? ''} onChange={v.onQ} style={css("flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-family: inherit; font-size: 15px; color: #1B2516")} />
                  </div>
                </form>
              </div>
            </div>
            <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
              {(v.rows || []).map((r, _i5) => (
                <React.Fragment key={_i5}>
                  <button className="row-btn" onClick={r.pick} style={css(r.style)}>
                    {(r.hasThumb) ? (
                      <>
                      <span className="col-hide" style={css("flex-shrink: 0; position: relative; width: 104px; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; background: #1F3B16; display: flex; align-items: center; justify-content: center")}>
                        <span style={css("width: 24px; height: 24px; border-radius: 999px; background: rgba(255,255,255,0.92); color: #1F3B16; display: flex; align-items: center; justify-content: center")}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                      </>
                    ) : null}
                    {(r.hasNo) ? (
                      <>
                      <span className="col-hide" style={css("flex-shrink: 0; width: 44px; text-align: center; font-size: 14px; color: #56634F")}>
                        {r.no}
                      </span>
                      </>
                    ) : null}
                    <span className="col-hide" style={css("flex-shrink: 0; width: 92px; font-size: 14px; color: #56634F")}>
                      {r.date}
                    </span>
                    <span style={css("flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; text-align: left")}>
                      <span className="row-title" style={css("font-size: 16px; font-weight: 500; color: #1B2516")}>
                        {r.title}
                      </span>
                      <span style={css("font-size: 13px; color: #56634F")}>
                        {r.sub}
                      </span>
                    </span>
                    {(r.hasYt) ? (
                      <>
                      <span style={css("flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #B42318; background: #FDECEA; padding: 4px 10px; border-radius: 999px")}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
                        </svg>
                        {" YouTube "}
                      </span>
                      </>
                    ) : null}
                  </button>
                </React.Fragment>
              ))}
              {(v.isEmpty) ? (
                <>
                <p style={css("margin: 0; padding: 48px 24px; text-align: center; font-size: 15px; color: #56634F")}>
                  {v.emptyText}
                </p>
                </>
              ) : null}
            </div>
            {(v.hasPages) ? (
              <>
              <nav aria-label="페이지" style={css("display: flex; justify-content: center; gap: 6px; margin-top: 24px; flex-wrap: wrap")}>
                {(v.pages || []).map((pg, _i6) => (
                  <React.Fragment key={_i6}>
                    <button className="page-btn" onClick={pg.pick} aria-current={pg.current} style={css(pg.style)}>
                      {pg.n}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
              </>
            ) : null}
          </section>
        </main>
        <footer style={css("background: #16220F; color: rgba(255,255,255,0.8); padding: 56px 40px 40px")}>
          <div style={css("max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px")}>
            <img src={asset("/_blob/122f04b2c3721aa4a0194f5dc7c5de6e")} alt="예수원교회" style={css("height: 34px; width: auto; align-self: flex-start; display: block")} />
            <span style={css("font-size: 14px; line-height: 1.8")}>
              {"Jesuwon Community Church in Philadelphia"}
              <br />
              {"220 Upland Avenue Horsham, PA 19044"}
              <br />
              {"Tel. 484-686-1232 · Email. jesuwonch@gmail.com"}
            </span>
          </div>
          <div style={css("max-width: 1200px; margin: 32px auto 0; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 13px; color: rgba(255,255,255,0.6)")}>
            {"Copyright © 2023- 예수원교회. All rights reserved."}
          </div>
        </footer>
      </div>
    </>
  );
}
