'use client';
// 이 파일은 tools/convert-design.mjs 가 design/Mokjang.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.tab-btn:hover{background:#EEF6E3}\n.card-btn img{transition:transform .4s ease}\n.card-btn:hover img{transform:scale(1.03)}\n.card-btn:hover .card-name{color:#2F5E17}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.nav-item:hover .nav-dropdown a:nth-child(2){transition-delay:.04s}\n.nav-item:hover .nav-dropdown a:nth-child(3){transition-delay:.08s}\n.nav-item:hover .nav-dropdown a:nth-child(4){transition-delay:.12s}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list,.card-btn img{transition:none !important}}\n@media (max-width: 860px){\n  .nav-links{display:none !important}\n  .nav-burger{display:flex !important}\n  .page-title{font-size:34px !important}\n}\n";

class Component extends DCLogic {
  renderVals() {
    const primary = this.props.primary ?? '#8BC34A';
    const st = this.state || {};
    const tab = st.tab || 'adult';
    const zoomIdx = typeof st.zoom === 'number' ? st.zoom : -1;
    const openSub = st.openSub || null;
    const B = '/_blob/';

    const CARDS = [
      ['cdf5c813079c04c81b5c26a66ef3b76d', '마사이 목장', '탄자니아'],
      ['e0b56a41534d3524c45be5355f5a8ea2', '미송게니 목장', '탄자니아'],
      ['3556090b31a540d0f12790da4f0ad385', '팡가웨 목장', '탄자니아'],
      ['18ab56d42b85e41f54da320cb68edeb1', '응게레 목장', '탄자니아'],
      ['0c6326ec15e37c69edae2f6658054d69', '모로고로 목장', '탄자니아'],
      ['385465c52c1cf19fcb249ea8921437cb', 'GST 목장', '탄자니아'],
      ['80188053fa813512ce4f18ae491238c4', '키징가 목장', '탄자니아'],
      ['30f164497c390b16419e028fcab56328', '킬로카 목장', '탄자니아'],
      ['a8a360674631d5ae7c21c68132e423b4', '스리랑카 목장', '스리랑카'],
      ['131d604cf5e740b092b4f8ee85ad2a51', '바카무나 목장', '스리랑카'],
      ['a1bf43c6615ef123f52160692384bd7c', '위촐 목장', '멕시코'],
      ['098b29ec56c654fbcd0ed6c5ca1fb2e0', '말레이 목장', '말레이시아'],
      ['9568059bf45f1c6f311cff721dbcb3d6', '멕시코 목장', '멕시코'],
      ['f902786874d35fe300504d8fd0735fa8', '싸포판 목장', '멕시코'],
      ['26c68cd7f30abf05c09313b06da5ed9f', '또날라 목장', '멕시코'],
      ['fc6467d7d793cd2fe08d6ac7d33beaf3', '청원 목장', '한국'],
      ['fd8e4dab3f7faa27268f02e0fd672b24', '할리스코 목장', '멕시코'],
      ['77d6370adfe73f22cc01965c69c7165a', '챠팔라 목장', '멕시코'],
      ['7f3f5dd4dc3165138ac6a3648cef36be', '과달라 목장', '멕시코']
    ];
    const cards = CARDS.map((c, i) => ({
      img: B + c[0], name: c[1], region: c[2], label: c[1] + ' 크게 보기',
      open: () => this.setState({ zoom: i })
    }));

    const OTHER = {
      tz: {
        label: '탄자니아초원', eyebrow: 'COLLEGE & YOUNG ADULTS',
        banner: B + '130f12c16ee2a03f54c60ed2a37764e4', bannerAlt: '탄자니아초원 대학, 청년 공동체 소개',
        videos: [{ title: '2023 SUMMER RETREAT ‘I AM’', channel: 'Sahn Y' }]
      },
      indio: {
        label: '인디오초원', eyebrow: 'YOUTH',
        banner: B + 'fd731d6ca65a7d634310a78b164c9312', bannerAlt: '인디오초원 중고등부 공동체 소개',
        videos: [{ title: 'United Winter Retreat 2024', channel: 'Jesuwon Events' }]
      },
      kids: {
        label: '주일학교', eyebrow: 'SUNDAY SCHOOL',
        banner: B + '44fbd937e353eb6d8792ef7a258b64b7', bannerAlt: '예수원 주일학교 소개',
        videos: [
          { title: '초등2부', channel: 'Jesuwon Events' },
          { title: '초등1부', channel: 'Jesuwon Events' }
        ]
      }
    };
    const LABELS = { adult: '장년목장', tz: '탄자니아초원', indio: '인디오초원', kids: '주일학교' };
    const EYEBROWS = { adult: 'SMALL GROUPS', tz: OTHER.tz.eyebrow, indio: OTHER.indio.eyebrow, kids: OTHER.kids.eyebrow };

    const go = (id) => (e) => {
      if (e && e.preventDefault) e.preventDefault();
      this.setState({ tab: id, zoom: -1, openSub: null });
    };
    const base = 'flex-shrink: 0; min-height: 56px; padding: 0 22px; border: none; background: transparent; font-family: inherit; font-size: 16px; cursor: pointer; white-space: nowrap;';
    const tabs = ['adult', 'tz', 'indio', 'kids'].map((id) => {
      const on = id === tab;
      return {
        label: LABELS[id],
        selected: on ? 'true' : 'false',
        style: base + (on ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 ' + primary + ';' : ' color: #56634F; font-weight: 500;'),
        pick: go(id)
      };
    });

    const o = OTHER[tab] || OTHER.tz;
    const other = {
      banner: o.banner, bannerAlt: o.bannerAlt,
      videos: o.videos.map((v) => ({ ...v, playLabel: v.title + ' 재생' }))
    };

    const z = zoomIdx >= 0 ? CARDS[zoomIdx] : null;
    const zoom = z
      ? { img: B + z[0], name: z[1], region: z[2], label: z[1] + ' 소개', pos: (zoomIdx + 1) + ' / ' + CARDS.length }
      : { img: '', name: '', region: '', label: '', pos: '' };
    const n = CARDS.length;

    return {
      primary,
      tabs,
      cards,
      other,
      eyebrow: EYEBROWS[tab],
      pageTitle: LABELS[tab],
      isAdult: tab === 'adult',
      isOther: tab !== 'adult',
      hasZoom: zoomIdx >= 0,
      zoom,
      closeZoom: () => this.setState({ zoom: -1 }),
      zoomPrev: () => this.setState({ zoom: (zoomIdx - 1 + n) % n }),
      zoomNext: () => this.setState({ zoom: (zoomIdx + 1) % n }),
      goAdult: go('adult'),
      goTz: go('tz'),
      goIndio: go('indio'),
      goKids: go('kids'),
      aboutCls: openSub === 'about' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); }
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "목장"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16")}>
          <img src={asset("/_blob/dbe4b4a927ade0c742cf1274d79bdd69")} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 35%")} />
          <div style={css("position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,38,14,0.88) 0%, rgba(20,38,14,0.70) 100%)")} />
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
                <A href="#" aria-current="page" aria-haspopup="true" style={css(`display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0; box-shadow: inset 0 -3px 0 ${v.primary ?? ""}`)}>
                  {" 목장 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <A href="#" onClick={v.goAdult} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"장년목장"}
                    </A>
                    <A href="#" onClick={v.goTz} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"탄자니아초원"}
                    </A>
                    <A href="#" onClick={v.goIndio} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                      {"인디오초원"}
                    </A>
                    <A href="#" onClick={v.goKids} style={css("display: block; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
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
                {"목장"}
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
          <div role="tablist" aria-label="목장" style={css("max-width: 1200px; margin: 0 auto; padding: 0 40px; box-sizing: border-box; display: flex; gap: 4px; overflow-x: auto")}>
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
          {(v.isAdult) ? (
            <>
            <section>
              <div style={css("display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px")}>
                {(v.cards || []).map((c, _i1) => (
                  <React.Fragment key={_i1}>
                    <button className="card-btn" onClick={c.open} aria-label={c.label} style={css("display: flex; flex-direction: column; padding: 0; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden; background: #FFFFFF; cursor: pointer; text-align: left; font-family: inherit")}>
                      <span style={css("display: block; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background: #DDE7D0")}>
                        <img src={asset(c.img)} alt="" style={css("width: 100%; height: 100%; object-fit: cover; display: block")} />
                      </span>
                      <span style={css("display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; box-sizing: border-box; padding: 14px 18px")}>
                        <span className="card-name" style={css("font-size: 17px; font-weight: 700; color: #1B2516")}>
                          {c.name}
                        </span>
                        <span style={css("font-size: 12px; font-weight: 600; color: #2F5E17; background: #EEF6E3; padding: 4px 10px; border-radius: 999px")}>
                          {c.region}
                        </span>
                      </span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </section>
            </>
          ) : null}
          {(v.isOther) ? (
            <>
            <section style={css("display: flex; flex-direction: column; gap: 40px")}>
              <div style={css("border-radius: 20px; overflow: hidden; background: #DDE7D0; box-shadow: 0 10px 30px rgba(27,37,22,0.10)")}>
                <img src={asset(v.other.banner)} alt={v.other.bannerAlt} style={css("width: 100%; display: block")} />
              </div>
              <div>
                <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"VIDEOS"}
                </p>
                <h2 style={css("margin: 0 0 24px; font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700")}>
                  {"영상"}
                </h2>
                <div style={css("display: grid; grid-template-columns: repeat(auto-fill, minmax(420px, 1fr)); gap: 24px")}>
                  {(v.other.videos || []).map((v, _i2) => (
                    <React.Fragment key={_i2}>
                      <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 18px; overflow: hidden")}>
                        <div style={css("position: relative; aspect-ratio: 16 / 9; background: #14240E; display: flex; align-items: center; justify-content: center")}>
                          <div style={css("position: absolute; inset: 0; background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 22px)")} />
                          <button aria-label={v.playLabel} style={css("position: relative; width: 72px; height: 72px; border-radius: 999px; border: none; background: #FFFFFF; color: #1F3B16; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.35)")}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                          <span style={css("position: absolute; right: 16px; bottom: 12px; font-size: 12px; color: rgba(255,255,255,0.7)")}>
                            {"YouTube 영상 임베드"}
                          </span>
                        </div>
                        <div style={css("padding: 16px 20px 20px")}>
                          <h3 style={css("margin: 0; font-size: 18px; font-weight: 700")}>
                            {v.title}
                          </h3>
                          <p style={css("margin: 4px 0 0; font-size: 14px; color: #56634F")}>
                            {v.channel}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
            </>
          ) : null}
        </main>
        {(v.hasZoom) ? (
          <>
          <div role="dialog" aria-modal="true" aria-label={v.zoom.label} style={css("position: fixed; inset: 0; z-index: 100; background: rgba(10,16,8,0.88); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; gap: 16px")}>
            <div style={css("width: 100%; max-width: 1200px; display: flex; justify-content: space-between; align-items: center; color: #FFFFFF")}>
              <span style={css("font-size: 18px; font-weight: 700")}>
                {v.zoom.name}{" "}
                <span style={css("font-size: 14px; font-weight: 500; opacity: 0.75")}>
                  {v.zoom.region}
                </span>
              </span>
              <button onClick={v.closeZoom} aria-label="닫기" style={css("width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.5); background: transparent; color: #FFFFFF; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div style={css("width: 100%; max-width: 1200px; display: flex; align-items: center; gap: 12px")}>
              <button onClick={v.zoomPrev} aria-label="이전 목장" style={css("flex-shrink: 0; width: 48px; height: 48px; border-radius: 999px; border: none; background: rgba(255,255,255,0.14); color: #FFFFFF; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <img src={asset(v.zoom.img)} alt={v.zoom.label} style={css("flex: 1; min-width: 0; max-height: 80vh; object-fit: contain; border-radius: 12px; display: block")} />
              <button onClick={v.zoomNext} aria-label="다음 목장" style={css("flex-shrink: 0; width: 48px; height: 48px; border-radius: 999px; border: none; background: rgba(255,255,255,0.14); color: #FFFFFF; display: flex; align-items: center; justify-content: center; cursor: pointer")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <span style={css("font-size: 13px; color: rgba(255,255,255,0.7)")}>
              {v.zoom.pos}
            </span>
          </div>
          </>
        ) : null}
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
