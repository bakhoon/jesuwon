'use client';
// 이 파일은 tools/convert-design.mjs 가 design/AdminAbout.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F3F5EF}\n*{box-sizing:border-box}\na{color:#2F5E17}\n.side-link{transition:background .15s,color .15s}\n.side-link:hover{background:rgba(255,255,255,0.08);color:#FFFFFF}\n.btn{transition:filter .15s,background .15s}\n.btn:hover{filter:brightness(0.95)}\n.btn-ghost:hover{background:#EEF6E3 !important}\n.row-hover:hover{background:#F8FBF4}\n.adm input[type=text],.adm input[type=email],.adm input[type=password],.adm input[type=number],.adm input[type=date],.adm input[type=search],.adm select,.adm textarea{font-family:inherit;font-size:15px;color:#1B2516;background:#FFFFFF;border:1px solid #C9D3BC;border-radius:10px}\n.adm input:focus,.adm select:focus,.adm textarea:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.adm button:focus-visible,.adm a:focus-visible{outline:3px solid #8BC34A;outline-offset:2px}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n.toast{animation:toastIn .25s ease}\n@keyframes toastIn{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}\n@media (prefers-reduced-motion: reduce){.toast{animation:none}}\n@media (max-width: 960px){.adm-side{display:none !important}.adm-main{padding:20px !important}}\n.adm button:disabled{opacity:.35;cursor:default}@media (max-width: 800px){.blk-grid{grid-template-columns:1fr !important}}\n";

