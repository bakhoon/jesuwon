'use client';
// 이 파일은 tools/convert-design.mjs 가 design/MemberUfeedem.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.tab-btn:hover{background:#EEF6E3}\n.row-btn{transition:background .15s}\n.row-btn:hover{background:#F3F8EC}\n.row-btn:hover .row-title{color:#2F5E17;text-decoration:underline}\n.page-btn:hover{background:#EEF6E3}\n.thumb-btn:hover{outline:2px solid #8BC34A}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.nav-item:hover .nav-dropdown a:nth-child(2){transition-delay:.04s}\n.nav-item:hover .nav-dropdown a:nth-child(3){transition-delay:.08s}\n.nav-item:hover .nav-dropdown a:nth-child(4){transition-delay:.12s}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list{transition:none !important}}\n@media (max-width: 860px){\n  .nav-links{display:none !important}\n  .nav-burger{display:flex !important}\n  .page-title{font-size:34px !important}\n  .col-writer,.col-no{display:none !important}\n}\n";

class Component extends DCLogic {
  renderVals() {
    const primary = this.props.primary ?? '#8BC34A';
    const st = this.state || {};
    const tab = st.tab || 'news';
    const sel = st.sel || null;
    const q = st.q || '';
    const page = st.page || 1;
    const slideIdx = st.slide || 0;
    const openSub = st.openSub || null;
    const B = '/_blob/';
    const W = '웹섬김…';

    const NEWS = [
      [192, '[말레이시아] 8월 선교편지', '08-15', { kind: 'letter', views: '36', datetime: '26-08-15 07:49' }],
      [191, '2026년 7월 [탄자니아] 선교보고', '07-25'],
      [190, '[멕시코] 2026년 5월 선교소식', '05-15'],
      [189, '2026년 5월 루호롤레 교회 소식 (2026. 05.13)', '05-13'],
      [188, '2026년 4월 투눙구루 목회자의 삶 (2026.04.26)', '04-30'],
      [187, '2026년 4월 [탄자니아] 복음의 중매를 하며...(20…', '04-15'],
      [186, '2026년 4월 GST 5기 도미니크 사역지 …', '04-06'],
      [185, '[뉴욕] 2025년 3월 홈리스 사역', '04-03'],
      [184, '루호롤레를 소망하며! (26. 03, 22)', '03-24'],
      [183, 'GST 5기 미케세 데비드 방문 (26.03.20)', '03-24'],
      [182, '2026년 3월 [탄자니아] 응게레응게레 교회부지 …', '03-24'],
      [181, '선교 영상 2026(스리랑카,말레이,청원)', '03-22'],
      [180, '2026년 2월 [탄자니아] 키부코, 응게레 소식', '02-16'],
      [179, '2026년 1월 [탄자니아] 소식(미송게니교회 완공…', '02-02'],
      [178, '[말레이시아] 1월 선교편지', '01-31'],
      [177, '2026년 1월 [탄자니아] 소식', '01-16']
    ];
    const GST = [
      [12, '미송게니 교회 헌당식(에릭 사역자(GST 2기)', '16:36', { kind: 'video', views: '7', datetime: '26-10-12 16:36', videoTitle: '미송게니 헌당예배', channel: 'Jesuwon Events' }],
      [11, '미케세 교회(데비드 사역자(GST 5기)', '10-11'],
      [10, '루호롤레 교회(이사야 사역자 (GST 4기)', '10-11'],
      [9, 'GST신학생(5기생)', '10-05'],
      [8, 'GST신학교 2기 & 3기 졸업생(2026년9월)', '10-04'],
      [7, 'ERC 교단 목사 안수자', '10-04'],
      [6, '탄자니아 선교(2026) 영상', '10-04'],
      [5, 'GST신학교 1기 졸업생(2025년9월)', '08-18'],
      [4, '탄자니아 선교(2025) 영상', '11-09'],
      [3, 'GST신학교 소개(2025)', '10-05', { kind: 'slides', views: '1,208', datetime: '24-10-05 16:33' }],
      [2, 'GST신학교 학사동 소개(2024)', '07-05'],
      [1, 'GST 신학교 소개(2024)', '01-11']
    ];
    const SLIDES = ['e0c6c1f444eaf8cd3175efd7dc73ee95','1466c7eeda8c557d72f2f7ed02d84acc','11e6a3fdef5bed9251f59133702e5970','97976f754d4b9cac3eea68bb8ebd0518','d7ff4fceea0258f170b837dea9b5dbc9','d04b68e326d39455587e7d2121fd6936','cb19d2d1dff9133f5977eada89f9e180','b3e708b7ed31ac1835ba5a2be7b3012e','d6c7138e1790ab140fc11fb9cde99b37','cc3a56fc3c8c58027d5b336c4fd4d1e9','bb19b066067f929665111bc1194d5983','83ad856d6663c29e8859051a88ffbf71','d979b7e30675c1995107b22cbdadbb78','188a2cb5088e807c45a9bfdad3c21e82','7ca72a1fa139147ea8467ac981315cc7','6879316226ddf0eed9756963b5e5a0c8','586fec974d2225c7109ea07cbdeb3809','4050ea9e9fb7fb69bc9606576fcff2ca','79d9e02ce851591341d41e7487d0f11a'];

    const LETTER = {
      paras: [
        '샬롬! 안녕하세요. 예수원교회 윤성종 목사님 그리고 사랑하는 성도 여러분 모두 주님 안에서 평안하시지요. 저희도 여러분들의 기도에 힘입어 건강하게 선교의 사역을 잘 감당하고 있습니다. 감사합니다.',
        '요즘 이곳 말레이시아에서는 정부의 난민정책으로 인하여 많은 난민들이 어려움을 격고 있습니다. 난민 이민자들에 대한 대대적인 단속으로 인하여 UNHCR로부터 아직 난민카드를 발급받지 못한 많은 난민들과 난민카드를 발급받고 소지하고 있는 난민들까지도 대상이 되어 단속하고 있어 두려워하고 있지만 그럼에도 불구하고 매일 매일의 주어진 삶속에서 최선을 다하며 맡은 자리에서 하나님께 감사하는 삶을 살아가고 있습니다.',
        '말레이시아 정부가 난민에 대하여 단속은 지속적으로 해 왔지만 요즘처럼 막무가네식의 단속은 아니었는데 요즘은 좀 심하다 싶을 정도로 단속을 하고 있습니다. 말레이시아 정부가 좀 난민들에대하여 유화 정책을 쓰기를 기도하며 바라봅니다.',
        '그리고 우리학교 교장 보스코 선생의 미얀마에 남아있던 가족, 부모님과 막내 여동생이 집을 지키며 살고 있었으나 핍박이 너무 심하여 아들이 있는 이곳 말레이시아로 오기 위하여 준비중이며 이곳 학교 근처에 집을 얻어 부모님과 형제들이 함께 살게 될 것입니다. 너무 기쁘고 좋은 소식이지요.',
        '저희가 2층 임대를 간절히 원했지만 결국 건물 주인으로부터 2층 거주자들이 계속 있기를 원해서 우리에게 임대를 줄 수 없다는 통보를 받았습니다. 아쉽지만 받아 들여야지요. 그래서 학교 주변에 건물을 찾아보고 있는데 빈 공간이 있는 곳 찾기가 쉽지 않네요. 하지만 히나님께서 예비하신 좋은 건물 좋은 공간이 있을 것이라 믿고 기도하며 찾고 있습니다.',
        '그리고 K-2B 반을 담임하던 마보이 선생님이 아주 짧은 기다림만에(1년8개월) 호주 입국비자를 취득하여 8월21일 학교 수업을 마지막으로 퇴직하고 9월1일 호주로 출국하게 되었습니다. 축하할 일이지요.',
        '여러분들과 함께 기도하기 위하여 기도의 제목을 나눕니다.'
      ],
      prayers: [
        '말레이시아 난민정책에 대하여 말레이시아 정부가 난민들에게 유화정책을 펼칠 수 있기를 위해',
        '이곳 말레이시아로 오기 위하여 현재 진행중인 LEC 학교 보스코 선생의 부모와 여동생의 안전한 말레이시아 입국을 위해',
        'LEC 학교의 2026년 9월 다음학기의 계획을 위해 [현재 방과후 오후 특별실기반 현재 4개반(컴퓨터 교습2,기타 교습2)에서 9월 다음 학기부터 9개반: (학교내에서 5개반 : 컴퓨터, 기타, 피아노, 줌바댄스, 음악이론), 현지중국교회에서 4개반: (네일, 제빵, 헤어, 만다린)으로 계획한 대로 잘 실행되기 위해]',
        '내년 2027년 새롭게 등록하는 학생들의 증원으로 인하여 LEC 난민학교 확장을 위해 가까운 곳에 학교 교실로 사용할 수 있는 좋은 조건의 건물의 임대를 위해',
        '호주 입국비자를 취득하여 9월1일 호주로 출국하는 K-2B 마보이 선생님의 호주에서의 새로운 삶을 성령께서 인도하셔서 저의 삶을 통하여 주님의 영광을 나타내게 해 줄것을 위해.',
        'K2-B를 담당할 새 선생님을 성령이 충만하여 주님의 주시는 마음으로 아이들을 사랑으로 섬기며 케어할 수 있는 선생님의 임용을 위해',
        'LEC 학교 270 여명의 학생들과 선생님들과 주방직원과 저희 부부의 영육간의 강건함을 위해 기도 부탁드립니다.'
      ],
      closing: '예수원 교회 윤성종 목사님 그리고 성도 여러분, 주님의 은혜안에서 항상 강건하시고 행복하세요.',
      sign: '2026년 8월15일 · 말레이시아에서 김성언, 조진현 선교사 올림'
    };

    const META = {
      news: { label: '선교지 소식', eyebrow: 'MISSION NEWS', data: NEWS, pages: 10 },
      love: { label: '사랑의 나눔', eyebrow: 'SHARING LOVE' },
      gst: { label: 'GST 신학교', eyebrow: 'GRACE SCHOOL OF THEOLOGY', data: GST, pages: 1 }
    };
    const m = META[tab];
    const isBoard = tab !== 'love';

    const toTop = () => { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {} };
    const go = (id) => (e) => {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ tab: id, sel: null, q: '', page: 1, slide: 0, openSub: null });
    };
    const base = 'flex-shrink: 0; min-height: 56px; padding: 0 22px; border: none; background: transparent; font-family: inherit; font-size: 16px; cursor: pointer; white-space: nowrap;';
    const tabs = ['news', 'love', 'gst'].map((id) => {
      const on = id === tab;
      return {
        label: META[id].label,
        selected: on ? 'true' : 'false',
        style: base + (on ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 ' + primary + ';' : ' color: #56634F; font-weight: 500;'),
        pick: go(id)
      };
    });

    let rows = [];
    let isEmpty = false;
    let post = { title: '', writer: '', views: '', datetime: '', isLetter: false, isVideo: false, isSlides: false, isEmpty: false, paras: [], prayers: [], closing: '', sign: '', videoTitle: '', channel: '' };
    const rowBase = 'width: 100%; display: flex; align-items: center; gap: 16px; padding: 15px 20px; border: none; border-top: 1px solid #EDF1E6; font-family: inherit; cursor: pointer; text-align: left;';

    if (isBoard) {
      const data = m.data;
      if (page === 1) {
        const needle = q.trim().toLowerCase();
        const list = needle ? data.filter((r) => r[1].toLowerCase().includes(needle)) : data;
        rows = list.map((r) => ({
          no: String(r[0]), title: r[1], writer: W, date: r[2],
          style: rowBase + (sel === r[0] ? ' background: #EEF6E3;' : ' background: transparent;'),
          pick: () => { this.setState({ sel: r[0], slide: 0 }); toTop(); }
        }));
        isEmpty = rows.length === 0;
      } else {
        const startNo = data[data.length - 1][0] - 1 - (page - 2) * data.length;
        rows = [0, 1, 2].map((k) => ({
          no: String(startNo - k), title: '[' + page + '페이지 게시글 제목]', writer: W, date: '--',
          style: rowBase + ' background: transparent;',
          pick: () => { this.setState({ sel: startNo - k }); toTop(); }
        }));
      }
      if (sel !== null) {
        const found = data.find((r) => r[0] === sel);
        const extra = found && found[3] ? found[3] : null;
        post = {
          ...post,
          title: found ? found[1] : '[게시글 제목]',
          writer: W,
          views: extra ? extra.views : '0',
          datetime: extra ? extra.datetime : (found ? found[2] : '--'),
          isLetter: !!extra && extra.kind === 'letter',
          isVideo: !!extra && extra.kind === 'video',
          isSlides: !!extra && extra.kind === 'slides',
          isEmpty: !extra,
          videoTitle: extra && extra.videoTitle ? extra.videoTitle : '',
          channel: extra && extra.channel ? extra.channel : ''
        };
        if (post.isLetter) {
          post.paras = LETTER.paras.map((t) => ({ text: t }));
          post.prayers = LETTER.prayers.map((t) => ({ text: t }));
          post.closing = LETTER.closing;
          post.sign = LETTER.sign;
        }
      }
    }

    const nS = SLIDES.length;
    const si = ((slideIdx % nS) + nS) % nS;
    const slide = { img: B + SLIDES[si], alt: 'GST신학교 소개 슬라이드 ' + (si + 1), pos: (si + 1) + ' / ' + nS };
    const thumbs = SLIDES.map((id, k) => ({
      img: B + id, label: (k + 1) + '번 슬라이드', alt: 'GST신학교 소개 ' + (k + 1) + '번째 이미지',
      style: 'flex-shrink: 0; width: 96px; aspect-ratio: 16 / 9; padding: 0; border-radius: 8px; overflow: hidden; cursor: pointer; background: #DDE7D0; border: ' + (k === si ? '3px solid ' + primary : '1px solid #D3DCC6') + ';',
      pick: () => this.setState({ slide: k })
    }));

    const nPages = isBoard ? m.pages : 1;
    const pages = Array.from({ length: nPages }, (_, k) => {
      const n = k + 1; const on = n === page;
      return {
        n: String(n), current: on ? 'page' : 'false',
        style: 'min-width: 44px; height: 44px; border-radius: 10px; font-family: inherit; font-size: 15px; cursor: pointer; ' + (on ? 'border: none; background: #1F3B16; color: #FFFFFF; font-weight: 700;' : 'border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516;'),
        pick: () => this.setState({ page: n, sel: null })
      };
    });

    return {
      primary,
      tabs,
      eyebrow: m.eyebrow,
      pageTitle: m.label,
      isBoard,
      isLove: tab === 'love',
      rows,
      isEmpty,
      q,
      hasPost: isBoard && sel !== null,
      post,
      slide,
      thumbs,
      slidePrev: () => this.setState({ slide: si - 1 }),
      slideNext: () => this.setState({ slide: si + 1 }),
      closePost: () => this.setState({ sel: null }),
      onQ: (e) => this.setState({ q: e.target.value, page: 1 }),
      noSubmit: (e) => { if (e && e.preventDefault) e.preventDefault(); },
      hasPages: nPages > 1,
      pages,
      goNews: go('news'),
      goLove: go('love'),
      goGst: go('gst'),
      aboutCls: openSub === 'about' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "[로그인] Ufeedem"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16")}>
          <img src={asset("/_blob/cae33ee39b332afcd29250f7aa418fa4")} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 40%")} />
          <div style={css("position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,38,14,0.88) 0%, rgba(20,38,14,0.70) 100%)")} />
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
                <A href="MemberWords.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 예배와 말씀 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="MemberWords.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"설교듣기"}
                    </A>
                    <A href="MemberWords.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"예수원칼럼"}
                    </A>
                    <A href="MemberWords.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"영상칼럼"}
                    </A>
                    <A href="MemberWords.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
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
                <A href="#" aria-current="page" aria-haspopup="true" style={css(`display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0; box-shadow: inset 0 -3px 0 ${v.primary ?? ""}`)}>
                  {" Ufeedem "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="#" onClick={v.goNews} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"선교지 소식"}
                    </A>
                    <A href="#" onClick={v.goLove} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"사랑의 나눔"}
                    </A>
                    <A href="#" onClick={v.goGst} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
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
                {"Ufeedem"}
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
          <div role="tablist" aria-label="Ufeedem" style={css("max-width: 1200px; margin: 0 auto; padding: 0 40px; box-sizing: border-box; display: flex; gap: 4px; overflow-x: auto")}>
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
          {(v.isBoard) ? (
            <>
            <div>
              {(v.hasPost) ? (
                <>
                <article style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px; margin-bottom: 48px")}>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700; line-height: 1.35")}>
                    {v.post.title}
                  </h2>
                  <div style={css("display: flex; gap: 18px; flex-wrap: wrap; margin-top: 12px; padding-bottom: 20px; border-bottom: 1px solid #EDF1E6; font-size: 14px; color: #56634F")}>
                    <span>
                      {"작성자 "}{v.post.writer}
                    </span>
                    <span>
                      {"조회 "}{v.post.views}
                    </span>
                    <span>
                      {v.post.datetime}
                    </span>
                  </div>
                  {(v.post.isLetter) ? (
                    <>
                    <div style={css("margin-top: 28px; display: flex; flex-direction: column; gap: 14px; font-size: 16px; line-height: 1.9; color: #2E3A28")}>
                      {(v.post.paras || []).map((pa, _i1) => (
                        <React.Fragment key={_i1}>
                          <p style={css("margin: 0")}>
                            {pa.text}
                          </p>
                        </React.Fragment>
                      ))}
                      <div style={css("margin-top: 8px; background: #EEF6E3; border-radius: 16px; padding: 24px 28px")}>
                        <p style={css("margin: 0 0 12px; font-size: 15px; font-weight: 700; color: #2F5E17")}>
                          {"기도 제목"}
                        </p>
                        <ul style={css("margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 8px")}>
                          {(v.post.prayers || []).map((pr, _i2) => (
                            <React.Fragment key={_i2}>
                              <li>
                                {pr.text}
                              </li>
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                      <p style={css("margin: 8px 0 0")}>
                        {v.post.closing}
                      </p>
                      <p style={css("margin: 0; text-align: right; font-weight: 600")}>
                        {v.post.sign}
                      </p>
                    </div>
                    </>
                  ) : null}
                  {(v.post.isVideo) ? (
                    <>
                    <div style={css("margin-top: 28px; position: relative; aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; background: #14240E; display: flex; align-items: center; justify-content: center")}>
                      <div style={css("position: absolute; left: 20px; top: 18px; display: flex; flex-direction: column; color: #FFFFFF; line-height: 1.3")}>
                        <span style={css("font-size: 15px; font-weight: 600")}>
                          {v.post.videoTitle}
                        </span>
                        <span style={css("font-size: 12px; color: rgba(255,255,255,0.7)")}>
                          {v.post.channel}
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
                  {(v.post.isSlides) ? (
                    <>
                    <div style={css("margin-top: 28px; display: flex; flex-direction: column; gap: 16px")}>
                      {(v.thumbs || []).map((th, _i3) => (
                        <React.Fragment key={_i3}>
                          <img src={asset(th.img)} alt={th.alt} style={css("width: 100%; display: block; border-radius: 12px; background: #EEF1EA")} />
                        </React.Fragment>
                      ))}
                    </div>
                    </>
                  ) : null}
                  {(v.post.isEmpty) ? (
                    <>
                    <p style={css("margin: 28px 0 0; padding: 40px; text-align: center; background: #F6F9F1; border-radius: 14px; font-size: 15px; color: #56634F")}>
                      {"[게시글 본문] 관리자 페이지에서 올린 글과 사진이 여기에 표시됩니다."}
                    </p>
                    </>
                  ) : null}
                  <div style={css("display: flex; justify-content: flex-end; margin-top: 28px")}>
                    <button onClick={v.closePost} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 18px; border-radius: 10px; border: none; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 6h16" />
                        <path d="M4 12h16" />
                        <path d="M4 18h16" />
                      </svg>
                      {" 목록 "}
                    </button>
                  </div>
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
                  <form role="search" style={css("display: flex; align-items: center")} onSubmit={v.noSubmit}>
                    <label htmlFor="board-search" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                      {"제목 검색"}
                    </label>
                    <div style={css("display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; width: 260px; max-width: 100%; box-sizing: border-box")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56634F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-3.5-3.5" />
                      </svg>
                      <input id="board-search" type="search" placeholder="제목으로 검색" value={v.q ?? ''} onChange={v.onQ} style={css("flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-family: inherit; font-size: 15px; color: #1B2516")} />
                    </div>
                  </form>
                </div>
                <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
                  <div aria-hidden="true" style={css("display: flex; align-items: center; gap: 16px; padding: 12px 20px; background: #F3F6EE; font-size: 13px; font-weight: 600; color: #56634F")}>
                    <span className="col-no" style={css("flex-shrink: 0; width: 44px; text-align: center")}>
                      {"번호"}
                    </span>
                    <span style={css("flex: 1")}>
                      {"제목"}
                    </span>
                    <span className="col-writer" style={css("flex-shrink: 0; width: 80px")}>
                      {"글쓴이"}
                    </span>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: right")}>
                      {"날짜"}
                    </span>
                  </div>
                  {(v.rows || []).map((r, _i4) => (
                    <React.Fragment key={_i4}>
                      <button className="row-btn" onClick={r.pick} style={css(r.style)}>
                        <span className="col-no" style={css("flex-shrink: 0; width: 44px; text-align: center; font-size: 14px; color: #56634F")}>
                          {r.no}
                        </span>
                        <span className="row-title" style={css("flex: 1; min-width: 0; font-size: 16px; color: #1B2516; text-align: left")}>
                          {r.title}
                        </span>
                        <span className="col-writer" style={css("flex-shrink: 0; width: 80px; font-size: 14px; color: #56634F; text-align: left")}>
                          {r.writer}
                        </span>
                        <span style={css("flex-shrink: 0; width: 56px; font-size: 14px; color: #56634F; text-align: right")}>
                          {r.date}
                        </span>
                      </button>
                    </React.Fragment>
                  ))}
                  {(v.isEmpty) ? (
                    <>
                    <p style={css("margin: 0; padding: 48px 24px; text-align: center; font-size: 15px; color: #56634F")}>
                      {"\""}{v.q}{"\"에 맞는 글이 없어요."}
                    </p>
                    </>
                  ) : null}
                </div>
                {(v.hasPages) ? (
                  <>
                  <nav aria-label="페이지" style={css("display: flex; justify-content: center; gap: 6px; margin-top: 24px; flex-wrap: wrap")}>
                    {(v.pages || []).map((pg, _i5) => (
                      <React.Fragment key={_i5}>
                        <button className="page-btn" onClick={pg.pick} aria-current={pg.current} style={css(pg.style)}>
                          {pg.n}
                        </button>
                      </React.Fragment>
                    ))}
                  </nav>
                  </>
                ) : null}
              </section>
            </div>
            </>
          ) : null}
          {(v.isLove) ? (
            <>
            <div style={css("display: flex; flex-direction: column; gap: 88px")}>
              <section>
                <div style={css("display: flex; gap: 40px; flex-wrap: wrap; align-items: center")}>
                  <div style={css("flex: 3 1 460px; min-width: 0")}>
                    <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.18em; color: #3F7A1C; font-weight: 700")}>
                      {"TANZANIA"}
                    </p>
                    <h2 style={css("margin: 0 0 18px; font-family: 'Gowun Batang', serif; font-size: 32px; font-weight: 700")}>
                      {"은도토 사역"}
                    </h2>
                    <div style={css("display: flex; flex-direction: column; gap: 14px; font-size: 16px; line-height: 1.9; color: #2E3A28")}>
                      <p style={css("margin: 0")}>
                        {"‘은도토’란 키스와힐리어로 ‘"}
                        <b style={css("color: #1F3B16; box-shadow: inset 0 -9px 0 rgba(139,195,74,0.35)")}>
                          {"꿈"}
                        </b>
                        {"’을 뜻합니다. 은도토사역이란 탄자니아 모로고로 팡가웨 마을에 세워진 은혜 공동체 교회의 어린 학생들을 위한 특별 프로그램을 말합니다. 무슬림 지역에서 교회를 통하여 개종한 중학교 학생들 가운데 성품, 학습 능력, 헌신도 그리고 가정 형편을 고려하여 선발됩니다."}
                      </p>
                      <p style={css("margin: 0")}>
                        {"현재 24명의 학생이 선발되어 공동체 안에 마련된 기숙사에서 생활합니다. 철저한 기독교 신앙 교육을 바탕으로, 학비와 숙식비는 물론 생활비까지 전액 지원하고 있습니다. 또한, 인근지역의 중학교 입학 대상자들, 200여명의 학생들에게 매년 교복을 지원하고 있습니다."}
                      </p>
                      <p style={css("margin: 0")}>
                        {"그리스도 안에서 개인과 가족과 마을을 넘어 탄자니아에 필요한 그리스도인 인재들로서 성장하길 바라며 기도하는 마음으로 후원하고 있습니다. 또한 이외에도 원주민 마을 주민들을 위하여 매트리스, 모기장, 기타 생활에 필요한 물품들을 후원하고 있습니다."}
                      </p>
                    </div>
                  </div>
                  <div style={css("flex: 2 1 280px; min-width: 0; display: flex; justify-content: center")}>
                    <img src={asset("/_blob/8c5f1e4bbd33a423b03536cf1f3d75ab")} alt="탄자니아 지도" style={css("width: 100%; max-width: 360px; display: block")} />
                  </div>
                </div>
                <h3 style={css("margin: 48px 0 20px; font-size: 22px; font-weight: 700")}>
                  {"탄자니아 은도토 후원자녀들"}
                </h3>
                <div style={css("display: flex; flex-direction: column; gap: 32px")}>
                  <figure style={css("margin: 0; background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
                    <img src={asset("/_blob/1176cc3f93f8be5b8ee008061107f5f5")} alt="2024년 은도토 후원 자녀들" style={css("width: 100%; display: block")} />
{" "}
                  </figure>
                  <figure style={css("margin: 0; background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
                    <img src={asset("/_blob/3af5d54dc6f679850b46c390f1cae405")} alt="2021년 은도토 후원 자녀들" style={css("width: 100%; display: block")} />
{" "}
                  </figure>
                  <figure style={css("margin: 0; background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
                    <img src={asset("/_blob/e515fe91a6e4c148ac925b1f57152e20")} alt="2017년 은도토 입학기념" style={css("width: 100%; display: block")} />
{" "}
                  </figure>
                </div>
              </section>
              <section style={css("display: flex; gap: 40px; flex-wrap: wrap; align-items: center")}>
                <div style={css("flex: 1 1 420px; min-width: 0; border-radius: 20px; overflow: hidden; background: #DDE7D0")}>
                  <img src={asset("/_blob/fd5b0de69120d0ff8ef46e05eacd2635")} alt="두유를 마시는 북한 어린이들" style={css("width: 100%; display: block")} />
                </div>
                <div style={css("flex: 1 1 400px; min-width: 0")}>
                  <div style={css("display: flex; align-items: flex-start; justify-content: space-between; gap: 16px")}>
                    <div>
                      <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.18em; color: #3F7A1C; font-weight: 700")}>
                        {"NORTH KOREA"}
                      </p>
                      <h2 style={css("margin: 0 0 18px; font-family: 'Gowun Batang', serif; font-size: 32px; font-weight: 700")}>
                        {"퍼스트 스텝스"}
                      </h2>
                    </div>
                    <img src={asset("/_blob/cbcd76f375502c5eed59bdcb0d55e705")} alt="북한 지도" style={css("width: 90px; flex-shrink: 0; display: block")} />
                  </div>
                  <div style={css("display: flex; flex-direction: column; gap: 14px; font-size: 16px; line-height: 1.9; color: #2E3A28")}>
                    <p style={css("margin: 0")}>
                      {"식량난으로 영양실조에 빠진 북한 영아들을 돕기 위한 캐나다에 있는 퍼스트스텝스(First Steps)의 사업에 교회가 동참하여 후원하고 있습니다."}
                    </p>
                    <p style={css("margin: 0")}>
                      {"퍼스트 스텝스는 남포와 원산에 설치한 두유 생산 시설(VitaCow)을 통해 총 5천명의 고아원과 탁아소 어린이들이 매일 두유를 섭취하고 있습니다. 이 일을 통하여 북한 땅에 그리스도의 계절이 오기를 간절히 기대하는 마음으로 기도하며 후원하고 있습니다."}
                    </p>
                  </div>
                </div>
              </section>
              <section style={css("display: flex; gap: 40px; flex-wrap: wrap-reverse; align-items: center")}>
                <div style={css("flex: 1 1 400px; min-width: 0")}>
                  <div style={css("display: flex; align-items: flex-start; justify-content: space-between; gap: 16px")}>
                    <div>
                      <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.18em; color: #3F7A1C; font-weight: 700")}>
                        {"NEW YORK CITY"}
                      </p>
                      <h2 style={css("margin: 0 0 18px; font-family: 'Gowun Batang', serif; font-size: 32px; font-weight: 700")}>
                        {"Spanish 홈리스 사역"}
                      </h2>
                    </div>
                    <img src={asset("/_blob/e4b2fe7f9d1106d8614accf580e6439a")} alt="뉴욕시 지도" style={css("width: 90px; flex-shrink: 0; display: block")} />
                  </div>
                  <div style={css("display: flex; flex-direction: column; gap: 14px; font-size: 16px; line-height: 1.9; color: #2E3A28")}>
                    <p style={css("margin: 0")}>
                      {"뉴욕 열방선교교회(방봉균 목사)의 Spanish 홈리스 사역을 후원하고 있습니다. 뉴욕 Spanish 홈리스 사역은 플러싱, 뉴욕 및 인근 지역에 스페니쉬어권 홈리스 및 일용직 노무자를 대상으로 매주 수요일 거리의 형제들에게 교회에서 예배와 점심식사를 제공하고 있습니다."}
                    </p>
                    <p style={css("margin: 0")}>
                      {"또한, 매주 토요일 아침엔 빵과 커피를 나누고 있으며, 집이 없는 분들을 찾아 생필품과 음식을 나누고, 복음을 전하는 귀한 사역을 후원하고 있습니다."}
                    </p>
                  </div>
                </div>
                <div style={css("flex: 1 1 420px; min-width: 0; border-radius: 20px; overflow: hidden; background: #DDE7D0")}>
                  <img src={asset("/_blob/9b24020f73e1840ef5b5de8d152013da")} alt="뉴욕 거리에서 음식을 나누기 위해 줄을 선 사람들" style={css("width: 100%; display: block")} />
                </div>
              </section>
            </div>
            </>
          ) : null}
        </main>
        <footer style={css("background: #16220F; color: rgba(255,255,255,0.8); padding: 56px 40px 40px")}>
          <div style={css("max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px")}>
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
