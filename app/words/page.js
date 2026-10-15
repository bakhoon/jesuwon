'use client';
// 이 파일은 tools/convert-design.mjs 가 design/Words.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.tab-btn:hover{background:#EEF6E3}\n.row-btn{transition:background .15s}\n.row-btn:hover{background:#F3F8EC}\n.row-btn:hover .row-title{color:#2F5E17;text-decoration:underline}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.nav-item:hover .nav-dropdown a:nth-child(2){transition-delay:.04s}\n.nav-item:hover .nav-dropdown a:nth-child(3){transition-delay:.08s}\n.nav-item:hover .nav-dropdown a:nth-child(4){transition-delay:.12s}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list{transition:none !important}}\n@media (max-width: 860px){\n  .nav-links{display:none !important}\n  .nav-burger{display:flex !important}\n  .page-title{font-size:34px !important}\n  .row-date{display:none !important}\n}\n";

class Component extends DCLogic {
  renderVals() {
    const primary = this.props.primary ?? '#8BC34A';
    const st = this.state || {};
    const tab = st.tab || 'video';
    const sel = typeof st.sel === 'number' ? st.sel : -1;
    const q = st.q || '';
    const openSub = st.openSub || null;

    const DATA = {
      video: {
        label: '영상칼럼', eyebrow: 'VIDEO COLUMN', series: '소통의 삶',
        items: [
          ['2020-12-29', '소통의 삶[14]: 분노 다스리기', '14'],
          ['2020-12-15', '소통의 삶[13]: 갈등언어 죽이기', '13'],
          ['2020-12-09', '소통의 삶[12]: 말씨', '12'],
          ['2020-12-01', '소통의 삶[11]: 소통의 매너', '11'],
          ['2020-11-17', '소통의 삶[10]: 조급한 말, 사려깊은 말', '10'],
          ['2020-11-10', '소통의 삶[9] - 거짓된 말, 진실한 말', '9'],
          ['2020-11-03', '소통의 삶[8] - 수다스러운 말, 침묵하는 말', '8'],
          ['2020-10-20', '소통의 삶[7]: 중상하는 말', '7'],
          ['2020-10-14', '소통의 삶[6]: 비난하는 말, 세워주는 말', '6'],
          ['2020-10-07', '소통의 삶[5]: 아는 체하는 말', '5'],
          ['2020-09-22', '소통의 삶[4]: 솔직한 말?', '4'],
          ['2020-09-15', '소통의 삶[3]: 무례한 말 : 대접하는 말', '3'],
          ['2020-09-08', '소통의 삶[2]: 자아에 골똘한 말: 상대를 돌아…', '2'],
          ['2020-09-01', '소통의 삶[1]: 낙담시키는 말: 격려하는 말 (1)', '1']
        ]
      },
      doctrine: {
        label: '교리강좌', eyebrow: 'DOCTRINE CLASS', series: '칠교산 시리즈',
        items: [
          ['2020-11-19', '[7교산 11강] 웨스트민스터 소요리문답', '11'],
          ['2020-11-05', '[7교산 10강] 웨스트민스터 소요리문답 36', '10'],
          ['2020-10-22', '[7교산 9강] 웨스트민스터 소요리문답 39문', '9'],
          ['2020-10-15', '[7교산 8강] 웨스트민스터 소요리문답 38문', '8'],
          ['2020-10-08', '[7교산 7강] 웨스트민스터 소요리문답 37문', '7'],
          ['2020-10-01', '[7교산 6강] 웨스트민스터 소요리문답 34문', '6'],
          ['2020-09-24', '[7교산 5강] 웨스트민스터 소요리문답 33문', '5'],
          ['2020-09-17', '[7교산 4강] 웨스트민스터 소요리문답 21문', '4'],
          ['2020-09-11', '[7교산 3강] 웨스트민스터 소요리문답 16문', '3'],
          ['2020-09-03', '[7교산 2강] 웨스트민스터 소요리문답 7문', '2'],
          ['2020-08-27', '[7교산 1강] 웨스트민스터 소요리문답 1문', '1']
        ]
      }
    };
    const cur = DATA[tab];
    const items = cur.items.map((r, i) => ({ i, date: r[0], title: r[1], num: r[2] }));

    const toTop = () => { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {} };
    const switchTab = (id) => (e) => {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ tab: id, sel: -1, q: '', openSub: null });
    };

    const base = 'flex-shrink: 0; min-height: 56px; padding: 0 22px; border: none; background: transparent; font-family: inherit; font-size: 16px; cursor: pointer; white-space: nowrap;';
    const tabs = ['video', 'doctrine'].map((id) => {
      const on = id === tab;
      return {
        label: DATA[id].label,
        selected: on ? 'true' : 'false',
        style: base + (on ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 ' + primary + ';' : ' color: #56634F; font-weight: 500;'),
        pick: switchTab(id)
      };
    });

    const needle = q.trim().toLowerCase();
    const filtered = needle ? items.filter((it) => it.title.toLowerCase().includes(needle)) : items;
    const rowBase = 'width: 100%; display: flex; align-items: center; gap: 18px; padding: 14px 20px; border: none; border-top: 1px solid #EDF1E6; font-family: inherit; cursor: pointer; text-align: left;';
    const rows = filtered.map((it, k) => ({
      date: it.date,
      title: it.title,
      num: it.num,
      ariaCurrent: it.i === sel ? 'true' : 'false',
      style: rowBase + (k === 0 ? ' border-top: none;' : '') + (it.i === sel ? ' background: #EEF6E3;' : ' background: transparent;'),
      pick: () => { this.setState({ sel: it.i }); toTop(); }
    }));

    const current = sel >= 0 && items[sel]
      ? { date: items[sel].date, title: items[sel].title, series: cur.series, videoTitle: items[sel].title }
      : { date: '', title: '', series: '', videoTitle: '' };

    return {
      primary,
      tabs,
      rows,
      q,
      isEmpty: rows.length === 0,
      eyebrow: cur.eyebrow,
      pageTitle: cur.label,
      hasCurrent: sel >= 0,
      current,
      noPrev: sel <= 0,
      noNext: sel < 0 || sel >= items.length - 1,
      goPrev: () => { if (sel > 0) this.setState({ sel: sel - 1 }); },
      goNext: () => { if (sel >= 0 && sel < items.length - 1) this.setState({ sel: sel + 1 }); },
      closeDetail: () => this.setState({ sel: -1 }),
      onQ: (e) => this.setState({ q: e.target.value }),
      noSubmit: (e) => { if (e && e.preventDefault) e.preventDefault(); },
      goVideo: switchTab('video'),
      goDoctrine: switchTab('doctrine'),
      aboutCls: openSub === 'about' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "예배와 말씀"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16")}>
          <img src={asset("/_blob/72151afb0684f751baac66b3cb43fee2")} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover")} />
          <div style={css("position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,38,14,0.88) 0%, rgba(20,38,14,0.72) 100%)")} />
          <div className="util-bar" style={css("position: relative; display: flex; justify-content: flex-end; gap: 20px; padding: 14px 40px 0; font-size: 13px")}>
            <A href="Main.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"홈"}
            </A>
            <A href="Login.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"로그인"}
            </A>
            <A href="Signup.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"회원가입"}
            </A>
          </div>
          <header className="site-header" style={css("position: relative; z-index: 30; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 40px 0; flex-wrap: wrap")}>
            <A href="Main.dc.html" style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF")}>
              <span style={css("display: flex; flex-direction: column; align-items: flex-start; gap: 5px")}>
                <img src={asset("/_blob/122f04b2c3721aa4a0194f5dc7c5de6e")} alt="예수원교회" style={css("height: 40px; width: auto; display: block")} />
                <span style={css("font-size: 11px; letter-spacing: 0.04em; opacity: 0.85")}>
                  {"Jesuwon Community Church (ARPC)"}
                </span>
              </span>
            </A>
            <nav className="nav-links" aria-label="주 메뉴" style={css("display: flex; gap: 36px; font-size: 17px; font-weight: 500")}>
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
                    <A href="Main.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
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
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 목장 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="Mokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"장년목장"}
                    </A>
                    <A href="Mokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"탄자니아초원"}
                    </A>
                    <A href="Mokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"인디오초원"}
                    </A>
                    <A href="Mokjang.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"주일학교"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" Ufeedem "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="Ufeedem.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"선교지 소식"}
                    </A>
                    <A href="Ufeedem.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"사랑의 나눔"}
                    </A>
                    <A href="Ufeedem.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"GST 신학교"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 쉴만한 물가 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; right: 0; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="Rest.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"사진 앨범"}
                    </A>
                    <A href="Rest.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
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
              <A href="Main.dc.html" style={css("color: rgba(255,255,255,0.85); text-decoration: none")}>
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
        <main style={css("max-width: 1000px; margin: 0 auto; padding: 56px 40px 96px; box-sizing: border-box")}>
          {(v.hasCurrent) ? (
            <>
            <article style={css("margin-bottom: 56px")}>
              <div style={css("display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px")}>
                <span style={css(`font-size: 13px; font-weight: 700; color: #1B2516; background: ${v.primary ?? ""}; padding: 5px 12px; border-radius: 999px`)}>
                  {v.current.series}
                </span>
                <span style={css("font-size: 14px; color: #56634F")}>
                  {"설교일 "}{v.current.date}
                </span>
              </div>
              <h2 style={css("margin: 0 0 24px; font-family: 'Gowun Batang', serif; font-size: 32px; font-weight: 700; line-height: 1.35")}>
                {v.current.title}
              </h2>
              <div style={css("position: relative; aspect-ratio: 16 / 9; border-radius: 18px; overflow: hidden; background: #14240E; display: flex; align-items: center; justify-content: center")}>
                <div style={css("position: absolute; inset: 0; background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 22px)")} />
                <div style={css("position: absolute; left: 20px; top: 18px; display: flex; align-items: center; gap: 10px; color: #FFFFFF")}>
                  <span style={css(`width: 34px; height: 34px; border-radius: 999px; background: ${v.primary ?? ""}; color: #1B2516; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700`)}>
                    {"예수원"}
                  </span>
                  <span style={css("display: flex; flex-direction: column; line-height: 1.3")}>
                    <span style={css("font-size: 15px; font-weight: 600")}>
                      {v.current.videoTitle}
                    </span>
                    <span style={css("font-size: 12px; color: rgba(255,255,255,0.7)")}>
                      {"Jesuwon Discipleship"}
                    </span>
                  </span>
                </div>
                <button aria-label="영상 재생" style={css("position: relative; width: 84px; height: 84px; border-radius: 999px; border: none; background: #FFFFFF; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.35)")}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span style={css("position: absolute; right: 18px; bottom: 14px; font-size: 13px; color: rgba(255,255,255,0.75)")}>
                  {"YouTube 영상 임베드"}
                </span>
              </div>
              <div style={css("display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 20px")}>
                <div style={css("display: flex; gap: 8px")}>
                  <button onClick={v.goPrev} disabled={!!(v.noPrev) && v.noPrev !== 'false'} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 16px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; cursor: pointer")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 6l-6 6 6 6" />
                    </svg>
                    {" 이전 강의 "}
                  </button>
                  <button onClick={v.goNext} disabled={!!(v.noNext) && v.noNext !== 'false'} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 16px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; cursor: pointer")}>
                    {" 다음 강의 "}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
                <button onClick={v.closeDetail} style={css("display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 18px; border-radius: 10px; border: none; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer")}>
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
              <form role="search" style={css("display: flex; align-items: center; gap: 8px")} onSubmit={v.noSubmit}>
                <label htmlFor="word-search" style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)")}>
                  {"제목 검색"}
                </label>
                <div style={css("display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1px solid #D3DCC6; background: #FFFFFF; width: 260px; max-width: 100%; box-sizing: border-box")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56634F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                  <input id="word-search" type="search" placeholder="제목으로 검색" value={v.q ?? ''} onChange={v.onQ} style={css("flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-family: inherit; font-size: 15px; color: #1B2516")} />
                </div>
              </form>
            </div>
            <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
              {(v.rows || []).map((r, _i1) => (
                <React.Fragment key={_i1}>
                  <button className="row-btn" onClick={r.pick} aria-current={r.ariaCurrent} style={css(r.style)}>
                    <span style={css("flex-shrink: 0; position: relative; width: 112px; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; background: #1F3B16; display: flex; align-items: center; justify-content: center")}>
                      <span style={css(`position: absolute; left: 8px; top: 6px; font-family: 'Gowun Batang', serif; font-size: 13px; font-weight: 700; color: ${v.primary ?? ""}`)}>
                        {r.num}
                      </span>
                      <span style={css("width: 26px; height: 26px; border-radius: 999px; background: rgba(255,255,255,0.92); color: #1F3B16; display: flex; align-items: center; justify-content: center")}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                    <span className="row-date" style={css("flex-shrink: 0; width: 96px; font-size: 14px; color: #56634F")}>
                      {r.date}
                    </span>
                    <span className="row-title" style={css("flex: 1; min-width: 0; font-size: 16px; font-weight: 500; color: #1B2516; text-align: left")}>
                      {r.title}
                    </span>
                    <span style={css("flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #B42318; background: #FDECEA; padding: 4px 10px; border-radius: 999px")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
                      </svg>
                      {" YouTube "}
                    </span>
                  </button>
                </React.Fragment>
              ))}
              {(v.isEmpty) ? (
                <>
                <p style={css("margin: 0; padding: 48px 24px; text-align: center; font-size: 15px; color: #56634F")}>
                  {"\""}{v.q}{"\"에 맞는 영상이 없어요."}
                </p>
                </>
              ) : null}
            </div>
          </section>
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
