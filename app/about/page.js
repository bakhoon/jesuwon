'use client';
// 이 파일은 tools/convert-design.mjs 가 design/About.dc.html 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 `npm run convert` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = "\nbody{margin:0;background:#F6F9F1}\na{color:#2F5E17}a:hover{color:#1F3B16}\n.nav-burger{display:none !important}\n.util-bar,.site-header{width:100%;max-width:1280px;margin-left:auto !important;margin-right:auto !important;box-sizing:border-box}\nheader{flex-wrap:nowrap !important}\n.nav-links{white-space:nowrap;flex-shrink:0}\n@media (max-width: 1320px){.nav-links{gap:20px !important;font-size:16px !important}}\n@media (max-width: 1100px){.nav-links{gap:14px !important;font-size:15px !important}}\n.tab-btn:hover{background:#EEF6E3}\n.nav-dropdown{visibility:hidden;opacity:0;clip-path:inset(0 -40px 100% -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s linear .35s}\n.nav-dropdown a{opacity:0;transform:translateY(-6px);transition:opacity .25s ease,transform .25s ease,background .15s}\n.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{visibility:visible;opacity:1;clip-path:inset(0 -40px -60px -40px);transition:clip-path .35s cubic-bezier(.2,.7,.2,1),opacity .2s ease,visibility 0s}\n.nav-item:hover .nav-dropdown a,.nav-item:focus-within .nav-dropdown a{opacity:1;transform:none}\n.nav-item:hover .nav-dropdown a:nth-child(2){transition-delay:.04s}\n.nav-item:hover .nav-dropdown a:nth-child(3){transition-delay:.08s}\n.nav-item:hover .nav-dropdown a:nth-child(4){transition-delay:.12s}\n.nav-item:hover .nav-dropdown a:nth-child(5){transition-delay:.16s}\n.sub-list{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease,margin .35s}\n.sub-group.open .sub-list,.sub-group:focus-within .sub-list{max-height:260px;opacity:1;margin-top:2px !important;margin-bottom:6px !important}\n.sub-group.open .sub-caret,.sub-group:focus-within .sub-caret{transform:rotate(180deg)}\n.sub-group.open > a{background:#EEF6E3;color:#1F3B16}\n.sub-list a:hover{background:#DCEEC6 !important}\n.nav-item:hover .nav-caret{transform:rotate(180deg)}\n.nav-dropdown a:hover{background:#EEF6E3;color:#1F3B16}\n@media (prefers-reduced-motion: reduce){.nav-dropdown,.nav-dropdown a,.sub-list{transition:none !important}}\n@media (max-width: 860px){\n  .nav-links{display:none !important}\n  .nav-burger{display:flex !important}\n  .page-title{font-size:34px !important}\n}\n";

