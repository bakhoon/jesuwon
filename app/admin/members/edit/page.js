'use client';
// 이 파일은 tools/convert-design.mjs 가 design/AdminMemberEdit.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F3F5EF}\n*{box-sizing:border-box}\na{color:#2F5E17}\n.side-link{transition:background .15s,color .15s}\n.side-link:hover{background:rgba(255,255,255,0.08);color:#FFFFFF}\n.btn{transition:filter .15s,background .15s}\n.btn:hover{filter:brightness(0.95)}\n.btn-ghost:hover{background:#EEF6E3 !important}\n.row-hover:hover{background:#F8FBF4}\n.adm input[type=text],.adm input[type=email],.adm input[type=password],.adm input[type=number],.adm input[type=date],.adm input[type=search],.adm select,.adm textarea{font-family:inherit;font-size:15px;color:#1B2516;background:#FFFFFF;border:1px solid #C9D3BC;border-radius:10px}\n.adm input:focus,.adm select:focus,.adm textarea:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.adm button:focus-visible,.adm a:focus-visible{outline:3px solid #8BC34A;outline-offset:2px}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n.toast{animation:toastIn .25s ease}\n@keyframes toastIn{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}\n@media (prefers-reduced-motion: reduce){.toast{animation:none}}\n@media (max-width: 960px){.adm-side{display:none !important}.adm-main{padding:20px !important}}\n@media (max-width: 700px){.adm form > section > div{grid-template-columns:1fr !important;gap:6px !important}}\n";

