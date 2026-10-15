// 디자인 캔버스 파일(design/*.dc.html)을 Next.js 페이지(app/**/page.js)로 바꿔주는 스크립트
// 사용법: node tools/convert-design.mjs
// 디자인을 고친 뒤 다시 돌리면 페이지가 새로 만들어져요.
import fs from 'node:fs';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DESIGN = path.join(ROOT, 'design');

const PAGES = {
  'Main.dc.html': 'app/page.js',
  'About.dc.html': 'app/about/page.js',
  'Serve.dc.html': 'app/serve/page.js',
  'Words.dc.html': 'app/words/page.js',
  'Mokjang.dc.html': 'app/mokjang/page.js',
  'Ufeedem.dc.html': 'app/ufeedem/page.js',
  'Rest.dc.html': 'app/rest/page.js',
  'Login.dc.html': 'app/login/page.js',
  'Signup.dc.html': 'app/signup/page.js',
  'MemberMain.dc.html': 'app/member/page.js',
  'Edu.dc.html': 'app/member/edu/page.js',
  'MemberWords.dc.html': 'app/member/words/page.js',
  'MemberMokjang.dc.html': 'app/member/mokjang/page.js',
  'MemberUfeedem.dc.html': 'app/member/ufeedem/page.js',
  'MemberRest.dc.html': 'app/member/rest/page.js',
  'AdminHome.dc.html': 'app/admin/page.js',
  'AdminHomepage.dc.html': 'app/admin/homepage/page.js',
  'AdminMembers.dc.html': 'app/admin/members/page.js',
  'AdminMemberEdit.dc.html': 'app/admin/members/edit/page.js',
  'AdminBanner.dc.html': 'app/admin/banners/page.js',
  'AdminPopup.dc.html': 'app/admin/popups/page.js',
  'AdminAbout.dc.html': 'app/admin/about/page.js',
  'AdminServe.dc.html': 'app/admin/serve/page.js',
};

// 외부 서비스 없이 돌리는 체험용 동작 (디자인 파일은 그대로 두고 여기서만 바꿔요)
const PATCHES = {
  'Login.dc.html': [[
    "else this.setState({ msg: '로그인 화면 미리보기예요. 실제 사이트에서는 서버에서 확인합니다.', ok: true });",
    "else { this.setState({ msg: '체험용 로그인이에요. 잠시 후 이동합니다.', ok: true }); setTimeout(() => { window.location.href = (process.env.NEXT_PUBLIC_BASE_PATH || '') + (uid.trim().toLowerCase() === 'admin' ? '/admin/' : '/member/'); }, 500); }",
  ]],
};

const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'col', 'area', 'wbr']);
const ATTR_MAP = {
  class: 'className', for: 'htmlFor', readonly: 'readOnly', tabindex: 'tabIndex', maxlength: 'maxLength',
  colspan: 'colSpan', rowspan: 'rowSpan', autocomplete: 'autoComplete', autofocus: 'autoFocus',
  enterkeyhint: 'enterKeyHint', inputmode: 'inputMode', spellcheck: 'spellCheck', srcset: 'srcSet',
  crossorigin: 'crossOrigin', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen',
  'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray', 'stroke-opacity': 'strokeOpacity', 'fill-rule': 'fillRule',
  'clip-rule': 'clipRule', 'fill-opacity': 'fillOpacity', 'stop-color': 'stopColor', 'font-size': 'fontSize',
  'text-anchor': 'textAnchor', 'xlink:href': 'xlinkHref',
};
const BOOL_ATTRS = new Set(['checked', 'disabled', 'readOnly', 'selected', 'required', 'multiple', 'hidden', 'open', 'autoFocus']);
const HOLE = /\{\{\s*([^}]*?)\s*\}\}/g;

function holeExpr(raw, scope) {
  const e = raw.trim();
  if (/^(true|false|null|-?\d+(\.\d+)?)$/.test(e)) return e;
  const head = e.split('.')[0];
  return scope.includes(head) ? e : `v.${e}`;
}

