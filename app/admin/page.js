'use client';
// 이 파일은 tools/convert-design.mjs 가 design/AdminHome.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F3F5EF}\n*{box-sizing:border-box}\na{color:#2F5E17}\n.side-link{transition:background .15s,color .15s}\n.side-link:hover{background:rgba(255,255,255,0.08);color:#FFFFFF}\n.btn{transition:filter .15s,background .15s}\n.btn:hover{filter:brightness(0.95)}\n.btn-ghost:hover{background:#EEF6E3 !important}\n.row-hover:hover{background:#F8FBF4}\n.adm input[type=text],.adm input[type=email],.adm input[type=password],.adm input[type=number],.adm input[type=date],.adm input[type=search],.adm select,.adm textarea{font-family:inherit;font-size:15px;color:#1B2516;background:#FFFFFF;border:1px solid #C9D3BC;border-radius:10px}\n.adm input:focus,.adm select:focus,.adm textarea:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.adm button:focus-visible,.adm a:focus-visible{outline:3px solid #8BC34A;outline-offset:2px}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n.toast{animation:toastIn .25s ease}\n@keyframes toastIn{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}\n@media (prefers-reduced-motion: reduce){.toast{animation:none}}\n@media (max-width: 960px){.adm-side{display:none !important}.adm-main{padding:20px !important}}\n@media (max-width: 1100px){.dash-2{grid-template-columns:1fr !important}.dash-4{grid-template-columns:repeat(2,minmax(0,1fr)) !important}}\n";

