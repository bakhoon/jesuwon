'use client';
// 이 파일은 tools/convert-design.mjs 가 design/Login.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.field input:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.primary-btn:hover{background:#16290F}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list{transition:none !important}}\n@media (max-width: 860px){.nav-links{display:none !important}.nav-burger{display:flex !important}}\n";

class Component extends DCLogic {
  renderVals() {
    const st = this.state || {};
    const openSub = st.openSub || null;
    const uid = st.uid || '';
    const pw = st.pw || '';
    const msg = st.msg || '';
    const ok = !!st.ok;
    return {
      primary: this.props.primary ?? '#8BC34A',
      uid, pw, msg,
      hasMsg: !!msg,
      msgStyle: ok ? 'background: #EEF6E3; color: #1F3B16;' : 'background: #FDECEA; color: #8A1C12;',
      onId: (e) => this.setState({ uid: e.target.value, msg: '' }),
      onPw: (e) => this.setState({ pw: e.target.value, msg: '' }),
      onLogin: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!uid.trim() || !pw) this.setState({ msg: '아이디와 비밀번호를 모두 입력해 주세요.', ok: false });
        else { this.setState({ msg: '체험용 로그인이에요. 잠시 후 이동합니다.', ok: true }); setTimeout(() => { window.location.href = (process.env.NEXT_PUBLIC_BASE_PATH || '') + (uid.trim().toLowerCase() === 'admin' ? '/admin/' : '/member/'); }, 500); }
      },
      aboutCls: openSub === 'about' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "로그인"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all; display: flex; flex-direction: column")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16; padding-bottom: 18px")}>
          <div className="util-bar" style={css("position: relative; display: flex; justify-content: flex-end; gap: 20px; padding: 14px 40px 0; font-size: 13px")}>
            <A href="Main.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"홈"}
            </A>
            <A href="Login.dc.html" aria-current="page" style={css("color: #FFFFFF; text-decoration: underline")}>
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
                <A href="Words.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
                  {" 예배와 말씀 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="Words.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"영상칼럼"}
                    </A>
                    <A href="Words.dc.html" style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"교리강좌"}
                    </A>
                  </div>
                </div>
              </div>
              <div className="nav-item" style={css("position: relative")}>
                <A href="Mokjang.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
                <A href="Ufeedem.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
                <A href="Rest.dc.html" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
        </section>
        <main style={css("flex: 1; display: flex; align-items: center; justify-content: center; padding: 80px 24px 96px")}>
          <div style={css("width: 100%; max-width: 440px; background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 24px; padding: 44px 40px; box-sizing: border-box; box-shadow: 0 20px 50px rgba(27,37,22,0.08)")}>
            <div style={css("text-align: center; margin-bottom: 32px")}>
              <img src={asset("/_blob/1c84b3aa898c9497920a297107dc5bb1")} alt="예수원교회" style={css("height: 40px; width: auto; display: inline-block")} />
              <h1 style={css("margin: 22px 0 6px; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                {"로그인"}
              </h1>
              <p style={css("margin: 0; font-size: 15px; color: #56634F")}>
                {"가입하신 아이디로 로그인해 주세요"}
              </p>
            </div>
            <form onSubmit={v.onLogin} style={css("display: flex; flex-direction: column; gap: 16px")}>
              <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                <label htmlFor="login-id" style={css("font-size: 14px; font-weight: 600")}>
                  {"아이디"}
                </label>
                <input id="login-id" type="text" autoComplete="username" placeholder="아이디를 입력하세요" value={v.uid ?? ''} onChange={v.onId} style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; color: #1B2516; background: #FFFFFF")} />
              </div>
              <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                <label htmlFor="login-pw" style={css("font-size: 14px; font-weight: 600")}>
                  {"비밀번호"}
                </label>
                <input id="login-pw" type="password" autoComplete="current-password" placeholder="비밀번호를 입력하세요" value={v.pw ?? ''} onChange={v.onPw} style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; color: #1B2516; background: #FFFFFF")} />
              </div>
              <label style={css("display: flex; align-items: center; gap: 8px; font-size: 14px; color: #3B4735; cursor: pointer; min-height: 32px")}>
                <input type="checkbox" style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                {" 로그인 상태 유지 "}
              </label>
              {(v.hasMsg) ? (
                <>
                <p role="alert" style={css(`margin: 0; padding: 12px 14px; border-radius: 10px; font-size: 14px; ${v.msgStyle ?? ""}`)}>
                  {v.msg}
                </p>
                </>
              ) : null}
              <button className="primary-btn" type="submit" style={css("min-height: 52px; border: none; border-radius: 12px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 16px; font-weight: 700; cursor: pointer; margin-top: 4px")}>
                {"로그인"}
              </button>
            </form>
            <div style={css("display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 24px; font-size: 14px")}>
              <A href="#" style={css("color: #56634F; text-decoration: none; padding: 8px 4px")}>
                {"아이디/비밀번호 찾기"}
              </A>
              <span aria-hidden="true" style={css("width: 1px; height: 14px; background: #D3DCC6")} />
              <A href="Signup.dc.html" style={css("font-weight: 700; text-decoration: none; padding: 8px 4px")}>
                {"회원가입"}
              </A>
            </div>
          </div>
        </main>
        <footer style={css("background: #16220F; color: rgba(255,255,255,0.8); padding: 40px 40px 32px")}>
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
          <div style={css("max-width: 1200px; margin: 28px auto 0; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 13px; color: rgba(255,255,255,0.6)")}>
            {"Copyright © 2023- 예수원교회. All rights reserved."}
          </div>
        </footer>
      </div>
    </>
  );
}