class Component extends DCLogic {
  flash(msg) {
    this.setState({ toast: msg });
    clearTimeout(this._t);
    this._t = setTimeout(() => this.setState({ toast: '' }), 2200);
  }
  renderVals() {
    const st = this.state || {};
    const g = (k, d) => (st[k] === undefined ? d : st[k]);
    const name = g('name', '김하늘');
    const nick = g('nick', '하늘');
    const email = g('email', 'haneul@example.com');
    const role = g('role', 'member');
    const block = g('block', '');
    const set = (p) => this.setState(p);
    const today = '2026-10-14';
    const seg = (cur, key, opts) => (opts || [['yes', '예'], ['no', '아니오']]).map(([v, label]) => ({
      label, on: cur === v ? 'true' : 'false', pick: () => set({ [key]: v }),
      style: 'min-height: 40px; padding: 0 18px; border-radius: 999px; font-family: inherit; font-size: 14px; cursor: pointer; ' + (cur === v ? 'border: none; background: #1F3B16; color: #FFFFFF; font-weight: 700;' : 'border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516;')
    }));
    const status = block ? ['접근 차단', '#FDF3F2', '#B3261E'] : ['정상', '#EEF6E3', '#2F5E17'];
    return {
      name, nick, email, block,
      pw: g('pw', ''),
      initial: (name || '?').slice(0, 1),
      pendingCount: '3',
      roleOpts: seg(role, 'role', [['member', '회원'], ['admin', '관리자']]),
      statusLabel: status[0],
      statusStyle: 'padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; background: ' + status[1] + '; color: ' + status[2],
      onPw: (e) => set({ pw: e.target.value }), onName: (e) => set({ name: e.target.value }), onNick: (e) => set({ nick: e.target.value }),
      onEmail: (e) => set({ email: e.target.value }),
      setBlock: () => set({ block: today }), clearBlock: () => set({ block: '' }),
      save: (e) => { if (e && e.preventDefault) e.preventDefault(); set({ pw: '' }); this.flash('회원 정보를 저장했어요'); },
      confirmDel: !!st.confirmDel,
      askDelete: () => set({ confirmDel: true }), cancelDelete: () => set({ confirmDel: false }),
      doDelete: () => { set({ confirmDel: false }); this.flash(name + '님을 삭제했어요 (디자인 미리보기)'); },
      hasToast: !!st.toast, toast: st.toast || ''
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "관리자 · 회원정보 수정"; }, []);
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
            <A className="side-link" href="AdminMembers.dc.html" aria-current="page" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; background: #8BC34A; color: #1B2516; font-weight: 700")}>
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
            <A className="side-link" href="AdminBanner.dc.html" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; color: rgba(255,255,255,0.82); font-weight: 500")}>
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
                {"관리자 › 회원 관리 › 회원정보 수정"}
              </p>
              <h1 style={css("margin: 2px 0 0; font-family: 'Gowun Batang', serif; font-size: 26px; font-weight: 700")}>
                {"회원정보 수정"}
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
            <form onSubmit={v.save} style={css("max-width: 860px")}>
              <div style={css("display: flex; align-items: center; gap: 16px; background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 20px 28px; margin-bottom: 20px")}>
                <span style={css("width: 56px; height: 56px; border-radius: 999px; background: #EEF6E3; color: #2F5E17; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700")} aria-hidden="true">
                  {v.initial}
                </span>
                <div style={css("flex: 1")}>
                  <p style={css("margin: 0; font-size: 20px; font-weight: 700")}>
                    {v.name}{" "}
                    <span style={css("font-size: 15px; font-weight: 500; color: #56634F")}>
                      {"haneul01"}
                    </span>
                  </p>
                  <p style={css("margin: 4px 0 0; font-size: 14px; color: #56634F")}>
                    {"가입 2026-08-20 08:41 · 최근 접속 2026-10-12 10:07"}
                  </p>
                </div>
                <span style={css(v.statusStyle)}>
                  {v.statusLabel}
                </span>
              </div>
              <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 8px 28px 12px; margin-bottom: 20px")}>
                <h2 style={css("margin: 16px 0 8px; font-size: 17px; font-weight: 700")}>
                  {"계정"}
                </h2>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    {"아이디"}
                  </span>
                  <div>
                    <input type="text" defaultValue="haneul01" readOnly aria-readonly="true" style={css("min-height: 44px; padding: 0 14px; width: 100%; max-width: 420px; background: #F3F6EE; color: #56634F")} />
                    <p style={css("margin: 6px 0 0; font-size: 13px; color: #56634F")}>
                      {"아이디는 바꿀 수 없어요."}
                    </p>
                  </div>
                </div>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    {"비밀번호"}
                  </span>
                  <div>
                    <div style={css("display: flex; gap: 8px; max-width: 420px")}>
                      <label htmlFor="pw" className="sr">
                        {"새 비밀번호"}
                      </label>
                      <input id="pw" type="password" placeholder="새 비밀번호 (바꿀 때만 입력)" value={v.pw ?? ''} onChange={v.onPw} style={css("min-height: 44px; padding: 0 14px; flex: 1; min-width: 0")} />
                    </div>
                    <p style={css("margin: 6px 0 0; font-size: 13px; color: #56634F")}>
                      {"비워두면 기존 비밀번호가 그대로 유지돼요."}
                    </p>
                  </div>
                </div>
              </section>
              <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 8px 28px 12px; margin-bottom: 20px")}>
                <h2 style={css("margin: 16px 0 8px; font-size: 17px; font-weight: 700")}>
                  {"기본 정보"}
                </h2>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    <label htmlFor="nm">
                      {"이름 (실명)"}
                    </label>
                  </span>
                  <div>
                    <input id="nm" type="text" value={v.name ?? ''} onChange={v.onName} style={css("min-height: 44px; padding: 0 14px; width: 100%; max-width: 420px")} />
                  </div>
                </div>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    <label htmlFor="nk">
                      {"별명"}
                    </label>
                  </span>
                  <div>
                    <input id="nk" type="text" value={v.nick ?? ''} onChange={v.onNick} style={css("min-height: 44px; padding: 0 14px; width: 100%; max-width: 420px")} />
                  </div>
                </div>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    <label htmlFor="em">
                      {"이메일"}
                    </label>
                  </span>
                  <div>
                    <input id="em" type="email" value={v.email ?? ''} onChange={v.onEmail} style={css("min-height: 44px; padding: 0 14px; width: 100%; max-width: 420px")} />
                  </div>
                </div>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    {"역할"}
                  </span>
                  <div>
                    <div role="radiogroup" aria-label="역할" style={css("display: flex; gap: 8px; padding-top: 4px")}>
                      {(v.roleOpts || []).map((o, _i0) => (
                        <React.Fragment key={_i0}>
                          <button type="button" role="radio" aria-checked={o.on} onClick={o.pick} style={css(o.style)}>
                            {o.label}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                    <p style={css("margin: 6px 0 0; font-size: 13px; color: #56634F")}>
                      {"승인된 회원은 모두 설교듣기, 예수원칼럼, 교육과 훈련 같은 교인 전용 메뉴를 볼 수 있어요. 관리자는 이 관리자 페이지에도 들어올 수 있어요."}
                    </p>
                  </div>
                </div>
              </section>
              <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 8px 28px 12px; margin-bottom: 20px")}>
                <h2 style={css("margin: 16px 0 8px; font-size: 17px; font-weight: 700")}>
                  {"기록"}
                </h2>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    {"회원가입일"}
                  </span>
                  <div>
                    <p style={css("margin: 0; padding-top: 11px; font-size: 15px")}>
                      {"2026-08-20 08:41:22"}
                    </p>
                  </div>
                </div>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    {"최근접속일"}
                  </span>
                  <div>
                    <p style={css("margin: 0; padding-top: 11px; font-size: 15px")}>
                      {"2026-10-12 10:07:03"}
                    </p>
                  </div>
                </div>
                <div style={css("display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px 0; border-top: 1px solid #EDF1E6")}>
                  <span style={css("padding-top: 11px; font-size: 14px; font-weight: 600; color: #2E3A28")}>
                    {"접근차단일자"}
                  </span>
                  <div>
                    <div style={css("display: flex; gap: 8px; align-items: center; flex-wrap: wrap")}>
                      <input type="text" readOnly aria-readonly="true" value={v.block ?? ''} placeholder="지정 안 됨" style={css("min-height: 44px; padding: 0 14px; width: 180px; background: #F6F9F1")} />
                      <button type="button" className="btn-ghost" onClick={v.setBlock} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #D3DCC6; border-radius: 10px; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                        {"오늘로 지정"}
                      </button>
                      <button type="button" className="btn-ghost" onClick={v.clearBlock} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #D3DCC6; border-radius: 10px; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                        {"해제"}
                      </button>
                    </div>
                    <p style={css("margin: 6px 0 0; font-size: 13px; color: #56634F")}>
                      {"날짜를 지정하면 그날부터 로그인이 막혀요."}
                    </p>
                  </div>
                </div>
              </section>
              <div style={css("display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 8px")}>
                <button type="button" className="btn" onClick={v.askDelete} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #E8B4AE; border-radius: 10px; background: #FFFFFF; color: #B3261E; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                  {"회원 삭제"}
                </button>
                <div style={css("display: flex; gap: 8px")}>
                  <A href="AdminMembers.dc.html" className="btn-ghost" style={css("min-height: 44px; padding: 0 18px; border: 1px solid #D3DCC6; border-radius: 10px; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; text-decoration: none")}>
                    {"목록"}
                  </A>
                  <button type="submit" className="btn" style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                    {"저장"}
                  </button>
                </div>
              </div>
            </form>
            {(v.confirmDel) ? (
              <>
              <div role="dialog" aria-modal="true" aria-labelledby="del-t" style={css("position: fixed; inset: 0; z-index: 40; background: rgba(14,24,10,0.45); display: flex; align-items: center; justify-content: center; padding: 24px")}>
                <div style={css("width: 100%; max-width: 420px; background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 28px")}>
                  <h2 id="del-t" style={css("margin: 0; font-size: 19px; font-weight: 700")}>
                    {v.name}{"님을 삭제할까요?"}
                  </h2>
                  <p style={css("margin: 10px 0 0; font-size: 15px; line-height: 1.7; color: #2E3A28")}>
                    {"회원 정보는 지워지지만, 아이디와 이름, 별명은 다른 사람이 쓰지 못하도록 보관돼요."}
                  </p>
                  <div style={css("display: flex; justify-content: flex-end; gap: 8px; margin-top: 24px")}>
                    <button type="button" onClick={v.cancelDelete} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #D3DCC6; border-radius: 10px; background: #FFFFFF; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                      {"취소"}
                    </button>
                    <button type="button" onClick={v.doDelete} style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; background: #B3261E")}>
                      {"삭제"}
                    </button>
                  </div>
                </div>
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