class Component extends DCLogic {
  flash(msg) {
    this.setState({ toast: msg });
    clearTimeout(this._t);
    this._t = setTimeout(() => this.setState({ toast: '' }), 2200);
  }
  renderVals() {
    const st = this.state || {};
    const SEED = [
      { id: 'a', name: '김새벽', date: '10-14 21:05', note: '할리스코 목장에서 함께하고 있어요. 손 목사님 소개로 왔습니다.' },
      { id: 'b', name: '이시내', date: '10-13 18:40', note: '9월부터 예수원교회에 출석하고 있습니다.' },
      { id: 'c', name: '오소원', date: '10-12 09:12', note: '주일학교 학부모입니다.' }
    ];
    const pend = st.pend || SEED;
    return {
      pendingCount: String(pend.length),
      pendBg: pend.length ? '#F2C94C' : '#EDF1E6',
      noPending: pend.length === 0,
      pending: pend.map((p) => ({ name: p.name, date: p.date, note: p.note, initial: p.name.slice(0, 1),
        approve: () => { this.setState({ pend: pend.filter((x) => x.id !== p.id) }); this.flash(p.name + '님을 승인했어요'); } })),
      stats: [
        { label: '총 회원', n: '108', sub: '이번 달 +4명', color: '#1B2516', href: 'AdminMembers.dc.html' },
        { label: '승인 대기', n: String(pend.length), sub: pend.length ? '확인이 필요해요' : '모두 처리됨', color: pend.length ? '#9A6B00' : '#1B2516', href: 'AdminMembers.dc.html' },
        { label: '이번 주 접속', n: '42', sub: '지난주 38명', color: '#1B2516', href: 'AdminMembers.dc.html' },
        { label: '이번 달 새 글', n: '9', sub: '교회소식 · 게시판 · 앨범', color: '#1B2516', href: '#' }
      ],
      recent: [
        { board: '교회소식', title: '10-11-2026 교회 소식', date: '10-10' },
        { board: '사진 앨범', title: '탄자니아 선교(2026) #2', date: '10-09' },
        { board: '사진 앨범', title: '탄자니아 선교(2026) #1', date: '10-08' },
        { board: '교회소식', title: '10-04-2026 교회 소식', date: '10-03' },
        { board: '게시판', title: '2026 탄자니아 선교 안내 소책자', date: '09-13' }
      ],
      quick: [
        { icon: '📰', label: '교회소식 올리기', href: '#' },
        { icon: '🖼️', label: '사진 앨범 만들기', href: '#' },
        { icon: '🎙️', label: '이번 주 설교 등록', href: 'AdminHomepage.dc.html' },
        { icon: '🏞️', label: '배너 추가', href: 'AdminBanner.dc.html' }
      ],
      homeState: [
        { label: '메인 배너', value: '5개 사용 중', dot: '#4F8F25', href: 'AdminBanner.dc.html' },
        { label: '팝업', value: '가을철 야외 예배 (10-18까지)', dot: '#4F8F25', href: 'AdminPopup.dc.html' },
        { label: '이번 주 설교', value: '아직 등록 안 됨', dot: '#E0A400', href: 'AdminHomepage.dc.html' },
        { label: '선교 영상', value: '탄자니아 선교 2026', dot: '#4F8F25', href: 'AdminHomepage.dc.html' },
        { label: '교회 소개', value: '마지막 수정 2026-09-02', dot: '#C9D3BC', href: 'AdminAbout.dc.html' }
      ],
      hasToast: !!st.toast, toast: st.toast || ''
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "관리자 · 대시보드"; }, []);
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
            <A className="side-link" href="AdminHome.dc.html" aria-current="page" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; background: #8BC34A; color: #1B2516; font-weight: 700")}>
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
                {"관리자 › 대시보드"}
              </p>
              <h1 style={css("margin: 2px 0 0; font-family: 'Gowun Batang', serif; font-size: 26px; font-weight: 700")}>
                {"대시보드"}
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
            <p style={css("margin: 0 0 24px; font-size: 16px; color: #2E3A28")}>
              {"웹섬김이님, 안녕하세요. 오늘은 "}
              <b>
                {"2026년 10월 15일 (목)"}
              </b>
              {"이에요."}
            </p>
            <div style={css("display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 20px")} className="dash-4">
              {(v.stats || []).map((s, _i0) => (
                <React.Fragment key={_i0}>
                  <A href={s.href} style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 18px 20px; text-decoration: none; color: inherit; display: block")}>
                    <p style={css("margin: 0; font-size: 13px; color: #56634F; font-weight: 600")}>
                      {s.label}
                    </p>
                    <p style={css(`margin: 6px 0 0; font-size: 28px; font-weight: 700; color: ${s.color ?? ""}`)}>
                      {s.n}
                    </p>
                    <p style={css("margin: 4px 0 0; font-size: 12px; color: #56634F")}>
                      {s.sub}
                    </p>
                  </A>
                </React.Fragment>
              ))}
            </div>
            <div style={css("display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 20px; align-items: start")} className="dash-2">
              <div style={css("display: flex; flex-direction: column; gap: 20px")}>
                <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 22px 24px")}>
                  <div style={css("display: flex; align-items: center; justify-content: space-between; gap: 12px")}>
                    <h2 style={css("margin: 0; font-size: 17px; font-weight: 700; display: flex; align-items: center; gap: 8px")}>
                      {"가입 승인 대기 "}
                      <span style={css(`min-width: 24px; height: 24px; padding: 0 8px; border-radius: 999px; background: ${v.pendBg ?? ""}; font-size: 13px; display: inline-flex; align-items: center; justify-content: center`)}>
                        {v.pendingCount}
                      </span>
                    </h2>
                    <A href="AdminMembers.dc.html" style={css("font-size: 13px; font-weight: 600; color: #2F5E17; text-decoration: none")}>
                      {"전체 보기 ›"}
                    </A>
                  </div>
                  <div style={css("display: flex; flex-direction: column; gap: 10px; margin-top: 16px")}>
                    {(v.pending || []).map((p, _i1) => (
                      <React.Fragment key={_i1}>
                        <div style={css("display: flex; align-items: center; gap: 14px; padding: 12px 14px; border: 1px solid #E1E8D6; border-radius: 12px")}>
                          <span style={css("width: 38px; height: 38px; flex-shrink: 0; border-radius: 999px; background: #EEF6E3; color: #2F5E17; display: flex; align-items: center; justify-content: center; font-weight: 700")} aria-hidden="true">
                            {p.initial}
                          </span>
                          <div style={css("flex: 1; min-width: 0")}>
                            <p style={css("margin: 0; font-size: 15px; font-weight: 700")}>
                              {p.name}{" "}
                              <span style={css("font-weight: 500; font-size: 13px; color: #56634F")}>
                                {"· "}{p.date}
                              </span>
                            </p>
                            <p style={css("margin: 2px 0 0; font-size: 13px; color: #56634F; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                              {p.note}
                            </p>
                          </div>
                          <button className="btn" onClick={p.approve} style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #8BC34A; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; min-height: 40px; padding: 0 14px")}>
                            {"승인"}
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                    {(v.noPending) ? (
                      <>
                      <p style={css("margin: 0; padding: 24px; text-align: center; color: #56634F; font-size: 15px")}>
                        {"✓ 대기 중인 신청이 없어요."}
                      </p>
                      </>
                    ) : null}
                  </div>
                </section>
                <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 22px 24px")}>
                  <h2 style={css("margin: 0; font-size: 17px; font-weight: 700")}>
                    {"최근 올라온 글"}
                  </h2>
                  <ul style={css("margin: 12px 0 0; padding: 0; list-style: none")}>
                    {(v.recent || []).map((r, _i2) => (
                      <React.Fragment key={_i2}>
                        <li style={css("display: flex; align-items: center; gap: 12px; padding: 12px 0; border-top: 1px solid #EDF1E6")}>
                          <span style={css("flex-shrink: 0; min-width: 76px; padding: 4px 10px; border-radius: 999px; background: #F3F6EE; color: #2F5E17; font-size: 12px; font-weight: 700; text-align: center")}>
                            {r.board}
                          </span>
                          <span style={css("flex: 1; min-width: 0; font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {r.title}
                          </span>
                          <span style={css("flex-shrink: 0; font-size: 13px; color: #56634F")}>
                            {r.date}
                          </span>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </section>
              </div>
              <div style={css("display: flex; flex-direction: column; gap: 20px")}>
                <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 22px 24px")}>
                  <h2 style={css("margin: 0 0 14px; font-size: 17px; font-weight: 700")}>
                    {"빠른 작업"}
                  </h2>
                  <div style={css("display: grid; grid-template-columns: 1fr 1fr; gap: 10px")}>
                    {(v.quick || []).map((q, _i3) => (
                      <React.Fragment key={_i3}>
                        <A className="btn-ghost" href={q.href} style={css("display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 14px; border: 1px solid #D3DCC6; border-radius: 12px; text-decoration: none; color: #1B2516; background: #FFFFFF")}>
                          <span style={css("font-size: 20px")} aria-hidden="true">
                            {q.icon}
                          </span>
                          <span style={css("font-size: 14px; font-weight: 700")}>
                            {q.label}
                          </span>
                        </A>
                      </React.Fragment>
                    ))}
                  </div>
                </section>
                <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 22px 24px")}>
                  <div style={css("display: flex; align-items: center; justify-content: space-between")}>
                    <h2 style={css("margin: 0; font-size: 17px; font-weight: 700")}>
                      {"홈 화면 지금 상태"}
                    </h2>
                    <A href="MemberMain.dc.html" style={css("font-size: 13px; font-weight: 600; color: #2F5E17; text-decoration: none")}>
                      {"홈 보기 ›"}
                    </A>
                  </div>
                  <ul style={css("margin: 12px 0 0; padding: 0; list-style: none")}>
                    {(v.homeState || []).map((h, _i4) => (
                      <React.Fragment key={_i4}>
                        <li style={css("display: flex; align-items: center; gap: 12px; padding: 12px 0; border-top: 1px solid #EDF1E6")}>
                          <span style={css(`width: 8px; height: 8px; border-radius: 999px; flex-shrink: 0; background: ${h.dot ?? ""}`)} />
                          <span style={css("flex-shrink: 0; width: 84px; font-size: 13px; color: #56634F; font-weight: 600")}>
                            {h.label}
                          </span>
                          <span style={css("flex: 1; min-width: 0; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap")}>
                            {h.value}
                          </span>
                          <A href={h.href} style={css("font-size: 13px; font-weight: 600; color: #2F5E17; text-decoration: none")}>
                            {"수정"}
                          </A>
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
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
