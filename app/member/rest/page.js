'use client';
// 이 파일은 tools/convert-design.mjs 가 design/MemberRest.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.tab-btn:hover{background:#EEF6E3}\n.row-btn{transition:background .15s}\n.row-btn:hover{background:#F3F8EC}\n.row-btn:hover .row-title{color:#2F5E17;text-decoration:underline}\n.page-btn:hover{background:#EEF6E3}\n.vid-row:hover .row-title,.brd-row:hover .row-title{color:#2F5E17;text-decoration:underline}\n.file-link:hover{text-decoration:underline}\n.cmt textarea:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.yt-play{transition:transform .2s ease}\n.yt-slot:hover .yt-play{transform:scale(1.08)}\n.album-btn img{transition:transform .4s ease}\n.album-btn:hover img{transform:scale(1.04)}\n.album-btn:hover .album-title{color:#2F5E17}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.nav-item:hover .nav-dropdown a:nth-child(2){transition-delay:.04s}\n.nav-item:hover .nav-dropdown a:nth-child(3){transition-delay:.08s}\n.nav-item:hover .nav-dropdown a:nth-child(4){transition-delay:.12s}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list,.album-btn img{transition:none !important}}\n@media (max-width: 860px){\n  .nav-links{display:none !important}\n  .nav-burger{display:flex !important}\n  .page-title{font-size:34px !important}\n  .col-writer,.col-no,.col-ref{display:none !important}\n  .vid-thumb{width:88px !important}\n}\n";