class Component extends DCLogic {
  renderVals() {
    const primary = this.props.primary ?? '#8BC34A';
    const tab = (this.state && this.state.tab) || 'intro';
    const defs = [
      { id: 'intro', label: '예수원 소개' },
      { id: 'philosophy', label: '목회관 & 구조' },
      { id: 'vision', label: '2세를 향한 비전' },
      { id: 'faith', label: '예수원의 신앙고백' }
    ];
    const base = 'flex-shrink: 0; min-height: 56px; padding: 0 22px; border: none; background: transparent; font-family: inherit; font-size: 16px; cursor: pointer; white-space: nowrap;';
    const tabs = defs.map((d) => {
      const on = d.id === tab;
      return {
        label: d.label,
        selected: on ? 'true' : 'false',
        style: base + (on
          ? ' color: #1F3B16; font-weight: 700; box-shadow: inset 0 -3px 0 ' + primary + ';'
          : ' color: #56634F; font-weight: 500;'),
        pick: () => this.setState({ tab: d.id })
      };
    });
    const faith = [
      { n: '1', title: 'God', body: 'We believe in one God, Creator of all things, holy, infinitely perfect, and eternally existing in a loving unity of three equally divine Persons: the Father, the Son and the Holy Spirit. Having limitless knowledge and sovereign power, God has graciously purposed from eternity to redeem a people for Himself and to make all things new for His own glory.' },
      { n: '2', title: 'The Bible', body: 'We believe that God has spoken in the scriptures, both Old and New Testaments, through the words of human authors. As the verbally inspired Word of God, the Bible is without error in the original writings, the complete revelation of His will for salvation, and the ultimate authority by which every realm of human knowledge and endeavor should be judged. Therefore, it is to be believed in all that it teaches, obeyed in all that it requires, and trusted in all that it promises.' },
      { n: '3', title: 'The Human Condition', body: 'We believe that God created Adam and Eve in His image, but they sinned when tempted by Satan. In union with Adam, human beings are sinners by nature and by choice, alienated from God, and under His wrath. Only through God’s saving work in Jesus Christ can we be rescued, reconciled and renewed.' },
      { n: '4', title: 'Jesus Christ', body: 'We believe that Jesus Christ is God incarnate, fully God and fully man, one Person in two natures. Jesus, Israel’s promised Messiah, was conceived through the Holy Spirit and born of the virgin Mary. He lived a sinless life, was crucified under Pontius Pilate, arose bodily from the dead, ascended into heaven and sits at the right hand of God the Father as our High Priest and Advocate.' },
      { n: '5', title: 'The Work of Christ', body: 'We believe that Jesus Christ, as our representative and substitute, shed His blood on the cross as the perfect, all-sufficient sacrifice for our sins. His atoning death and victorious resurrection constitute the only ground for salvation.' },
      { n: '6', title: 'The Holy Spirit', body: 'We believe that the Holy Spirit, in all that He does, glorifies the Lord Jesus Christ. He convicts the world of its guilt. He regenerates sinners, and in Him they are baptized into union with Christ and adopted as heirs in the family of God. He also indwells, illuminates, guides, equips and empowers believers for Christ-like living and service.' },
      { n: '7', title: 'The Church', body: 'We believe that the true church comprises all who have been justified by God’s grace through faith alone in Christ alone. They are united by the Holy Spirit in the body of Christ, of which He is the Head. The true church is manifest in local churches, whose membership should be composed only of believers. The Lord Jesus mandated two ordinances, baptism and the Lord’s Supper, which visibly and tangibly express the gospel. Though they are not the means of salvation, when celebrated by the church in genuine faith, these ordinances confirm and nourish the believer.' },
      { n: '8', title: 'Christian Living', body: 'We believe that God’s justifying grace must not be separated from His sanctifying power and purpose. God commands us to love Him supremely and others sacrificially, and to live out our faith with care for one another, compassion toward the poor and justice for the oppressed. With God’s Word, the Spirit’s power, and fervent prayer in Christ’s name, we are to combat the spiritual forces of evil. In obedience to Christ’s commission, we are to make disciples among all people, always bearing witness to the gospel in word and deed.' },
      { n: '9', title: 'Christ’s Return', body: 'We believe in the personal and bodily return of our Lord Jesus Christ. The coming of Christ, at a time known only to God, demands constant expectancy and, as our blessed hope, motivates the believer to godly living, sacrificial service and energetic mission.' },
      { n: '10', title: 'Response and Eternal Destiny', body: 'We believe that God commands everyone everywhere to believe the gospel by turning to Him in repentance and receiving the Lord Jesus Christ. We believe that God will raise the dead bodily and judge the world, assigning the unbeliever to condemnation and eternal conscious punishment and the believer to eternal blessedness and joy with the Lord in the new heaven and the new earth, to the praise of His glorious grace.' }
    ];
    const openSub = this.state ? this.state.openSub : null;
    const go = (id) => (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ tab: id, openSub: null }); };
    return {
      primary,
      tabs,
      aboutCls: openSub === 'about' ? 'open' : '',
      serveCls: openSub === 'serve' ? 'open' : '',
      openAbout: () => { if (openSub !== 'about') this.setState({ openSub: 'about' }); },
      openServe: () => { if (openSub !== 'serve') this.setState({ openSub: 'serve' }); },
      closeSub: () => { if (openSub !== null) this.setState({ openSub: null }); },
      goIntro: go('intro'),
      goPhilosophy: go('philosophy'),
      goVision: go('vision'),
      goFaith: go('faith'),
      faith,
      isIntro: tab === 'intro',
      isPhilosophy: tab === 'philosophy',
      isVision: tab === 'vision',
      isFaith: tab === 'faith'
    };
  }
}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = "예수원교회는"; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div style={css("font-family: 'IBM Plex Sans KR', system-ui, sans-serif; color: #1B2516; background: #F6F9F1; min-height: 100vh; word-break: keep-all")}>
        <section style={css("position: relative; color: #FFFFFF; background: #1F3B16")}>
          <img src={asset("/_blob/62d7b1829b263a297dbfa7b04dadb1e6")} alt="" style={css("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover")} />
          <div style={css("position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,38,14,0.85) 0%, rgba(20,38,14,0.70) 100%)")} />
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
                <A href="#" aria-current="page" aria-haspopup="true" style={css(`display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0; box-shadow: inset 0 -3px 0 ${v.primary ?? ""}`)}>
                  {" 교회안내 "}
                  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.2s")}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </A>
                <div className="nav-dropdown" style={css("position: absolute; left: -12px; top: 100%; padding-top: 10px; z-index: 20")}>
                  <div style={css(`width: 220px; background: #FFFFFF; border-radius: 14px; box-shadow: 0 14px 40px rgba(14,24,10,0.22); padding: 8px; border-top: 4px solid ${v.primary ?? ""}`)}>
                    <div className={`sub-group ${v.aboutCls ?? ""}`} onMouseEnter={v.openAbout}>
                      <A href="#" onClick={v.goIntro} aria-haspopup="true" style={css("display: flex; align-items: center; justify-content: space-between; padding: 11px 14px; border-radius: 8px; color: #1B2516; text-decoration: none; font-size: 15px; font-weight: 500")}>
                        {" 예수원교회는 "}
                        <svg className="sub-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={css("transition: transform 0.25s")}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </A>
                      <div className="sub-list" style={css("background: #EEF6E3; border-radius: 10px; margin: 0 4px")}>
                        <A href="#" onClick={v.goIntro} style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
                          {"예수원 소개"}
                        </A>
                        <A href="#" onClick={v.goPhilosophy} style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
                          {"목회관 & 구조"}
                        </A>
                        <A href="#" onClick={v.goVision} style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
                          {"2세를 향한 비전"}
                        </A>
                        <A href="#" onClick={v.goFaith} style={css("display: block; padding: 10px 14px 10px 26px; border-radius: 8px; color: #2F5E17; text-decoration: none; font-size: 14px; font-weight: 500")}>
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
                <A href="#" aria-haspopup="true" style={css("display: inline-flex; align-items: center; gap: 6px; color: #FFFFFF; text-decoration: none; padding: 10px 0")}>
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
              {"ABOUT JESUWON"}
            </p>
            <h1 className="page-title" style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 48px; font-weight: 700")}>
              {"예수원교회는"}
            </h1>
            <nav aria-label="현재 위치" style={css("display: flex; align-items: center; gap: 10px; margin-top: 18px; font-size: 14px; color: rgba(255,255,255,0.8)")}>
              <A href="Main.dc.html" style={css("color: rgba(255,255,255,0.85); text-decoration: none")}>
                {"홈"}
              </A>
              <span aria-hidden="true">
                {"›"}
              </span>
              <span>
                {"교회안내"}
              </span>
              <span aria-hidden="true">
                {"›"}
              </span>
              <span style={css("color: #FFFFFF; font-weight: 600")}>
                {"예수원교회는"}
              </span>
            </nav>
          </div>
        </section>
        <div style={css("position: sticky; top: 0; z-index: 5; background: #FFFFFF; border-bottom: 1px solid #E1E8D6")}>
          <div role="tablist" aria-label="예수원교회는" style={css("max-width: 1200px; margin: 0 auto; padding: 0 40px; box-sizing: border-box; display: flex; gap: 4px; overflow-x: auto")}>
            {(v.tabs || []).map((t, _i0) => (
              <React.Fragment key={_i0}>
                <button className="tab-btn" role="tab" aria-selected={t.selected} onClick={t.pick} style={css(t.style)}>
                  {t.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
        <main style={css("max-width: 960px; margin: 0 auto; padding: 64px 40px 96px; box-sizing: border-box")}>
          {(v.isIntro) ? (
            <>
            <div style={css("display: flex; flex-direction: column; gap: 56px")}>
              <section>
                <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"BEGINNING & LOCATION"}
                </p>
                <h2 style={css("margin: 0 0 16px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                  {"시작 & 위치"}
                </h2>
                <p style={css("margin: 0; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                  {"예수원교회는 필라델피아(Philadelphia, PA) 지역 북쪽 외곽의 호샴(Horsham)에 자리 잡고 있습니다. 2004년 5월 첫 예배를 드린 이후, 오늘에 이르기까지 건강한 공동체 교회로 영광스럽게 세워져 가고 있습니다."}
                </p>
              </section>
              <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px; display: flex; gap: 28px; align-items: center; flex-wrap: wrap")}>
                <div style={css("flex: 0 0 auto; font-family: 'Gowun Batang', serif; font-size: 56px; font-weight: 700; line-height: 1; color: #1F3B16")}>
                  <span style={css("color: #4F8F25")}>
                    {"예수"}
                  </span>
                  <span>
                    {"원"}
                  </span>
                </div>
                <div style={css("flex: 1 1 360px; min-width: 0")}>
                  <h2 style={css("margin: 0 0 10px; font-family: 'Gowun Batang', serif; font-size: 26px; font-weight: 700")}>
                    {"이름"}
                  </h2>
                  <p style={css("margin: 0; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                    {"예수원이란 이름은 ‘"}
                    <b style={css("color: #3F7A1C")}>
                      {"예수"}
                    </b>
                    {"님의 열매가 가득한 영적 과수"}
                    <b style={css("color: #3F7A1C")}>
                      {"원"}
                    </b>
                    {"’을 뜻합니다. 예수원에서는 예수님의 향기롭고 탐스러운 좋은 열매들로만 가득한, 주님의 과수원이기를 소원합니다."}
                  </p>
                </div>
              </section>
              <section>
                <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"MISSION & GOAL"}
                </p>
                <h2 style={css("margin: 0 0 16px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                  {"사명 & 목표"}
                </h2>
                <blockquote style={css("margin: 0 0 20px; padding: 24px 28px; background: #1F3B16; color: #FFFFFF; border-radius: 16px")}>
                  <p style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 24px; font-weight: 700; line-height: 1.5")}>
                    {"“하나님의 소원을 풀어 드리는 교회”"}
                  </p>
                  <p style={css("margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.8)")}>
                    {"마28:19-20; 요13:34; 고후 5:9"}
                  </p>
                </blockquote>
                <div style={css("display: flex; flex-direction: column; gap: 16px; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                  <p style={css("margin: 0")}>
                    {"위의 영구적 표제 아래, ‘"}
                    <b style={css("color: #1F3B16; box-shadow: inset 0 -10px 0 rgba(139,195,74,0.35)")}>
                      {"영혼 구원하여 그리스도의 제자로 살게 하는 교회의 본질 운동"}
                    </b>
                    {"’을 가장 큰 사명(the Great Commission, 마28:19-20)으로 삼고 있습니다."}
                  </p>
                  <p style={css("margin: 0; font-size: 14px; line-height: 1.7; color: #56634F")}>
                    {"* 사람은 하나님의 소원을 풀어 드릴 능력도 자격도 없는 존재임을 잘 압니다. 다만 실천력 있는 제자의 삶을 위한 강조적 표현일 뿐입니다."}
                  </p>
                  <p style={css("margin: 0")}>
                    {"따라서 예수원은 교회 간의 수평 이동을 통한 교인 등록은 최대한 자제하고 있습니다. 특별한 사정이 있으신 경우를 제외하고는, 비신자분들, 신앙생활의 경험이 있으나 여러가지 사정으로 인하여 현재 믿음 생활을 중단하고 계신 분들을 섬겨 주님의 제자로 거듭나게 함을 목표로 삼고 있습니다. 나아가 교회와 세상을 예수님의 마음으로 사랑하며, 세상을 하나님의 나라로 회복해 가는 ‘사명 지향적 선교적 삶’을 꿈꾸며, 배우며, 노력하는 공동체입니다."}
                  </p>
                  <p style={css("margin: 0")}>
                    {"또한 예수님의 새 계명인 “예수님처럼 서로 사랑하라”고 하신 대계명(the Great Commandment, 요 13:34)을 따라, 서로 사랑과 서로 섬김의 ‘상호적 헌신’을 그리스도인이 보여 줄 최고의 태도로 여기며 힘쓰는 공동체입니다."}
                  </p>
                </div>
              </section>
              <section>
                <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"BACKGROUND"}
                </p>
                <h2 style={css("margin: 0 0 20px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                  {"배경"}
                </h2>
                <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px")}>
                  <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 28px")}>
                    <h3 style={css("margin: 0 0 12px; font-size: 20px; font-weight: 700")}>
                      {"신학적 배경"}
                    </h3>
                    <p style={css("margin: 0; font-size: 16px; line-height: 1.85; color: #2E3A28")}>
                      {"우리 주 예수 그리스도의 말씀을 따라서 가르침을 받은 사도들이 세운 교회의 ‘교리 & 전통’(오직 성경) 만을 준수합니다. 특별히 16세기 종교개혁자 존 칼빈(John Calvin)의 개혁주의 신학을 근거로 합니다. 아울러, 예수원교회는 영혼 구원을 가장 중요한 교회 운동으로 받들고자 ‘개혁주의적 복음주의 교회’를 지향합니다."}
                    </p>
                    <p style={css("margin: 14px 0 0; display: inline-block; font-size: 13px; font-weight: 600; color: #2F5E17; background: #EEF6E3; padding: 6px 12px; border-radius: 999px")}>
                      {"Revangelical = Reformed Theology + Evangelical Ministry"}
                    </p>
                  </div>
                  <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 28px")}>
                    <h3 style={css("margin: 0 0 12px; font-size: 20px; font-weight: 700")}>
                      {"교단적 배경"}
                    </h3>
                    <p style={css("margin: 0; font-size: 16px; line-height: 1.85; color: #2E3A28")}>
                      {"예수원교회는 미국의 보수 개혁파 장로교단인, ‘연합개혁장로교회’(The Associate Reformed Presbyterian Church, ARPC)에 소속되어 있습니다. 장로교회의 창시자인 존 칼빈(John Calvin)과 존 낙스(John Knox)의 사상을 이어받은 스코틀랜드 장로교회의 전통을 200년 이상 지켜오고 있는 좋은 교단입니다. 가까운 교단으로는 PCA가 있습니다. 또한 한국의 고신, 합동측 장로교단과 사상적 교류를 함께합니다."}
                    </p>
                    <A href="https://www.arpchurch.org" style={css("display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 14px; font-weight: 600; text-decoration: none; padding: 6px 0")}>
                      {"www.arpchurch.org "}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </A>
                  </div>
                </div>
              </section>
            </div>
            </>
          ) : null}
          {(v.isPhilosophy) ? (
            <>
            <div style={css("display: flex; flex-direction: column; gap: 56px")}>
              <section>
                <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"PASTORAL PHILOSOPHY"}
                </p>
                <h2 style={css("margin: 0 0 20px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                  {"목회관"}
                </h2>
                <div style={css("display: flex; flex-direction: column; gap: 16px")}>
                  <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 28px")}>
                    <div style={css("display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 12px")}>
                      <span style={css("font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700; color: #4F8F25")}>
                        {"01"}
                      </span>
                      <h3 style={css("margin: 0; font-size: 21px; font-weight: 700")}>
                        {"사명지향"}
                      </h3>
                      <span style={css("font-size: 14px; color: #56634F")}>
                        {"Mission-oriented"}
                      </span>
                    </div>
                    <p style={css("margin: 0 0 12px; font-size: 16px; line-height: 1.85; color: #2E3A28")}>
                      {"예수원교회는 세상을 향하신 창조주 하나님의 선교(God’s Mission)를 위하여 그리스도 안에서 세움을 받은 교회임을 믿습니다. 또한 모든 성도는 하나님의 소원을 이루어 드리기 위하여 부름 받은 사명자들임을 믿습니다."}
                    </p>
                    <p style={css("margin: 0; font-size: 16px; line-height: 1.85; color: #2E3A28")}>
                      {"예수원교회의 존재 목적, 제1 핵심 가치는 영혼 구원임을 믿습니다. 또한 온 세상이 하나님의 복을 받아 생명과 사랑의 공동체로 온전히 회복되어 가기까지 교회와 모든 성도는 하나님의 마음을 가지고 세상을 사랑하며 살아야 한다는 것을 믿습니다(요3:16). 우리의 물질과 시간, 현재와 미래, 인격과 성품, 일과 휴식, 관계와 조직, 생계와 취미, 도덕과 윤리, 생각과 가치, 동식물과 자연, 사람과 사회 등, 삶의 모든 영역에서 하나님의 꿈을 이루어가는 하나님 나라의 대사로서 책임있게 살아 가는 것이 우리의 사명(mission)임을 믿습니다. 이를 위하여 우리는 그리스도 안에서 그리스도의 몸된 교회를 통하여 준비되며, 배우며, 실천하고자 합니다."}
                    </p>
                  </div>
                  <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 28px")}>
                    <div style={css("display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 12px")}>
                      <span style={css("font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700; color: #4F8F25")}>
                        {"02"}
                      </span>
                      <h3 style={css("margin: 0; font-size: 21px; font-weight: 700")}>
                        {"서로 섬김"}
                      </h3>
                      <span style={css("font-size: 14px; color: #56634F")}>
                        {"Servanthood"}
                      </span>
                    </div>
                    <p style={css("margin: 0; font-size: 16px; line-height: 1.85; color: #2E3A28")}>
                      {"섬김은 사랑의 표현 방식이자 증거입니다. 섬김은 헌신이기에 대가를 요구합니다. 그것은 자기 희생이며 그리스도를 닮아가는 제자도입니다. 섬김은 공동체를 유익하게 하는 능력이자, 공동체를 이끌어 가는 주님의 방식(Servant leadership)입니다. 다만 우리는 일방이 아닌 서로가 서로를 섬김으로 공동체를 세워가는 ‘상합형 서로 섬김의 공동체’를 실현합니다."}
                    </p>
                  </div>
                  <div style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 28px")}>
                    <div style={css("display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 12px")}>
                      <span style={css("font-family: 'Gowun Batang', serif; font-size: 28px; font-weight: 700; color: #4F8F25")}>
                        {"03"}
                      </span>
                      <h3 style={css("margin: 0; font-size: 21px; font-weight: 700")}>
                        {"의견 일치"}
                      </h3>
                      <span style={css("font-size: 14px; color: #56634F")}>
                        {"Consensus"}
                      </span>
                    </div>
                    <p style={css("margin: 0; font-size: 16px; line-height: 1.85; color: #2E3A28")}>
                      {"주님의 교회를 건강하게 세워가기 위하여 ‘만장일치제’를 실행합니다. 교회의 중요한 의결 방식입니다. 다만 교회의 질서와 권위를 존중하는 가운데 교회의 유익을 위하여 목회자를 중심으로 한 ‘의견 일치의 합의체 공동체’를 실현합니다."}
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"STRUCTURE"}
                </p>
                <h2 style={css("margin: 0 0 20px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                  {"목회 구조"}
                </h2>
                <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px")}>
                  <div style={css("background: #EEF6E3; border-radius: 16px; padding: 28px")}>
                    <span style={css(`display: flex; width: 48px; height: 48px; border-radius: 14px; background: ${v.primary ?? ""}; color: #1B2516; align-items: center; justify-content: center; margin-bottom: 16px`)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="9" cy="8" r="3" />
                        <circle cx="17" cy="9" r="2.5" />
                        <path d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5" />
                        <path d="M15 14.5c2.6 0 5 1.3 5 4.5" />
                      </svg>
                    </span>
                    <h3 style={css("margin: 0 0 4px; font-size: 21px; font-weight: 700")}>
                      {"소그룹 공동체"}
                    </h3>
                    <p style={css("margin: 0 0 12px; font-size: 14px; color: #3F7A1C; font-weight: 600")}>
                      {"목장 공동체"}
                    </p>
                    <p style={css("margin: 0; font-size: 16px; line-height: 1.85; color: #2E3A28")}>
                      {"교회의 제1 핵심 가치인 영혼 구원과, 성화를 위한 개인의 신앙 인격 개발, 나아가 성도간의 교제와 섬김을 극대화 하기 위하여 목장별 소그룹 운동을 중요하게 여깁니다."}
                    </p>
                  </div>
                  <div style={css("background: #1F3B16; color: #FFFFFF; border-radius: 16px; padding: 28px")}>
                    <span style={css(`display: flex; width: 48px; height: 48px; border-radius: 14px; background: ${v.primary ?? ""}; color: #1B2516; align-items: center; justify-content: center; margin-bottom: 16px`)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2v5" />
                        <path d="M9.5 4.5h5" />
                        <path d="M4 21V11l8-4 8 4v10" />
                        <path d="M2 21h20" />
                        <path d="M10 21v-5h4v5" />
                      </svg>
                    </span>
                    <h3 style={css("margin: 0 0 4px; font-size: 21px; font-weight: 700")}>
                      {"대그룹 공동체"}
                    </h3>
                    <p style={css(`margin: 0 0 12px; font-size: 14px; color: ${v.primary ?? ""}; font-weight: 600`)}>
                      {"소그룹 연합체"}
                    </p>
                    <p style={css("margin: 0; font-size: 16px; line-height: 1.85; color: rgba(255,255,255,0.88)")}>
                      {"예수원교회 공동체란 소그룹 공동체들이 연합하여 하나되는 공동체입니다. 여기에서는 주일 예배를 비롯한 교회내의 모든 공적 모임들이 있습니다. 소그룹 공동체는 대그룹 연합체에 지체로서 참여하고 협력해야할 책임과 사명이 있습니다. 또한 그리스도의 신실한 제자 양육을 위한 JDTS 제자훈련학교(Jesuwon Disciple Training School)를 운영합니다. 아울러 소그룹 공동체를 돕기 위한 목자 양성 과정은 물론 필요한 모든 지원을 공급하는 중앙 기관입니다."}
                    </p>
                  </div>
                </div>
              </section>
            </div>
            </>
          ) : null}
          {(v.isVision) ? (
            <>
            <div style={css("display: flex; flex-direction: column; gap: 48px")}>
              <section style={css("background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 20px; padding: 36px")}>
                <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                  {"VISION FOR THE NEXT GENERATION"}
                </p>
                <h2 style={css("margin: 0 0 16px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                  {"2세를 향한 비전"}
                </h2>
                <p style={css("margin: 0; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                  {"이민 사회에서 자녀들의 신앙 교육은 한인 교회의 미래와 믿음의 가계를 이어가는 근간입니다. 2세의 신앙 교육은 교회와 가정이 하나 되는 협력을 통하여서만이 이루어질 수 있습니다. 예수원은 다음과 같은 2세 교육의 비전이 있습니다."}
                </p>
              </section>
              <section>
                <h3 style={css("margin: 0 0 12px; font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 10px")}>
                  <span style={css(`width: 10px; height: 10px; border-radius: 999px; background: ${v.primary ?? ""}`)} />
                  {"사역 전제"}
                </h3>
                <p style={css("margin: 0; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                  {"2세를 향하는 예수원의 자세는 선교적 관점입니다. 교회 밖의 비 신자를 구원하기 위하여 인내와 이해와 기다림으로 헌신하는 선교적 자세를 2세 사역에 적용하고자 합니다."}
                </p>
              </section>
              <section>
                <h3 style={css("margin: 0 0 12px; font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 10px")}>
                  <span style={css(`width: 10px; height: 10px; border-radius: 999px; background: ${v.primary ?? ""}`)} />
                  {"공통 언어"}
                </h3>
                <div style={css("display: flex; flex-direction: column; gap: 14px; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                  <p style={css("margin: 0")}>
                    {"‘언어는 정신이다’ 는 관점에서 출발합니다. 또한 부모의 신앙이 자녀들에게 전승되어야 한다는 사명 의식에서 언어의 중요성을 절감합니다. 따라서 예수원이 주일학교에서 사용하는 기본 언어는 한국어입니다. 신앙 교육과 부모들의 정신 이양은 오직 부모와 같은 언어 구조 속에서 가능하다고 믿기 때문입니다. 물론 한국어가 심하게 불편할 정도로 영어에 익숙한 부모와 그의 자녀들을 위해서는 장차 EM을 통하여 신앙 전승이 이루어져야 한다고 믿습니다."}
                  </p>
                  <p style={css("margin: 0")}>
                    {"따라서 예수원은 영어 사용을 우선하지 않습니다. 다만 "}
                    <b style={css("color: #1F3B16; box-shadow: inset 0 -10px 0 rgba(139,195,74,0.35)")}>
                      {"이중 언어를 목표로 하는 한국어 우선 교육 체계"}
                    </b>
                    {"를 지향합니다."}
                  </p>
                </div>
                <div style={css("margin-top: 20px; background: #EEF6E3; border-radius: 16px; padding: 24px 28px")}>
                  <p style={css("margin: 0 0 14px; font-size: 15px; font-weight: 700; color: #2F5E17")}>
                    {"참고로, 가정과 교회 안에서 한글의 공용화는 교회 교육을 뛰어 넘습니다."}
                  </p>
                  <ol style={css("margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 10px; font-size: 16px; line-height: 1.8; color: #2E3A28")}>
                    <li>
                      {"부모와 자녀간의 언어소통으로 인하여 자칫 가정에서 언어 문제로 단절될 수 있는 부모와의 교제를 회복시켜줄 것입니다. 우리는 이미 여기에 대한 열매를 보고 있습니다."}
                    </li>
                    <li>
                      {"나아가 한국인으로서 민족적 정체성을 심는데 크게 기여할 것입니다. 우리는 한글 우선의 신앙 교육 체계가 암울한 이민 한인 교회의 미래조차도 소망차게 열어 주는 통로가 될 수 있다고 믿습니다."}
                    </li>
                  </ol>
                </div>
              </section>
              <section>
                <h3 style={css("margin: 0 0 12px; font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 10px")}>
                  <span style={css(`width: 10px; height: 10px; border-radius: 999px; background: ${v.primary ?? ""}`)} />
                  {"미래 비전"}
                </h3>
                <p style={css("margin: 0; font-size: 17px; line-height: 1.9; color: #2E3A28")}>
                  {"다음 세대가 되면 아마도 영어와 한국어에 능통한 2세들 가운데는 다민족 교회와 미국인 교회를 담임할 미래 사역자들이 많이 배출될 것으로 예상합니다. 그날을 위하여 우리는 2세들에게 모범적인 한국적 신앙과 정신을 전수하고자 합니다. 따라서 예수원이 꿈꾸는 미래의 교회는 장차 영어 중심의 다민족 교회 공동체를 섬기기 위하여 영어권과 한글권이 한 교회 안에서 공존하는 ‘Two Groups in One Church’ 입니다."}
                </p>
                <div style={css("margin-top: 24px; background: #1F3B16; color: #FFFFFF; border-radius: 20px; padding: 36px; text-align: center")}>
                  <p style={css("margin: 0; font-family: 'Gowun Batang', serif; font-size: 34px; font-weight: 700")}>
                    {"Two Groups in One Church"}
                  </p>
                  <p style={css("margin: 10px 0 0; font-size: 15px; color: rgba(255,255,255,0.8)")}>
                    {"영어권과 한글권이 한 교회 안에서 함께"}
                  </p>
                </div>
              </section>
            </div>
            </>
          ) : null}
          {(v.isFaith) ? (
            <>
            <div lang="en">
              <p style={css("margin: 0 0 8px; font-size: 13px; letter-spacing: 0.14em; color: #3F7A1C; font-weight: 700")}>
                {"STATEMENT OF FAITH"}
              </p>
              <h2 style={css("margin: 0 0 28px; font-family: 'Gowun Batang', serif; font-size: 30px; font-weight: 700")}>
                {"The Statement of Faith of Jesuwon"}
              </h2>
              <div style={css("display: flex; flex-direction: column; gap: 12px")}>
                {(v.faith || []).map((f, _i1) => (
                  <React.Fragment key={_i1}>
                    <div style={css("display: flex; gap: 20px; background: #FFFFFF; border: 1px solid #E1E8D6; border-radius: 16px; padding: 24px 28px")}>
                      <span style={css("flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px; background: #EEF6E3; color: #2F5E17; display: flex; align-items: center; justify-content: center; font-family: 'Gowun Batang', serif; font-size: 20px; font-weight: 700")}>
                        {f.n}
                      </span>
                      <div style={css("min-width: 0")}>
                        <h3 style={css("margin: 0 0 8px; font-size: 19px; font-weight: 700")}>
                          {f.title}
                        </h3>
                        <p style={css("margin: 0; font-size: 16px; line-height: 1.8; color: #2E3A28")}>
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <p style={css("margin: 24px 0 0; text-align: right; font-family: 'Gowun Batang', serif; font-size: 22px; font-weight: 700; color: #1F3B16")}>
                {"Amen."}
              </p>
            </div>
            </>
          ) : null}
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
