'use client';
// 이 파일은 tools/convert-design.mjs 가 design/Signup.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.field input:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.primary-btn:hover{background:#16290F}\n.primary-btn:disabled{background:#A9B5A0;cursor:not-allowed}\n.ghost-btn:hover{background:#EEF6E3}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list{transition:none !important}}\n@media (max-width: 860px){.nav-links{display:none !important}.nav-burger{display:flex !important}.step-label{display:none !important}}\n";

class Component extends DCLogic {
  renderVals() {
    const primary = this.props.primary ?? '#8BC34A';
    const st = this.state || {};
    const step = st.step || 1;
    const openSub = st.openSub || null;
    const agreeTerms = !!st.agreeTerms;
    const agreePrivacy = !!st.agreePrivacy;
    const f = Object.assign({ id: '', pw: '', pw2: '', name: '', nick: '', email: '', human: false }, st.f || {});
    const tried = !!st.tried;

    const LABELS = ['약관 동의', '회원정보 입력', '회원가입 완료'];
    const steps = LABELS.map((label, k) => {
      const n = k + 1; const done = n < step; const cur = n === step;
      return {
        n: String(n), label,
        current: cur ? 'step' : 'false',
        mark: done ? '✓' : String(n),
        dot: 'flex-shrink: 0; width: 38px; height: 38px; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; ' + (cur ? 'background: #1F3B16; color: #FFFFFF;' : done ? 'background: ' + primary + '; color: #1B2516;' : 'background: #FFFFFF; color: #56634F; border: 1px solid #C9D3BC;'),
        labelStyle: 'font-size: 15px; ' + (cur ? 'font-weight: 700; color: #1B2516;' : 'color: #56634F;'),
        line: n < 3 ? 'flex: 1; height: 2px; margin: 0 12px; background: ' + (done ? primary : '#D3DCC6') + ';' : 'display: none;'
      };
    });

    const ok = {
      id: /^[A-Za-z0-9_]{3,}$/.test(f.id),
      pw: f.pw.length >= 8,
      pw2: f.pw2.length > 0 && f.pw2 === f.pw,
      name: /^[가-힣A-Za-z\s]+$/.test(f.name.trim()),
      nick: /^[가-힣A-Za-z0-9]+$/.test(f.nick) && (/[가-힣]/.test(f.nick) ? f.nick.length >= 2 : f.nick.length >= 4),
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email),
      human: !!f.human
    };
    const BASE = { id: '영문자, 숫자, _ 만 입력 가능. 최소 3자이상 입력하세요.', pw: '8자 이상 입력하세요.', pw2: '비밀번호를 한 번 더 입력하세요.', name: '한글, 영어만 입력 가능합니다.', nick: '공백없이 한글, 영문, 숫자만 입력 가능. 한글 2자, 영문 4자 이상.', email: '가입 승인 안내를 이 주소로 보내드려요.', human: '' };
    const ERR = { id: '아이디 형식을 확인해 주세요.', pw: '비밀번호는 8자 이상이어야 해요.', pw2: '비밀번호가 서로 달라요.', name: '이름은 한글이나 영어로 입력해 주세요.', nick: '별명 형식을 확인해 주세요.', email: '이메일 주소를 확인해 주세요.', human: '자동등록방지를 체크해 주세요.' };
    const hint = {};
    Object.keys(BASE).forEach((k) => {
      const bad = tried && !ok[k];
      hint[k] = { text: bad ? ERR[k] : BASE[k], style: 'font-size: 13px; line-height: 1.5; ' + (bad ? 'color: #B42318; font-weight: 600;' : 'color: #56634F;') };
    });
    const set = {};
    ['id', 'pw', 'pw2', 'name', 'nick', 'email'].forEach((k) => {
      set[k] = (e) => this.setState({ f: Object.assign({}, f, { [k]: e.target.value }) });
    });

    const toTop = () => { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {} };
    const SUB = { 1: '회원가입을 위해 아래 이용약관과 개인정보 수집 및 이용 안내를 읽고 동의해 주세요', 2: '회원 가입에 필요한 정보를 입력해 주세요', 3: '가입 신청을 확인하고 있어요' };