// "a {{x}} b" → JS 템플릿 문자열 / 단독 {{x}} → 식
function attrValue(val, scope) {
  const only = val.match(/^\s*\{\{\s*([^}]*?)\s*\}\}\s*$/);
  if (only) return { expr: holeExpr(only[1], scope), whole: true };
  if (!HOLE.test(val)) { HOLE.lastIndex = 0; return { str: val }; }
  HOLE.lastIndex = 0;
  const t = val.replace(/[`\\$]/g, (c) => '\\' + c).replace(HOLE, (_, x) => '${' + holeExpr(x, scope) + ' ?? ""}');
  return { expr: '`' + t + '`', whole: false };
}

function jsxAttr(name, val, tag, scope) {
  if (name.startsWith('hint-')) return null;
  let key = ATTR_MAP[name] || name;
  if (/^on[A-Z]/.test(name)) {
    const a = attrValue(val, scope);
    return a.expr ? `${key}={${a.expr}}` : null;
  }
  const a = attrValue(val, scope);
  if (key === 'style') {
    const e = a.expr ? a.expr : JSON.stringify(a.str);
    return `style={css(${e})}`;
  }
  if (key === 'src') {
    const e = a.expr ? a.expr : JSON.stringify(a.str);
    return `src={asset(${e})}`;
  }
  if (key === 'value' && (tag === 'input' || tag === 'textarea' || tag === 'select')) {
    if (a.expr) return `value={${a.expr} ?? ''}`;
    return `defaultValue=${JSON.stringify(a.str)}`;
  }
  if (key === 'checked' && !a.expr) return 'defaultChecked';
  if (BOOL_ATTRS.has(key)) {
    if (a.expr) return `${key}={!!(${a.expr}) && ${a.expr} !== 'false'}`;
    return key;
  }
  if (a.expr) return `${key}={${a.expr}}`;
  return `${key}=${JSON.stringify(a.str)}`;
}

function textJSX(text, scope) {
  const collapsed = text.replace(/\s+/g, ' ');
  if (collapsed === ' ') return ' ';
  const out = [];
  let last = 0;
  collapsed.replace(HOLE, (m, x, idx) => {
    if (idx > last) out.push(`{${JSON.stringify(collapsed.slice(last, idx))}}`);
    out.push(`{${holeExpr(x, scope)}}`);
    last = idx + m.length;
    return m;
  });
  HOLE.lastIndex = 0;
  if (last < collapsed.length) out.push(`{${JSON.stringify(collapsed.slice(last))}}`);
  return out.join('');
}

let loopId = 0;
function nodeJSX(node, scope, depth) {
  const pad = '  '.repeat(depth);
  if (node.type === 'text') {
    const t = textJSX(node.data, scope);
    return t === ' ' ? (node.data.includes('\n') ? '' : '{" "}') : pad + t;
  }
  if (node.type === 'comment') return '';
  if (node.type !== 'tag' && node.type !== 'script' && node.type !== 'style') return '';
  const tag = node.name;
  const kids = () => (node.children || []).map((c) => nodeJSX(c, scope, depth + 1)).filter(Boolean).join('\n');

  if (tag === 'sc-for') {
    const list = attrValue(node.attribs.list, scope).expr;
    const as = node.attribs.as || 'it';
    const idx = `_i${loopId++}`;
    const inner = (node.children || []).map((c) => nodeJSX(c, [...scope, as], depth + 2)).filter(Boolean).join('\n');
    return `${pad}{(${list} || []).map((${as}, ${idx}) => (\n${pad}  <React.Fragment key={${idx}}>\n${inner}\n${pad}  </React.Fragment>\n${pad}))}`;
  }
  if (tag === 'sc-if') {
    const cond = attrValue(node.attribs.value, scope).expr;
    return `${pad}{(${cond}) ? (\n${pad}  <>\n${kids()}\n${pad}  </>\n${pad}) : null}`;
  }
  let jsxTag = tag === 'a' ? 'A' : tag;
  const attrs = Object.entries(node.attribs || {})
    .map(([k, v]) => jsxAttr(k, v, tag, scope))
    .filter(Boolean);
  if (tag === 'a' && !node.attribs.href) attrs.push('href="#"');
  const open = `${pad}<${jsxTag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
  if (VOID.has(tag)) return open + ' />';
  if (tag === 'textarea') return open + ' />'; // 값은 value 로
  const inner = kids();
  if (!inner.trim()) return open + ` />`;
  return `${open}>\n${inner}\n${pad}</${jsxTag}>`;
}

function convert(file, out) {
  const src = fs.readFileSync(path.join(DESIGN, file), 'utf8');
  const xdc = src.slice(src.indexOf('<x-dc>') + 6, src.indexOf('</x-dc>'));
  const helmet = xdc.match(/<helmet>([\s\S]*?)<\/helmet>/);
  const styles = helmet ? [...helmet[1].matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n') : '';
  const bodyHtml = xdc.replace(/<helmet>[\s\S]*?<\/helmet>/, '');
  let script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  for (const [from, to] of PATCHES[file] || []) {
    if (!script.includes(from)) throw new Error(`패치 위치를 못 찾음: ${file}`);
    script = script.replace(from, to);
  }
  const title = (src.match(/<title>([^<]*)<\/title>/) || [])[1] || '예수원교회';
  const doc = parseDocument(bodyHtml, { lowerCaseTags: false, lowerCaseAttributeNames: false, recognizeSelfClosing: true, decodeEntities: true });
  loopId = 0;
  const jsx = doc.children.map((c) => nodeJSX(c, [], 3)).filter(Boolean).join('\n');
  const code = `'use client';
// 이 파일은 tools/convert-design.mjs 가 design/${file} 에서 자동으로 만든 파일이에요.
// 화면을 고치려면 design 파일을 고친 뒤 \`npm run convert\` 를 다시 돌리세요.
import React, { useEffect } from 'react';
import { A, DCLogic, asset, css, useDC } from '@/lib/dc';

const STYLE = ${JSON.stringify(styles)};

${script.trim()}

export default function Page() {
  const v = useDC(Component);
  useEffect(() => { document.title = ${JSON.stringify(title)}; }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
${jsx}
    </>
  );
}
`;
  const dest = path.join(ROOT, out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, code);
  console.log('✓', file, '→', out);
}

for (const [f, o] of Object.entries(PAGES)) convert(f, o);