class Component extends DCLogic {
  flash(msg) {
    this.setState({ toast: msg });
    clearTimeout(this._t);
    this._t = setTimeout(() => this.setState({ toast: '' }), 2200);
  }
  renderVals() {
    const st = this.state || {};
    const SEED = {
      intro: [
        { eyebrow: 'BEGINNING & LOCATION', title: '시작 & 위치', quote: '', body: '예수원교회는 필라델피아(Philadelphia, PA) 지역 북쪽 외곽의 호샴(Horsham)에 자리 잡고 있습니다. 2004년 5월 첫 예배를 드린 이후, 오늘에 이르기까지 건강한 공동체 교회로 영광스럽게 세워져 가고 있습니다.' },
        { eyebrow: 'NAME', title: '이름', quote: '', body: '예수원이란 이름은 ‘예수님의 열매가 가득한 영적 과수원’을 뜻합니다. 예수원에서는 예수님의 향기롭고 탐스러운 좋은 열매들로만 가득한, 주님의 과수원이기를 소원합니다.' },
        { eyebrow: 'MISSION & GOAL', title: '사명 & 목표', quote: '“하나님의 소원을 풀어 드리는 교회”', body: '위의 영구적 표제 아래, ‘영혼 구원하여 그리스도의 제자로 살게 하는 교회의 본질 운동’을 가장 큰 사명(the Great Commission, 마28:19-20)으로 삼고 있습니다.\n\n또한 예수님의 새 계명인 “예수님처럼 서로 사랑하라”고 하신 대계명(the Great Commandment, 요 13:34)을 따라, 서로 사랑과 서로 섬김의 ‘상호적 헌신’을 그리스도인이 보여 줄 최고의 태도로 여기며 힘쓰는 공동체입니다.' }
      ],
      pastoral: [
        { eyebrow: 'PASTORAL PHILOSOPHY', title: '목회관', quote: '', body: '[사명지향, 서로 섬김, 의견 일치에 대한 본문]' },
        { eyebrow: 'STRUCTURE', title: '목회 구조', quote: '', body: '[소그룹 공동체와 대그룹 공동체에 대한 본문]' }
      ],
      vision: [
        { eyebrow: 'NEXT GENERATION', title: '2세를 향한 비전', quote: '', body: '2세를 향하는 예수원의 자세는 선교적 관점입니다. 교회 밖의 비 신자를 구원하기 위하여 인내와 이해와 기다림으로 헌신하는 선교적 자세를 2세 사역에 적용하고자 합니다.' }
      ],
      faith: [
        { eyebrow: 'STATEMENT OF FAITH', title: '예수원의 신앙고백', quote: '', body: '[신앙고백 항목들]' }
      ]
    };
    const data = st.data || SEED;
    const tab = st.tab || 'intro';
    const mode = st.mode || 'edit';
    const LABEL = { intro: '예수원 소개', pastoral: '목회관 & 구조', vision: '2세를 향한 비전', faith: '예수원의 신앙고백' };
    const blocks = data[tab];
    const setBlocks = (nb) => this.setState({ data: Object.assign({}, data, { [tab]: nb }), dirty: true });
    const upd = (i, k) => (e) => setBlocks(blocks.map((b, j) => (j === i ? Object.assign({}, b, { [k]: e.target.value }) : b)));
    const move = (i, d) => { const a = blocks.slice(); const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setBlocks(a); };
    const tabBase = 'flex-shrink: 0; min-height: 56px; padding: 0 18px; border: none; background: transparent; font-family: inherit; font-size: 15px; cursor: pointer; white-space: nowrap;';
    const seg = (on) => 'min-height: 42px; padding: 0 16px; border: none; font-family: inherit; font-size: 14px; cursor: pointer; ' + (on ? 'background: #1F3B16; color: #FFFFFF; font-weight: 700;' : 'background: #FFFFFF; color: #1B2516;');
    return {
      tabs: Object.keys(LABEL).map((id) => ({ label: LABEL[id], selected: id === tab ? 'true' : 'false', pick: () => this.setState({ tab: id }),
        style: tabBase + (id === tab ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 #8BC34A;' : ' color: #56634F; font-weight: 500;') })),
      tabLabel: LABEL[tab],
      isEdit: mode === 'edit', isPreview: mode === 'preview',
      editOn: mode === 'edit' ? 'true' : 'false', prevOn: mode === 'preview' ? 'true' : 'false',
      editBtn: seg(mode === 'edit'), prevBtn: seg(mode === 'preview'),
      showEdit: () => this.setState({ mode: 'edit' }), showPreview: () => this.setState({ mode: 'preview' }),
      blocks: blocks.map((b, i) => ({
        n: String(i + 1), eyebrow: b.eyebrow, title: b.title, quote: b.quote, body: b.body,
        titleOrNew: b.title || '새 블록', hasQuote: !!(b.quote || '').trim(),
        paras: (b.body || '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
        rows: String(Math.min(10, Math.max(3, Math.ceil((b.body || '').length / 70) + 1))),
        isFirst: i === 0, isLast: i === blocks.length - 1,
        up: () => move(i, -1), down: () => move(i, 1),
        remove: () => { setBlocks(blocks.filter((_, j) => j !== i)); this.flash('블록을 삭제했어요'); },
        onEyebrow: upd(i, 'eyebrow'), onTitle: upd(i, 'title'), onQuote: upd(i, 'quote'), onBody: upd(i, 'body')
      })),
      addBlock: () => setBlocks(blocks.concat([{ eyebrow: '', title: '', quote: '', body: '' }])),
      saveLabel: st.dirty ? '저장 •' : '저장됨',
      save: () => { this.setState({ dirty: false, saved: '2026-10-15 00:40' }); this.flash(LABEL[tab] + ' 내용을 저장했어요'); },
      lastSaved: st.saved || '2026-09-02 14:12',
      pendingCount: '3',
      hasToast: !!st.toast, toast: st.toast || ''
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "관리자 · 교회 소개 관리"; }, []);
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
            <A className="side-link" href="AdminAbout.dc.html" aria-current="page" style={css("display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 10px; text-decoration: none; font-size: 15px; background: #8BC34A; color: #1B2516; font-weight: 700")}>
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
                {"관리자 › 사이트 › 교회 소개 관리"}
              </p>
              <h1 style={css("margin: 2px 0 0; font-family: 'Gowun Batang', serif; font-size: 26px; font-weight: 700")}>
                {"교회 소개 관리"}
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
            <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; overflow: hidden")}>
              <div style={css("display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 0 20px; border-bottom: 1px solid #E1E8D6")}>
                <div role="tablist" aria-label="교회 소개 탭" style={css("display: flex; gap: 4px; overflow-x: auto")}>
                  {(v.tabs || []).map((t, _i0) => (
                    <React.Fragment key={_i0}>
                      <button role="tab" aria-selected={t.selected} onClick={t.pick} style={css(t.style)}>
                        {t.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <div style={css("display: flex; gap: 8px; padding: 10px 0")}>
                  <div role="group" aria-label="보기 방식" style={css("display: flex; border: 1px solid #D3DCC6; border-radius: 10px; overflow: hidden")}>
                    <button onClick={v.showEdit} aria-pressed={v.editOn} style={css(v.editBtn)}>
                      {"편집"}
                    </button>
                    <button onClick={v.showPreview} aria-pressed={v.prevOn} style={css(v.prevBtn)}>
                      {"미리보기"}
                    </button>
                  </div>
                  <button className="btn" onClick={v.save} style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                    {v.saveLabel}
                  </button>
                </div>
              </div>
              {(v.isEdit) ? (
                <>
                <div style={css("padding: 24px; display: flex; flex-direction: column; gap: 16px; background: #F8FAF5")}>
                  <p style={css("margin: 0; font-size: 14px; color: #56634F")}>
                    {"\""}{v.tabLabel}{"\" 페이지는 아래 블록이 위에서부터 차례로 보여요. 블록마다 작은 영문 제목, 제목, 본문을 쓸 수 있어요."}
                  </p>
                  {(v.blocks || []).map((b, _i1) => (
                    <React.Fragment key={_i1}>
                      <article style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 18px 20px; display: flex; flex-direction: column; gap: 12px")}>
                        <div style={css("display: flex; align-items: center; gap: 8px")}>
                          <span style={css("min-width: 26px; height: 26px; border-radius: 999px; background: #8BC34A; color: #1B2516; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center")}>
                            {b.n}
                          </span>
                          <span style={css("flex: 1; font-size: 15px; font-weight: 700")}>
                            {b.titleOrNew}
                          </span>
                          <button aria-label="위로" disabled={!!(b.isFirst) && b.isFirst !== 'false'} onClick={b.up} style={css("width: 34px; height: 34px; border-radius: 8px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0")}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M6 15l6-6 6 6" />
                            </svg>
                          </button>
                          <button aria-label="아래로" disabled={!!(b.isLast) && b.isLast !== 'false'} onClick={b.down} style={css("width: 34px; height: 34px; border-radius: 8px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0")}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>
                          <button aria-label="블록 삭제" onClick={b.remove} style={css("width: 34px; height: 34px; border-radius: 8px; border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; color: #B3261E; border-color: #E8B4AE")}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                              <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" />
                            </svg>
                          </button>
                        </div>
                        <div style={css("display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 12px")} className="blk-grid">
                          <div>
                            <label style={css("display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #2E3A28")}>
                              {"작은 영문 제목"}
                              <input type="text" value={b.eyebrow ?? ''} onChange={b.onEyebrow} placeholder="MISSION & GOAL" style={css("min-height: 44px; padding: 0 14px; width: 100%; margin-top: 6px; font-weight: 400")} />
                            </label>
                          </div>
                          <div>
                            <label style={css("display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #2E3A28")}>
                              {"제목"}
                              <input type="text" value={b.title ?? ''} onChange={b.onTitle} style={css("min-height: 44px; padding: 0 14px; width: 100%; margin-top: 6px; font-weight: 400")} />
                            </label>
                          </div>
                        </div>
                        <label style={css("display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #2E3A28")}>
                          {"강조 문구 "}
                          <span style={css("font-weight: 400; color: #56634F")}>
                            {"(선택, 연두색 박스로 표시)"}
                          </span>
                          <input type="text" value={b.quote ?? ''} onChange={b.onQuote} style={css("min-height: 44px; padding: 0 14px; width: 100%; margin-top: 6px; font-weight: 400")} />
                        </label>
                        <label style={css("display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #2E3A28")}>
                          {"본문 "}
                          <span style={css("font-weight: 400; color: #56634F")}>
                            {"(빈 줄로 문단 나누기)"}
                          </span>
                          <textarea rows={b.rows} value={b.body ?? ''} onChange={b.onBody} style={css("display: block; margin-top: 6px; width: 100%; padding: 12px 14px; font-weight: 400; line-height: 1.75; resize: vertical")} />
                        </label>
                      </article>
                    </React.Fragment>
                  ))}
                  <button onClick={v.addBlock} style={css("min-height: 52px; border: 2px dashed #C9D3BC; border-radius: 14px; background: transparent; color: #2F5E17; font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer")}>
                    {"+ 블록 추가"}
                  </button>
                </div>
                </>
              ) : null}
              {(v.isPreview) ? (
                <>
                <div style={css("padding: 40px 48px; background: #F6F9F1")}>
                  <div style={css("max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px")}>
                    {(v.blocks || []).map((b, _i2) => (
                      <React.Fragment key={_i2}>
                        <section>
                          <p style={css("margin: 0; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                            {b.eyebrow}
                          </p>
                          <h2 style={css("margin: 6px 0 0; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                            {b.title}
                          </h2>
                          {(b.hasQuote) ? (
                            <>
                            <p style={css("margin: 18px 0 0; padding: 16px 20px; border-radius: 14px; background: #EEF6E3; font-family: 'Gowun Batang', serif; font-size: 20px; font-weight: 700; color: #1F3B16")}>
                              {b.quote}
                            </p>
                            </>
                          ) : null}
                          {(b.paras || []).map((p, _i3) => (
                            <React.Fragment key={_i3}>
                              <p style={css("margin: 16px 0 0; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                                {p}
                              </p>
                            </React.Fragment>
                          ))}
                        </section>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                </>
              ) : null}
            </div>
            <p style={css("margin: 14px 4px 0; font-size: 13px; color: #56634F")}>
              {"마지막 저장: "}{v.lastSaved}{" · 웹섬김이"}
            </p>
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
