'use client';
// 이 파일은 tools/convert-design.mjs 가 design/MemberMain.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.nav-item:hover .nav-dropdown a:nth-child(2){transition-delay:.04s}\n.nav-item:hover .nav-dropdown a:nth-child(3){transition-delay:.08s}\n.nav-item:hover .nav-dropdown a:nth-child(4){transition-delay:.12s}\n.nav-item:hover .nav-dropdown a:nth-child(5){transition-delay:.16s}\n.nav-item:hover .nav-dropdown a:nth-child(6){transition-delay:.20s}\n.nav-item:hover .nav-dropdown a:nth-child(7){transition-delay:.24s}\n.nav-item:hover .nav-dropdown a:nth-child(8){transition-delay:.28s}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list{transition:none !important}}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (max-width: 860px){\n  .nav-links{display:none !important}\n  .nav-burger{display:flex !important}\n  .gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}\n  .hero-title{font-size:38px !important}\n  .section-title{font-size:30px !important}\n  .quick-wrap{margin-top:-40px !important}\n}\n@media (max-width: 1000px){.quick-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important}}\n@media (max-width: 560px){.quick-grid{grid-template-columns:minmax(0,1fr) !important}}\n";

class Component extends DCLogic {
  renderVals() {
    const openSub = this.state ? this.state.openSub : null;
    return {
      primary: this.props.primary ?? '#8BC34A',
      aboutCls: openSub === 'about' ? 'open' : '',
      serveCls: openSub === 'serve' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      openServe: () => { if (openSub !== 'serve') this.setState({ openSub: 'serve' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "예수원교회 홈 (로그인)"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all")}>
        <section style={css("position: relative; min-height: 700px; color: #FFFFFF; display: flex; flex-direction: column; overflow: hidden; background: #1F3B16")}>
          <img src={asset("/_blob/c03a3e2bcf9d8de53ca200225920f242")} alt="예수원교회 청년부 단체 사진" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 60%")} />
          <div style={css("position: absolute; inset: 0; background: linear-gradient(180deg, rgba(14,24,10,0.65) 0%, rgba(14,24,10,0.10) 30%, rgba(14,24,10,0.05) 70%, rgba(14,24,10,0.45) 100%)")} />
          <div className="util-bar" style={css("position: relative; display: flex; justify-content: flex-end; gap: 20px; padding: 14px 40px 0; font-size: 13px")}>
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
          <header className="site-header" style={css("position: relative; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 40px 0; flex-wrap: wrap")}>
            <A href="#" style={css("display: flex; align-items: center; gap: 12px; text-decoration: none; color: #FFFFFF")}>
              <span style={css("display: flex; flex-direction: column; align-items: flex-start; gap: 5px")}>
                <img src={asset("/_blob/122f04b2c3721aa4a0194f5dc7c5de6e")} alt="예수원교회" style={css("height: 40px; width: auto; display: block")} />
                <span style={css("font-size: 11px; letter-spacing: 0.04em; opacity: 0.85")}>
                  {"Jesuwon Community Church (ARPC)"}
                </span>
              </span>
            </A>
            <nav className="nav-links" aria-label="주 메뉴" style={css("display: flex; gap: 36px; font-size: 17px; font-weight: 500")}>
              <div className="nav-item" style={css("position: relative")} onMouseLeave={v.closeSub}>
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
                    <A href="#visit" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
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
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
          <div style={css("position: relative; flex-grow: 1; display: flex; flex-direction: column; justify-content: flex-end; padding: 64px 40px 150px; max-width: 1200px; width: 100%; box-sizing: border-box; margin: 0 auto")}>
            <h1 style={css("position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); margin: 0")}>
              {"예수원교회"}
            </h1>
            <div style={css("display: flex; align-items: center; gap: 16px")}>
              <button aria-label="이전 사진" style={css("width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.6); background: rgba(0,0,0,0.15); color: #FFFFFF; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <span style={css("font-size: 14px; letter-spacing: 0.1em")}>
                <b>
                  {"01"}
                </b>
{" "}
                <span style={css("opacity: 0.7")}>
                  {"/ 04"}
                </span>
              </span>
              <button aria-label="다음 사진" style={css("width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.6); background: rgba(0,0,0,0.15); color: #FFFFFF; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              <span style={css("width: 120px; height: 3px; background: rgba(255,255,255,0.3); position: relative; border-radius: 2px")}>
                <span style={css(`position: absolute; left: 0; top: 0; height: 3px; width: 30px; background: ${v.primary ?? ""}; border-radius: 2px`)} />
              </span>
            </div>
          </div>
        </section>
        <section id="welcome" className="quick-wrap" style={css("position: relative; margin-top: -72px; padding: 0 40px")}>
          <div className="quick-grid" style={css("max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px")}>
            <A href="#" style={css("display: flex; gap: 16px; align-items: center; background: #FFFFFF; border-radius: 16px; padding: 24px; text-decoration: none; color: #1B2516; box-shadow: 0 10px 30px rgba(27,37,22,0.10)")}>
              <span style={css("flex-shrink: 0; width: 52px; height: 52px; border-radius: 14px; background: #E6F2D6; color: #2F5E17; display: flex; align-items: center; justify-content: center")}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v5" />
                  <path d="M9.5 4.5h5" />
                  <path d="M4 21V11l8-4 8 4v10" />
                  <path d="M2 21h20" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </span>
              <span style={css("display: flex; flex-direction: column; gap: 4px")}>
                <span style={css("font-size: 18px; font-weight: 700")}>
                  {"교회안내"}
                </span>
                <span style={css("font-size: 14px; color: #56634F")}>
                  {"예수원교회를 소개합니다"}
                </span>
              </span>
            </A>
            <A href="#" style={css("display: flex; gap: 16px; align-items: center; background: #FFFFFF; border-radius: 16px; padding: 24px; text-decoration: none; color: #1B2516; box-shadow: 0 10px 30px rgba(27,37,22,0.10)")}>
              <span style={css("flex-shrink: 0; width: 52px; height: 52px; border-radius: 14px; background: #E6F2D6; color: #2F5E17; display: flex; align-items: center; justify-content: center")}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <span style={css("display: flex; flex-direction: column; gap: 4px")}>
                <span style={css("font-size: 18px; font-weight: 700")}>
                  {"예배/모임 안내"}
                </span>
                <span style={css("font-size: 14px; color: rgb(86, 99, 79)")}>
                  {"예배 시간을 안내합니다"}
                </span>
              </span>
            </A>
            <A href="#" style={css("display: flex; gap: 16px; align-items: center; background: #FFFFFF; border-radius: 16px; padding: 24px; text-decoration: none; color: #1B2516; box-shadow: 0 10px 30px rgba(27,37,22,0.10)")}>
              <span style={css("flex-shrink: 0; width: 52px; height: 52px; border-radius: 14px; background: #E6F2D6; color: #2F5E17; display: flex; align-items: center; justify-content: center")}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
                </svg>
              </span>
              <span style={css("display: flex; flex-direction: column; gap: 4px")}>
                <span style={css("font-size: 18px; font-weight: 700")}>
                  {"새가족 환영"}
                </span>
                <span style={css("font-size: 14px; color: #56634F")}>
                  {"처음 오신 분을 안내합니다"}
                </span>
              </span>
            </A>
            <A href="#visit" style={css("display: flex; gap: 16px; align-items: center; background: #FFFFFF; border-radius: 16px; padding: 24px; text-decoration: none; color: #1B2516; box-shadow: 0 10px 30px rgba(27,37,22,0.10)")}>
              <span style={css("flex-shrink: 0; width: 52px; height: 52px; border-radius: 14px; background: #E6F2D6; color: #2F5E17; display: flex; align-items: center; justify-content: center")}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
                  <circle cx="12" cy="10" r="2.2" />
                </svg>
              </span>
              <span style={css("display: flex; flex-direction: column; gap: 4px")}>
                <span style={css("font-size: 18px; font-weight: 700")}>
                  {"오시는 길"}
                </span>
                <span style={css("font-size: 14px; color: rgb(86, 99, 79)")}>
                  {"교회 오시는 길 안내합니다"}
                </span>
              </span>
            </A>
          </div>
        </section>
        <section style={css("padding: 112px 40px 96px")}>
          <div style={css("max-width: 1200px; margin: 0 auto")}>
            <div style={css("text-align: center; margin-bottom: 56px")}>
              <p style={css("margin: 0 0 12px; font-size: 14px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                {"NEWS & COLUMN"}
              </p>
              <h2 className="section-title" style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 40px; font-weight: 700; line-height: 1.3")}>
                {"예수님과 함께, "}
                <span style={css("box-shadow: inset 0 -14px 0 rgba(120,190,60,0.40)")}>
                  {"새로운 삶"}
                </span>
                {"이 시작됩니다"}
              </h2>
              <p style={css("margin: 14px 0 0; font-size: 16px; color: #56634F")}>
                {"예수원교회 소식과 칼럼입니다"}
              </p>
            </div>
            <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px")}>
              <div style={css("background: #FFFFFF; border-radius: 20px; padding: 32px; border: 1px solid #E1E8D6")}>
                <div style={css("display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px")}>
                  <div style={css("display: flex; align-items: center; gap: 12px")}>
                    <span style={css(`width: 40px; height: 40px; border-radius: 10px; background: ${v.primary ?? ""}; color: #1B2516; display: flex; align-items: center; justify-content: center`)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z" />
                        <path d="M16 9a4 4 0 0 1 0 6" />
                      </svg>
                    </span>
                    <div>
                      <h3 style={css("margin: 0; font-size: 20px; font-weight: 700")}>
                        {"교회 소식"}
                      </h3>
                      <p style={css("margin: 2px 0 0; font-size: 13px; color: #56634F")}>
                        {"함께 나눌 소식입니다"}
                      </p>
                    </div>
                  </div>
                  <A href="#" style={css("font-size: 14px; font-weight: 600; text-decoration: none; padding: 10px 4px")}>
                    {"더보기 +"}
                  </A>
                </div>
                <div style={css("display: flex; flex-direction: column")}>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"10.11"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"10-11-2026 교회 소식"}
                    </span>
                    <span style={css(`font-size: 12px; font-weight: 700; color: #1B2516; background: ${v.primary ?? ""}; padding: 3px 8px; border-radius: 999px`)}>
                      {"NEW"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"10.04"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"10-04-2026 교회 소식"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"09.27"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"09-27-2026 교회 소식"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"09.20"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"09-20-2026 교회 소식"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; border-bottom: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"09.13"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"09-13-2026 교회 소식"}
                    </span>
                  </A>
                </div>
              </div>
              <div style={css("background: #FFFFFF; border-radius: 20px; padding: 32px; border: 1px solid #E1E8D6")}>
                <div style={css("display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px")}>
                  <div style={css("display: flex; align-items: center; gap: 12px")}>
                    <span style={css(`width: 40px; height: 40px; border-radius: 10px; background: ${v.primary ?? ""}; color: #1B2516; display: flex; align-items: center; justify-content: center`)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 20h4L19 9l-4-4L4 16v4z" />
                        <path d="M13 7l4 4" />
                      </svg>
                    </span>
                    <div>
                      <h3 style={css("margin: 0; font-size: 20px; font-weight: 700")}>
                        {"예수원 칼럼"}
                      </h3>
                      <p style={css("margin: 2px 0 0; font-size: 13px; color: #56634F")}>
                        {"함께 나눌 칼럼입니다"}
                      </p>
                    </div>
                  </div>
                  <A href="#" style={css("font-size: 14px; font-weight: 600; text-decoration: none; padding: 10px 4px")}>
                    {"더보기 +"}
                  </A>
                </div>
                <div style={css("display: flex; flex-direction: column")}>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"10.10"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"환대2: 빈손으로 방문하기 운동"}
                    </span>
                    <span style={css(`font-size: 12px; font-weight: 700; color: #1B2516; background: ${v.primary ?? ""}; padding: 3px 8px; border-radius: 999px`)}>
                      {"NEW"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"10.03"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"환대: 믿음의 증거이자 신자됨의 증표"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"09.26"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"기우(杞憂) ...손석진 목사"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"09.12"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"잘 다녀오겠습니다"}
                    </span>
                  </A>
                  <A href="#" style={css("display: flex; align-items: center; gap: 16px; padding: 14px 0; border-top: 1px solid #EDF1E6; border-bottom: 1px solid #EDF1E6; text-decoration: none; color: #1B2516")}>
                    <span style={css("flex-shrink: 0; width: 56px; text-align: center; font-size: 13px; font-weight: 700; color: #2F5E17; background: #E6F2D6; border-radius: 8px; padding: 6px 0")}>
                      {"09.05"}
                    </span>
                    <span style={css("flex-grow: 1; font-size: 16px")}>
                      {"26 목장별 911 운동 오픈"}
                    </span>
                  </A>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sermon" style={css(`background: ${v.primary ?? ""}; color: #1B2516; padding: 96px 40px`)}>
          <div style={css("max-width: 1200px; margin: 0 auto")}>
            <div style={css("display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 40px")}>
              <div>
                <p style={css("margin: 0 0 12px; font-size: 14px; letter-spacing: 0.14em; color: #1F3B16; font-weight: 700")}>
                  {"SUNDAY SERMON"}
                </p>
                <h2 className="section-title" style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 40px; font-weight: 700")}>
                  {"이번 주 말씀"}
                </h2>
              </div>
              <A href="#" style={css("display: inline-flex; align-items: center; gap: 8px; color: #FFFFFF; background: #1F3B16; text-decoration: none; font-weight: 600; font-size: 15px; padding: 12px 20px; border-radius: 999px")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2.5" y="5" width="19" height="14" rx="4" />
                  <path d="M10 9l5 3-5 3z" />
                </svg>
                {" 유튜브 채널 바로가기 "}
              </A>
            </div>
            <div style={css("display: flex; gap: 32px; flex-wrap: wrap")}>
              <div style={css("flex: 2 1 560px; min-width: 0")}>
                <div style={css("position: relative; aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; background: #1F3B16; display: flex; align-items: center; justify-content: center")}>
                  <img src={asset("/_blob/72151afb0684f751baac66b3cb43fee2")} alt="주일 예배 모습" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover")} />
                  <span style={css("position: absolute; inset: 0; background: rgba(14,24,10,0.35)")} />
                  <button aria-label="설교 영상 재생" style={css("position: relative; width: 84px; height: 84px; border-radius: 999px; border: none; background: #FFFFFF; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.3)")}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <div style={css("margin-top: 20px")}>
                  <p style={css("margin: 0; font-size: 14px; font-weight: 600; color: #2A4A1C")}>
                    {"2026.10.11 · Jesuwon Sermon"}
                  </p>
                  <h3 style={css("margin: 6px 0 0; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                    {"[설교 제목]"}
                  </h3>
                  <p style={css("margin: 8px 0 0; font-size: 15px; color: #2A4A1C")}>
                    {"본문 [성경 본문] · [설교자] 목사"}
                  </p>
                </div>
              </div>
              <div style={css("flex: 1 1 320px; min-width: 0; background: #FFFFFF; border-radius: 16px; padding: 24px")}>
                <div style={css("display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px")}>
                  <h3 style={css("margin: 0; font-size: 18px; font-weight: 700")}>
                    {"지난 설교 듣기"}
                  </h3>
                  <span style={css("font-size: 12px; color: #56634F")}>
                    {"MP3 · Google Drive"}
                  </span>
                </div>
                <div style={css("display: flex; flex-direction: column")}>
                  <div style={css("display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid #EDF1E6")}>
                    <button aria-label="설교 오디오 재생" style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 999px; border: none; background: #E6F2D6; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div style={css("flex-grow: 1; min-width: 0")}>
                      <p style={css("margin: 0; font-size: 15px; font-weight: 600")}>
                        {"[설교 제목]"}
                      </p>
                      <p style={css("margin: 2px 0 0; font-size: 13px; color: #56634F")}>
                        {"10.04 · [설교자]"}
                      </p>
                    </div>
                  </div>
                  <div style={css("display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid #EDF1E6")}>
                    <button aria-label="설교 오디오 재생" style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 999px; border: none; background: #E6F2D6; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div style={css("flex-grow: 1; min-width: 0")}>
                      <p style={css("margin: 0; font-size: 15px; font-weight: 600")}>
                        {"[설교 제목]"}
                      </p>
                      <p style={css("margin: 2px 0 0; font-size: 13px; color: #56634F")}>
                        {"09.27 · [설교자]"}
                      </p>
                    </div>
                  </div>
                  <div style={css("display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid #EDF1E6")}>
                    <button aria-label="설교 오디오 재생" style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 999px; border: none; background: #E6F2D6; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div style={css("flex-grow: 1; min-width: 0")}>
                      <p style={css("margin: 0; font-size: 15px; font-weight: 600")}>
                        {"[설교 제목]"}
                      </p>
                      <p style={css("margin: 2px 0 0; font-size: 13px; color: #56634F")}>
                        {"09.20 · [설교자]"}
                      </p>
                    </div>
                  </div>
                  <div style={css("display: flex; align-items: center; gap: 14px; padding: 14px 0")}>
                    <button aria-label="설교 오디오 재생" style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 999px; border: none; background: #E6F2D6; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div style={css("flex-grow: 1; min-width: 0")}>
                      <p style={css("margin: 0; font-size: 15px; font-weight: 600")}>
                        {"[설교 제목]"}
                      </p>
                      <p style={css("margin: 2px 0 0; font-size: 13px; color: #56634F")}>
                        {"09.13 · [설교자]"}
                      </p>
                    </div>
                  </div>
                </div>
                <A href="#" style={css("display: block; text-align: center; margin-top: 12px; text-decoration: none; font-weight: 700; font-size: 15px; padding: 10px")}>
                  {"설교 전체 목록 보기"}
                </A>
              </div>
            </div>
          </div>
        </section>
        <section style={css("padding: 96px 40px")}>
          <div style={css("max-width: 1200px; margin: 0 auto")}>
            <div style={css("display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: 28px")}>
              <div>
                <p style={css("margin: 0 0 12px; font-size: 14px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"PHOTO ALBUM"}
                </p>
                <h2 className="section-title" style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 40px; font-weight: 700")}>
                  {"사진으로 보는 예수원 이야기"}
                </h2>
              </div>
            </div>
            <div className="gallery-grid" style={css("display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 200px; gap: 12px")}>
              <A href="#" style={css("grid-column: span 2; grid-row: span 2; position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/6489da0f5546378e9b50a1ff96ca778e")} alt="강단 앞에 선 성도들" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
{" "}
              </A>
              <A href="#" style={css("position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/f62086b83dd2f386083d685b925d354c")} alt="둘러앉아 나누는 청소년들" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
{" "}
              </A>
              <A href="#" style={css("position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/b568f33a7810f54fd3fb292cb844ba5a")} alt="주일학교 어린이들 단체 사진" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
{" "}
              </A>
              <A href="#" style={css("position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/fe12d6810213c9cb1ff3d44a3b7b7f20")} alt="도심 야외 나들이 단체 사진" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
{" "}
              </A>
              <A href="#" style={css("position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/ded7ec6e4661727fcc616095c1299a2a")} alt="강단에서 찬양하는 청소년들" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
{" "}
              </A>
              <A href="#" style={css("position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/571fca60c66213ece3685d84d1b4dc9d")} alt="성도들의 교제 모임 단체 사진" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
              </A>
              <A href="#" style={css("position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/dbe4b4a927ade0c742cf1274d79bdd69")} alt="야외에서 함께한 성도들 단체 사진" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
              </A>
              <A href="#" style={css("position: relative; display: block; border-radius: 16px; overflow: hidden; background: #DDE7D0")}>
                <img src={asset("/_blob/9beacd5b9df300fc9009e32b13ca44e2")} alt="이야기를 나누는 두 성도" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
              </A>
              <A href="#" style={css(`position: relative; border-radius: 16px; overflow: hidden; background: ${v.primary ?? ""}; text-decoration: none; color: #1B2516; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px`)}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="9" cy="10" r="1.6" />
                  <path d="M21 16l-5-5-8 8" />
                </svg>
                <span style={css("font-size: 16px; font-weight: 700")}>
                  {"앨범 전체 보기"}
                </span>
              </A>
            </div>
          </div>
        </section>
        <section id="mission" style={css("background: #1F3B16; color: #FFFFFF; padding: 96px 40px")}>
          <div style={css("max-width: 1200px; margin: 0 auto")}>
            <div style={css("display: flex; gap: 48px; flex-wrap: wrap; align-items: center")}>
              <div style={css("flex: 3 1 520px; min-width: 0; position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 16 / 9; background: #2B4A20; display: flex; align-items: center; justify-content: center")}>
                <img src={asset("/_blob/cae33ee39b332afcd29250f7aa418fa4")} alt="탄자니아 선교 영상 썸네일" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block")} />
                <span style={css("position: absolute; inset: 0; background: rgba(10,18,8,0.30)")} />
                <button aria-label="탄자니아 선교 영상 재생" style={css("position: relative; width: 84px; height: 84px; border-radius: 999px; border: none; background: #FFFFFF; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.3)")}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span style={css("position: absolute; right: 16px; bottom: 14px; font-size: 13px; color: rgba(255,255,255,0.9)")}>
                  {"YouTube · Jesuwon Events"}
                </span>
                <span style={css(`position: absolute; left: 16px; top: 16px; display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #1B2516; background: ${v.primary ?? ""}; padding: 6px 12px; border-radius: 999px`)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3a14 14 0 0 1 0 18" />
                    <path d="M12 3a14 14 0 0 0 0 18" />
                  </svg>
                  {" 탄자니아 선교 2025 "}
                </span>
              </div>
              <div style={css("flex: 2 1 360px; min-width: 0")}>
                <p style={css(`margin: 0 0 12px; font-size: 14px; letter-spacing: 0.14em; color: ${v.primary ?? ""}; font-weight: 700`)}>
                  {"MISSION"}
                </p>
                <h2 className="section-title" style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 40px; font-weight: 700; line-height: 1.3")}>
                  {"땅끝까지,"}
                  <br />
                  {"복음과 사랑을 들고"}
                </h2>
                <p style={css("margin: 18px 0 0; font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.85)")}>
                  {"[선교 소개 문구. 예수원교회가 어떤 마음으로 선교지를 섬기는지 두세 문장으로 적어주세요.]"}
                </p>
                <div style={css("display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap")}>
                  <A href="#" style={css("display: inline-flex; align-items: center; gap: 8px; background: rgb(139, 195, 74); color: rgb(27, 37, 22); text-decoration: none; font-weight: 700; padding: 13px 22px; border-radius: 999px; font-size: 15px")}>
                    {"선교지 소식 보기"}
                  </A>
{" "}
                </div>
              </div>
            </div>
{" "}
          </div>
        </section>
        <section id="visit" style={css("background: #FFFFFF; padding: 96px 40px; border-top: 1px solid #E1E8D6")}>
          <div style={css("max-width: 1200px; margin: 0 auto")}>
            <div style={css("text-align: center; margin-bottom: 48px")}>
              <p style={css("margin: 0 0 12px; font-size: 14px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                {"VISIT US"}
              </p>
              <h2 className="section-title" style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 40px; font-weight: 700")}>
                {"예수원교회 "}
                <span style={css("box-shadow: inset 0 -14px 0 rgba(120,190,60,0.40)")}>
                  {"오시는 길"}
                </span>
              </h2>
            </div>
            <div style={css("display: flex; gap: 32px; flex-wrap: wrap")}>
              <div style={css("flex: 3 1 520px; min-width: 0; min-height: 380px; border-radius: 20px; overflow: hidden; position: relative; background-color: #E8EFE0; background-image: linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px); background-size: 40px 40px; display: flex; align-items: center; justify-content: center")}>
                <span style={css("display: flex; flex-direction: column; align-items: center; gap: 8px")}>
                  <span style={css("width: 56px; height: 56px; border-radius: 999px; background: #1F3B16; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(31,59,22,0.35)")}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
                      <circle cx="12" cy="10" r="2.2" />
                    </svg>
                  </span>
                  <span style={css("font-size: 14px; font-weight: 600; background: #FFFFFF; padding: 6px 12px; border-radius: 8px")}>
                    {"Google 지도 임베드"}
                  </span>
                </span>
              </div>
              <div style={css("flex: 2 1 340px; min-width: 0; display: flex; flex-direction: column; gap: 20px")}>
                <div style={css("display: flex; gap: 14px")}>
                  <span style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px; background: #E6F2D6; color: #2F5E17; display: flex; align-items: center; justify-content: center")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
                      <circle cx="12" cy="10" r="2.2" />
                    </svg>
                  </span>
                  <div>
                    <h3 style={css("margin: 0; font-size: 16px; font-weight: 700")}>
                      {"주소"}
                    </h3>
                    <p style={css("margin: 4px 0 0; font-size: 15px; color: #3B4735; line-height: 1.6")}>
                      {"220 Upland Avenue"}
                      <br />
                      {"Horsham, PA 19044"}
                    </p>
                  </div>
                </div>
                <div style={css("display: flex; gap: 14px")}>
                  <span style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px; background: #E6F2D6; color: #2F5E17; display: flex; align-items: center; justify-content: center")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="4" y="4" width="16" height="16" rx="3" />
                      <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
                    </svg>
                  </span>
                  <div>
                    <h3 style={css("margin: 0; font-size: 16px; font-weight: 700")}>
                      {"주차"}
                    </h3>
                    <p style={css("margin: 4px 0 0; font-size: 15px; color: #3B4735; line-height: 1.6")}>
                      {"[주차 안내]"}
                    </p>
                  </div>
                </div>
                <div style={css("display: flex; gap: 14px")}>
                  <span style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px; background: #E6F2D6; color: #2F5E17; display: flex; align-items: center; justify-content: center")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
                    </svg>
                  </span>
                  <div>
                    <h3 style={css("margin: 0; font-size: 16px; font-weight: 700")}>
                      {"연락처"}
                    </h3>
                    <p style={css("margin: 4px 0 0; font-size: 15px; color: #3B4735; line-height: 1.6")}>
                      {"484-686-1232"}
                      <br />
                      {"jesuwonch@gmail.com"}
                    </p>
                  </div>
                </div>
                <A href="#" style={css("margin-top: 8px; display: flex; align-items: center; gap: 16px; background: #F6F9F1; border: 1px solid #E1E8D6; border-radius: 16px; padding: 14px; text-decoration: none; color: #1B2516")}>
                  <span style={css("flex-shrink: 0; position: relative; width: 120px; aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden; background: #1F3B16; display: flex; align-items: center; justify-content: center")}>
                    <img src={asset("/_blob/62d7b1829b263a297dbfa7b04dadb1e6")} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover")} />
                    <span style={css("position: relative; width: 32px; height: 32px; border-radius: 999px; background: rgba(255,255,255,0.92); color: #1F3B16; display: flex; align-items: center; justify-content: center")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  <span style={css("display: flex; flex-direction: column; gap: 2px")}>
                    <span style={css("font-size: 13px; color: #56634F")}>
                      {"Jesuwon Events"}
                    </span>
                    <span style={css("font-size: 16px; font-weight: 700")}>
                      {"예수원교회 소개 (2024)"}
                    </span>
                  </span>
                </A>
              </div>
            </div>
          </div>
        </section>
        <footer style={css("background: #16220F; color: rgba(255,255,255,0.8); padding: 56px 40px 40px")}>
          <div style={css("max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap")}>
            <div style={css("display: flex; flex-direction: column; gap: 10px")}>
              <img src={asset("/_blob/122f04b2c3721aa4a0194f5dc7c5de6e")} alt="예수원교회" style={css("height: 34px; width: auto; align-self: flex-start; display: block")} />
              <span style={css("font-size: 14px; line-height: 1.8")}>
                {"Jesuwon Community Church in Philadelphia"}
                <br />
                {"220 Upland Avenue Horsham, PA 19044"}
                <br />
                {"Tel. 484-686-1232 · Email. jesuwonch@gmail.com"}
              </span>
            </div>
            <nav aria-label="하단 메뉴" style={css("display: flex; gap: 48px; flex-wrap: wrap; font-size: 14px")}>
              <div style={css("display: flex; flex-direction: column; gap: 10px")}>
                <span style={css("color: #FFFFFF; font-weight: 600")}>
                  {"교회"}
                </span>
                <A href="#" style={css("color: rgba(255,255,255,0.8); text-decoration: none")}>
                  {"교회안내"}
                </A>
                <A href="#" style={css("color: rgba(255,255,255,0.8); text-decoration: none")}>
                  {"목장"}
                </A>
                <A href="#" style={css("color: rgba(255,255,255,0.8); text-decoration: none")}>
                  {"오시는 길"}
                </A>
              </div>
              <div style={css("display: flex; flex-direction: column; gap: 10px")}>
                <span style={css("color: #FFFFFF; font-weight: 600")}>
                  {"말씀과 사역"}
                </span>
                <A href="#" style={css("color: rgba(255,255,255,0.8); text-decoration: none")}>
                  {"주일 설교"}
                </A>
                <A href="#" style={css("color: rgba(255,255,255,0.8); text-decoration: none")}>
                  {"예수원 칼럼"}
                </A>
              </div>
              <div style={css("display: flex; flex-direction: column; gap: 10px")}>
                <span style={css("color: #FFFFFF; font-weight: 600")}>
                  {"채널"}
                </span>
                <A href="#" style={css("color: rgba(255,255,255,0.8); text-decoration: none")}>
                  {"YouTube"}
                </A>
                <A href="#" style={css("color: rgba(255,255,255,0.8); text-decoration: none")}>
                  {"카카오톡 채널"}
                </A>
              </div>
            </nav>
          </div>
          <div style={css("max-width: 1200px; margin: 40px auto 0; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 13px; color: rgba(255,255,255,0.6)")}>
            {"Copyright © 2023- 예수원교회. All rights reserved."}
          </div>
        </footer>
      </div>
    </>
  );
}
