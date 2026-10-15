'use client';
// 이 파일은 tools/convert-design.mjs 가 design/AdminMembers.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F3F5EF}\n*{box-sizing:border-box}\na{color:#2F5E17}\n.side-link{transition:background .15s,color .15s}\n.side-link:hover{background:rgba(255,255,255,0.08);color:#FFFFFF}\n.btn{transition:filter .15s,background .15s}\n.btn:hover{filter:brightness(0.95)}\n.btn-ghost:hover{background:#EEF6E3 !important}\n.row-hover:hover{background:#F8FBF4}\n.adm input[type=text],.adm input[type=email],.adm input[type=password],.adm input[type=number],.adm input[type=date],.adm input[type=search],.adm select,.adm textarea{font-family:inherit;font-size:15px;color:#1B2516;background:#FFFFFF;border:1px solid #C9D3BC;border-radius:10px}\n.adm input:focus,.adm select:focus,.adm textarea:focus{outline:none;border-color:#4F8F25;box-shadow:0 0 0 3px rgba(139,195,74,0.35)}\n.adm button:focus-visible,.adm a:focus-visible{outline:3px solid #8BC34A;outline-offset:2px}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n.toast{animation:toastIn .25s ease}\n@keyframes toastIn{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}\n@media (prefers-reduced-motion: reduce){.toast{animation:none}}\n@media (max-width: 960px){.adm-side{display:none !important}.adm-main{padding:20px !important}}\n.tab-b:hover{background:#EEF6E3}\n";

