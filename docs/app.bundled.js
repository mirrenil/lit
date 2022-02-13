/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  i = Symbol(),
  s = new Map();
class e {
  constructor(t, s) {
    if (((this._$cssResult$ = !0), s !== i))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    this.cssText = t;
  }
  get styleSheet() {
    let i = s.get(this.cssText);
    return (
      t &&
        void 0 === i &&
        (s.set(this.cssText, (i = new CSSStyleSheet())),
        i.replaceSync(this.cssText)),
      i
    );
  }
  toString() {
    return this.cssText;
  }
}
const n = t
  ? (t) => t
  : (t) =>
      t instanceof CSSStyleSheet
        ? ((t) => {
            let s = '';
            for (const i of t.cssRules) s += i.cssText;
            return ((t) => new e('string' == typeof t ? t : t + '', i))(s);
          })(t)
        : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var o, h;
const l = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? '' : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  r = (t, i) => i !== t && (i == i || t == t),
  u = {attribute: !0, type: String, converter: l, reflect: !1, hasChanged: r};
class d extends HTMLElement {
  constructor() {
    super(),
      (this._$Et = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Ei = null),
      this.o();
  }
  static addInitializer(t) {
    var i;
    (null !== (i = this.l) && void 0 !== i) || (this.l = []), this.l.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this._$Eh(s, i);
        void 0 !== e && (this._$Eu.set(e, s), t.push(e));
      }),
      t
    );
  }
  static createProperty(t, i = u) {
    if (
      (i.state && (i.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, i),
      !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const n = this[t];
        (this[i] = e), this.requestUpdate(t, n, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || u;
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Eu = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        i = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) i.unshift(n(t));
    } else void 0 !== t && i.push(n(t));
    return i;
  }
  static _$Eh(t, i) {
    const s = i.attribute;
    return !1 === s
      ? void 0
      : 'string' == typeof s
      ? s
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  o() {
    var t;
    (this._$Ep = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Ev(),
      this.requestUpdate(),
      null === (t = this.constructor.l) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$Em) && void 0 !== i ? i : (this._$Em = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$Em) ||
      void 0 === i ||
      i.splice(this._$Em.indexOf(t) >>> 0, 1);
  }
  _$Ev() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var i;
    const s =
      null !== (i = this.shadowRoot) && void 0 !== i
        ? i
        : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((i, s) => {
        t
          ? (i.adoptedStyleSheets = s.map((t) =>
              t instanceof CSSStyleSheet ? t : t.styleSheet
            ))
          : s.forEach((t) => {
              const s = document.createElement('style');
              (s.textContent = t.cssText), i.appendChild(s);
            });
      })(s, this.constructor.elementStyles),
      s
    );
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$Em) ||
        void 0 === t ||
        t.forEach((t) => {
          var i;
          return null === (i = t.hostConnected) || void 0 === i
            ? void 0
            : i.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$Em) ||
      void 0 === t ||
      t.forEach((t) => {
        var i;
        return null === (i = t.hostDisconnected) || void 0 === i
          ? void 0
          : i.call(t);
      });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$Eg(t, i, s = u) {
    var e, n;
    const o = this.constructor._$Eh(t, s);
    if (void 0 !== o && !0 === s.reflect) {
      const h = (
        null !==
          (n =
            null === (e = s.converter) || void 0 === e
              ? void 0
              : e.toAttribute) && void 0 !== n
          ? n
          : l.toAttribute
      )(i, s.type);
      (this._$Ei = t),
        null == h ? this.removeAttribute(o) : this.setAttribute(o, h),
        (this._$Ei = null);
    }
  }
  _$AK(t, i) {
    var s, e, n;
    const o = this.constructor,
      h = o._$Eu.get(t);
    if (void 0 !== h && this._$Ei !== h) {
      const t = o.getPropertyOptions(h),
        r = t.converter,
        u =
          null !==
            (n =
              null !==
                (e =
                  null === (s = r) || void 0 === s
                    ? void 0
                    : s.fromAttribute) && void 0 !== e
                ? e
                : 'function' == typeof r
                ? r
                : null) && void 0 !== n
            ? n
            : l.fromAttribute;
      (this._$Ei = h), (this[h] = u(i, t.type)), (this._$Ei = null);
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || r)(
        this[t],
        i
      )
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect &&
            this._$Ei !== t &&
            (void 0 === this._$ES && (this._$ES = new Map()),
            this._$ES.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = !0;
    try {
      await this._$Ep;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
        (this._$Et.forEach((t, i) => (this[i] = t)), (this._$Et = void 0));
    let i = !1;
    const s = this._$AL;
    try {
      (i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this._$Em) ||
              void 0 === t ||
              t.forEach((t) => {
                var i;
                return null === (i = t.hostUpdate) || void 0 === i
                  ? void 0
                  : i.call(t);
              }),
            this.update(s))
          : this._$ET();
    } catch (t) {
      throw ((i = !1), this._$ET(), t);
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$Em) ||
      void 0 === i ||
      i.forEach((t) => {
        var i;
        return null === (i = t.hostUpdated) || void 0 === i
          ? void 0
          : i.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$ET() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$ES &&
      (this._$ES.forEach((t, i) => this._$Eg(i, this[i], t)),
      (this._$ES = void 0)),
      this._$ET();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var a, c;
(d.finalized = !0),
  (d.elementProperties = new Map()),
  (d.elementStyles = []),
  (d.shadowRootOptions = {mode: 'open'}),
  null === (o = globalThis.reactiveElementPlatformSupport) ||
    void 0 === o ||
    o.call(globalThis, {ReactiveElement: d}),
  (null !== (h = globalThis.reactiveElementVersions) && void 0 !== h
    ? h
    : (globalThis.reactiveElementVersions = [])
  ).push('1.0.0-rc.3');
const v = globalThis.trustedTypes,
  f = v ? v.createPolicy('lit-html', {createHTML: (t) => t}) : void 0,
  p = `lit$${(Math.random() + '').slice(9)}$`,
  g = '?' + p,
  b = `<${g}>`,
  y = document,
  m = (t = '') => y.createComment(t),
  w = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  $ = Array.isArray,
  S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  C = /-->/g,
  A = />/g,
  _ =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  T = /'/g,
  k = /"/g,
  x = /^(?:script|style|textarea)$/i,
  E = (
    (t) =>
    (i, ...s) => ({_$litType$: t, strings: i, values: s})
  )(1),
  U = Symbol.for('lit-noChange'),
  M = Symbol.for('lit-nothing'),
  O = new WeakMap(),
  N = y.createTreeWalker(y, 129, null, !1),
  j = (t, i) => {
    const s = t.length - 1,
      e = [];
    let n,
      o = 2 === i ? '<svg>' : '',
      h = S;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let l,
        r,
        u = -1,
        d = 0;
      for (; d < s.length && ((h.lastIndex = d), (r = h.exec(s)), null !== r); )
        (d = h.lastIndex),
          h === S
            ? '!--' === r[1]
              ? (h = C)
              : void 0 !== r[1]
              ? (h = A)
              : void 0 !== r[2]
              ? (x.test(r[2]) && (n = RegExp('</' + r[2], 'g')), (h = _))
              : void 0 !== r[3] && (h = _)
            : h === _
            ? '>' === r[0]
              ? ((h = null != n ? n : S), (u = -1))
              : void 0 === r[1]
              ? (u = -2)
              : ((u = h.lastIndex - r[2].length),
                (l = r[1]),
                (h = void 0 === r[3] ? _ : '"' === r[3] ? k : T))
            : h === k || h === T
            ? (h = _)
            : h === C || h === A
            ? (h = S)
            : ((h = _), (n = void 0));
      const a = h === _ && t[i + 1].startsWith('/>') ? ' ' : '';
      o +=
        h === S
          ? s + b
          : u >= 0
          ? (e.push(l), s.slice(0, u) + '$lit$' + s.slice(u) + p + a)
          : s + p + (-2 === u ? (e.push(void 0), i) : a);
    }
    const l = o + (t[s] || '<?>') + (2 === i ? '</svg>' : '');
    return [void 0 !== f ? f.createHTML(l) : l, e];
  };
class R {
  constructor({strings: t, _$litType$: i}, s) {
    let e;
    this.parts = [];
    let n = 0,
      o = 0;
    const h = t.length - 1,
      l = this.parts,
      [r, u] = j(t, i);
    if (
      ((this.el = R.createElement(r, s)),
      (N.currentNode = this.el.content),
      2 === i)
    ) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (e = N.nextNode()) && l.length < h; ) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          const t = [];
          for (const i of e.getAttributeNames())
            if (i.endsWith('$lit$') || i.startsWith(p)) {
              const s = u[o++];
              if ((t.push(i), void 0 !== s)) {
                const t = e.getAttribute(s.toLowerCase() + '$lit$').split(p),
                  i = /([.?@])?(.*)/.exec(s);
                l.push({
                  type: 1,
                  index: n,
                  name: i[2],
                  strings: t,
                  ctor:
                    '.' === i[1] ? L : '?' === i[1] ? B : '@' === i[1] ? D : H,
                });
              } else l.push({type: 6, index: n});
            }
          for (const i of t) e.removeAttribute(i);
        }
        if (x.test(e.tagName)) {
          const t = e.textContent.split(p),
            i = t.length - 1;
          if (i > 0) {
            e.textContent = v ? v.emptyScript : '';
            for (let s = 0; s < i; s++)
              e.append(t[s], m()), N.nextNode(), l.push({type: 2, index: ++n});
            e.append(t[i], m());
          }
        }
      } else if (8 === e.nodeType)
        if (e.data === g) l.push({type: 2, index: n});
        else {
          let t = -1;
          for (; -1 !== (t = e.data.indexOf(p, t + 1)); )
            l.push({type: 7, index: n}), (t += p.length - 1);
        }
      n++;
    }
  }
  static createElement(t, i) {
    const s = y.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function z(t, i, s = t, e) {
  var n, o, h, l;
  if (i === U) return i;
  let r =
    void 0 !== e
      ? null === (n = s._$Cl) || void 0 === n
        ? void 0
        : n[e]
      : s._$Cu;
  const u = w(i) ? void 0 : i._$litDirective$;
  return (
    (null == r ? void 0 : r.constructor) !== u &&
      (null === (o = null == r ? void 0 : r._$AO) ||
        void 0 === o ||
        o.call(r, !1),
      void 0 === u ? (r = void 0) : ((r = new u(t)), r._$AT(t, s, e)),
      void 0 !== e
        ? ((null !== (h = (l = s)._$Cl) && void 0 !== h ? h : (l._$Cl = []))[
            e
          ] = r)
        : (s._$Cu = r)),
    void 0 !== r && (i = z(t, r._$AS(t, i.values), r, e)),
    i
  );
}
class I {
  constructor(t, i) {
    (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var i;
    const {
        el: {content: s},
        parts: e,
      } = this._$AD,
      n = (
        null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i
          ? i
          : y
      ).importNode(s, !0);
    N.currentNode = n;
    let o = N.nextNode(),
      h = 0,
      l = 0,
      r = e[0];
    for (; void 0 !== r; ) {
      if (h === r.index) {
        let i;
        2 === r.type
          ? (i = new P(o, o.nextSibling, this, t))
          : 1 === r.type
          ? (i = new r.ctor(o, r.name, r.strings, this, t))
          : 6 === r.type && (i = new J(o, this, t)),
          this.v.push(i),
          (r = e[++l]);
      }
      h !== (null == r ? void 0 : r.index) && ((o = N.nextNode()), h++);
    }
    return n;
  }
  m(t) {
    let i = 0;
    for (const s of this.v)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++;
  }
}
class P {
  constructor(t, i, s, e) {
    var n;
    (this.type = 2),
      (this._$AH = M),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this._$Cg =
        null === (n = null == e ? void 0 : e.isConnected) || void 0 === n || n);
  }
  get _$AU() {
    var t, i;
    return null !==
      (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== i
      ? i
      : this._$Cg;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    (t = z(this, t, i)),
      w(t)
        ? t === M || null == t || '' === t
          ? (this._$AH !== M && this._$AR(), (this._$AH = M))
          : t !== this._$AH && t !== U && this.$(t)
        : void 0 !== t._$litType$
        ? this.T(t)
        : void 0 !== t.nodeType
        ? this.M(t)
        : ((t) => {
            var i;
            return (
              $(t) ||
              'function' ==
                typeof (null === (i = t) || void 0 === i
                  ? void 0
                  : i[Symbol.iterator])
            );
          })(t)
        ? this.S(t)
        : this.$(t);
  }
  A(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }
  M(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.A(t)));
  }
  $(t) {
    this._$AH !== M && w(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.M(y.createTextNode(t)),
      (this._$AH = t);
  }
  T(t) {
    var i;
    const {values: s, _$litType$: e} = t,
      n =
        'number' == typeof e
          ? this._$AC(t)
          : (void 0 === e.el && (e.el = R.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === n)
      this._$AH.m(s);
    else {
      const t = new I(n, this),
        i = t.p(this.options);
      t.m(s), this.M(i), (this._$AH = t);
    }
  }
  _$AC(t) {
    let i = O.get(t.strings);
    return void 0 === i && O.set(t.strings, (i = new R(t))), i;
  }
  S(t) {
    $(this._$AH) || ((this._$AH = []), this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const n of t)
      e === i.length
        ? i.push((s = new P(this.A(m()), this.A(m()), this, this.options)))
        : (s = i[e]),
        s._$AI(n),
        e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM &&
      ((this._$Cg = t),
      null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class H {
  constructor(t, i, s, e, n) {
    (this.type = 1),
      (this._$AH = M),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = n),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(M)), (this.strings = s))
        : (this._$AH = M);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const n = this.strings;
    let o = !1;
    if (void 0 === n)
      (t = z(this, t, i, 0)),
        (o = !w(t) || (t !== this._$AH && t !== U)),
        o && (this._$AH = t);
    else {
      const e = t;
      let h, l;
      for (t = n[0], h = 0; h < n.length - 1; h++)
        (l = z(this, e[s + h], i, h)),
          l === U && (l = this._$AH[h]),
          o || (o = !w(l) || l !== this._$AH[h]),
          l === M ? (t = M) : t !== M && (t += (null != l ? l : '') + n[h + 1]),
          (this._$AH[h] = l);
    }
    o && !e && this.k(t);
  }
  k(t) {
    t === M
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '');
  }
}
class L extends H {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  k(t) {
    this.element[this.name] = t === M ? void 0 : t;
  }
}
class B extends H {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  k(t) {
    t && t !== M
      ? this.element.setAttribute(this.name, '')
      : this.element.removeAttribute(this.name);
  }
}
class D extends H {
  constructor(t, i, s, e, n) {
    super(t, i, s, e, n), (this.type = 5);
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = z(this, t, i, 0)) && void 0 !== s ? s : M) === U)
      return;
    const e = this._$AH,
      n =
        (t === M && e !== M) ||
        t.capture !== e.capture ||
        t.once !== e.once ||
        t.passive !== e.passive,
      o = t !== M && (e === M || n);
    n && this.element.removeEventListener(this.name, this, e),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var i, s;
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (i = this.options) || void 0 === i ? void 0 : i.host) &&
            void 0 !== s
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class J {
  constructor(t, i, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var K, W, Z;
null === (a = globalThis.litHtmlPlatformSupport) ||
  void 0 === a ||
  a.call(globalThis, R, P),
  (null !== (c = globalThis.litHtmlVersions) && void 0 !== c
    ? c
    : (globalThis.litHtmlVersions = [])
  ).push('2.0.0-rc.4');
class q extends d {
  constructor() {
    super(...arguments),
      (this.renderOptions = {host: this}),
      (this._$Dt = void 0);
  }
  createRenderRoot() {
    var t, i;
    const s = super.createRenderRoot();
    return (
      (null !== (t = (i = this.renderOptions).renderBefore) && void 0 !== t) ||
        (i.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Dt = ((t, i, s) => {
        var e, n;
        const o =
          null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e
            ? e
            : i;
        let h = o._$litPart$;
        if (void 0 === h) {
          const t =
            null !== (n = null == s ? void 0 : s.renderBefore) && void 0 !== n
              ? n
              : null;
          o._$litPart$ = h = new P(
            i.insertBefore(m(), t),
            t,
            void 0,
            null != s ? s : {}
          );
        }
        return h._$AI(t), h;
      })(i, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return U;
  }
}
(q.finalized = !0),
  (q._$litElement$ = !0),
  null === (K = globalThis.litElementHydrateSupport) ||
    void 0 === K ||
    K.call(globalThis, {LitElement: q}),
  null === (W = globalThis.litElementPlatformSupport) ||
    void 0 === W ||
    W.call(globalThis, {LitElement: q}),
  (null !== (Z = globalThis.litElementVersions) && void 0 !== Z
    ? Z
    : (globalThis.litElementVersions = [])
  ).push('3.0.0-rc.3');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = (t, i) =>
  'method' === i.kind && i.descriptor && !('value' in i.descriptor)
    ? {
        ...i,
        finisher(s) {
          s.createProperty(i.key, t);
        },
      }
    : {
        kind: 'field',
        key: Symbol(),
        placement: 'own',
        descriptor: {},
        originalKey: i.key,
        initializer() {
          'function' == typeof i.initializer &&
            (this[i.key] = i.initializer.call(this));
        },
        finisher(s) {
          s.createProperty(i.key, t);
        },
      };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function F(t) {
  return (i, s) =>
    void 0 !== s
      ? ((t, i, s) => {
          i.constructor.createProperty(s, t);
        })(t, i, s)
      : V(t, i);
  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
var G = function (t, i, s, e) {
  for (
    var n,
      o = arguments.length,
      h =
        o < 3
          ? i
          : null === e
          ? (e = Object.getOwnPropertyDescriptor(i, s))
          : e,
      l = t.length - 1;
    l >= 0;
    l--
  )
    (n = t[l]) && (h = (o < 3 ? n(h) : o > 3 ? n(i, s, h) : n(i, s)) || h);
  return o > 3 && h && Object.defineProperty(i, s, h), h;
};
let Q = class extends q {
  constructor() {
    super(...arguments), (this.name = 'FED21G'), (this.count = 0);
  }
  render() {
    return E`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }
  _onClick() {
    this.count++, this.dispatchEvent(new CustomEvent('count-changed'));
  }
  sayHello(t) {
    return `Hello, ${t}`;
  }
};
(Q.styles = ((t, ...s) => {
  const n =
    1 === t.length
      ? t[0]
      : s.reduce(
          (i, s, e) =>
            i +
            ((t) => {
              if (!0 === t._$cssResult$) return t.cssText;
              if ('number' == typeof t) return t;
              throw Error(
                "Value passed to 'css' function must be a 'css' function result: " +
                  t +
                  ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
              );
            })(s) +
            t[e + 1],
          t[0]
        );
  return new e(n, i);
})`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `),
  G([F()], Q.prototype, 'name', void 0),
  G([F({type: Number})], Q.prototype, 'count', void 0),
  (Q = G(
    [
      (
        (t) => (i) =>
          'function' == typeof i
            ? ((t, i) => (window.customElements.define(t, i), i))(t, i)
            : ((t, i) => {
                const {kind: s, elements: e} = i;
                return {
                  kind: s,
                  elements: e,
                  finisher(i) {
                    window.customElements.define(t, i);
                  },
                };
              })(t, i)
      )('my-element'),
    ],
    Q
  ));
export {Q as MyElement};
