'use client';
// 이 파일은 tools/convert-design.mjs 가 design/AdminBanner.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F3F5EF}\n*{box-sizing:border-box}\na{color:#2F5E17}\n.side-link{transition:background .15s,color .15s}\n.side-link:hover{background:rgba(255,255,255,0.08);color:#FFFFFF}\n.btn{transition:filter .15s,background .15s}\n.btn:hover{filter:brightness(0.95)}\n.btn-ghost:hover{background:#EEF6E3 !important}\n.row-hover:hover{background:#F8FBF4}\n.adm input[type=text],.adm input[type=email],.adm input[type=password],.adm input[type=number],.adm input[type=date],.adm input[type=search],.adm select,.adm textarea{font-family:inherit;font-size:15px;color:#1B2516;background:#FFFFFF;border:1px solid #C9D3BC;border-radius:10px}\n.adm input:focus,.adm select:focus,.adm textarea:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.adm button:focus-visible,.adm a:focus-visible{outline:3px solid #8BC34A;outline-offset:2px}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n.toast{animation:toastIn .25s ease}\n@keyframes toastIn{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}\n@media (prefers-reduced-motion: reduce){.toast{animation:none}}\n@media (max-width: 960px){.adm-side{display:none !important}.adm-main{padding:20px !important}}\n.ico-btn:hover{background:#EEF6E3 !important}.ico-btn:disabled{opacity:.35;cursor:default}\n";