class Component extends DCLogic {
  flash(msg) {
    this.setState({ toast: msg });
    clearTimeout(this._t);
    this._t = setTimeout(() => this.setState({ toast: '' }), 2200);
  }
  renderVals() {
    const st = this.state || {};
    const tab = st.tab || 'all';
    const q = st.q || '';
    const field = st.field || 'id';
    const page = st.page || 1;
    // 디자인용 가상 데이터 (실제 회원 정보 아님)
    const SEED = [
      ['haneul01', '김하늘', '하늘', 'member', '26-10-12', 'haneul@example.com', false],
      ['somang_lee', '이소망', '소망이', 'member', '26-10-11', 'somang@example.com', false],
      ['grace_park', '박은혜', 'Grace', 'member', '26-10-10', 'grace@example.com', false],
      ['faith77', '최믿음', '믿음', 'member', '26-10-10', 'faith77@example.com', false],
      ['sarang_j', '정사랑', '사랑', 'member', '26-10-08', 'sarang@example.com', false],
      ['joy_han', '한기쁨', 'Joy', 'member', '26-10-05', 'joy@example.com', false],
      ['peace.yoon', '윤평강', '평강', 'member', '26-09-28', 'peace@example.com', false],
      ['gentle_cho', '조온유', '온유', 'member', '26-09-19', 'gentle@example.com', false],
      ['kang_c', '강충성', '충성', 'member', '26-09-12', 'kangc@example.com', false],
      ['seo_jj', '서절제', '절제', 'member', '26-08-22', 'seojj@example.com', false],
      ['patience_o', '오인내', '인내', 'member', '26-08-12', 'oh@example.com', false],
      ['webadmin', '웹섬김이', '웹섬김이', 'admin', '26-10-14', 'web@example.com', false]
    ];
    const PENDING_SEED = [
      ['newfam_kim', '김새벽', 'dawn@example.com', '10-14 21:05', '할리스코 목장에서 함께하고 있어요. 손 목사님 소개로 왔습니다.'],
      ['river.lee', '이시내', 'river@example.com', '10-13 18:40', '9월부터 예수원교회에 출석하고 있습니다.'],
      ['ohmyhope', '오소원', 'hope@example.com', '10-12 09:12', '주일학교 학부모입니다.']
    ];
    const members = st.members || SEED.map((m) => ({ id: m[0], name: m[1], nick: m[2], role: m[3], last: m[4], email: m[5], blocked: m[6] }));
    const pendingList = st.pending || PENDING_SEED.map((p) => ({ id: p[0], name: p[1], email: p[2], date: p[3], note: p[4] }));
    const checked = st.checked || {};
    const set = (patch) => this.setState(patch);
    const updMember = (id, patch) => set({ members: members.map((m) => (m.id === id ? Object.assign({}, m, patch) : m)) });


    const needle = q.trim().toLowerCase();
    let list = members.filter((m) => (tab === 'blocked' ? m.blocked : true));
    if (needle) list = list.filter((m) => String(m[field] || '').toLowerCase().includes(needle));
    const pageSize = 10;
    const pageCount = Math.max(1, Math.ceil(list.length / pageSize));
    const shown = list.slice((page - 1) * pageSize, page * pageSize);
    const rows = shown.map((m) => ({
      id: m.id, name: m.name, nick: m.nick, role: m.role, last: m.last, email: m.email,
      checked: !!checked[m.id], blocked: m.blocked,
      style: 'border-top: 1px solid #EDF1E6;' + (m.blocked ? ' background: #FDF3F2;' : (checked[m.id] ? ' background: #F3F8EC;' : '')),
      toggle: () => set({ checked: Object.assign({}, checked, { [m.id]: !checked[m.id] }) }),
      toggleBlock: () => { updMember(m.id, { blocked: !m.blocked }); this.flash(m.name + (m.blocked ? ' 차단 해제' : ' 차단') + '했어요'); },
      onRole: (e) => { updMember(m.id, { role: e.target.value }); this.flash(m.name + '님을 ' + (e.target.value === 'admin' ? '관리자로' : '일반 회원으로') + ' 바꿨어요'); }
    }));
    const checkedIds = Object.keys(checked).filter((k) => checked[k]);
    const allChecked = shown.length > 0 && shown.every((m) => checked[m.id]);

    const blockedN = members.filter((m) => m.blocked).length;
    const tabBase = 'min-height: 56px; padding: 0 18px; border: none; background: transparent; font-family: inherit; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;';
    const go = (id) => () => set({ tab: id, page: 1, checked: {} });
    const tabs = [['all', '전체 회원', members.length], ['pending', '가입 승인 대기', pendingList.length], ['blocked', '차단', blockedN]].map(([id, label, n]) => {
      const on = id === tab;
      return {
        label, n: String(n), selected: on ? 'true' : 'false', pick: go(id),
        style: tabBase + (on ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 #8BC34A;' : ' color: #56634F; font-weight: 500;'),
        badgeStyle: 'min-width: 22px; height: 22px; padding: 0 7px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; ' + (id === 'pending' && n > 0 ? 'background: #F2C94C; color: #1B2516;' : 'background: #EDF1E6; color: #56634F;')
      };
    });

    const pending = pendingList.map((p) => ({
      id: p.id, name: p.name, email: p.email, date: p.date, note: p.note, initial: p.name.slice(0, 1),
      approve: () => {
        set({ pending: pendingList.filter((x) => x.id !== p.id), members: [{ id: p.id, name: p.name, nick: p.name, role: 'member', last: '-', email: p.email, blocked: false }].concat(members) });
        this.flash(p.name + '님을 승인했어요. 가입 완료 안내가 발송됩니다');
      },
      reject: () => { set({ pending: pendingList.filter((x) => x.id !== p.id) }); this.flash(p.name + '님의 신청을 거절했어요'); }
    }));

    const pages = Array.from({ length: Math.max(pageCount, 1) }, (_, k) => {
      const n = k + 1; const on = n === page;
      return { n: String(n), current: on ? 'page' : 'false', pick: () => set({ page: n }),
        style: 'min-width: 40px; height: 40px; border-radius: 10px; font-family: inherit; font-size: 14px; cursor: pointer; ' + (on ? 'border: none; background: #1F3B16; color: #FFFFFF; font-weight: 700;' : 'border: 1px solid #D3DCC6; background: #FFFFFF; color: #1B2516;') };
    });

    return {
      stats: [
        { label: '총 회원수', n: String(members.length), color: '#1B2516' },
        { label: '승인 대기', n: String(pendingList.length), color: pendingList.length ? '#9A6B00' : '#1B2516' },
        { label: '차단', n: String(blockedN), color: blockedN ? '#B3261E' : '#1B2516' },
        { label: '탈퇴', n: '0', color: '#1B2516' }
      ],
      tabs, rows, pages, q, field, pending,
      pendingCount: String(pendingList.length),
      fieldOpts: [{ v: 'id', label: '회원아이디' }, { v: 'name', label: '이름' }, { v: 'nick', label: '별명' }, { v: 'email', label: '이메일' }],
      isPending: tab === 'pending', isList: tab !== 'pending',
      pendingEmpty: pendingList.length === 0, listEmpty: rows.length === 0,
      allChecked, checkedCount: String(checkedIds.length),
      toggleAll: () => { const next = Object.assign({}, checked); shown.forEach((m) => { next[m.id] = !allChecked; }); set({ checked: next }); },
      saveSelected: () => { if (!checkedIds.length) return this.flash('먼저 회원을 선택해 주세요'); this.flash(checkedIds.length + '명의 변경 내용을 저장했어요'); set({ checked: {} }); },
      deleteSelected: () => { if (!checkedIds.length) return this.flash('먼저 회원을 선택해 주세요'); set({ members: members.filter((m) => !checked[m.id]), checked: {} }); this.flash(checkedIds.length + '명을 삭제했어요'); },
      onQ: (e) => set({ q: e.target.value, page: 1 }),
      onField: (e) => set({ field: e.target.value, page: 1 }),
      noSubmit: (e) => { if (e && e.preventDefault) e.preventDefault(); },
      hasToast: !!st.toast, toast: st.toast || ''
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "관리자 · 회원 관리"; }, []);
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
                {"관리자 › 회원"}
              </p>
              <h1 style={css("margin: 2px 0 0; font-family: 'Gowun Batang', serif; font-size: 26px; font-weight: 700")}>
                {"회원 관리"}
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
            <div style={css("display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px")}>
              {(v.stats || []).map((s, _i0) => (
                <React.Fragment key={_i0}>
                  <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 18px 20px")}>
                    <p style={css("margin: 0; font-size: 13px; color: #56634F; font-weight: 600")}>
                      {s.label}
                    </p>
                    <p style={css(`margin: 6px 0 0; font-size: 28px; font-weight: 700; color: ${s.color ?? ""}`)}>
                      {s.n}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; overflow: hidden")}>
              <div style={css("display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding: 0 20px; border-bottom: 1px solid #E1E8D6")}>
                <div role="tablist" aria-label="회원 구분" style={css("display: flex; gap: 4px")}>
                  {(v.tabs || []).map((t, _i1) => (
                    <React.Fragment key={_i1}>
                      <button className="tab-b" role="tab" aria-selected={t.selected} onClick={t.pick} style={css(t.style)}>
                        {t.label}
                        <span style={css(t.badgeStyle)}>
                          {t.n}
                        </span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <form role="search" onSubmit={v.noSubmit} style={css("display: flex; gap: 8px; padding: 12px 0")}>
                  <label htmlFor="field" className="sr">
                    {"검색 항목"}
                  </label>
                  <select id="field" value={v.field ?? ''} onChange={v.onField} style={css("min-height: 44px; padding: 0 12px")}>
                    {(v.fieldOpts || []).map((o, _i2) => (
                      <React.Fragment key={_i2}>
                        <option value={o.v}>
                          {o.label}
                        </option>
                      </React.Fragment>
                    ))}
                  </select>
                  <label htmlFor="q" className="sr">
                    {"검색어"}
                  </label>
                  <input id="q" type="search" placeholder="검색어 입력" value={v.q ?? ''} onChange={v.onQ} style={css("min-height: 44px; padding: 0 14px; width: 220px")} />
                </form>
              </div>
              {(v.isPending) ? (
                <>
                <div style={css("padding: 20px; display: flex; flex-direction: column; gap: 12px")}>
                  <p style={css("margin: 0; padding: 12px 16px; border-radius: 12px; background: #FFF8E1; color: #6B5310; font-size: 14px; line-height: 1.6")}>
                    {"회원가입 신청이 들어오면 관리자 카카오톡으로 알림이 갑니다. 여기서 바로 승인하거나, 카톡 메시지의 [승인하기] 버튼으로도 처리할 수 있어요."}
                  </p>
                  {(v.pending || []).map((p, _i3) => (
                    <React.Fragment key={_i3}>
                      <div style={css("display: flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 16px 18px; border: 1px solid #E1E8D6; border-radius: 14px")}>
                        <span style={css("width: 44px; height: 44px; border-radius: 999px; background: #EEF6E3; color: #2F5E17; display: flex; align-items: center; justify-content: center; font-weight: 700")} aria-hidden="true">
                          {p.initial}
                        </span>
                        <div style={css("flex: 1; min-width: 200px")}>
                          <p style={css("margin: 0; font-size: 16px; font-weight: 700")}>
                            {p.name}{" "}
                            <span style={css("font-weight: 500; color: #56634F; font-size: 14px")}>
                              {"("}{p.id}{")"}
                            </span>
                          </p>
                          <p style={css("margin: 4px 0 0; font-size: 14px; color: #56634F")}>
                            {p.email}{" · 신청 "}{p.date}
                          </p>
                          <p style={css("margin: 6px 0 0; font-size: 14px; color: #2E3A28")}>
                            {"\""}{p.note}{"\""}
                          </p>
                        </div>
                        <div style={css("display: flex; gap: 8px")}>
                          <button className="btn" onClick={p.reject} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #E8B4AE; border-radius: 10px; background: #FFFFFF; color: #B3261E; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                            {"거절"}
                          </button>
                          <button className="btn" onClick={p.approve} style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #8BC34A; color: #1B2516; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                            {"승인"}
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  {(v.pendingEmpty) ? (
                    <>
                    <p style={css("margin: 0; padding: 40px; text-align: center; color: #56634F; font-size: 15px")}>
                      {"대기 중인 가입 신청이 없어요."}
                    </p>
                    </>
                  ) : null}
                </div>
                </>
              ) : null}
              {(v.isList) ? (
                <>
                <div style={css("overflow-x: auto")}>
                  <table style={css("width: 100%; border-collapse: collapse; font-size: 14px; min-width: 900px")}>
                    <thead>
                      <tr style={css("background: #F3F6EE; color: #56634F; text-align: left")}>
                        <th style={css("width: 48px; padding: 12px 0 12px 20px")}>
                          <input type="checkbox" aria-label="전체 선택" checked={!!(v.allChecked) && v.allChecked !== 'false'} onChange={v.toggleAll} style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                        </th>
                        <th style={css("padding: 12px 10px; font-weight: 600")}>
                          {"회원아이디"}
                        </th>
                        <th style={css("padding: 12px 10px; font-weight: 600")}>
                          {"이름"}
                        </th>
                        <th style={css("padding: 12px 10px; font-weight: 600")}>
                          {"별명"}
                        </th>
                        <th style={css("padding: 12px 10px; font-weight: 600")}>
                          {"역할"}
                        </th>
                        <th style={css("padding: 12px 10px; font-weight: 600")}>
                          {"최종접속"}
                        </th>
                        <th style={css("padding: 12px 10px; font-weight: 600")}>
                          {"이메일"}
                        </th>
                        <th style={css("padding: 12px 10px; font-weight: 600; text-align: center")}>
                          {"차단"}
                        </th>
                        <th style={css("padding: 12px 20px 12px 10px; font-weight: 600; text-align: right")}>
                          {"관리"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(v.rows || []).map((r, _i4) => (
                        <React.Fragment key={_i4}>
                          <tr className="row-hover" style={css(r.style)}>
                            <td style={css("padding: 10px 0 10px 20px")}>
                              <input type="checkbox" aria-label={`${r.name ?? ""} 선택`} checked={!!(r.checked) && r.checked !== 'false'} onChange={r.toggle} style={css("width: 18px; height: 18px; accent-color: #4F8F25")} />
                            </td>
                            <td style={css("padding: 10px; font-weight: 600")}>
                              {r.id}
                            </td>
                            <td style={css("padding: 10px")}>
                              {r.name}
                            </td>
                            <td style={css("padding: 10px; color: #56634F")}>
                              {r.nick}
                            </td>
                            <td style={css("padding: 10px")}>
                              <select aria-label={`${r.name ?? ""} 역할`} value={r.role ?? ''} onChange={r.onRole} style={css("min-height: 36px; padding: 0 8px; font-size: 14px")}>
                                <option value="member">
                                  {"회원"}
                                </option>
                                <option value="admin">
                                  {"관리자"}
                                </option>
                              </select>
                            </td>
                            <td style={css("padding: 10px; color: #56634F; white-space: nowrap")}>
                              {r.last}
                            </td>
                            <td style={css("padding: 10px; color: #56634F")}>
                              {r.email}
                            </td>
                            <td style={css("padding: 10px; text-align: center")}>
                              <input type="checkbox" aria-label={`${r.name ?? ""} 차단`} checked={!!(r.blocked) && r.blocked !== 'false'} onChange={r.toggleBlock} style={css("width: 18px; height: 18px; accent-color: #B3261E")} />
                            </td>
                            <td style={css("padding: 10px 20px 10px 10px; text-align: right")}>
                              <A className="btn-ghost" href="AdminMemberEdit.dc.html" style={css("display: inline-flex; align-items: center; min-height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid #D3DCC6; color: #1B2516; text-decoration: none; font-size: 13px; font-weight: 600")}>
                                {"수정"}
                              </A>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                  {(v.listEmpty) ? (
                    <>
                    <p style={css("margin: 0; padding: 40px; text-align: center; color: #56634F; font-size: 15px")}>
                      {"조건에 맞는 회원이 없어요."}
                    </p>
                    </>
                  ) : null}
                </div>
                <div style={css("display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding: 16px 20px; border-top: 1px solid #E1E8D6")}>
                  <div style={css("display: flex; gap: 8px; align-items: center")}>
                    <span style={css("font-size: 14px; color: #56634F; margin-right: 4px")}>
                      {v.checkedCount}{"명 선택"}
                    </span>
                    <button className="btn" onClick={v.saveSelected} style={css("min-height: 44px; padding: 0 18px; border: none; border-radius: 10px; background: #1F3B16; color: #FFFFFF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                      {"선택수정"}
                    </button>
                    <button className="btn" onClick={v.deleteSelected} style={css("min-height: 44px; padding: 0 18px; border: 1px solid #E8B4AE; border-radius: 10px; background: #FFFFFF; color: #B3261E; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px")}>
                      {"선택삭제"}
                    </button>
                  </div>
                  <nav aria-label="페이지" style={css("display: flex; gap: 6px")}>
                    {(v.pages || []).map((pg, _i5) => (
                      <React.Fragment key={_i5}>
                        <button onClick={pg.pick} aria-current={pg.current} style={css(pg.style)}>
                          {pg.n}
                        </button>
                      </React.Fragment>
                    ))}
                  </nav>
                </div>
                </>
              ) : null}
            </div>
            <p style={css("margin: 16px 4px 0; font-size: 13px; color: #56634F; line-height: 1.7")}>
              {"* 회원을 삭제해도 다른 사람이 같은 아이디를 쓰지 못하도록 아이디, 이름, 별명은 지우지 않고 보관합니다."}
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
