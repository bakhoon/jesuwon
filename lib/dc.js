'use client';
// 디자인 캔버스(.dc.html)를 React로 옮길 때 쓰는 작은 도우미들
import { useRef, useState } from 'react';
import Link from 'next/link';
import { EXT } from './assets';

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

// 디자인 파일 이름 → 사이트 주소
export const ROUTES = {
  'Main.dc.html': '/',
  'About.dc.html': '/about/',
  'Serve.dc.html': '/serve/',
  'Words.dc.html': '/words/',
  'Mokjang.dc.html': '/mokjang/',
  'Ufeedem.dc.html': '/ufeedem/',
  'Rest.dc.html': '/rest/',
  'Login.dc.html': '/login/',
  'Signup.dc.html': '/signup/',
  'MemberMain.dc.html': '/member/',
  'Edu.dc.html': '/member/edu/',
  'MemberWords.dc.html': '/member/words/',
  'MemberMokjang.dc.html': '/member/mokjang/',
  'MemberUfeedem.dc.html': '/member/ufeedem/',
  'MemberRest.dc.html': '/member/rest/',
  'AdminHome.dc.html': '/admin/',
  'AdminHomepage.dc.html': '/admin/homepage/',
  'AdminMembers.dc.html': '/admin/members/',
  'AdminMemberEdit.dc.html': '/admin/members/edit/',
  'AdminBanner.dc.html': '/admin/banners/',
  'AdminPopup.dc.html': '/admin/popups/',
  'AdminAbout.dc.html': '/admin/about/',
  'AdminServe.dc.html': '/admin/serve/',
};

export function route(href) {
  if (!href) return '#';
  const [file, hash] = String(href).split('#');
  if (ROUTES[file]) return ROUTES[file] + (hash ? '#' + hash : '');
  return href;
}

// '/_blob/<id>' → '/img/<id>.jpg'
export function asset(src) {
  const m = String(src || '').match(/\/_blob\/([0-9a-f]{32})/);
  if (!m) return src;
  return `${BASE}/img/${m[1]}${EXT[m[1]] || '.jpg'}`;
}

// "color: red; font-size: 14px" → { color: 'red', fontSize: '14px' }
const cache = new Map();
export function css(text) {
  if (!text) return undefined;
  if (cache.has(text)) return cache.get(text);
  const out = {};
  // 세미콜론으로 나누되 url(...) 안의 ; 는 무시
  let depth = 0, cur = '';
  const parts = [];
  for (const ch of text) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  parts.push(cur);
  for (const p of parts) {
    const i = p.indexOf(':');
    if (i < 0) continue;
    const k = p.slice(0, i).trim();
    const v = p.slice(i + 1).trim();
    if (!k || v === '') continue;
    const key = k.startsWith('--') ? k : k.replace(/^-ms-/, 'ms-').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = v;
  }
  cache.set(text, out);
  return out;
}

// 내부 링크는 Next Link, 외부/#는 일반 a
export function A({ href, children, ...rest }) {
  const to = route(href);
  if (/^(https?:|mailto:|tel:)/.test(to) || to === '#' || to.startsWith('#')) {
    return <a href={to} {...rest}>{children}</a>;
  }
  return <Link href={to} {...rest}>{children}</Link>;
}

// 디자인의 class Component extends DCLogic { renderVals() } 를 그대로 돌리는 훅
export class DCLogic {}
export function useDC(Cls, props = {}) {
  const [state, setState] = useState(null);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Cls();
  const inst = ref.current;
  inst.props = props;
  inst.state = state;
  inst.setState = (patch) =>
    setState((s) => ({ ...(s || {}), ...(typeof patch === 'function' ? patch(s || {}) : patch) }));
  return inst.renderVals();
}