class Component extends DCLogic {
  flash(msg) {
    this.setState({ toast: msg });
    clearTimeout(this._t);
    this._t = setTimeout(() => this.setState({ toast: '' }), 2200);
  }
  renderVals() {
    const st = this.state || {};
    const B = '/_blob/';
    const SEED = [
      { id: 1, cat: 'main', title: '목자목우수양회', img: '84362616dfc60110980f8195a823a4b0', on: true, link: '', end: '', showTitle: false },
      { id: 2, cat: 'main', title: '생명의 삶', img: 'e33fafc038121ac64386ebaac161efc5', on: true, link: '', end: '', showTitle: false },
      { id: 3, cat: 'main', title: '주일학교', img: '3070e8010272e1554ec889aacaf15be1', on: true, link: '', end: '', showTitle: false },
      { id: 4, cat: 'main', title: '청년부', img: 'c03a3e2bcf9d8de53ca200225920f242', on: true, link: '', end: '', showTitle: false },
      { id: 5, cat: 'main', title: '탄자니아 선교', img: '1af25c64d7ad7ee9bae88ac8793b59e8', on: true, link: '', end: '2026-12-31', showTitle: true },
      { id: 6, cat: 'main', title: '탄자니아 선교팀', img: '3479f231d337da609d14e8d7d941269a', on: false, link: 'MemberUfeedem.dc.html', end: '', showTitle: false }
    ];
    const banners = st.banners || SEED;
    const cat = st.cat || 'all';
    const form = st.form || null;
    const set = (p) => this.setState(p);
    const CAT = { main: '메인 이미지', sub: '서브 배너' };
    const move = (i, d) => { const a = banners.slice(); const j = i + d; if (j < 0 || j >= a.length) return; const t = a[i]; a[i] = a[j]; a[j] = t; set({ banners: a }); };
    const visible = banners.map((b, i) => ({ b, i })).filter(({ b }) => cat === 'all' || b.cat === cat);
    const rows = visible.map(({ b, i }) => ({
      title: b.title, img: B + b.img, catLabel: CAT[b.cat], link: b.link || '없음', end: b.end || '계속',
      showTitle: b.showTitle ? '제목 표시' : '제목 숨김',
      imgStyle: b.on ? '' : 'filter: grayscale(1); opacity: 0.55;',
      isFirst: i === 0, isLast: i === banners.length - 1,
      up: () => move(i, -1), down: () => move(i, 1),
      onAria: b.on ? 'true' : 'false',
      switchStyle: 'position: relative; width: 48px; height: 28px; border-radius: 999px; border: none; cursor: pointer; padding: 0; transition: background .2s; background: ' + (b.on ? '#4F8F25' : '#C9D3BC'),
      knobStyle: 'position: absolute; top: 3px; left: ' + (b.on ? '23px' : '3px') + '; width: 22px; height: 22px; border-radius: 999px; background: #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: left .2s',
      toggle: () => { set({ banners: banners.map((x) => (x.id === b.id ? Object.assign({}, x, { on: !x.on }) : x)) }); this.flash(b.title + (b.on ? ' 배너를 숨겼어요' : ' 배너를 켰어요')); },
      edit: () => set({ form: Object.assign({}, b) }),
      remove: () => { set({ banners: banners.filter((x) => x.id !== b.id) }); this.flash(b.title + ' 배너를 삭제했어요'); }
    }));
    const preview = banners.filter((b) => b.on).map((b, k) => ({ n: String(k + 1), title: b.title, img: B + b.img }));
    const upd = (k) => (e) => set({ form: Object.assign({}, form, { [k]: e.target.value }) });
    const f = form ? { title: form.title, cat: form.cat, link: form.link, end: form.end, showTitle: !!form.showTitle, hasImg: !!form.img, img: form.img ? B + form.img : '' } : { title: '', cat: 'main', link: '', end: '', showTitle: false, hasImg: false, img: '' };
    return {
      rows, preview, cat, count: String(visible.length), f,
      pendingCount: '3',
      panelOpen: !!form, panelTitle: form && form.id ? '배너 수정' : '새 배너 등록',
      onCat: (e) => set({ cat: e.target.value }),
      openNew: () => set({ form: { id: 0, cat: 'main', title: '', img: '', on: true, link: '', end: '', showTitle: false } }),
      closePanel: () => set({ form: null }),
      onTitle: upd('title'), onFCat: upd('cat'), onLink: upd('link'), onEnd: upd('end'),
      onShowTitle: () => set({ form: Object.assign({}, form, { showTitle: !form.showTitle }) }),
      saveForm: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const t = (form.title || '').trim() || '새 배너';
        if (form.id) { set({ banners: banners.map((x) => (x.id === form.id ? Object.assign({}, form, { title: t }) : x)), form: null }); this.flash('배너를 수정했어요'); }
        else { const id = Math.max(0, ...banners.map((x) => x.id)) + 1; set({ banners: banners.concat([Object.assign({}, form, { id, title: t, img: form.img || '494a69a8e49b1b1f85768032d076e1e6' })]), form: null }); this.flash('새 배너를 등록했어요'); }
      },
      saveOrder: () => this.flash('배너 순서를 저장했어요'),
      hasToast: !!st.toast, toast: st.toast || ''
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "관리자 · 배너 관리"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="adm" style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F3F5EF; min-height: 100vh; display: flex; word-break: keep-all")}>
        <aside className="adm-side" aria-label="관리자 메뉴" style={css("width: 256px; flex-shrink: 0; background: #1F3B16; color: #FFFFFF; display: flex; flex-direction: column; padding: 24px 16px")}>
          <A href="AdminHome.dc.html" style={css("display: flex; flex-direction: column; gap: 8px; padding: 0 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.12); text-decoration: none; color: #FFFFFF")}>
            <img src={asset("/_blob/122f04b2c3721aa4a0194f5dc7c5de6e")} alt="예수원교회" style={css("height: 34px; width: auto; align-self: flex-start; display: block")} />
            <span style={css("font-size: 13px; font-weight: 600; color: #8BC34A; letter-spacing: 0.06em")}>
              {"ADMIN · 관리자"}
            </span>
          </A>
          <nav style={css("flex: 1")}>
            <div style={css("height: 14px")} />
            <A className="side-link" href="AdminHome.dc.html" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 500")}>
              <span>
                {"대시보드"}
              </span>
            </A>
            <p style={css("margin: 22px 0 8px; padding: 0 14px; font-size: 12px; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); font-weight: 700")}>
              {"회원"}
            </p>
            <A className="side-link" href="AdminMembers.dc.html" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 500")}>
              <span>
                {"회원 관리"}
              </span>
              <span style={css("min-width: 22px; height: 22px; padding: 0 7px; border-radius: 999px; background: #F2C94C; color: #1B2516; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center")}>
                {v.pendingCount}
              </span>
            </A>
            <p style={css("margin: 22px 0 8px; padding: 0 14px; font-size: 12px; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); font-weight: 700")}>
              {"사이트"}
            </p>
            <A className="side-link" href="AdminHomepage.dc.html" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 500")}>
              <span>
                {"홈 화면 관리"}
              </span>
            </A>
            <A className="side-link" href="AdminBanner.dc.html" aria-current="page" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; background: #8BC34A; color: #1B2516; font-weight: 700")}>
              <span>
                {"배너 관리"}
              </span>
            </A>
            <A className="side-link" href="AdminPopup.dc.html" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 500")}>
              <span>
                {"팝업창 관리"}
              </span>
            </A>
            <A className="side-link" href="AdminAbout.dc.html" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 500")}>
              <span>
                {"교회 소개 관리"}
              </span>
            </A>
            <A className="side-link" href="AdminServe.dc.html" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 500")}>
              <span>
                {"섬기는 분들 관리"}
              </span>
            </A>
            <p style={css("margin: 22px 0 8px; padding: 0 14px; font-size: 12px; letter-spacing: 0.12em; color: rgba(255,255,255,0.5); font-weight: 700")}>
              {"콘텐츠"}
            </p>
            <span style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 40px; padding: 0 14px; font-size: 15px; color: rgba(255,255,255,0.45)")}>
              <span>
                {"설교 · 칼럼"}
              </span>
              <span style={css("font-size: 11px; padding: 2px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.25)")}>
                {"준비 중"}
              </span>
            </span>
            <span style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 40px; padding: 0 14px; font-size: 15px; color: rgba(255,255,255,0.45)")}>
              <span>
                {"사진 · 동영상 앨범"}
              </span>
              <span style={css("font-size: 11px; padding: 2px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.25)")}>
                {"준비 중"}
              </span>
            </span>
            <span style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 40px; padding: 0 14px; font-size: 15px; color: rgba(255,255,255,0.45)")}>
              <span>
                {"게시판 · 교회소식"}
              </span>
              <span style={css("font-size: 11px; padding: 2px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.25)")}>
                {"준비 중"}
              </span>
            </span>
          </nav>
          <A className="side-link" href="MemberMain.dc.html" style={css("display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; color: rgba(255,255,255,0.82); text-decoration: none; font-size: 14px")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {" 사이트로 돌아가기 "}
          </A>
        </aside>
        <div style={css("flex: 1; min-width: 0; display: flex; flex-direction: column")}>
          <header style={css("display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 32px; background: #FFFFFF; border-bottom: 1px solid #E1E8D6")}>
            <div>
              <p style={css("margin: 0; font-size: 13px; color: #56634F")}>
                {"관리자 › 사이트 › 배너 관리"}
              </p>
              <h1 style={css("margin: 2px 0 0; font-family: 'Gowun Batang', serif; font-size: 26px; font-weight: 700")}>
                {"배너 관리"}
              </h1>
            </div>
            <div style={css("display: flex; align-items: center; gap: 14px")}>
              <span style={css("width: 38px; height: 38px; border-radius: 999px; background: #EEF6E3; color: #2F5E17; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px")} aria-hidden="true">
                {"웹"}
              </span>
              <span style={css("display: flex; flex-direction: column; line-height: 1.3")}>
                <b style={css("font-size: 14px")}>
                  {"웹섬김이"}
                </b>
                <span style={css("font-size: 12px; color: #56634F")}>
                  {"관리자"}
                </span>
              </span>
              <A href="Main.dc.html" style={css("margin-left: 8px; min-height: 40px; display: inline-flex; align-items: center; padding: 0 14px; border-radius: 10px; border: 1px solid #D3DCC6; color: #1B2516; text-decoration: none; font-size: 14px")}>
                {"로그아웃"}
              </A>
            </div>
          </header>
          <main className="adm-main" style={css("flex: 1; padding: 32px; max-width: 1240px; width: 100%")}>
            <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 20px 24px; margin-bottom: 20px")}>
              <div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap")}>
                <h2 style={css("margin: 0; font-size: 17px; font-weight: 700")}>
                  {"홈 슬라이더 미리보기"}
                </h2>
                <span style={css("font-size: 13px; color: #56634F")}>
                  {"사용 중인 배너만, 아래 순서대로 홈 첫 화면에 넘어가며 보여요."}
                </span>
              </div>
              <div style={css("display: flex; gap: 12px; margin-top: 16px; overflow-x: auto; padding-bottom: 4px")}>
                {(v.preview || []).map((pv, _i0) => (
                  <React.Fragment key={_i0}>
                    <figure style={css("margin: 0; flex-shrink: 0; width: 200px")}>
                      <div style={css("position: relative; aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden; background: #DDE7D0")}>
                        <img src={asset(pv.img)} alt="" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
                        <span style={css("position: absolute; left: 8px; top: 8px; min-width: 24px; height: 24px; padding: 0 6px; border-radius: 999px; background: #8BC34A; color: #1B2516; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center")}>
                          {pv.n}
                        </span>
                      </div>
                      <figcaption style={css("margin-top: 6px; font-size: 13px; color: #2E3A28")}>
                        {pv.title}
                      </figcaption>
                    </figure>
                  </React.Fragment>
                ))}
              </div>
            </section>
            <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; overflow: hidden")}>
              <div style={css("display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 16px 20px; border-bottom: 1px solid #E1E8D6")}>
                <div style={css("display: flex; align-items: center; gap: 10px")}>
                  <label htmlFor="cat" className="sr">
                    {"분류"}
                  </label>
                  <select id="cat" value={v.cat ?? ''} onChange={v.onCat} style={css("min-height: 44px; padding: 0 12px; width: 160px")}>
                    <option value="all">
                      {"전체"}
                    </option>
                    <option value="main">
                      {"메인 이미지"}
                    </option>
                    <option value="sub">
                      {"서브 배너"}
                    </option>
                  </select>
                  <span style={css("font-size: 14px; color: #56634F")}>
                    {"배너 "}{v.count}{"개"}
                  </span>
                </div>
                <div style={css("display: flex; gap: 8px")}>
                  <button className="btn" onClick={v.saveOrder} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #D3DCC6; border-radius: 10px; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                    {"순서 저장"}
                  </button>
                  <button className="btn" onClick={v.openNew} style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #8BC34A; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    {" 배너 등록 "}
                  </button>
                </div>
              </div>
              <div style={css("overflow-x: auto")}>
                <table style={css("width: 100%; border-collapse: collapse; font-size: 14px; min-width: 860px")}>
                  <thead>
                    <tr style={css("background: #F3F6EE; color: #56634F; text-align: left")}>
                      <th style={css("padding: 12px 10px 12px 20px; font-weight: 600; width: 96px")}>
                        {"순서"}
                      </th>
                      <th style={css("padding: 12px 10px; font-weight: 600; width: 180px")}>
                        {"이미지"}
                      </th>
                      <th style={css("padding: 12px 10px; font-weight: 600")}>
                        {"제목"}
                      </th>
                      <th style={css("padding: 12px 10px; font-weight: 600")}>
                        {"분류"}
                      </th>
                      <th style={css("padding: 12px 10px; font-weight: 600")}>
                        {"링크"}
                      </th>
                      <th style={css("padding: 12px 10px; font-weight: 600")}>
                        {"종료일"}
                      </th>
                      <th style={css("padding: 12px 10px; font-weight: 600; text-align: center")}>
                        {"사용"}
                      </th>
                      <th style={css("padding: 12px 20px 12px 10px; font-weight: 600; text-align: right")}>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(v.rows || []).map((b, _i1) => (
                      <React.Fragment key={_i1}>
                        <tr className="row-hover" style={css("border-top: 1px solid #EDF1E6")}>
                          <td style={css("padding: 12px 10px 12px 20px")}>
                            <div style={css("display: flex; gap: 4px")}>
                              <button className="ico-btn" aria-label={`${b.title ?? ""} 위로`} disabled={!!(b.isFirst) && b.isFirst !== 'false'} onClick={b.up} style={css("width: 36px; height: 36px; border-radius: 8px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0")}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M6 15l6-6 6 6" />
                                </svg>
                              </button>
                              <button className="ico-btn" aria-label={`${b.title ?? ""} 아래로`} disabled={!!(b.isLast) && b.isLast !== 'false'} onClick={b.down} style={css("width: 36px; height: 36px; border-radius: 8px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0")}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M6 9l6 6 6-6" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td style={css("padding: 12px 10px")}>
                            <img src={asset(b.img)} alt="" style={css(`width: 160px; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 8px; display: block; background: #DDE7D0; ${b.imgStyle ?? ""}`)} />
                          </td>
                          <td style={css("padding: 12px 10px")}>
                            <span style={css("font-weight: 600; font-size: 15px")}>
                              {b.title}
                            </span>
                            <span style={css("display: block; margin-top: 4px; font-size: 12px; color: #56634F")}>
                              {b.showTitle}
                            </span>
                          </td>
                          <td style={css("padding: 12px 10px; color: #56634F")}>
                            {b.catLabel}
                          </td>
                          <td style={css("padding: 12px 10px; color: #56634F; max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {b.link}
                          </td>
                          <td style={css("padding: 12px 10px; color: #56634F; white-space: nowrap")}>
                            {b.end}
                          </td>
                          <td style={css("padding: 12px 10px; text-align: center")}>
                            <button role="switch" aria-checked={b.onAria} aria-label={`${b.title ?? ""} 사용`} onClick={b.toggle} style={css(b.switchStyle)}>
                              <span style={css(b.knobStyle)} />
                            </button>
                          </td>
                          <td style={css("padding: 12px 20px 12px 10px; text-align: right; white-space: nowrap")}>
                            <button className="btn-ghost" onClick={b.edit} style={css("min-height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid #D3DCC6; background: #FFFFFF; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer")}>
                              {"수정"}
                            </button>
                            <button onClick={b.remove} style={css("min-height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid #E8B4AE; background: #FFFFFF; color: #B3261E; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; margin-left: 4px")}>
                              {"삭제"}
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {(v.panelOpen) ? (
              <>
              <div style={css("position: fixed; inset: 0; z-index: 40; background: rgba(14,24,10,0.45); display: flex; justify-content: flex-end")}>
                <form role="dialog" aria-modal="true" aria-labelledby="pn-t" onSubmit={v.saveForm} style={css("width: 100%; max-width: 480px; height: 100%; overflow-y: auto; background: #FFFFFF; padding: 28px; display: flex; flex-direction: column; gap: 18px")}>
                  <div style={css("display: flex; align-items: center; justify-content: space-between")}>
                    <h2 id="pn-t" style={css("margin: 0; font-size: 20px; font-weight: 700")}>
                      {v.panelTitle}
                    </h2>
                    <button type="button" aria-label="닫기" onClick={v.closePanel} style={css("width: 36px; height: 36px; border-radius: 8px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; width: 40px; height: 40px")}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <p style={css("margin: 0 0 8px; font-size: 14px; font-weight: 600")}>
                      {"이미지"}
                    </p>
                    <div style={css("position: relative; aspect-ratio: 16 / 9; border-radius: 12px; border: 2px dashed #C9D3BC; background: #F6F9F1; overflow: hidden; display: flex; align-items: center; justify-content: center")}>
                      {(v.f.hasImg) ? (
                        <>
                        <img src={asset(v.f.img)} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover")} />
                        </>
                      ) : null}
                      <span style={css("position: relative; display: inline-flex; align-items: center; gap: 6px; min-height: 40px; padding: 0 14px; border-radius: 10px; background: rgba(255,255,255,0.92); font-size: 14px; font-weight: 600; color: #1F3B16")}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 16V4M7 9l5-5 5 5" />
                          <path d="M5 20h14" />
                        </svg>
                        {" 사진 선택 (1920×1080 권장) "}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bt" style={css("display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600")}>
                      {"제목"}
                    </label>
                    <input id="bt" type="text" value={v.f.title ?? ''} onChange={v.onTitle} style={css("min-height: 44px; padding: 0 14px; width: 100%")} />
                  </div>
                  <label style={css("display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; min-height: 32px")}>
                    <input type="checkbox" checked={!!(v.f.showTitle) && v.f.showTitle !== 'false'} onChange={v.onShowTitle} style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                    {"제목을 사진 위에 표시"}
                  </label>
                  <div>
                    <label htmlFor="bc" style={css("display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600")}>
                      {"분류"}
                    </label>
                    <select id="bc" value={v.f.cat ?? ''} onChange={v.onFCat} style={css("min-height: 44px; padding: 0 14px; width: 100%")}>
                      <option value="main">
                        {"메인 이미지"}
                      </option>
                      <option value="sub">
                        {"서브 배너"}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bl" style={css("display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600")}>
                      {"링크 "}
                      <span style={css("font-weight: 400; color: #56634F")}>
                        {"(선택)"}
                      </span>
                    </label>
                    <input id="bl" type="text" placeholder="https://" value={v.f.link ?? ''} onChange={v.onLink} style={css("min-height: 44px; padding: 0 14px; width: 100%")} />
                  </div>
                  <div>
                    <label htmlFor="be" style={css("display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600")}>
                      {"종료일 "}
                      <span style={css("font-weight: 400; color: #56634F")}>
                        {"(비우면 계속 노출)"}
                      </span>
                    </label>
                    <input id="be" type="date" value={v.f.end ?? ''} onChange={v.onEnd} style={css("min-height: 44px; padding: 0 14px; width: 100%")} />
                  </div>
                  <div style={css("display: flex; justify-content: flex-end; gap: 8px; margin-top: auto; padding-top: 12px")}>
                    <button type="button" onClick={v.closePanel} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #D3DCC6; border-radius: 10px; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                      {"취소"}
                    </button>
                    <button type="submit" className="btn" style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                      {"저장"}
                    </button>
                  </div>
                </form>
              </div>
              </>
            ) : null}
          </main>
        </div>
        {(v.hasToast) ? (
          <>
          <div className="toast" role="status" style={css("position: fixed; left: 50%; bottom: 32px; transform: translateX(-50%); z-index: 50; display: flex; align-items: center; gap: 10px; padding: 14px 20px; border-radius: 12px; background: #1F3B16; color: #FFFFFF; font-size: 15px; box-shadow: 0 12px 30px rgba(14,24,10,0.3)")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8BC34A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            {" "}{v.toast}{" "}
          </div>
          </>
        ) : null}
      </div>
    </>
  );
}