    return {
      primary, steps, f, hint, set,
      subtitle: SUB[step],
      isStep1: step === 1, isStep2: step === 2, isStep3: step === 3,
      agreeTerms, agreePrivacy,
      allAgree: agreeTerms && agreePrivacy,
      cannotNext: !(agreeTerms && agreePrivacy),
      toggleAll: () => { const v = !(agreeTerms && agreePrivacy); this.setState({ agreeTerms: v, agreePrivacy: v }); },
      toggleTerms: () => this.setState({ agreeTerms: !agreeTerms }),
      togglePrivacy: () => this.setState({ agreePrivacy: !agreePrivacy }),
      toggleHuman: () => this.setState({ f: Object.assign({}, f, { human: !f.human }) }),
      toStep1: () => { this.setState({ step: 1 }); toTop(); },
      toStep2: () => { if (agreeTerms && agreePrivacy) { this.setState({ step: 2 }); toTop(); } },
      submit: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const all = Object.keys(ok).every((k) => ok[k]);
        if (all) { this.setState({ step: 3, tried: false }); toTop(); } else this.setState({ tried: true });
      },
      doneName: f.name.trim() || '새 가족',
      aboutCls: openSub === 'about' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "회원가입"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all; display: flex; flex-direction: column")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16; padding-bottom: 18px")}>
          <div className="util-bar" style={css("position: relative; display: flex; justify-content: flex-end; gap: 20px; padding: 14px 40px 0; font-size: 13px")}>
            <A href="Main.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"홈"}
            </A>
            <A href="Login.dc.html" style={css("color: rgba(255,255,255,0.9); text-decoration: none")}>
              {"로그인"}
            </A>
            <A href="Signup.dc.html" aria-current="page" style={css("color: #FFFFFF; text-decoration: underline")}>
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
        <main style={css("flex: 1; padding: 64px 24px 96px")}>
          <div style={css("max-width: 760px; margin: 0 auto")}>
            <div style={css("text-align: center; margin-bottom: 36px")}>
              <h1 style={css("margin: 0 0 8px; font-family: 'Gowun Batang', serif; font-size: 34px; font-weight: 700")}>
                {"회원가입"}
              </h1>
              <p style={css("margin: 0; font-size: 15px; color: #56634F")}>
                {v.subtitle}
              </p>
            </div>
            <ol aria-label="가입 단계" style={css("list-style: none; margin: 0 0 32px; padding: 0; display: flex; align-items: center; gap: 0")}>
              {(v.steps || []).map((s, _i0) => (
                <React.Fragment key={_i0}>
                  <li aria-current={s.current} style={css("flex: 1; display: flex; align-items: center; gap: 10px")}>
                    <span style={css(s.dot)}>
                      {s.mark}
                    </span>
                    <span style={css("display: flex; flex-direction: column; line-height: 1.3")}>
                      <span style={css("font-size: 12px; letter-spacing: 0.08em; color: #56634F; font-weight: 600")}>
                        {"STEP "}{s.n}
                      </span>
                      <span className="step-label" style={css(s.labelStyle)}>
                        {s.label}
                      </span>
                    </span>
                    <span aria-hidden="true" style={css(s.line)} />
                  </li>
                </React.Fragment>
              ))}
            </ol>
            <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 22px; padding: 36px; box-sizing: border-box")}>
              {(v.isStep1) ? (
                <>
                <div style={css("display: flex; flex-direction: column; gap: 24px")}>
                  <label style={css("display: flex; align-items: center; gap: 10px; padding: 16px 18px; border-radius: 12px; background: #EEF6E3; font-size: 16px; font-weight: 700; cursor: pointer")}>
                    <input type="checkbox" checked={!!(v.allAgree) && v.allAgree !== 'false'} onChange={v.toggleAll} style={css("width: 20px; height: 20px; accent-color: #4F8F25")} />
                    {" 이용약관 및 개인정보 수집·이용에 모두 동의합니다 "}
                  </label>
                  <section>
                    <div style={css("display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 10px")}>
                      <h2 style={css("margin: 0; font-size: 17px; font-weight: 700")}>
                        {"사이트 이용약관 "}
                        <span style={css("color: #B42318; font-size: 14px")}>
                          {"(필수)"}
                        </span>
                      </h2>
                      <label style={css("display: flex; align-items: center; gap: 8px; font-size: 15px; cursor: pointer; min-height: 40px")}>
                        <input type="checkbox" checked={!!(v.agreeTerms) && v.agreeTerms !== 'false'} onChange={v.toggleTerms} style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                        {" 동의 "}
                      </label>
                    </div>
                    <div tabIndex="0" aria-label="사이트 이용약관 내용" style={css("height: 170px; overflow-y: auto; padding: 18px 20px; border: 1px solid #D3DCC6; border-radius: 12px; background: #FAFCF7; font-size: 14px; line-height: 1.8; color: #2E3A28")}>
                      <p style={css("margin: 0; font-weight: 700")}>
                        {"제 1 조 약관의 목적"}
                      </p>
                      <p style={css("margin: 0 0 12px")}>
                        {"이 약관은 본 사이트가 제공하는 인터넷 서비스(이하 서비스)의 이용조건 및 절차에 관한 사항과 기타 필요사항을 규정함을 목적으로 합니다."}
                      </p>
                      <p style={css("margin: 0; font-weight: 700")}>
                        {"제 2 조 용어의 정의"}
                      </p>
                      <p style={css("margin: 0")}>
                        {"이 약관에서 사용하는 용어의 정의는 다음과 같습니다."}
                      </p>
                      <p style={css("margin: 0")}>
                        {"(1) 본 사이트 : 현재 사이트를 개설한 기관"}
                      </p>
                      <p style={css("margin: 0")}>
                        {"(2) 회원 : 본 사이트가 제시하는 본 약관에 동의하여 본 사이트 가입절차(계약)를 마치고, 본 사이트 가 제공하는 서비스를 받는 자를 말합니다."}
                      </p>
                      <p style={css("margin: 0")}>
                        {"(3) 이용자 : 회원을 비롯하여 본 사이트와 각각의 서비스 도메인을 방문하여 활동하는 모든 사용자"}
                      </p>
                    </div>
                  </section>
                  <section>
                    <div style={css("display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 10px")}>
                      <h2 style={css("margin: 0; font-size: 17px; font-weight: 700")}>
                        {"개인정보 수집 및 이용 "}
                        <span style={css("color: #B42318; font-size: 14px")}>
                          {"(필수)"}
                        </span>
                      </h2>
                      <label style={css("display: flex; align-items: center; gap: 8px; font-size: 15px; cursor: pointer; min-height: 40px")}>
                        <input type="checkbox" checked={!!(v.agreePrivacy) && v.agreePrivacy !== 'false'} onChange={v.togglePrivacy} style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                        {" 동의 "}
                      </label>
                    </div>
                    <div tabIndex="0" aria-label="개인정보 수집 및 이용 내용" style={css("height: 170px; overflow-y: auto; padding: 18px 20px; border: 1px solid #D3DCC6; border-radius: 12px; background: #FAFCF7; font-size: 14px; line-height: 1.8; color: #2E3A28")}>
                      <p style={css("margin: 0; font-weight: 700")}>
                        {"1. 이용자의 개인정보를 어떻게 사용하고 있습니까?"}
                      </p>
                      <p style={css("margin: 0 0 12px")}>
                        {"개별 회원에 대한 개인 맞춤서비스를 위한 자료로 사용합니다. 회원의 서비스 이용에 대한 통계를 수집하고, 이를 서비스정책에 반영(서비스 개편 및 확대)하기 위한 자료로 사용합니다. 이용자에게 회원메일을 보내는데 사용합니다."}
                      </p>
                      <p style={css("margin: 0; font-weight: 700")}>
                        {"2. 개인정보의 수집목적 및 이용목적"}
                      </p>
                      <p style={css("margin: 0")}>
                        {"\"개인정보\"라 함은 생존하는 개인에 관한 정보로서 정보에 포함되어 있는 성명, 주민등록번호 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함)를 말합니다"}
                      </p>
                    </div>
                  </section>
                  <p style={css("margin: 0; font-size: 13px; line-height: 1.7; color: #56634F")}>
                    {"본 사이트의 운영 목적에 맞지 않는 음란, 광고, 불법아이디등에 관련된 글이 등록될 경우에는 경고없이 아이디 삭제처리됩니다."}
                  </p>
                  <button className="primary-btn" onClick={v.toStep2} disabled={!!(v.cannotNext) && v.cannotNext !== 'false'} style={css("min-height: 52px; border: none; border-radius: 12px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 16px; font-weight: 700; cursor: pointer")}>
                    {"다음 단계"}
                  </button>
                </div>
                </>
              ) : null}
              {(v.isStep2) ? (
                <>
                <form onSubmit={v.submit} style={css("display: flex; flex-direction: column; gap: 20px")}>
                  <p style={css("margin: 0; font-size: 14px; color: #56634F")}>
                    <span style={css("color: #B42318; font-weight: 700")}>
                      {"*"}
                    </span>
                    {" 표시는 필수 입력 항목입니다."}
                  </p>
                  <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                    <label htmlFor="su-id" style={css("font-size: 15px; font-weight: 600")}>
                      {"아이디 "}
                      <span style={css("color: #B42318")}>
                        {"*"}
                      </span>
                    </label>
                    <input id="su-id" type="text" autoComplete="username" value={v.f.id ?? ''} onChange={v.set.id} aria-describedby="su-id-hint" style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; background: #FFFFFF")} />
                    <span id="su-id-hint" style={css(v.hint.id.style)}>
                      {v.hint.id.text}
                    </span>
                  </div>
                  <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px")}>
                    <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                      <label htmlFor="su-pw" style={css("font-size: 15px; font-weight: 600")}>
                        {"비밀번호 "}
                        <span style={css("color: #B42318")}>
                          {"*"}
                        </span>
                      </label>
                      <input id="su-pw" type="password" autoComplete="new-password" value={v.f.pw ?? ''} onChange={v.set.pw} style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; background: #FFFFFF")} />
                      <span style={css(v.hint.pw.style)}>
                        {v.hint.pw.text}
                      </span>
                    </div>
                    <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                      <label htmlFor="su-pw2" style={css("font-size: 15px; font-weight: 600")}>
                        {"비밀번호 재입력 "}
                        <span style={css("color: #B42318")}>
                          {"*"}
                        </span>
                      </label>
                      <input id="su-pw2" type="password" autoComplete="new-password" value={v.f.pw2 ?? ''} onChange={v.set.pw2} style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; background: #FFFFFF")} />
                      <span style={css(v.hint.pw2.style)}>
                        {v.hint.pw2.text}
                      </span>
                    </div>
                  </div>
                  <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px")}>
                    <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                      <label htmlFor="su-name" style={css("font-size: 15px; font-weight: 600")}>
                        {"이름 "}
                        <span style={css("color: #B42318")}>
                          {"*"}
                        </span>
                      </label>
                      <input id="su-name" type="text" autoComplete="name" value={v.f.name ?? ''} onChange={v.set.name} style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; background: #FFFFFF")} />
                      <span style={css(v.hint.name.style)}>
                        {v.hint.name.text}
                      </span>
                    </div>
                    <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                      <label htmlFor="su-nick" style={css("font-size: 15px; font-weight: 600")}>
                        {"별명 "}
                        <span style={css("color: #B42318")}>
                          {"*"}
                        </span>
                      </label>
                      <input id="su-nick" type="text" value={v.f.nick ?? ''} onChange={v.set.nick} style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; background: #FFFFFF")} />
                      <span style={css(v.hint.nick.style)}>
                        {v.hint.nick.text}
                      </span>
                    </div>
                  </div>
                  <div className="field" style={css("display: flex; flex-direction: column; gap: 6px")}>
                    <label htmlFor="su-email" style={css("font-size: 15px; font-weight: 600")}>
                      {"이메일 "}
                      <span style={css("color: #B42318")}>
                        {"*"}
                      </span>
                    </label>
                    <input id="su-email" type="email" autoComplete="email" value={v.f.email ?? ''} onChange={v.set.email} style={css("min-height: 48px; padding: 0 14px; border: 1px solid #C9D3BC; border-radius: 10px; font-family: inherit; font-size: 16px; background: #FFFFFF")} />
                    <span style={css(v.hint.email.style)}>
                      {v.hint.email.text}
                    </span>
                  </div>
                  <div style={css("display: flex; flex-direction: column; gap: 6px")}>
                    <span style={css("font-size: 15px; font-weight: 600")}>
                      {"자동등록방지 "}
                      <span style={css("color: #B42318")}>
                        {"*"}
                      </span>
                    </span>
                    <label style={css("display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: 1px solid #C9D3BC; border-radius: 10px; background: #FAFCF7; cursor: pointer; max-width: 320px")}>
                      <input type="checkbox" checked={!!(v.f.human) && v.f.human !== 'false'} onChange={v.toggleHuman} style={css("width: 22px; height: 22px; accent-color: #4F8F25")} />
                      <span style={css("font-size: 15px")}>
                        {"로봇이 아닙니다"}
                      </span>
                      <span style={css("margin-left: auto; font-size: 11px; color: #56634F")}>
                        {"[reCAPTCHA 자리]"}
                      </span>
                    </label>
                    <span style={css(v.hint.human.style)}>
                      {v.hint.human.text}
                    </span>
                  </div>
                  <fieldset style={css("margin: 0; padding: 0; border: none; display: flex; flex-direction: column; gap: 8px")}>
                    <legend style={css("font-size: 15px; font-weight: 600; margin-bottom: 8px")}>
                      {"수신확인"}
                    </legend>
                    <div style={css("display: flex; gap: 20px; flex-wrap: wrap")}>
                      <label style={css("display: flex; align-items: center; gap: 8px; font-size: 15px; cursor: pointer; min-height: 40px")}>
                        <input type="checkbox" style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                        {"메일링서비스"}
                      </label>
                      <label style={css("display: flex; align-items: center; gap: 8px; font-size: 15px; cursor: pointer; min-height: 40px")}>
                        <input type="checkbox" style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                        {"정보공개"}
                      </label>
                    </div>
                  </fieldset>
                  <div style={css("display: flex; gap: 10px; margin-top: 8px")}>
                    <button className="ghost-btn" type="button" onClick={v.toStep1} style={css("min-height: 52px; padding: 0 22px; border: 1px solid #C9D3BC; border-radius: 12px; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 16px; cursor: pointer")}>
                      {"이전"}
                    </button>
                    <button className="primary-btn" type="submit" style={css("flex: 1; min-height: 52px; border: none; border-radius: 12px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 16px; font-weight: 700; cursor: pointer")}>
                      {"회원가입"}
                    </button>
                  </div>
                </form>
                </>
              ) : null}
              {(v.isStep3) ? (
                <>
                <div style={css("text-align: center; padding: 20px 0")}>
                  <span style={css(`display: inline-flex; width: 72px; height: 72px; border-radius: 999px; background: ${v.primary ?? ""}; color: #1B2516; align-items: center; justify-content: center`)}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <h2 style={css("margin: 20px 0 10px; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                    {"가입 신청이 완료되었어요"}
                  </h2>
                  <p style={css("margin: 0 auto; max-width: 440px; font-size: 16px; line-height: 1.8; color: #2E3A28")}>
                    <b>
                      {v.doneName}
                    </b>
                    {"님, 예수원교회 홈페이지에 오신 것을 환영합니다. 관리자 승인이 완료되면 로그인해서 교인 전용 게시판과 앨범을 볼 수 있어요."}
                  </p>
                  <div style={css("display: flex; justify-content: center; gap: 10px; margin-top: 28px; flex-wrap: wrap")}>
                    <A href="Main.dc.html" className="ghost-btn" style={css("display: inline-flex; align-items: center; min-height: 52px; padding: 0 24px; border: 1px solid #C9D3BC; border-radius: 12px; color: #1B2516; text-decoration: none; font-size: 16px")}>
                      {"홈으로"}
                    </A>
                    <A href="Login.dc.html" className="primary-btn" style={css("display: inline-flex; align-items: center; min-height: 52px; padding: 0 28px; border-radius: 12px; background: #1F3B16; color: #FFFFFF; text-decoration: none; font-size: 16px; font-weight: 700")}>
                      {"로그인 화면으로"}
                    </A>
                  </div>
                </div>
                </>
              ) : null}
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