class Component extends DCLogic {
  renderVals() {
    const primary = this.props.primary ?? '#8BC34A';
    const st = this.state || {};
    const tab = st.tab || 'album';
    const sel = st.sel === undefined ? null : st.sel;
    const q = st.q || '';
    const page = st.page || 1;
    const openSub = st.openSub || null;
    const B = '/_blob/';

    const ALBUMS = [
      ['1af25c64d7ad7ee9bae88ac8793b59e8', '탄자니아 선교(2026) #2', { datetime: '26-10-09 18:51', views: '36', photos: ['38aea8af91f2e1d0a6d925b4f3e7622f','4851ae1c2728b7e8a79c1422e6cd138e','65710ebc2dc363d8d17330a78fd8302c','56c8162bab07f56251b40b8ae69b3fda','7d74adc9f2cc73e3f0eff736d7a675ff','942b359aa46be59c2c4d80db8a6a77b0','7212e7db0e8dece81c3760bb2c4e2af1','74e55f6ef5d9537b6789409e0816e912','18703653a3ba6fd0f012026169547e21'] }],
      ['3479f231d337da609d14e8d7d941269a', '탄자니아 선교(2026) #1'],
      ['0348195d39ec8d2bab8dfc57f93e5c42', '본당 의자 수리'],
      ['494a69a8e49b1b1f85768032d076e1e6', '금요 목장연합 기도회(9월)'],
      ['123507d20e723fa48acbbbe83814284f', '2026 탄자니아 선교팀'],
      ['523eb9f89f4026f0edf29f0b3046f648', '싸포판 목장'],
      ['84362616dfc60110980f8195a823a4b0', '목자목우수양회(Baltimore)'],
      ['3070e8010272e1554ec889aacaf15be1', '패밀리워쉽(2026.9)'],
      ['64f91d375a69d6db110fbe1400835471', '위촐 목장'],
      ['e33fafc038121ac64386ebaac161efc5', '생명의 삶 33기'],
      ['7bde5f5625ff1bf3d6f37306b37600ed', '팡가웨 목장(예비목자투표)'],
      ['a2beeae0fcf158c42f5377a68f2ccf91', '키징가 목장(예비목자투표)'],
      ['301ccda27b5e744b0ccad890a910ba83', '바카무나 목장'],
      ['0839cb59a7c4f09509854acedb867a54', '선교사님들과 함께 한 주일 예배'],
      ['06dd8f24208c9da17e104839d17caa18', '목자 파송식 (2026. 07. 12)'],
      ['4931d5a66b0bff402e01906a07c69f06', '과달라목장 MT (2026.6)']
    ];
    const draft = st.draft || '';
    const secret = !!st.secret;
    const allComments = st.comments || {};
    const VIDEOS = [
      ['11efc95392d37fbb5abd459544515cbd', '탄자니아 선교(2026) 영상(루호롤레)'],
      ['b0bc77c82f72d3d9fae8ea63414d162a', '탄자니아 선교영상(미케세 교회)'],
      ['c3a5d425b113887eaf70fb80c71d6195', '탄자니아 선교(2026) 영상'],
      ['71162c328257b0113a6c9623ca3af7ea', '파송식2026(이성한,조민구)'],
      ['57f7d92eda4724ddd278b8bcd4d986b8', '세례식(2026.4)'],
      ['793af27fb4dadb50b5a9454cbe92a127', '주일학교 캠프2026'],
      ['2a5eb312bb208eb70de67b44a21cd9d4', '임직식(안수집사,권사 2026.5)'],
      ['14ba03ef7bbe92fa31837cc4f8058ad4', '선교2026(스리랑카,말레이,청원)'],
      ['95f534d92b656694d1f28a43d85c906f', '2025 성탄발표회(인디오 2팀)'],
      ['9bc0ccbe8ee81b03a7a8400211a9be7d', '2025 성탄발표회(스리랑카,멕시코,위촐 목장)'],
      ['efefaceb273bbd8b8917b81150c4b391', '2025 성탄발표회(키징가,모로고로 목장)'],
      ['e9bceb1542e9bd9fa6ac9aaaeb3f7b2f', '2025 성탄발표회(초등부 남자)'],
      ['3547a27f154d42efbda5c5adcaf3a505', '2025 성탄발표회(초등여자부)'],
      ['58700c5622feeac9091bff17438f3410', '2025 성탄발표회(인디오 1팀)'],
      ['6398c2b494fea9a83bf814accfa9c279', '2025 성탄발표회(깜바라니,GST 목장)'],
      ['4e17ae788de5b709034d46b0a8d2efb1', '2025 성탄발표회(마사이,사포판)']
    ];
    const BOARD = [
      [27, '2026 탄자니아 선교 안내 소책자', '웹섬김…', '09-13', { views: '2', datetime: '26-09-13 05:26', files: [['소책자(선교안내서new).docx', '5.4M · 다운로드 0회 · 2026-09-13 05:26:17'], ['소책자(선교안내서new).pdf', '818.4K · 다운로드 0회 · 2026-09-13 05:26:17']] }],
      [26, '2026 가을철 성경통독대회 체크 리스트(영어, 한글)', '웹섬김…', '08-13'],
      [25, '예수원 교회 소개 전문(2024)', '웹섬김…', '05-08'],
      [24, '2026 봄철 성경통독대회 체크 리스트(영어)', '웹섬김…', '02-10'],
      [23, '2026 봄철 성경통독대회 체크 리스트(한글)', '웹섬김…', '02-10'],
      [22, '2025 가을철 성경통독대회 체크리스트(영어, 한글)', '웹섬김…', '03-07'],
      [21, '2023 가을철 성경통독대회 체크리스트(은도토)', '예수원', '08-16'],
      [20, '2023 가을철 성경통독대회 체크 리스트(장년)', '예수원', '08-16'],
      [19, '2023 가을철 성경 통독 대회', '예수원', '08-16'],
      [18, '2023 가을철 성경통독대회 체크리스트(장년)', '예수원', '08-15'],
      [17, '2023 가을철 성경 통독대회 체크리스트(은도토)', '예수원', '08-15'],
      [16, '2023 가을철 성경통독 대회 체크리스트(미얀마)', '예수원', '08-15'],
      [15, '2022 가을철 신,구약 성경 통독 대회', '웹관리…', '08-15'],
      [14, '2022년 봄철, 신구약 성경 통독 대회 (장년,청년)', '웹관리…', '02-24'],
      [13, '2021 가을철 신구약 성경통독대회 체크 리스트', '웹관리…', '08-23'],
      [12, '2021 가을철 신구약 성경통독대회 체크 리스트', '웹관리…', '08-23']
    ];
    const NEWS = [
      [338, '10-11-2026 교회 소식', '10-10', {
        views: '53', datetime: '26-10-10 03:45',
        headline: '# 동행(DVD, DH, NDT, NYH, VOM, MC, OM), GST & 선교후원: 주님의 사랑을 실천합시다(매월 3째 주, Oct 24/25)',
        items: [
          ['목장별 911운동 오픈(D69)', '기간: 9월 6일(주일)- 12월 19일(토)까지. (15주간).\n# 목장별 1차 발표(11일)'],
          ['제자훈련 과정 안내', '새로운 삶 18기(11일, 예비모임), 경건의삶2-7기(11일, 예비모임)\n말씀의삶 1(구약) 9기(14일, 수요일 1강)'],
          ['예비목자목우교육 1강', '모든 행사 후. 대상: 이정훈/ 조윤숙 자매님(팡가웨), 홍인혁/ 홍윤정 집사님(키징가)'],
          ['목회협력위원회', '친교 후(10번 방)'],
          ['27년 기획위 선출위한 목협위 설문조사', '11일(주일)-17일(토)까지'],
          ['가을 소풍 야외 예배', 'Beltzville Park, lehighton. 10시 45분까지 집합.\n# 비가 오거나 추위가 심하면 취소함.'],
          ['독감 및 코로나 백신 접종', '총 33명, 장소: 친교실.\n# 수고해 주시는 홍종규 집사님께 감사를 표합니다.'],
          ['생일 축하', '박재원 형제님(16일, 주일), 홍예안, 홍태성(18일, 주일)'],
          ['기타주중일정', '새벽기도회(화, 수, 금, 토), 목장모임(17일, 쉼)']
        ]
      }],
      [337, '10-04-2026 교회 소식', '10-03'], [336, '09-27-2026 교회 소식', '09-25'], [335, '09-20-2026 교회 소식', '09-19'],
      [334, '09-13-2026 교회 소식', '09-12'], [333, '09-06-2026 교회 소식', '09-05'], [332, '08-30-2026 교회 소식', '08-29'],
      [331, '08-23-2026 교회 소식', '08-22'], [330, '08-16-2026 교회 소식', '08-15'], [329, '08-09-2026 교회 소식', '08-08'],
      [328, '08-02-2026 교회 소식', '08-01'], [327, '07-26-2026 교회 소식', '07-25'], [326, '07-19-2026 교회 소식', '07-18'],
      [325, '07-12-2026 교회 소식', '07-11'], [324, '07-05-2026 교회 소식', '07-03'], [323, '06-28-2026 교회 소식', '06-27']
    ];

    const toTop = () => { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {} };
    const go = (id) => (e) => {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ tab: id, sel: null, q: '', page: 1, openSub: null, draft: '', secret: false });
    };
    const LABEL = { album: '사진 앨범', video: '동영상 앨범', board: '예수원 게시판', news: '교회소식' };
    const EYEBROW = { album: 'PHOTO ALBUM', video: 'VIDEO ALBUM', board: 'BOARD', news: 'CHURCH NEWS' };
    const base = 'flex-shrink: 0; min-height: 56px; padding: 0 22px; border: none; background: transparent; font-family: inherit; font-size: 16px; cursor: pointer; white-space: nowrap;';
    const tabs = ['album', 'video', 'board', 'news'].map((id) => {
      const on = id === tab;
      return {
        label: LABEL[id], selected: on ? 'true' : 'false',
        style: base + (on ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 ' + primary + ';' : ' color: #56634F; font-weight: 500;'),
        pick: go(id)
      };
    });
    const needle = q.trim().toLowerCase();

    // albums
    let albums = [];
    if (page === 1) {
      albums = ALBUMS.map((a, i) => ({ i, a })).filter(({ a }) => !needle || a[1].toLowerCase().includes(needle)).map(({ i, a }) => ({
        img: B + a[0], title: a[1], pick: () => { this.setState({ sel: i }); toTop(); }
      }));
    } else {
      albums = [0, 1, 2, 3].map((k) => ({ img: B + ALBUMS[(page * 4 + k) % ALBUMS.length][0], title: '[' + page + '페이지 앨범 제목]', pick: () => {} }));
    }
    let album = { title: '', datetime: '', views: '', photos: [], isEmpty: false };
    if (tab === 'album' && sel !== null && ALBUMS[sel]) {
      const a = ALBUMS[sel]; const ex = a[2];
      album = {
        title: a[1],
        datetime: ex ? ex.datetime : '--',
        views: ex ? ex.views : '0',
        photos: ex ? ex.photos.map((id, k) => ({ img: B + id, alt: a[1] + ' 사진 ' + (k + 1) })) : [{ img: B + a[0], alt: a[1] }],
        isEmpty: !ex
      };
    }

    // news
    const rowBase = 'width: 100%; display: flex; align-items: center; gap: 16px; padding: 15px 20px; border: none; border-top: 1px solid #EDF1E6; font-family: inherit; cursor: pointer; text-align: left;';
    let rows = [];
    if (page === 1) {
      rows = NEWS.filter((r) => !needle || r[1].toLowerCase().includes(needle)).map((r) => ({
        no: String(r[0]), title: r[1], date: r[2],
        style: rowBase + (tab === 'news' && sel === r[0] ? ' background: #EEF6E3;' : ' background: transparent;'),
        pick: () => { this.setState({ sel: r[0] }); toTop(); }
      }));
    } else {
      const start = 322 - (page - 2) * 16;
      rows = [0, 1, 2].map((k) => ({ no: String(start - k), title: '[' + page + '페이지 교회 소식]', date: '--', style: rowBase + ' background: transparent;', pick: () => { this.setState({ sel: start - k }); toTop(); } }));
    }
    let post = { title: '', views: '', datetime: '', headline: '', items: [], hasBody: false, isEmpty: false };
    if (tab === 'news' && sel !== null) {
      const f = NEWS.find((r) => r[0] === sel); const ex = f && f[3];
      post = {
        title: f ? f[1] : '[교회 소식 제목]',
        views: ex ? ex.views : '0',
        datetime: ex ? ex.datetime : (f ? f[2] : '--'),
        headline: ex ? ex.headline : '',
        items: ex ? ex.items.map((it, k) => ({ n: String(k + 1), title: it[0], body: it[1] })) : [],
        hasBody: !!ex,
        isEmpty: !ex
      };
    }

    // videos
    const vRowBase = 'display: flex; align-items: center; gap: 16px; padding: 10px 20px; border-top: 1px solid #EDF1E6;';
    let videos = [];
    if (page === 1) {
      videos = VIDEOS.map((v, i) => ({ i, v })).filter(({ v }) => !needle || v[1].toLowerCase().includes(needle)).map(({ i, v }) => ({
        img: B + v[0], title: v[1],
        style: vRowBase + (tab === 'video' && sel === i ? ' background: #EEF6E3;' : ''),
        pick: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ sel: i, draft: '', secret: false }); toTop(); }
      }));
    } else {
      videos = [0, 1, 2].map((k) => ({ img: B + VIDEOS[(page * 3 + k) % VIDEOS.length][0], title: '[' + page + '페이지 영상 제목]', style: vRowBase, pick: (e) => { if (e && e.preventDefault) e.preventDefault(); } }));
    }
    const video = (tab === 'video' && sel !== null && VIDEOS[sel]) ? { title: VIDEOS[sel][1], img: B + VIDEOS[sel][0] } : { title: '', img: '' };

    // board
    let boardRows = [];
    if (page === 1) {
      boardRows = BOARD.filter((r) => !needle || r[1].toLowerCase().includes(needle)).map((r) => ({
        no: String(r[0]), title: r[1], writer: r[2], date: r[3],
        style: rowBase + (tab === 'board' && sel === r[0] ? ' background: #EEF6E3;' : ' background: transparent;'),
        pick: () => { this.setState({ sel: r[0], draft: '', secret: false }); toTop(); }
      }));
    } else {
      boardRows = [11, 10, 9].map((n) => ({ no: String(n), title: '[2페이지 게시글 제목]', writer: '예수원', date: '--', style: rowBase + ' background: transparent;', pick: () => { this.setState({ sel: n }); toTop(); } }));
    }
    let bpost = { title: '', writer: '', views: '', datetime: '', files: [] };
    if (tab === 'board' && sel !== null) {
      const f = BOARD.find((r) => r[0] === sel); const ex = f && f[4];
      bpost = {
        title: f ? f[1] : '[게시글 제목]', writer: f ? f[2] : '예수원',
        views: ex ? ex.views : '0', datetime: ex ? ex.datetime : (f ? f[3] : '--'),
        files: ex ? ex.files.map((x) => ({ name: x[0], meta: x[1] })) : [{ name: '[첨부파일].pdf', meta: '관리자 페이지에서 올린 파일' }]
      };
    }
    const ckey = tab + ':' + sel;
    const comments = (allComments[ckey] || []).map((c) => ({ text: c.text, secret: c.secret }));

    const pages = Array.from({ length: tab === 'board' ? 2 : 10 }, (_, k) => {
      const n = k + 1; const on = n === page;
      return {
        n: String(n), current: on ? 'page' : 'false',
        style: 'min-width: 44px; height: 44px; border-radius: 10px; font-family: inherit; font-size: 15px; cursor: pointer; ' + (on ? 'border: none; background: #1F3B16; color: #FFFFFF; font-weight: 700;' : 'border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516;'),
        pick: () => this.setState({ page: n, sel: null })
      };
    });

    return {
      primary, tabs, pages, q,
      eyebrow: EYEBROW[tab], pageTitle: LABEL[tab],
      isAlbum: tab === 'album', isNews: tab === 'news',
      albums, albumEmpty: tab === 'album' && albums.length === 0,
      hasAlbum: tab === 'album' && sel !== null, album,
      rows, newsEmpty: tab === 'news' && rows.length === 0,
      hasPost: tab === 'news' && sel !== null, post,
      isVideo: tab === 'video', isBoard: tab === 'board',
      videos, videoEmpty: tab === 'video' && videos.length === 0, hasVideo: tab === 'video' && sel !== null, video,
      boardRows, boardEmpty: tab === 'board' && boardRows.length === 0, hasBoard: tab === 'board' && sel !== null, bpost,
      comments, commentCount: String(comments.length), draft, secret,
      closeSel: () => this.setState({ sel: null }),
      onDraft: (e) => this.setState({ draft: e.target.value }),
      toggleSecret: () => this.setState({ secret: !secret }),
      addComment: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const t = draft.trim(); if (!t) return;
        const list = (allComments[ckey] || []).concat([{ text: t, secret }]);
        this.setState({ comments: Object.assign({}, allComments, { [ckey]: list }), draft: '', secret: false });
      },
      closeAlbum: () => this.setState({ sel: null }),
      closePost: () => this.setState({ sel: null }),
      onQ: (e) => this.setState({ q: e.target.value, page: 1 }),
      noSubmit: (e) => { if (e && e.preventDefault) e.preventDefault(); },
      goAlbum: go('album'), goVideo: go('video'), goBoard: go('board'), goNews: go('news'),
      aboutCls: openSub === 'about' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "[로그인] 쉴만한 물가"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16")}>
          <img src={asset("/_blob/6489da0f5546378e9b50a1ff96ca778e")} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 40%")} />
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
                <A href="#" aria-current="page" aria-haspopup="true" style={css(`display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0; box-shadow: inset 0 -3px 0 ${v.primary ?? ""}`)}>
                  {" 쉴만한 물가 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; right: 0; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="#" onClick={v.goAlbum} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"사진 앨범"}
                    </A>
                    <A href="#" onClick={v.goVideo} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"동영상 앨범"}
                    </A>
                    <A href="#" onClick={v.goBoard} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"예수원 게시판"}
                    </A>
                    <A href="#" onClick={v.goNews} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
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
                {"쉴만한 물가"}
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
          <div role="tablist" aria-label="쉴만한 물가" style={css("max-width: 1200px; margin: 0 auto; padding: 0 40px; box-sizing: border-box; display: flex; gap: 4px; overflow-x: auto")}>
            {(v.tabs || []).map((t, _i0) => (
              <React.Fragment key={_i0}>
                <button className="tab-btn" role="tab" aria-selected={t.selected} onClick={t.pick} style={css(t.style)}>
                  {t.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
        <main style={css("max-width: 1200px; margin: 0 auto; padding: 56px 40px 96px; box-sizing: border-box")}>
          {(v.isAlbum) ? (
            <>
            <div>
              {(v.hasAlbum) ? (
                <>
                <article style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px; margin-bottom: 48px; max-width: 1000px; margin-left: auto; margin-right: auto")}>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                    {v.album.title}
                  </h2>
                  <div style={css("display: flex; gap: 18px; flex-wrap: wrap; margin-top: 12px; padding-bottom: 20px; border-bottom: 1px solid #EDF1E6; font-size: 14px; color: #56634F")}>
                    <span>
                      {v.album.datetime}
                    </span>
                    <span>
                      {"조회 "}{v.album.views}
                    </span>
                    <span>
                      {"작성자 웹섬김…"}
                    </span>
                  </div>
                  <div style={css("margin-top: 28px; display: flex; flex-direction: column; gap: 16px")}>
                    {(v.album.photos || []).map((ph, _i1) => (
                      <React.Fragment key={_i1}>
                        <img src={asset(ph.img)} alt={ph.alt} style={css("width: 100%; display: block; border-radius: 12px; background: #DDE7D0")} />
                      </React.Fragment>
                    ))}
                  </div>
                  {(v.album.isEmpty) ? (
                    <>
                    <p style={css("margin: 16px 0 0; padding: 24px; text-align: center; background: #F6F9F1; border-radius: 14px; font-size: 15px; color: #56634F")}>
                      {"[앨범 사진] 관리자 페이지에서 올린 사진이 여기에 쭉 표시됩니다."}
                    </p>
                    </>
                  ) : null}
                  <div style={css("display: flex; justify-content: flex-end; margin-top: 28px")}>
                    <button onClick={v.closeAlbum} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 18px; border-radius: 10px; border: none; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer")}>
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
              <div style={css("display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 24px")}>
                <div>
                  <p style={css("margin: 0 0 6px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                    {"PHOTO ALBUM"}
                  </p>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                    {"사진 앨범"}
                  </h2>
                </div>
                <form role="search" style={css("display: flex; align-items: center")} onSubmit={v.noSubmit}>
                  <label htmlFor="album-search" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                    {"앨범 제목 검색"}
                  </label>
                  <div style={css("display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; width: 260px; max-width: 100%; box-sizing: border-box")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56634F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-3.5-3.5" />
                    </svg>
                    <input id="album-search" type="search" placeholder="앨범 제목으로 검색" value={v.q ?? ''} onChange={v.onQ} style={css("flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-family: inherit; font-size: 15px; color: #1B2516")} />
                  </div>
                </form>
              </div>
              <div style={css("display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px")}>
                {(v.albums || []).map((al, _i2) => (
                  <React.Fragment key={_i2}>
                    <button className="album-btn" onClick={al.pick} style={css("display: flex; flex-direction: column; padding: 0; border: 1px solid #E1E8D6; border-radius: 16px; overflow: hidden; background: #FFFFFF; cursor: pointer; text-align: left; font-family: inherit")}>
                      <span style={css("display: block; width: 100%; aspect-ratio: 3 / 2; overflow: hidden; background: #DDE7D0")}>
                        <img src={asset(al.img)} alt="" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
                      </span>
                      <span className="album-title" style={css("display: block; padding: 14px 16px 16px; font-size: 16px; font-weight: 600; color: #1B2516; line-height: 1.45")}>
                        {al.title}
                      </span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
              {(v.albumEmpty) ? (
                <>
                <p style={css("margin: 0; padding: 48px 24px; text-align: center; font-size: 15px; color: #56634F")}>
                  {"\""}{v.q}{"\"에 맞는 앨범이 없어요."}
                </p>
                </>
              ) : null}
              <nav aria-label="페이지" style={css("display: flex; justify-content: center; gap: 6px; margin-top: 32px; flex-wrap: wrap")}>
                {(v.pages || []).map((pg, _i3) => (
                  <React.Fragment key={_i3}>
                    <button className="page-btn" onClick={pg.pick} aria-current={pg.current} style={css(pg.style)}>
                      {pg.n}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
            </div>
            </>
          ) : null}
          {(v.isNews) ? (
            <>
            <div style={css("max-width: 1000px; margin: 0 auto")}>
              {(v.hasPost) ? (
                <>
                <article style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px; margin-bottom: 48px")}>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                    {v.post.title}
                  </h2>
                  <div style={css("display: flex; gap: 18px; flex-wrap: wrap; margin-top: 12px; padding-bottom: 20px; border-bottom: 1px solid #EDF1E6; font-size: 14px; color: #56634F")}>
                    <span>
                      {"작성자 웹섬김…"}
                    </span>
                    <span>
                      {"조회 "}{v.post.views}
                    </span>
                    <span>
                      {v.post.datetime}
                    </span>
                  </div>
                  {(v.post.hasBody) ? (
                    <>
                    <div style={css("margin-top: 28px")}>
                      <p style={css("margin: 0 0 20px; padding: 18px 22px; background: #EEF6E3; border-radius: 14px; font-size: 15px; line-height: 1.8; color: #1F3B16; font-weight: 600")}>
                        {v.post.headline}
                      </p>
                      <ol style={css("margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column")}>
                        {(v.post.items || []).map((it, _i4) => (
                          <React.Fragment key={_i4}>
                            <li style={css("display: flex; gap: 16px; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                              <span style={css(`flex-shrink: 0; width: 30px; height: 30px; border-radius: 999px; background: ${v.primary ?? ""}; color: #1B2516; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700`)}>
                                {it.n}
                              </span>
                              <div style={css("min-width: 0")}>
                                <p style={css("margin: 3px 0 0; font-size: 16px; font-weight: 700; color: #1B2516")}>
                                  {it.title}
                                </p>
                                <p style={css("margin: 4px 0 0; font-size: 15px; line-height: 1.75; color: #2E3A28; white-space: pre-line")}>
                                  {it.body}
                                </p>
                              </div>
                            </li>
                          </React.Fragment>
                        ))}
                      </ol>
                    </div>
                    </>
                  ) : null}
                  {(v.post.isEmpty) ? (
                    <>
                    <p style={css("margin: 28px 0 0; padding: 40px; text-align: center; background: #F6F9F1; border-radius: 14px; font-size: 15px; color: #56634F")}>
                      {"[게시글 본문] 관리자 페이지에서 올린 주보 내용이 여기에 표시됩니다."}
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
              <div style={css("display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 20px")}>
                <div>
                  <p style={css("margin: 0 0 6px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                    {"CHURCH NEWS"}
                  </p>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                    {"교회소식"}
                  </h2>
                </div>
                <form role="search" style={css("display: flex; align-items: center")} onSubmit={v.noSubmit}>
                  <label htmlFor="news-search" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                    {"제목 검색"}
                  </label>
                  <div style={css("display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; width: 260px; max-width: 100%; box-sizing: border-box")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56634F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-3.5-3.5" />
                    </svg>
                    <input id="news-search" type="search" placeholder="제목으로 검색" value={v.q ?? ''} onChange={v.onQ} style={css("flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-family: inherit; font-size: 15px; color: #1B2516")} />
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
                {(v.rows || []).map((r, _i5) => (
                  <React.Fragment key={_i5}>
                    <button className="row-btn" onClick={r.pick} style={css(r.style)}>
                      <span className="col-no" style={css("flex-shrink: 0; width: 44px; text-align: center; font-size: 14px; color: #56634F")}>
                        {r.no}
                      </span>
                      <span className="row-title" style={css("flex: 1; min-width: 0; font-size: 16px; color: #1B2516; text-align: left")}>
                        {r.title}
                      </span>
                      <span className="col-writer" style={css("flex-shrink: 0; width: 80px; font-size: 14px; color: #56634F; text-align: left")}>
                        {"웹섬김…"}
                      </span>
                      <span style={css("flex-shrink: 0; width: 56px; font-size: 14px; color: #56634F; text-align: right")}>
                        {r.date}
                      </span>
                    </button>
                  </React.Fragment>
                ))}
                {(v.newsEmpty) ? (
                  <>
                  <p style={css("margin: 0; padding: 48px 24px; text-align: center; font-size: 15px; color: #56634F")}>
                    {"\""}{v.q}{"\"에 맞는 글이 없어요."}
                  </p>
                  </>
                ) : null}
              </div>
              <nav aria-label="페이지" style={css("display: flex; justify-content: center; gap: 6px; margin-top: 24px; flex-wrap: wrap")}>
                {(v.pages || []).map((pg, _i6) => (
                  <React.Fragment key={_i6}>
                    <button className="page-btn" onClick={pg.pick} aria-current={pg.current} style={css(pg.style)}>
                      {pg.n}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
            </div>
            </>
          ) : null}
          {(v.isVideo) ? (
            <>
            <div style={css("max-width: 1000px; margin: 0 auto")}>
              {(v.hasVideo) ? (
                <>
                <article style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px; margin-bottom: 48px")}>
                  <h2 style={css("margin: 0 0 24px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                    {v.video.title}
                  </h2>
                  <div className="yt-slot" style={css("position: relative; aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; background: #0E180A; display: flex; align-items: center; justify-content: center")}>
                    <img src={asset(v.video.img)} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: blur(2px) brightness(0.55)")} />
                    <button className="yt-play" aria-label={`${v.video.title ?? ""} 영상 재생`} style={css("position: relative; width: 84px; height: 60px; border-radius: 16px; border: none; background: #E62117; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" fill="#FFFFFF" />
                      </svg>
                    </button>
                    <span style={css("position: absolute; left: 18px; bottom: 16px; padding: 6px 12px; border-radius: 999px; background: rgba(0,0,0,0.55); color: #FFFFFF; font-size: 13px")}>
                      {"[YouTube 영상] 관리자가 넣은 링크가 여기서 재생됩니다"}
                    </span>
                  </div>
                  <div style={css("display: flex; justify-content: flex-end; margin-top: 28px")}>
                    <button onClick={v.closeSel} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 18px; border-radius: 10px; border: none; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer")}>
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
                      {(v.comments || []).map((c, _i7) => (
                        <React.Fragment key={_i7}>
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
                      <label htmlFor="cmt-video" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                        {"댓글 내용"}
                      </label>
                      <textarea id="cmt-video" rows="3" placeholder="댓글을 남겨주세요" value={v.draft ?? ''} onChange={v.onDraft} style={css("width: 100%; box-sizing: border-box; padding: 12px 14px; border: 1px solid #C9D3BC; border-radius: 12px; font-family: inherit; font-size: 15px; line-height: 1.6; resize: vertical")} />
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
              <div style={css("display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 20px")}>
                <div>
                  <p style={css("margin: 0 0 6px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                    {"VIDEO ALBUM"}
                  </p>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                    {"동영상 앨범"}
                  </h2>
                </div>
                <form role="search" style={css("display: flex; align-items: center")} onSubmit={v.noSubmit}>
                  <label htmlFor="video-search" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                    {"제목 검색"}
                  </label>
                  <div style={css("display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; width: 260px; max-width: 100%; box-sizing: border-box")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56634F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-3.5-3.5" />
                    </svg>
                    <input id="video-search" type="search" placeholder="영상 제목으로 검색" value={v.q ?? ''} onChange={v.onQ} style={css("flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-family: inherit; font-size: 15px; color: #1B2516")} />
                  </div>
                </form>
              </div>
              <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
                <div aria-hidden="true" style={css("display: flex; align-items: center; gap: 16px; padding: 12px 20px; background: #F3F6EE; font-size: 13px; font-weight: 600; color: #56634F")}>
                  <span className="vid-thumb" style={css("flex-shrink: 0; width: 120px")}>
                    {"영상"}
                  </span>
                  <span style={css("flex: 1")}>
                    {"제목"}
                  </span>
                  <span className="col-ref" style={css("flex-shrink: 0; width: 80px; text-align: center")}>
                    {"참고"}
                  </span>
                  <span style={css("flex-shrink: 0; width: 56px; text-align: center")}>
                    {"링크"}
                  </span>
                </div>
                {(v.videos || []).map((v, _i8) => (
                  <React.Fragment key={_i8}>
                    <div style={css(v.style)}>
                      <button className="vid-row" onClick={v.pick} style={css("flex: 1; min-width: 0; display: flex; align-items: center; gap: 16px; padding: 0; border: none; background: transparent; font-family: inherit; cursor: pointer; text-align: left")}>
                        <span className="vid-thumb" style={css("flex-shrink: 0; width: 120px; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; background: #DDE7D0; display: block")}>
                          <img src={asset(v.img)} alt="" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
                        </span>
                        <span className="row-title" style={css("flex: 1; min-width: 0; font-size: 16px; color: #1B2516")}>
                          {v.title}
                        </span>
                      </button>
                      <span className="col-ref" style={css("flex-shrink: 0; width: 80px")} />
                      <A href="#" onClick={v.pick} aria-label={`${v.title ?? ""} 유튜브에서 보기`} style={css("flex-shrink: 0; width: 56px; min-height: 44px; display: flex; align-items: center; justify-content: center")}>
                        <svg width="26" height="18" viewBox="0 0 28 20" aria-hidden="true">
                          <rect width="28" height="20" rx="5" fill="#E62117" />
                          <path d="M11 5.5v9l8-4.5z" fill="#FFFFFF" />
                        </svg>
                      </A>
                    </div>
                  </React.Fragment>
                ))}
                {(v.videoEmpty) ? (
                  <>
                  <p style={css("margin: 0; padding: 48px 24px; text-align: center; font-size: 15px; color: #56634F")}>
                    {"\""}{v.q}{"\"에 맞는 영상이 없어요."}
                  </p>
                  </>
                ) : null}
              </div>
              <nav aria-label="페이지" style={css("display: flex; justify-content: center; gap: 6px; margin-top: 24px; flex-wrap: wrap")}>
                {(v.pages || []).map((pg, _i9) => (
                  <React.Fragment key={_i9}>
                    <button className="page-btn" onClick={pg.pick} aria-current={pg.current} style={css(pg.style)}>
                      {pg.n}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
            </div>
            </>
          ) : null}
          {(v.isBoard) ? (
            <>
            <div style={css("max-width: 1000px; margin: 0 auto")}>
              {(v.hasBoard) ? (
                <>
                <article style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px; margin-bottom: 48px")}>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                    {v.bpost.title}
                  </h2>
                  <div style={css("display: flex; gap: 18px; flex-wrap: wrap; margin-top: 12px; padding-bottom: 20px; border-bottom: 1px solid #EDF1E6; font-size: 14px; color: #56634F")}>
                    <span>
                      {"작성자 "}{v.bpost.writer}
                    </span>
                    <span>
                      {"조회 "}{v.bpost.views}
                    </span>
                    <span>
                      {v.bpost.datetime}
                    </span>
                  </div>
                  <div style={css("margin-top: 24px; padding: 18px 20px; background: #F6F9F1; border: 1px solid #E1E8D6; border-radius: 14px")}>
                    <p style={css("margin: 0 0 10px; font-size: 14px; font-weight: 700; color: #1F3B16")}>
                      {"첨부파일"}
                    </p>
                    <ul style={css("margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px")}>
                      {(v.bpost.files || []).map((fl, _i10) => (
                        <React.Fragment key={_i10}>
                          <li style={css("display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-height: 40px")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3F7A1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M12 4v11" />
                              <path d="M7 10l5 5 5-5" />
                              <path d="M5 20h14" />
                            </svg>
                            <A className="file-link" href="#" style={css("font-size: 15px; font-weight: 600; color: #2F5E17; text-decoration: none")}>
                              {fl.name}
                            </A>
                            <span style={css("font-size: 13px; color: #56634F")}>
                              {fl.meta}
                            </span>
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                  <div style={css("display: flex; justify-content: flex-end; margin-top: 28px")}>
                    <button onClick={v.closeSel} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 18px; border-radius: 10px; border: none; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer")}>
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
                      {(v.comments || []).map((c, _i11) => (
                        <React.Fragment key={_i11}>
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
                      <label htmlFor="cmt-board" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                        {"댓글 내용"}
                      </label>
                      <textarea id="cmt-board" rows="3" placeholder="댓글을 남겨주세요" value={v.draft ?? ''} onChange={v.onDraft} style={css("width: 100%; box-sizing: border-box; padding: 12px 14px; border: 1px solid #C9D3BC; border-radius: 12px; font-family: inherit; font-size: 15px; line-height: 1.6; resize: vertical")} />
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
              <div style={css("display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 20px")}>
                <div>
                  <p style={css("margin: 0 0 6px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                    {"BOARD"}
                  </p>
                  <h2 style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                    {"예수원 게시판"}
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
                {(v.boardRows || []).map((r, _i12) => (
                  <React.Fragment key={_i12}>
                    <button className="brd-row" onClick={r.pick} style={css(r.style)}>
                      <span className="col-no" style={css("flex-shrink: 0; width: 44px; text-align: center; font-size: 14px; color: #56634F")}>
                        {r.no}
                      </span>
                      <span style={css("flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px")}>
                        <span className="row-title" style={css("min-width: 0; font-size: 16px; color: #1B2516; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                          {r.title}
                        </span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#56634F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="첨부파일 있음" role="img" style={css("flex-shrink: 0")}>
                          <path d="M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.4 3.4 0 0 1 4.8 4.8l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9" />
                        </svg>
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
                {(v.boardEmpty) ? (
                  <>
                  <p style={css("margin: 0; padding: 48px 24px; text-align: center; font-size: 15px; color: #56634F")}>
                    {"\""}{v.q}{"\"에 맞는 글이 없어요."}
                  </p>
                  </>
                ) : null}
              </div>
              <nav aria-label="페이지" style={css("display: flex; justify-content: center; gap: 6px; margin-top: 24px; flex-wrap: wrap")}>
                {(v.pages || []).map((pg, _i13) => (
                  <React.Fragment key={_i13}>
                    <button className="page-btn" onClick={pg.pick} aria-current={pg.current} style={css(pg.style)}>
                      {pg.n}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
            </div>
            </>
          ) : null}
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
