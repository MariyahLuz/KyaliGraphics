/*!
 * Copyright (C) Federico Zivolo 2017
 */
(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function() {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = window.getComputedStyle(e, null);
        return t ? o[t] : o
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e || -1 !== ['HTML', 'BODY', '#document'].indexOf(e.nodeName)) return window.document.body;
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        var o = e && e.offsetParent,
            i = o && o.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : window.document.documentElement
    }

    function p(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e)
    }

    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode)
    }

    function d(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = o ? e : t,
            n = o ? t : e,
            a = document.createRange();
        a.setStart(i, 0), a.setEnd(n, 0);
        var l = a.commonAncestorContainer;
        if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l);
        var f = s(e);
        return f.host ? d(f.host, t) : d(e, s(t).host)
    }

    function a(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            i = e.nodeName;
        if ('BODY' === i || 'HTML' === i) {
            var n = window.document.documentElement,
                r = window.document.scrollingElement || n;
            return r[o]
        }
        return e[o]
    }

    function l(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = a(t, 'top'),
            n = a(t, 'left'),
            r = o ? -1 : 1;
        return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e
    }

    function f(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            i = 'Left' == o ? 'Right' : 'Bottom';
        return +e['border' + o + 'Width'].split('px')[0] + +e['border' + i + 'Width'].split('px')[0]
    }

    function m(e, t, o, i) {
        return X(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], ne() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0)
    }

    function c() {
        var e = window.document.body,
            t = window.document.documentElement,
            o = ne() && window.getComputedStyle(t);
        return {
            height: m('Height', e, t, o),
            width: m('Width', e, t, o)
        }
    }

    function h(e) {
        return de({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function g(e) {
        var o = {};
        if (ne()) try {
            o = e.getBoundingClientRect();
            var i = a(e, 'top'),
                n = a(e, 'left');
            o.top += i, o.left += n, o.bottom += i, o.right += n
        } catch (e) {} else o = e.getBoundingClientRect();
        var r = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            p = 'HTML' === e.nodeName ? c() : {},
            s = p.width || e.clientWidth || r.right - r.left,
            d = p.height || e.clientHeight || r.bottom - r.top,
            l = e.offsetWidth - s,
            m = e.offsetHeight - d;
        if (l || m) {
            var g = t(e);
            l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m
        }
        return h(r)
    }

    function u(e, o) {
        var i = ne(),
            r = 'HTML' === o.nodeName,
            p = g(e),
            s = g(o),
            d = n(e),
            a = t(o),
            f = +a.borderTopWidth.split('px')[0],
            m = +a.borderLeftWidth.split('px')[0],
            c = h({
                top: p.top - s.top - f,
                left: p.left - s.left - m,
                width: p.width,
                height: p.height
            });
        if (c.marginTop = 0, c.marginLeft = 0, !i && r) {
            var u = +a.marginTop.split('px')[0],
                b = +a.marginLeft.split('px')[0];
            c.top -= f - u, c.bottom -= f - u, c.left -= m - b, c.right -= m - b, c.marginTop = u, c.marginLeft = b
        }
        return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (c = l(c, o)), c
    }

    function b(e) {
        var t = window.document.documentElement,
            o = u(e, t),
            i = X(t.clientWidth, window.innerWidth || 0),
            n = X(t.clientHeight, window.innerHeight || 0),
            r = a(t),
            p = a(t, 'left'),
            s = {
                top: r - o.top + o.marginTop,
                left: p - o.left + o.marginLeft,
                width: i,
                height: n
            };
        return h(s)
    }

    function y(e) {
        var i = e.nodeName;
        return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || y(o(e))
    }

    function w(e, t, i, r) {
        var p = {
                top: 0,
                left: 0
            },
            s = d(e, t);
        if ('viewport' === r) p = b(s);
        else {
            var a;
            'scrollParent' === r ? (a = n(o(e)), 'BODY' === a.nodeName && (a = window.document.documentElement)) : 'window' === r ? a = window.document.documentElement : a = r;
            var l = u(a, s);
            if ('HTML' === a.nodeName && !y(s)) {
                var f = c(),
                    m = f.height,
                    h = f.width;
                p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, p.right = h + l.left
            } else p = l
        }
        return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p
    }

    function E(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function v(e, t, o, i, n) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = w(o, i, r, n),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function(e) {
                return de({
                    key: e
                }, s[e], {
                    area: E(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            a = d.filter(function(e) {
                var t = e.width,
                    i = e.height;
                return t >= o.clientWidth && i >= o.clientHeight
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }

    function x(e, t, o) {
        var i = d(t, o);
        return u(o, i)
    }

    function O(e) {
        var t = window.getComputedStyle(e),
            o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            n = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + o
            };
        return n
    }

    function L(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function S(e, t, o) {
        o = o.split('-')[0];
        var i = O(e),
            n = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], n
    }

    function T(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function C(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o
        });
        var i = T(e, function(e) {
            return e[t] === o
        });
        return e.indexOf(i)
    }

    function N(t, o, i) {
        var n = void 0 === i ? t : t.slice(0, C(t, 'name', i));
        return n.forEach(function(t) {
            t.function && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var i = t.function || t.fn;
            t.enabled && e(i) && (o.offsets.popper = h(o.offsets.popper), o.offsets.reference = h(o.offsets.reference), o = i(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function(e) {
            var o = e.name,
                i = e.enabled;
            return i && o === t
        })
    }

    function B(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof window.document.body.style[r]) return r
        }
        return null
    }

    function P() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function D(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? window : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || D(n(p.parentNode), t, o, i), i.push(p)
    }

    function H(e, t, o, i) {
        o.updateBound = i, window.addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return D(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function A() {
        this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function M(e, t) {
        return window.removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function I() {
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state))
    }

    function R(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function U(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && R(t[o]) && (i = 'px'), e.style[o] = t[o] + i
        })
    }

    function Y(e, t) {
        Object.keys(t).forEach(function(o) {
            var i = t[o];
            !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function F(e, t, o) {
        var i = T(e, function(e) {
                var o = e.name;
                return o === t
            }),
            n = !!i && e.some(function(e) {
                return e.name === o && e.enabled && e.order < i.order
            });
        if (!n) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return n
    }

    function j(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function K(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = le.indexOf(e),
            i = le.slice(o + 1).concat(le.slice(0, o));
        return t ? i.reverse() : i
    }

    function q(e, t, o, i) {
        var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +n[1],
            p = n[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = i;
            }
            var d = h(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? X(document.documentElement.clientHeight, window.innerHeight || 0) : X(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function G(e, t, o, i) {
        var n = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(i),
            p = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = p.indexOf(T(p, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function(e, i) {
            var n = (1 === i ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return q(e, n, t, o)
            })
        }), a.forEach(function(e, t) {
            e.forEach(function(o, i) {
                R(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1))
            })
        }), n
    }

    function z(e, t) {
        var o, i = t.offset,
            n = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = n.split('-')[0];
        return o = R(+i) ? [+i, 0] : G(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
    }
    for (var V = Math.min, _ = Math.floor, X = Math.max, Q = ['native code', '[object MutationObserverConstructor]'], J = function(e) {
            return Q.some(function(t) {
                return -1 < (e || '').toString().indexOf(t)
            })
        }, Z = 'undefined' != typeof window, $ = ['Edge', 'Trident', 'Firefox'], ee = 0, te = 0; te < $.length; te += 1)
        if (Z && 0 <= navigator.userAgent.indexOf($[te])) {
            ee = 1;
            break
        }
    var i, oe = Z && J(window.MutationObserver),
        ie = oe ? function(e) {
            var t = !1,
                o = 0,
                i = document.createElement('span'),
                n = new MutationObserver(function() {
                    e(), t = !1
                });
            return n.observe(i, {
                    attributes: !0
                }),
                function() {
                    t || (t = !0, i.setAttribute('x-index', o), ++o)
                }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, ee))
            }
        },
        ne = function() {
            return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i
        },
        re = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        pe = function() {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function(t, o, i) {
                return o && e(t.prototype, o), i && e(t, i), t
            }
        }(),
        se = function(e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        de = Object.assign || function(e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        ae = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        le = ae.slice(3),
        fe = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        me = function() {
            function t(o, i) {
                var n = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                re(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(n.update)
                }, this.update = ie(this.update.bind(this)), this.options = de({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(de({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                    n.options.modifiers[e] = de({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return de({
                        name: e
                    }, n.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }
            return pe(t, [{
                key: 'update',
                value: function() {
                    return k.call(this)
                }
            }, {
                key: 'destroy',
                value: function() {
                    return P.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return A.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return I.call(this)
                }
            }]), t
        }();
    return me.Utils = ('undefined' == typeof window ? global : window).PopperUtils, me.placements = ae, me.Defaults = {
        placement: 'bottom',
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = t.split('-')[1];
                    if (i) {
                        var n = e.offsets,
                            r = n.reference,
                            p = n.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            l = {
                                start: se({}, d, r[d]),
                                end: se({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = de({}, p, l[i])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: z,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || r(e.instance.popper);
                    e.instance.reference === o && (o = r(o));
                    var i = w(e.instance.popper, e.instance.reference, t.padding, o);
                    t.boundaries = i;
                    var n = t.priority,
                        p = e.offsets.popper,
                        s = {
                            primary: function(e) {
                                var o = p[e];
                                return p[e] < i[e] && !t.escapeWithReference && (o = X(p[e], i[e])), se({}, e, o)
                            },
                            secondary: function(e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = p[o];
                                return p[e] > i[e] && !t.escapeWithReference && (n = V(p[o], i[e] - ('right' === e ? p.width : p.height))), se({}, o, n)
                            }
                        };
                    return n.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        p = de({}, p, s[t](e))
                    }), e.offsets.popper = p, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        o = t.popper,
                        i = t.reference,
                        n = e.placement.split('-')[0],
                        r = _,
                        p = -1 !== ['top', 'bottom'].indexOf(n),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, o) {
                    if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var n = e.placement.split('-')[0],
                        r = e.offsets,
                        p = r.popper,
                        s = r.reference,
                        d = -1 !== ['left', 'right'].indexOf(n),
                        a = d ? 'height' : 'width',
                        l = d ? 'Top' : 'Left',
                        f = l.toLowerCase(),
                        m = d ? 'left' : 'top',
                        c = d ? 'bottom' : 'right',
                        g = O(i)[a];
                    s[c] - g < p[f] && (e.offsets.popper[f] -= p[f] - (s[c] - g)), s[f] + g > p[c] && (e.offsets.popper[f] += s[f] + g - p[c]);
                    var u = s[f] + s[a] / 2 - g / 2,
                        b = t(e.instance.popper, 'margin' + l).replace('px', ''),
                        y = u - h(e.offsets.popper)[f] - b;
                    return y = X(V(p[a] - g, y), 0), e.arrowElement = i, e.offsets.arrow = {}, e.offsets.arrow[f] = Math.round(y), e.offsets.arrow[m] = '', e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
                        i = e.placement.split('-')[0],
                        n = L(i),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case fe.FLIP:
                            p = [i, n];
                            break;
                        case fe.CLOCKWISE:
                            p = K(i);
                            break;
                        case fe.COUNTERCLOCKWISE:
                            p = K(i, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function(s, d) {
                        if (i !== s || p.length === d + 1) return e;
                        i = e.placement.split('-')[0], n = L(i);
                        var a = e.offsets.popper,
                            l = e.offsets.reference,
                            f = _,
                            m = 'left' === i && f(a.right) > f(l.left) || 'right' === i && f(a.left) < f(l.right) || 'top' === i && f(a.bottom) > f(l.top) || 'bottom' === i && f(a.top) < f(l.bottom),
                            c = f(a.left) < f(o.left),
                            h = f(a.right) > f(o.right),
                            g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === i && c || 'right' === i && h || 'top' === i && g || 'bottom' === i && u,
                            y = -1 !== ['top', 'bottom'].indexOf(i),
                            w = !!t.flipVariations && (y && 'start' === r && c || y && 'end' === r && h || !y && 'start' === r && g || !y && 'end' === r && u);
                        (m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = de({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = e.offsets,
                        n = i.popper,
                        r = i.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return n[p ? 'left' : 'top'] = r[o] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = L(t), e.offsets.popper = h(n), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = T(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x,
                        i = t.y,
                        n = e.offsets.popper,
                        p = T(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === p ? t.gpuAcceleration : p,
                        l = r(e.instance.popper),
                        f = g(l),
                        m = {
                            position: n.position
                        },
                        c = {
                            left: _(n.left),
                            top: _(n.top),
                            bottom: _(n.bottom),
                            right: _(n.right)
                        },
                        h = 'bottom' === o ? 'top' : 'bottom',
                        u = 'right' === i ? 'left' : 'right',
                        b = B('transform');
                    if (d = 'bottom' == h ? -f.height + c.bottom : c.top, s = 'right' == u ? -f.width + c.right : c.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[h] = 0, m[u] = 0, m.willChange = 'transform';
                    else {
                        var y = 'bottom' == h ? -1 : 1,
                            w = 'right' == u ? -1 : 1;
                        m[h] = d * y, m[u] = s * w, m.willChange = h + ', ' + u
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = de({}, E, e.attributes), e.styles = de({}, m, e.styles), e.arrowStyles = de({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && U(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, o, i, n) {
                    var r = x(n, t, e),
                        p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), U(t, {
                        position: 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    }, me
});

/*!
 * Bootstrap v4.2.1 (https://getbootstrap.com/)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("popper.js"), require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "popper.js", "jquery"], e) : e(t.bootstrap = {}, t.Popper, t.jQuery)
}(this, function(t, u, g) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function l(o) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {},
                e = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(r).filter(function(t) {
                return Object.getOwnPropertyDescriptor(r, t).enumerable
            }))), e.forEach(function(t) {
                var e, n, i;
                e = o, i = r[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            })
        }
        return o
    }
    u = u && u.hasOwnProperty("default") ? u.default : u, g = g && g.hasOwnProperty("default") ? g.default : g;
    var e = "transitionend";

    function n(t) {
        var e = this,
            n = !1;
        return g(this).one(_.TRANSITION_END, function() {
            n = !0
        }), setTimeout(function() {
            n || _.triggerTransitionEnd(e)
        }, t), this
    }
    var _ = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
            return t
        },
        getSelectorFromElement: function(t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            return e && document.querySelector(e) ? e : null
        },
        getTransitionDurationFromElement: function(t) {
            if (!t) return 0;
            var e = g(t).css("transition-duration"),
                n = g(t).css("transition-delay"),
                i = parseFloat(e),
                o = parseFloat(n);
            return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
        },
        reflow: function(t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function(t) {
            g(t).trigger(e)
        },
        supportsTransitionEnd: function() {
            return Boolean(e)
        },
        isElement: function(t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function(t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        r = e[i],
                        s = r && _.isElement(r) ? "element" : (a = r, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                }
            var a
        },
        findShadowRoot: function(t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    g.fn.emulateTransitionEnd = n, g.event.special[_.TRANSITION_END] = {
        bindType: e,
        delegateType: e,
        handle: function(t) {
            if (g(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var o = "alert",
        r = "bs.alert",
        a = "." + r,
        c = g.fn[o],
        h = {
            CLOSE: "close" + a,
            CLOSED: "closed" + a,
            CLICK_DATA_API: "click" + a + ".data-api"
        },
        f = "alert",
        d = "fade",
        m = "show",
        p = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function() {
                g.removeData(this._element, r), this._element = null
            }, t._getRootElement = function(t) {
                var e = _.getSelectorFromElement(t),
                    n = !1;
                return e && (n = document.querySelector(e)), n || (n = g(t).closest("." + f)[0]), n
            }, t._triggerCloseEvent = function(t) {
                var e = g.Event(h.CLOSE);
                return g(t).trigger(e), e
            }, t._removeElement = function(e) {
                var n = this;
                if (g(e).removeClass(m), g(e).hasClass(d)) {
                    var t = _.getTransitionDurationFromElement(e);
                    g(e).one(_.TRANSITION_END, function(t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(t)
                } else this._destroyElement(e)
            }, t._destroyElement = function(t) {
                g(t).detach().trigger(h.CLOSED).remove()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(r);
                    e || (e = new i(this), t.data(r, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }]), i
        }();
    g(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p)), g.fn[o] = p._jQueryInterface, g.fn[o].Constructor = p, g.fn[o].noConflict = function() {
        return g.fn[o] = c, p._jQueryInterface
    };
    var v = "button",
        E = "bs.button",
        y = "." + E,
        C = ".data-api",
        T = g.fn[v],
        S = "active",
        b = "btn",
        I = "focus",
        D = '[data-toggle^="button"]',
        w = '[data-toggle="buttons"]',
        A = 'input:not([type="hidden"])',
        N = ".active",
        O = ".btn",
        k = {
            CLICK_DATA_API: "click" + y + C,
            FOCUS_BLUR_DATA_API: "focus" + y + C + " blur" + y + C
        },
        P = function() {
            function n(t) {
                this._element = t
            }
            var t = n.prototype;
            return t.toggle = function() {
                var t = !0,
                    e = !0,
                    n = g(this._element).closest(w)[0];
                if (n) {
                    var i = this._element.querySelector(A);
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(S)) t = !1;
                            else {
                                var o = n.querySelector(N);
                                o && g(o).removeClass(S)
                            }
                        if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(S), g(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(S)), t && g(this._element).toggleClass(S)
            }, t.dispose = function() {
                g.removeData(this._element, E), this._element = null
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(E);
                    t || (t = new n(this), g(this).data(E, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }]), n
        }();
    g(document).on(k.CLICK_DATA_API, D, function(t) {
        t.preventDefault();
        var e = t.target;
        g(e).hasClass(b) || (e = g(e).closest(O)), P._jQueryInterface.call(g(e), "toggle")
    }).on(k.FOCUS_BLUR_DATA_API, D, function(t) {
        var e = g(t.target).closest(O)[0];
        g(e).toggleClass(I, /^focus(in)?$/.test(t.type))
    }), g.fn[v] = P._jQueryInterface, g.fn[v].Constructor = P, g.fn[v].noConflict = function() {
        return g.fn[v] = T, P._jQueryInterface
    };
    var L = "carousel",
        j = "bs.carousel",
        H = "." + j,
        R = ".data-api",
        U = g.fn[L],
        W = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        x = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        F = "next",
        q = "prev",
        M = "left",
        K = "right",
        Q = {
            SLIDE: "slide" + H,
            SLID: "slid" + H,
            KEYDOWN: "keydown" + H,
            MOUSEENTER: "mouseenter" + H,
            MOUSELEAVE: "mouseleave" + H,
            TOUCHSTART: "touchstart" + H,
            TOUCHMOVE: "touchmove" + H,
            TOUCHEND: "touchend" + H,
            POINTERDOWN: "pointerdown" + H,
            POINTERUP: "pointerup" + H,
            DRAG_START: "dragstart" + H,
            LOAD_DATA_API: "load" + H + R,
            CLICK_DATA_API: "click" + H + R
        },
        B = "carousel",
        V = "active",
        Y = "slide",
        X = "carousel-item-right",
        z = "carousel-item-left",
        G = "carousel-item-next",
        J = "carousel-item-prev",
        Z = "pointer-event",
        $ = ".active",
        tt = ".active.carousel-item",
        et = ".carousel-item",
        nt = ".carousel-item img",
        it = ".carousel-item-next, .carousel-item-prev",
        ot = ".carousel-indicators",
        rt = "[data-slide], [data-slide-to]",
        st = '[data-ride="carousel"]',
        at = {
            TOUCH: "touch",
            PEN: "pen"
        },
        lt = function() {
            function r(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(ot), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var t = r.prototype;
            return t.next = function() {
                this._isSliding || this._slide(F)
            }, t.nextWhenVisible = function() {
                !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
            }, t.prev = function() {
                this._isSliding || this._slide(q)
            }, t.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(it) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function(t) {
                var e = this;
                this._activeElement = this._element.querySelector(tt);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) g(this._element).one(Q.SLID, function() {
                        return e.to(t)
                    });
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        var i = n < t ? F : q;
                        this._slide(i, this._items[t])
                    }
            }, t.dispose = function() {
                g(this._element).off(H), g.removeData(this._element, j), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function(t) {
                return t = l({}, W, t), _.typeCheckConfig(L, t, x), t
            }, t._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    0 < e && this.prev(), e < 0 && this.next()
                }
            }, t._addEventListeners = function() {
                var e = this;
                this._config.keyboard && g(this._element).on(Q.KEYDOWN, function(t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && g(this._element).on(Q.MOUSEENTER, function(t) {
                    return e.pause(t)
                }).on(Q.MOUSELEAVE, function(t) {
                    return e.cycle(t)
                }), this._addTouchEventListeners()
            }, t._addTouchEventListeners = function() {
                var n = this;
                if (this._touchSupported) {
                    var e = function(t) {
                            n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                        },
                        i = function(t) {
                            n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function(t) {
                                return n.cycle(t)
                            }, 500 + n._config.interval))
                        };
                    g(this._element.querySelectorAll(nt)).on(Q.DRAG_START, function(t) {
                        return t.preventDefault()
                    }), this._pointerEvent ? (g(this._element).on(Q.POINTERDOWN, function(t) {
                        return e(t)
                    }), g(this._element).on(Q.POINTERUP, function(t) {
                        return i(t)
                    }), this._element.classList.add(Z)) : (g(this._element).on(Q.TOUCHSTART, function(t) {
                        return e(t)
                    }), g(this._element).on(Q.TOUCHMOVE, function(t) {
                        var e;
                        (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                    }), g(this._element).on(Q.TOUCHEND, function(t) {
                        return i(t)
                    }))
                }
            }, t._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, t._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(et)) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function(t, e) {
                var n = t === F,
                    i = t === q,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
                var s = (o + (t === q ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(this._element.querySelector(tt)),
                    o = g.Event(Q.SLIDE, {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                return g(this._element).trigger(o), o
            }, t._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    var e = [].slice.call(this._indicatorsElement.querySelectorAll($));
                    g(e).removeClass(V);
                    var n = this._indicatorsElement.children[this._getItemIndex(t)];
                    n && g(n).addClass(V)
                }
            }, t._slide = function(t, e) {
                var n, i, o, r = this,
                    s = this._element.querySelector(tt),
                    a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s),
                    c = this._getItemIndex(l),
                    h = Boolean(this._interval);
                if (o = t === F ? (n = z, i = G, M) : (n = X, i = J, K), l && g(l).hasClass(V)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
                    var u = g.Event(Q.SLID, {
                        relatedTarget: l,
                        direction: o,
                        from: a,
                        to: c
                    });
                    if (g(this._element).hasClass(Y)) {
                        g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
                        var f = parseInt(l.getAttribute("data-interval"), 10);
                        this._config.interval = f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, f) : this._config.defaultInterval || this._config.interval;
                        var d = _.getTransitionDurationFromElement(s);
                        g(s).one(_.TRANSITION_END, function() {
                            g(l).removeClass(n + " " + i).addClass(V), g(s).removeClass(V + " " + i + " " + n), r._isSliding = !1, setTimeout(function() {
                                return g(r._element).trigger(u)
                            }, 0)
                        }).emulateTransitionEnd(d)
                    } else g(s).removeClass(V), g(l).addClass(V), this._isSliding = !1, g(this._element).trigger(u);
                    h && this.cycle()
                }
            }, r._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this).data(j),
                        e = l({}, W, g(this).data());
                    "object" == typeof i && (e = l({}, e, i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new r(this, e), g(this).data(j, t)), "number" == typeof i) t.to(i);
                    else if ("string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else e.interval && (t.pause(), t.cycle())
                })
            }, r._dataApiClickHandler = function(t) {
                var e = _.getSelectorFromElement(this);
                if (e) {
                    var n = g(e)[0];
                    if (n && g(n).hasClass(B)) {
                        var i = l({}, g(n).data(), g(this).data()),
                            o = this.getAttribute("data-slide-to");
                        o && (i.interval = !1), r._jQueryInterface.call(g(n), i), o && g(n).data(j).to(o), t.preventDefault()
                    }
                }
            }, s(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return W
                }
            }]), r
        }();
    g(document).on(Q.CLICK_DATA_API, rt, lt._dataApiClickHandler), g(window).on(Q.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(st)), e = 0, n = t.length; e < n; e++) {
            var i = g(t[e]);
            lt._jQueryInterface.call(i, i.data())
        }
    }), g.fn[L] = lt._jQueryInterface, g.fn[L].Constructor = lt, g.fn[L].noConflict = function() {
        return g.fn[L] = U, lt._jQueryInterface
    };
    var ct = "collapse",
        ht = "bs.collapse",
        ut = "." + ht,
        ft = g.fn[ct],
        dt = {
            toggle: !0,
            parent: ""
        },
        gt = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        _t = {
            SHOW: "show" + ut,
            SHOWN: "shown" + ut,
            HIDE: "hide" + ut,
            HIDDEN: "hidden" + ut,
            CLICK_DATA_API: "click" + ut + ".data-api"
        },
        mt = "show",
        pt = "collapse",
        vt = "collapsing",
        Et = "collapsed",
        yt = "width",
        Ct = "height",
        Tt = ".show, .collapsing",
        St = '[data-toggle="collapse"]',
        bt = function() {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(St)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = _.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var t = a.prototype;
            return t.toggle = function() {
                g(this._element).hasClass(mt) ? this.hide() : this.show()
            }, t.show = function() {
                var t, e, n = this;
                if (!this._isTransitioning && !g(this._element).hasClass(mt) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(Tt)).filter(function(t) {
                        return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(pt)
                    })).length && (t = null), !(t && (e = g(t).not(this._selector).data(ht)) && e._isTransitioning))) {
                    var i = g.Event(_t.SHOW);
                    if (g(this._element).trigger(i), !i.isDefaultPrevented()) {
                        t && (a._jQueryInterface.call(g(t).not(this._selector), "hide"), e || g(t).data(ht, null));
                        var o = this._getDimension();
                        g(this._element).removeClass(pt).addClass(vt), this._element.style[o] = 0, this._triggerArray.length && g(this._triggerArray).removeClass(Et).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                            s = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            g(n._element).removeClass(vt).addClass(pt).addClass(mt), n._element.style[o] = "", n.setTransitioning(!1), g(n._element).trigger(_t.SHOWN)
                        }).emulateTransitionEnd(s), this._element.style[o] = this._element[r] + "px"
                    }
                }
            }, t.hide = function() {
                var t = this;
                if (!this._isTransitioning && g(this._element).hasClass(mt)) {
                    var e = g.Event(_t.HIDE);
                    if (g(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", _.reflow(this._element), g(this._element).addClass(vt).removeClass(pt).removeClass(mt);
                        var i = this._triggerArray.length;
                        if (0 < i)
                            for (var o = 0; o < i; o++) {
                                var r = this._triggerArray[o],
                                    s = _.getSelectorFromElement(r);
                                if (null !== s) g([].slice.call(document.querySelectorAll(s))).hasClass(mt) || g(r).addClass(Et).attr("aria-expanded", !1)
                            }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var a = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function() {
                            t.setTransitioning(!1), g(t._element).removeClass(vt).addClass(pt).trigger(_t.HIDDEN)
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function(t) {
                this._isTransitioning = t
            }, t.dispose = function() {
                g.removeData(this._element, ht), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function(t) {
                return (t = l({}, dt, t)).toggle = Boolean(t.toggle), _.typeCheckConfig(ct, t, gt), t
            }, t._getDimension = function() {
                return g(this._element).hasClass(yt) ? yt : Ct
            }, t._getParent = function() {
                var t, n = this;
                _.isElement(this._config.parent) ? (t = this._config.parent, "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return g(i).each(function(t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function(t, e) {
                var n = g(t).hasClass(mt);
                e.length && g(e).toggleClass(Et, !n).attr("aria-expanded", n)
            }, a._getTargetFromElement = function(t) {
                var e = _.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, a._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(ht),
                        n = l({}, dt, t.data(), "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(ht, e)), "string" == typeof i) {
                        if ("undefined" == typeof e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return dt
                }
            }]), a
        }();
    g(document).on(_t.CLICK_DATA_API, St, function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = g(this),
            e = _.getSelectorFromElement(this),
            i = [].slice.call(document.querySelectorAll(e));
        g(i).each(function() {
            var t = g(this),
                e = t.data(ht) ? "toggle" : n.data();
            bt._jQueryInterface.call(t, e)
        })
    }), g.fn[ct] = bt._jQueryInterface, g.fn[ct].Constructor = bt, g.fn[ct].noConflict = function() {
        return g.fn[ct] = ft, bt._jQueryInterface
    };
    var It = "dropdown",
        Dt = "bs.dropdown",
        wt = "." + Dt,
        At = ".data-api",
        Nt = g.fn[It],
        Ot = new RegExp("38|40|27"),
        kt = {
            HIDE: "hide" + wt,
            HIDDEN: "hidden" + wt,
            SHOW: "show" + wt,
            SHOWN: "shown" + wt,
            CLICK: "click" + wt,
            CLICK_DATA_API: "click" + wt + At,
            KEYDOWN_DATA_API: "keydown" + wt + At,
            KEYUP_DATA_API: "keyup" + wt + At
        },
        Pt = "disabled",
        Lt = "show",
        jt = "dropup",
        Ht = "dropright",
        Rt = "dropleft",
        Ut = "dropdown-menu-right",
        Wt = "position-static",
        xt = '[data-toggle="dropdown"]',
        Ft = ".dropdown form",
        qt = ".dropdown-menu",
        Mt = ".navbar-nav",
        Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        Qt = "top-start",
        Bt = "top-end",
        Vt = "bottom-start",
        Yt = "bottom-end",
        Xt = "right-start",
        zt = "left-start",
        Gt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        },
        Jt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        },
        Zt = function() {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var t = c.prototype;
            return t.toggle = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Pt)) {
                    var t = c._getParentFromElement(this._element),
                        e = g(this._menu).hasClass(Lt);
                    if (c._clearMenus(), !e) {
                        var n = {
                                relatedTarget: this._element
                            },
                            i = g.Event(kt.SHOW, n);
                        if (g(t).trigger(i), !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof u) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var o = this._element;
                                "parent" === this._config.reference ? o = t : _.isElement(this._config.reference) && (o = this._config.reference, "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && g(t).addClass(Wt), this._popper = new u(o, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === g(t).closest(Mt).length && g(document.body).children().on("mouseover", null, g.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), g(this._menu).toggleClass(Lt), g(t).toggleClass(Lt).trigger(g.Event(kt.SHOWN, n))
                        }
                    }
                }
            }, t.show = function() {
                if (!(this._element.disabled || g(this._element).hasClass(Pt) || g(this._menu).hasClass(Lt))) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(kt.SHOW, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.SHOWN, t)))
                }
            }, t.hide = function() {
                if (!this._element.disabled && !g(this._element).hasClass(Pt) && g(this._menu).hasClass(Lt)) {
                    var t = {
                            relatedTarget: this._element
                        },
                        e = g.Event(kt.HIDE, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.HIDDEN, t)))
                }
            }, t.dispose = function() {
                g.removeData(this._element, Dt), g(this._element).off(wt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function() {
                var e = this;
                g(this._element).on(kt.CLICK, function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function(t) {
                return t = l({}, this.constructor.Default, g(this._element).data(), t), _.typeCheckConfig(It, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function() {
                if (!this._menu) {
                    var t = c._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(qt))
                }
                return this._menu
            }, t._getPlacement = function() {
                var t = g(this._element.parentNode),
                    e = Vt;
                return t.hasClass(jt) ? (e = Qt, g(this._menu).hasClass(Ut) && (e = Bt)) : t.hasClass(Ht) ? e = Xt : t.hasClass(Rt) ? e = zt : g(this._menu).hasClass(Ut) && (e = Yt), e
            }, t._detectNavbar = function() {
                return 0 < g(this._element).closest(".navbar").length
            }, t._getPopperConfig = function() {
                var e = this,
                    t = {};
                "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, e._config.offset(t.offsets) || {}), t
                } : t.offset = this._config.offset;
                var n = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: t,
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (n.modifiers.applyStyle = {
                    enabled: !1
                }), n
            }, c._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data(Dt);
                    if (t || (t = new c(this, "object" == typeof e ? e : null), g(this).data(Dt, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, c._clearMenus = function(t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var e = [].slice.call(document.querySelectorAll(xt)), n = 0, i = e.length; n < i; n++) {
                        var o = c._getParentFromElement(e[n]),
                            r = g(e[n]).data(Dt),
                            s = {
                                relatedTarget: e[n]
                            };
                        if (t && "click" === t.type && (s.clickEvent = t), r) {
                            var a = r._menu;
                            if (g(o).hasClass(Lt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && g.contains(o, t.target))) {
                                var l = g.Event(kt.HIDE, s);
                                g(o).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), e[n].setAttribute("aria-expanded", "false"), g(a).removeClass(Lt), g(o).removeClass(Lt).trigger(g.Event(kt.HIDDEN, s)))
                            }
                        }
                    }
            }, c._getParentFromElement = function(t) {
                var e, n = _.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, c._dataApiKeydownHandler = function(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || g(t.target).closest(qt).length)) : Ot.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !g(this).hasClass(Pt))) {
                    var e = c._getParentFromElement(this),
                        n = g(e).hasClass(Lt);
                    if (n && (!n || 27 !== t.which && 32 !== t.which)) {
                        var i = [].slice.call(e.querySelectorAll(Kt));
                        if (0 !== i.length) {
                            var o = i.indexOf(t.target);
                            38 === t.which && 0 < o && o--, 40 === t.which && o < i.length - 1 && o++, o < 0 && (o = 0), i[o].focus()
                        }
                    } else {
                        if (27 === t.which) {
                            var r = e.querySelector(xt);
                            g(r).trigger("focus")
                        }
                        g(this).trigger("click")
                    }
                }
            }, s(c, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Gt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Jt
                }
            }]), c
        }();
    g(document).on(kt.KEYDOWN_DATA_API, xt, Zt._dataApiKeydownHandler).on(kt.KEYDOWN_DATA_API, qt, Zt._dataApiKeydownHandler).on(kt.CLICK_DATA_API + " " + kt.KEYUP_DATA_API, Zt._clearMenus).on(kt.CLICK_DATA_API, xt, function(t) {
        t.preventDefault(), t.stopPropagation(), Zt._jQueryInterface.call(g(this), "toggle")
    }).on(kt.CLICK_DATA_API, Ft, function(t) {
        t.stopPropagation()
    }), g.fn[It] = Zt._jQueryInterface, g.fn[It].Constructor = Zt, g.fn[It].noConflict = function() {
        return g.fn[It] = Nt, Zt._jQueryInterface
    };
    var $t = "modal",
        te = "bs.modal",
        ee = "." + te,
        ne = g.fn[$t],
        ie = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        oe = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        re = {
            HIDE: "hide" + ee,
            HIDDEN: "hidden" + ee,
            SHOW: "show" + ee,
            SHOWN: "shown" + ee,
            FOCUSIN: "focusin" + ee,
            RESIZE: "resize" + ee,
            CLICK_DISMISS: "click.dismiss" + ee,
            KEYDOWN_DISMISS: "keydown.dismiss" + ee,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
            CLICK_DATA_API: "click" + ee + ".data-api"
        },
        se = "modal-scrollbar-measure",
        ae = "modal-backdrop",
        le = "modal-open",
        ce = "fade",
        he = "show",
        ue = ".modal-dialog",
        fe = '[data-toggle="modal"]',
        de = '[data-dismiss="modal"]',
        ge = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        _e = ".sticky-top",
        me = function() {
            function o(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(ue), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var t = o.prototype;
            return t.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function(t) {
                var e = this;
                if (!this._isShown && !this._isTransitioning) {
                    g(this._element).hasClass(ce) && (this._isTransitioning = !0);
                    var n = g.Event(re.SHOW, {
                        relatedTarget: t
                    });
                    g(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), g(this._element).on(re.CLICK_DISMISS, de, function(t) {
                        return e.hide(t)
                    }), g(this._dialog).on(re.MOUSEDOWN_DISMISS, function() {
                        g(e._element).one(re.MOUSEUP_DISMISS, function(t) {
                            g(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return e._showElement(t)
                    }))
                }
            }, t.hide = function(t) {
                var e = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var n = g.Event(re.HIDE);
                    if (g(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = g(this._element).hasClass(ce);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), g(document).off(re.FOCUSIN), g(this._element).removeClass(he), g(this._element).off(re.CLICK_DISMISS), g(this._dialog).off(re.MOUSEDOWN_DISMISS), i) {
                            var o = _.getTransitionDurationFromElement(this._element);
                            g(this._element).one(_.TRANSITION_END, function(t) {
                                return e._hideModal(t)
                            }).emulateTransitionEnd(o)
                        } else this._hideModal()
                    }
                }
            }, t.dispose = function() {
                [window, this._element, this._dialog].forEach(function(t) {
                    return g(t).off(ee)
                }), g(document).off(re.FOCUSIN), g.removeData(this._element, te), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, t.handleUpdate = function() {
                this._adjustDialog()
            }, t._getConfig = function(t) {
                return t = l({}, ie, t), _.typeCheckConfig($t, t, oe), t
            }, t._showElement = function(t) {
                var e = this,
                    n = g(this._element).hasClass(ce);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.scrollTop = 0, n && _.reflow(this._element), g(this._element).addClass(he), this._config.focus && this._enforceFocus();
                var i = g.Event(re.SHOWN, {
                        relatedTarget: t
                    }),
                    o = function() {
                        e._config.focus && e._element.focus(), e._isTransitioning = !1, g(e._element).trigger(i)
                    };
                if (n) {
                    var r = _.getTransitionDurationFromElement(this._dialog);
                    g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                } else o()
            }, t._enforceFocus = function() {
                var e = this;
                g(document).off(re.FOCUSIN).on(re.FOCUSIN, function(t) {
                    document !== t.target && e._element !== t.target && 0 === g(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard ? g(this._element).on(re.KEYDOWN_DISMISS, function(t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || g(this._element).off(re.KEYDOWN_DISMISS)
            }, t._setResizeEvent = function() {
                var e = this;
                this._isShown ? g(window).on(re.RESIZE, function(t) {
                    return e.handleUpdate(t)
                }) : g(window).off(re.RESIZE)
            }, t._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function() {
                    g(document.body).removeClass(le), t._resetAdjustments(), t._resetScrollbar(), g(t._element).trigger(re.HIDDEN)
                })
            }, t._removeBackdrop = function() {
                this._backdrop && (g(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function(t) {
                var e = this,
                    n = g(this._element).hasClass(ce) ? ce : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = ae, n && this._backdrop.classList.add(n), g(this._backdrop).appendTo(document.body), g(this._element).on(re.CLICK_DISMISS, function(t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                        }), n && _.reflow(this._backdrop), g(this._backdrop).addClass(he), !t) return;
                    if (!n) return void t();
                    var i = _.getTransitionDurationFromElement(this._backdrop);
                    g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i)
                } else if (!this._isShown && this._backdrop) {
                    g(this._backdrop).removeClass(he);
                    var o = function() {
                        e._removeBackdrop(), t && t()
                    };
                    if (g(this._element).hasClass(ce)) {
                        var r = _.getTransitionDurationFromElement(this._backdrop);
                        g(this._backdrop).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o()
                } else t && t()
            }, t._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function() {
                var o = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(ge)),
                        e = [].slice.call(document.querySelectorAll(_e));
                    g(t).each(function(t, e) {
                        var n = e.style.paddingRight,
                            i = g(e).css("padding-right");
                        g(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                    }), g(e).each(function(t, e) {
                        var n = e.style.marginRight,
                            i = g(e).css("margin-right");
                        g(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                    });
                    var n = document.body.style.paddingRight,
                        i = g(document.body).css("padding-right");
                    g(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                }
                g(document.body).addClass(le)
            }, t._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(ge));
                g(t).each(function(t, e) {
                    var n = g(e).data("padding-right");
                    g(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                var e = [].slice.call(document.querySelectorAll("" + _e));
                g(e).each(function(t, e) {
                    var n = g(e).data("margin-right");
                    "undefined" != typeof n && g(e).css("margin-right", n).removeData("margin-right")
                });
                var n = g(document.body).data("padding-right");
                g(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = se, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, o._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var t = g(this).data(te),
                        e = l({}, ie, g(this).data(), "object" == typeof n && n ? n : {});
                    if (t || (t = new o(this, e), g(this).data(te, t)), "string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else e.show && t.show(i)
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return ie
                }
            }]), o
        }();
    g(document).on(re.CLICK_DATA_API, fe, function(t) {
        var e, n = this,
            i = _.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = g(e).data(te) ? "toggle" : l({}, g(e).data(), g(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = g(e).one(re.SHOW, function(t) {
            t.isDefaultPrevented() || r.one(re.HIDDEN, function() {
                g(n).is(":visible") && n.focus()
            })
        });
        me._jQueryInterface.call(g(e), o, this)
    }), g.fn[$t] = me._jQueryInterface, g.fn[$t].Constructor = me, g.fn[$t].noConflict = function() {
        return g.fn[$t] = ne, me._jQueryInterface
    };
    var pe = "tooltip",
        ve = "bs.tooltip",
        Ee = "." + ve,
        ye = g.fn[pe],
        Ce = "bs-tooltip",
        Te = new RegExp("(^|\\s)" + Ce + "\\S+", "g"),
        Se = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)"
        },
        be = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Ie = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent"
        },
        De = "show",
        we = "out",
        Ae = {
            HIDE: "hide" + Ee,
            HIDDEN: "hidden" + Ee,
            SHOW: "show" + Ee,
            SHOWN: "shown" + Ee,
            INSERTED: "inserted" + Ee,
            CLICK: "click" + Ee,
            FOCUSIN: "focusin" + Ee,
            FOCUSOUT: "focusout" + Ee,
            MOUSEENTER: "mouseenter" + Ee,
            MOUSELEAVE: "mouseleave" + Ee
        },
        Ne = "fade",
        Oe = "show",
        ke = ".tooltip-inner",
        Pe = ".arrow",
        Le = "hover",
        je = "focus",
        He = "click",
        Re = "manual",
        Ue = function() {
            function i(t, e) {
                if ("undefined" == typeof u) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var t = i.prototype;
            return t.enable = function() {
                this._isEnabled = !0
            }, t.disable = function() {
                this._isEnabled = !1
            }, t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = g(t.currentTarget).data(e);
                        n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (g(this.getTipElement()).hasClass(Oe)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, t.dispose = function() {
                clearTimeout(this._timeout), g.removeData(this.element, this.constructor.DATA_KEY), g(this.element).off(this.constructor.EVENT_KEY), g(this.element).closest(".modal").off("hide.bs.modal"), this.tip && g(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function() {
                var e = this;
                if ("none" === g(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = g.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    g(this.element).trigger(t);
                    var n = _.findShadowRoot(this.element),
                        i = g.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i) return;
                    var o = this.getTipElement(),
                        r = _.getUID(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && g(o).addClass(Ne);
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this.addAttachmentClass(a);
                    var l = this._getContainer();
                    g(o).data(this.constructor.DATA_KEY, this), g.contains(this.element.ownerDocument.documentElement, this.tip) || g(o).appendTo(l), g(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new u(this.element, o, {
                        placement: a,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: Pe
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            return e._handlePopperPlacementChange(t)
                        }
                    }), g(o).addClass(Oe), "ontouchstart" in document.documentElement && g(document.body).children().on("mouseover", null, g.noop);
                    var c = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, g(e.element).trigger(e.constructor.Event.SHOWN), t === we && e._leave(null, e)
                    };
                    if (g(this.tip).hasClass(Ne)) {
                        var h = _.getTransitionDurationFromElement(this.tip);
                        g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h)
                    } else c()
                }
            }, t.hide = function(t) {
                var e = this,
                    n = this.getTipElement(),
                    i = g.Event(this.constructor.Event.HIDE),
                    o = function() {
                        e._hoverState !== De && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), g(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                    };
                if (g(this.element).trigger(i), !i.isDefaultPrevented()) {
                    if (g(n).removeClass(Oe), "ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), this._activeTrigger[He] = !1, this._activeTrigger[je] = !1, this._activeTrigger[Le] = !1, g(this.tip).hasClass(Ne)) {
                        var r = _.getTransitionDurationFromElement(n);
                        g(n).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o();
                    this._hoverState = ""
                }
            }, t.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function() {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass(Ce + "-" + t)
            }, t.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, t.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(g(t.querySelectorAll(ke)), this.getTitle()), g(t).removeClass(Ne + " " + Oe)
            }, t.setElementContent = function(t, e) {
                var n = this.config.html;
                "object" == typeof e && (e.nodeType || e.jquery) ? n ? g(e).parent().is(t) || t.empty().append(e) : t.text(g(e).text()) : t[n ? "html" : "text"](e)
            }, t.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, t._getContainer = function() {
                return !1 === this.config.container ? document.body : _.isElement(this.config.container) ? g(this.config.container) : g(document).find(this.config.container)
            }, t._getAttachment = function(t) {
                return be[t.toUpperCase()]
            }, t._setListeners = function() {
                var i = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t) g(i.element).on(i.constructor.Event.CLICK, i.config.selector, function(t) {
                        return i.toggle(t)
                    });
                    else if (t !== Re) {
                        var e = t === Le ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                            n = t === Le ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                        g(i.element).on(e, i.config.selector, function(t) {
                            return i._enter(t)
                        }).on(n, i.config.selector, function(t) {
                            return i._leave(t)
                        })
                    }
                }), g(this.element).closest(".modal").on("hide.bs.modal", function() {
                    i.element && i.hide()
                }), this.config.selector ? this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? je : Le] = !0), g(e.getTipElement()).hasClass(Oe) || e._hoverState === De ? e._hoverState = De : (clearTimeout(e._timeout), e._hoverState = De, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === De && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? je : Le] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = we, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    e._hoverState === we && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, t._getConfig = function(t) {
                return "number" == typeof(t = l({}, this.constructor.Default, g(this.element).data(), "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), _.typeCheckConfig(pe, t, this.constructor.DefaultType), t
            }, t._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Te);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (g(t).removeClass(Ne), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(ve),
                        e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(ve, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ie
                }
            }, {
                key: "NAME",
                get: function() {
                    return pe
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return ve
                }
            }, {
                key: "Event",
                get: function() {
                    return Ae
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Ee
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Se
                }
            }]), i
        }();
    g.fn[pe] = Ue._jQueryInterface, g.fn[pe].Constructor = Ue, g.fn[pe].noConflict = function() {
        return g.fn[pe] = ye, Ue._jQueryInterface
    };
    var We = "popover",
        xe = "bs.popover",
        Fe = "." + xe,
        qe = g.fn[We],
        Me = "bs-popover",
        Ke = new RegExp("(^|\\s)" + Me + "\\S+", "g"),
        Qe = l({}, Ue.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        Be = l({}, Ue.DefaultType, {
            content: "(string|element|function)"
        }),
        Ve = "fade",
        Ye = "show",
        Xe = ".popover-header",
        ze = ".popover-body",
        Ge = {
            HIDE: "hide" + Fe,
            HIDDEN: "hidden" + Fe,
            SHOW: "show" + Fe,
            SHOWN: "shown" + Fe,
            INSERTED: "inserted" + Fe,
            CLICK: "click" + Fe,
            FOCUSIN: "focusin" + Fe,
            FOCUSOUT: "focusout" + Fe,
            MOUSEENTER: "mouseenter" + Fe,
            MOUSELEAVE: "mouseleave" + Fe
        },
        Je = function(t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function(t) {
                g(this.getTipElement()).addClass(Me + "-" + t)
            }, o.getTipElement = function() {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, o.setContent = function() {
                var t = g(this.getTipElement());
                this.setElementContent(t.find(Xe), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(ze), e), t.removeClass(Ve + " " + Ye)
            }, o._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function() {
                var t = g(this.getTipElement()),
                    e = t.attr("class").match(Ke);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this).data(xe),
                        e = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(xe, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Qe
                }
            }, {
                key: "NAME",
                get: function() {
                    return We
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return xe
                }
            }, {
                key: "Event",
                get: function() {
                    return Ge
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Fe
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Be
                }
            }]), i
        }(Ue);
    g.fn[We] = Je._jQueryInterface, g.fn[We].Constructor = Je, g.fn[We].noConflict = function() {
        return g.fn[We] = qe, Je._jQueryInterface
    };
    var Ze = "scrollspy",
        $e = "bs.scrollspy",
        tn = "." + $e,
        en = g.fn[Ze],
        nn = {
            offset: 10,
            method: "auto",
            target: ""
        },
        on = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        rn = {
            ACTIVATE: "activate" + tn,
            SCROLL: "scroll" + tn,
            LOAD_DATA_API: "load" + tn + ".data-api"
        },
        sn = "dropdown-item",
        an = "active",
        ln = '[data-spy="scroll"]',
        cn = ".nav, .list-group",
        hn = ".nav-link",
        un = ".nav-item",
        fn = ".list-group-item",
        dn = ".dropdown",
        gn = ".dropdown-item",
        _n = ".dropdown-toggle",
        mn = "offset",
        pn = "position",
        vn = function() {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + hn + "," + this._config.target + " " + fn + "," + this._config.target + " " + gn, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, g(this._scrollElement).on(rn.SCROLL, function(t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }
            var t = n.prototype;
            return t.refresh = function() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? mn : pn,
                    o = "auto" === this._config.method ? t : this._config.method,
                    r = o === pn ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                    var e, n = _.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [g(e)[o]().top + r, n]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function() {
                g.removeData(this._element, $e), g(this._scrollElement).off(tn), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function(t) {
                if ("string" != typeof(t = l({}, nn, "object" == typeof t && t ? t : {})).target) {
                    var e = g(t.target).attr("id");
                    e || (e = _.getUID(Ze), g(t.target).attr("id", e)), t.target = "#" + e
                }
                return _.typeCheckConfig(Ze, t, on), t
            }, t._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, t._activate = function(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",").map(function(t) {
                        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                    }),
                    n = g([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass(sn) ? (n.closest(dn).find(_n).addClass(an), n.addClass(an)) : (n.addClass(an), n.parents(cn).prev(hn + ", " + fn).addClass(an), n.parents(cn).prev(un).children(hn).addClass(an)), g(this._scrollElement).trigger(rn.ACTIVATE, {
                    relatedTarget: e
                })
            }, t._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                    return t.classList.contains(an)
                }).forEach(function(t) {
                    return t.classList.remove(an)
                })
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = g(this).data($e);
                    if (t || (t = new n(this, "object" == typeof e && e), g(this).data($e, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return nn
                }
            }]), n
        }();
    g(window).on(rn.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll(ln)), e = t.length; e--;) {
            var n = g(t[e]);
            vn._jQueryInterface.call(n, n.data())
        }
    }), g.fn[Ze] = vn._jQueryInterface, g.fn[Ze].Constructor = vn, g.fn[Ze].noConflict = function() {
        return g.fn[Ze] = en, vn._jQueryInterface
    };
    var En = "bs.tab",
        yn = "." + En,
        Cn = g.fn.tab,
        Tn = {
            HIDE: "hide" + yn,
            HIDDEN: "hidden" + yn,
            SHOW: "show" + yn,
            SHOWN: "shown" + yn,
            CLICK_DATA_API: "click" + yn + ".data-api"
        },
        Sn = "dropdown-menu",
        bn = "active",
        In = "disabled",
        Dn = "fade",
        wn = "show",
        An = ".dropdown",
        Nn = ".nav, .list-group",
        On = ".active",
        kn = "> li > .active",
        Pn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        Ln = ".dropdown-toggle",
        jn = "> .dropdown-menu .active",
        Hn = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.show = function() {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g(this._element).hasClass(bn) || g(this._element).hasClass(In))) {
                    var t, i, e = g(this._element).closest(Nn)[0],
                        o = _.getSelectorFromElement(this._element);
                    if (e) {
                        var r = "UL" === e.nodeName || "OL" === e.nodeName ? kn : On;
                        i = (i = g.makeArray(g(e).find(r)))[i.length - 1]
                    }
                    var s = g.Event(Tn.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = g.Event(Tn.SHOW, {
                            relatedTarget: i
                        });
                    if (i && g(i).trigger(s), g(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = document.querySelector(o)), this._activate(this._element, e);
                        var l = function() {
                            var t = g.Event(Tn.HIDDEN, {
                                    relatedTarget: n._element
                                }),
                                e = g.Event(Tn.SHOWN, {
                                    relatedTarget: i
                                });
                            g(i).trigger(t), g(n._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, t.dispose = function() {
                g.removeData(this._element, En), this._element = null
            }, t._activate = function(t, e, n) {
                var i = this,
                    o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? g(e).children(On) : g(e).find(kn))[0],
                    r = n && o && g(o).hasClass(Dn),
                    s = function() {
                        return i._transitionComplete(t, o, n)
                    };
                if (o && r) {
                    var a = _.getTransitionDurationFromElement(o);
                    g(o).removeClass(wn).one(_.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, t._transitionComplete = function(t, e, n) {
                if (e) {
                    g(e).removeClass(bn);
                    var i = g(e.parentNode).find(jn)[0];
                    i && g(i).removeClass(bn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (g(t).addClass(bn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _.reflow(t), g(t).addClass(wn), t.parentNode && g(t.parentNode).hasClass(Sn)) {
                    var o = g(t).closest(An)[0];
                    if (o) {
                        var r = [].slice.call(o.querySelectorAll(Ln));
                        g(r).addClass(bn)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(En);
                    if (e || (e = new i(this), t.data(En, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }]), i
        }();
    g(document).on(Tn.CLICK_DATA_API, Pn, function(t) {
        t.preventDefault(), Hn._jQueryInterface.call(g(this), "show")
    }), g.fn.tab = Hn._jQueryInterface, g.fn.tab.Constructor = Hn, g.fn.tab.noConflict = function() {
        return g.fn.tab = Cn, Hn._jQueryInterface
    };
    var Rn = "toast",
        Un = "bs.toast",
        Wn = "." + Un,
        xn = g.fn[Rn],
        Fn = {
            CLICK_DISMISS: "click.dismiss" + Wn,
            HIDE: "hide" + Wn,
            HIDDEN: "hidden" + Wn,
            SHOW: "show" + Wn,
            SHOWN: "shown" + Wn
        },
        qn = "fade",
        Mn = "hide",
        Kn = "show",
        Qn = "showing",
        Bn = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Vn = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        Yn = '[data-dismiss="toast"]',
        Xn = function() {
            function i(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var t = i.prototype;
            return t.show = function() {
                var t = this;
                g(this._element).trigger(Fn.SHOW), this._config.animation && this._element.classList.add(qn);
                var e = function() {
                    t._element.classList.remove(Qn), t._element.classList.add(Kn), g(t._element).trigger(Fn.SHOWN), t._config.autohide && t.hide()
                };
                if (this._element.classList.remove(Mn), this._element.classList.add(Qn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else e()
            }, t.hide = function(t) {
                var e = this;
                this._element.classList.contains(Kn) && (g(this._element).trigger(Fn.HIDE), t ? this._close() : this._timeout = setTimeout(function() {
                    e._close()
                }, this._config.delay))
            }, t.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Kn) && this._element.classList.remove(Kn), g(this._element).off(Fn.CLICK_DISMISS), g.removeData(this._element, Un), this._element = null, this._config = null
            }, t._getConfig = function(t) {
                return t = l({}, Vn, g(this._element).data(), "object" == typeof t && t ? t : {}), _.typeCheckConfig(Rn, t, this.constructor.DefaultType), t
            }, t._setListeners = function() {
                var t = this;
                g(this._element).on(Fn.CLICK_DISMISS, Yn, function() {
                    return t.hide(!0)
                })
            }, t._close = function() {
                var t = this,
                    e = function() {
                        t._element.classList.add(Mn), g(t._element).trigger(Fn.HIDDEN)
                    };
                if (this._element.classList.remove(Kn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else e()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = g(this),
                        e = t.data(Un);
                    if (e || (e = new i(this, "object" == typeof n && n), t.data(Un, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n](this)
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.2.1"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Bn
                }
            }]), i
        }();
    g.fn[Rn] = Xn._jQueryInterface, g.fn[Rn].Constructor = Xn, g.fn[Rn].noConflict = function() {
            return g.fn[Rn] = xn, Xn._jQueryInterface
        },
        function() {
            if ("undefined" == typeof g) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = g.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(), t.Util = _, t.Alert = p, t.Button = P, t.Carousel = lt, t.Collapse = bt, t.Dropdown = Zt, t.Modal = me, t.Popover = Je, t.Scrollspy = vn, t.Tab = Hn, t.Toast = Xn, t.Tooltip = Ue, Object.defineProperty(t, "__esModule", {
            value: !0
        })
});
//# sourceMappingURL=bootstrap.min.js.map

/*!
 * Autosize 3.0.15
 */
! function(e, t) {
    if ("function" == typeof define && define.amd) define(["exports", "module"], t);
    else if ("undefined" != typeof exports && "undefined" != typeof module) t(exports, module);
    else {
        var n = {
            exports: {}
        };
        t(n.exports, n), e.autosize = n.exports
    }
}(this, function(e, t) {
    "use strict";

    function n(e) {
        function t() {
            var t = window.getComputedStyle(e, null);
            p = t.overflowY, "vertical" === t.resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), c = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(c) && (c = 0), i()
        }

        function n(t) {
            var n = e.style.width;
            e.style.width = "0px", e.offsetWidth, e.style.width = n, p = t, f && (e.style.overflowY = t), o()
        }

        function o() {
            var t = window.pageYOffset,
                n = document.body.scrollTop,
                o = e.style.height;
            e.style.height = "auto";
            var i = e.scrollHeight + c;
            return 0 === e.scrollHeight ? void(e.style.height = o) : (e.style.height = i + "px", v = e.clientWidth, document.documentElement.scrollTop = t, void(document.body.scrollTop = n))
        }

        function i() {
            var t = e.style.height;
            o();
            var i = window.getComputedStyle(e, null);
            if (i.height !== e.style.height ? "visible" !== p && n("visible") : "hidden" !== p && n("hidden"), t !== e.style.height) {
                var r = d("autosize:resized");
                e.dispatchEvent(r)
            }
        }
        var s = void 0 === arguments[1] ? {} : arguments[1],
            a = s.setOverflowX,
            l = void 0 === a ? !0 : a,
            u = s.setOverflowY,
            f = void 0 === u ? !0 : u;
        if (e && e.nodeName && "TEXTAREA" === e.nodeName && !r.has(e)) {
            var c = null,
                p = null,
                v = e.clientWidth,
                h = function() {
                    e.clientWidth !== v && i()
                },
                y = function(t) {
                    window.removeEventListener("resize", h, !1), e.removeEventListener("input", i, !1), e.removeEventListener("keyup", i, !1), e.removeEventListener("autosize:destroy", y, !1), e.removeEventListener("autosize:update", i, !1), r["delete"](e), Object.keys(t).forEach(function(n) {
                        e.style[n] = t[n]
                    })
                }.bind(e, {
                    height: e.style.height,
                    resize: e.style.resize,
                    overflowY: e.style.overflowY,
                    overflowX: e.style.overflowX,
                    wordWrap: e.style.wordWrap
                });
            e.addEventListener("autosize:destroy", y, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", i, !1), window.addEventListener("resize", h, !1), e.addEventListener("input", i, !1), e.addEventListener("autosize:update", i, !1), r.add(e), l && (e.style.overflowX = "hidden", e.style.wordWrap = "break-word"), t()
        }
    }

    function o(e) {
        if (e && e.nodeName && "TEXTAREA" === e.nodeName) {
            var t = d("autosize:destroy");
            e.dispatchEvent(t)
        }
    }

    function i(e) {
        if (e && e.nodeName && "TEXTAREA" === e.nodeName) {
            var t = d("autosize:update");
            e.dispatchEvent(t)
        }
    }
    var r = "function" == typeof Set ? new Set : function() {
            var e = [];
            return {
                has: function(t) {
                    return Boolean(e.indexOf(t) > -1)
                },
                add: function(t) {
                    e.push(t)
                },
                "delete": function(t) {
                    e.splice(e.indexOf(t), 1)
                }
            }
        }(),
        d = function(e) {
            return new Event(e)
        };
    try {
        new Event("test")
    } catch (s) {
        d = function(e) {
            var t = document.createEvent("Event");
            return t.initEvent(e, !0, !1), t
        }
    }
    var a = null;
    "undefined" == typeof window || "function" != typeof window.getComputedStyle ? (a = function(e) {
        return e
    }, a.destroy = function(e) {
        return e
    }, a.update = function(e) {
        return e
    }) : (a = function(e, t) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], function(e) {
            return n(e, t)
        }), e
    }, a.destroy = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], o), e
    }, a.update = function(e) {
        return e && Array.prototype.forEach.call(e.length ? e : [e], i), e
    }), t.exports = a
});

/**
 * Swiper 3.4.2
 */
! function() {
    "use strict";
    var e, a = function(t, s) {
        function r(e) {
            return Math.floor(e)
        }

        function i() {
            var e = x.params.autoplay,
                a = x.slides.eq(x.activeIndex);
            a.attr("data-swiper-autoplay") && (e = a.attr("data-swiper-autoplay") || x.params.autoplay), x.autoplayTimeoutId = setTimeout(function() {
                x.params.loop ? (x.fixLoop(), x._slideNext(), x.emit("onAutoplay", x)) : x.isEnd ? s.autoplayStopOnLast ? x.stopAutoplay() : (x._slideTo(0), x.emit("onAutoplay", x)) : (x._slideNext(), x.emit("onAutoplay", x))
            }, e)
        }

        function n(a, t) {
            var s = e(a.target);
            if (!s.is(t))
                if ("string" == typeof t) s = s.parents(t);
                else if (t.nodeType) {
                var r;
                return s.parents().each(function(e, a) {
                    a === t && (r = t)
                }), r ? t : void 0
            }
            if (0 !== s.length) return s[0]
        }

        function o(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                s = new t(function(e) {
                    e.forEach(function(e) {
                        x.onResize(!0), x.emit("onObserverUpdate", x, e)
                    })
                });
            s.observe(e, {
                attributes: void 0 === a.attributes || a.attributes,
                childList: void 0 === a.childList || a.childList,
                characterData: void 0 === a.characterData || a.characterData
            }), x.observers.push(s)
        }

        function l(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!x.params.allowSwipeToNext && (x.isHorizontal() && 39 === a || !x.isHorizontal() && 40 === a)) return !1;
            if (!x.params.allowSwipeToPrev && (x.isHorizontal() && 37 === a || !x.isHorizontal() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (x.container.parents("." + x.params.slideClass).length > 0 && 0 === x.container.parents("." + x.params.slideActiveClass).length) return;
                    var s = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        },
                        r = window.innerWidth,
                        i = window.innerHeight,
                        n = x.container.offset();
                    x.rtl && (n.left = n.left - x.container[0].scrollLeft);
                    for (var o = [
                            [n.left, n.top],
                            [n.left + x.width, n.top],
                            [n.left, n.top + x.height],
                            [n.left + x.width, n.top + x.height]
                        ], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= s.left && p[0] <= s.left + r && p[1] >= s.top && p[1] <= s.top + i && (t = !0)
                    }
                    if (!t) return
                }
                x.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !x.rtl || 37 === a && x.rtl) && x.slideNext(), (37 === a && !x.rtl || 39 === a && x.rtl) && x.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && x.slideNext(), 38 === a && x.slidePrev()), x.emit("onKeyPress", x, a)
            }
        }

        function p(e) {
            var a = 0,
                t = 0,
                s = 0,
                r = 0;
            return "detail" in e && (t = e.detail), "wheelDelta" in e && (t = -e.wheelDelta / 120), "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (a = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (a = t, t = 0), s = 10 * a, r = 10 * t, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || r) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, r *= 40) : (s *= 800, r *= 800)), s && !a && (a = s < 1 ? -1 : 1), r && !t && (t = r < 1 ? -1 : 1), {
                spinX: a,
                spinY: t,
                pixelX: s,
                pixelY: r
            }
        }

        function d(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = 0,
                t = x.rtl ? -1 : 1,
                s = p(e);
            if (x.params.mousewheelForceToAxis)
                if (x.isHorizontal()) {
                    if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
                    a = s.pixelX * t
                } else {
                    if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
                    a = s.pixelY
                }
            else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
            if (0 !== a) {
                if (x.params.mousewheelInvert && (a = -a), x.params.freeMode) {
                    var r = x.getWrapperTranslate() + a * x.params.mousewheelSensitivity,
                        i = x.isBeginning,
                        n = x.isEnd;
                    if (r >= x.minTranslate() && (r = x.minTranslate()), r <= x.maxTranslate() && (r = x.maxTranslate()), x.setWrapperTransition(0), x.setWrapperTranslate(r), x.updateProgress(), x.updateActiveIndex(), (!i && x.isBeginning || !n && x.isEnd) && x.updateClasses(), x.params.freeModeSticky ? (clearTimeout(x.mousewheel.timeout), x.mousewheel.timeout = setTimeout(function() {
                            x.slideReset()
                        }, 300)) : x.params.lazyLoading && x.lazy && x.lazy.load(), x.emit("onScroll", x, e), x.params.autoplay && x.params.autoplayDisableOnInteraction && x.stopAutoplay(), 0 === r || r === x.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - x.mousewheel.lastScrollTime > 60)
                        if (a < 0)
                            if (x.isEnd && !x.params.loop || x.animating) {
                                if (x.params.mousewheelReleaseOnEdges) return !0
                            } else x.slideNext(), x.emit("onScroll", x, e);
                    else if (x.isBeginning && !x.params.loop || x.animating) {
                        if (x.params.mousewheelReleaseOnEdges) return !0
                    } else x.slidePrev(), x.emit("onScroll", x, e);
                    x.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function m(a, t) {
            a = e(a);
            var s, r, i, n = x.rtl ? -1 : 1;
            s = a.attr("data-swiper-parallax") || "0", r = a.attr("data-swiper-parallax-x"), i = a.attr("data-swiper-parallax-y"), r || i ? (r = r || "0", i = i || "0") : x.isHorizontal() ? (r = s, i = "0") : (i = s, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px", a.transform("translate3d(" + r + ", " + i + ",0px)")
        }

        function u(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof a)) return new a(t, s);
        var c = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                autoplayStopOnLast: !1,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                flip: {
                    slideShadows: !0,
                    limitRotation: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                zoom: !1,
                zoomMax: 3,
                zoomMin: 1,
                zoomToggle: !0,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                mousewheelEventsTarged: "container",
                hashnav: !1,
                hashnavWatchState: !1,
                history: !1,
                replaceState: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                normalizeSlideIndex: !0,
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                passiveListeners: !0,
                containerModifierClass: "swiper-container-",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationCurrentClass: "swiper-pagination-current",
                paginationTotalClass: "swiper-pagination-total",
                paginationHiddenClass: "swiper-pagination-hidden",
                paginationProgressbarClass: "swiper-pagination-progressbar",
                paginationClickableClass: "swiper-pagination-clickable",
                paginationModifierClass: "swiper-pagination-",
                lazyLoadingClass: "swiper-lazy",
                lazyStatusLoadingClass: "swiper-lazy-loading",
                lazyStatusLoadedClass: "swiper-lazy-loaded",
                lazyPreloaderClass: "swiper-lazy-preloader",
                notificationClass: "swiper-notification",
                preloaderClass: "preloader",
                zoomContainerClass: "swiper-zoom-container",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
            g = s && s.virtualTranslate;
        s = s || {};
        var h = {};
        for (var v in s)
            if ("object" != typeof s[v] || null === s[v] || (s[v].nodeType || s[v] === window || s[v] === document || "undefined" != typeof Dom7 && s[v] instanceof Dom7 || "undefined" != typeof jQuery && s[v] instanceof jQuery)) h[v] = s[v];
            else {
                h[v] = {};
                for (var f in s[v]) h[v][f] = s[v][f]
            }
        for (var w in c)
            if (void 0 === s[w]) s[w] = c[w];
            else if ("object" == typeof s[w])
            for (var y in c[w]) void 0 === s[w][y] && (s[w][y] = c[w][y]);
        var x = this;
        if (x.params = s, x.originalParams = h, x.classNames = [], void 0 !== e && "undefined" != typeof Dom7 && (e = Dom7), (void 0 !== e || (e = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (x.$ = e, x.currentBreakpoint = void 0, x.getActiveBreakpoint = function() {
                if (!x.params.breakpoints) return !1;
                var e, a = !1,
                    t = [];
                for (e in x.params.breakpoints) x.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function(e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var s = 0; s < t.length; s++)(e = t[s]) >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, x.setBreakpoint = function() {
                var e = x.getActiveBreakpoint();
                if (e && x.currentBreakpoint !== e) {
                    var a = e in x.params.breakpoints ? x.params.breakpoints[e] : x.originalParams,
                        t = x.params.loop && a.slidesPerView !== x.params.slidesPerView;
                    for (var s in a) x.params[s] = a[s];
                    x.currentBreakpoint = e, t && x.destroyLoop && x.reLoop(!0)
                }
            }, x.params.breakpoints && x.setBreakpoint(), x.container = e(t), 0 !== x.container.length)) {
            if (x.container.length > 1) {
                var T = [];
                return x.container.each(function() {
                    T.push(new a(this, s))
                }), T
            }
            x.container[0].swiper = x, x.container.data("swiper", x), x.classNames.push(x.params.containerModifierClass + x.params.direction), x.params.freeMode && x.classNames.push(x.params.containerModifierClass + "free-mode"), x.support.flexbox || (x.classNames.push(x.params.containerModifierClass + "no-flexbox"), x.params.slidesPerColumn = 1), x.params.autoHeight && x.classNames.push(x.params.containerModifierClass + "autoheight"), (x.params.parallax || x.params.watchSlidesVisibility) && (x.params.watchSlidesProgress = !0), x.params.touchReleaseOnEdges && (x.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(x.params.effect) >= 0 && (x.support.transforms3d ? (x.params.watchSlidesProgress = !0, x.classNames.push(x.params.containerModifierClass + "3d")) : x.params.effect = "slide"), "slide" !== x.params.effect && x.classNames.push(x.params.containerModifierClass + x.params.effect), "cube" === x.params.effect && (x.params.resistanceRatio = 0, x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.centeredSlides = !1, x.params.spaceBetween = 0, x.params.virtualTranslate = !0), "fade" !== x.params.effect && "flip" !== x.params.effect || (x.params.slidesPerView = 1, x.params.slidesPerColumn = 1, x.params.slidesPerGroup = 1, x.params.watchSlidesProgress = !0, x.params.spaceBetween = 0, void 0 === g && (x.params.virtualTranslate = !0)), x.params.grabCursor && x.support.touch && (x.params.grabCursor = !1), x.wrapper = x.container.children("." + x.params.wrapperClass), x.params.pagination && (x.paginationContainer = e(x.params.pagination), x.params.uniqueNavElements && "string" == typeof x.params.pagination && x.paginationContainer.length > 1 && 1 === x.container.find(x.params.pagination).length && (x.paginationContainer = x.container.find(x.params.pagination)), "bullets" === x.params.paginationType && x.params.paginationClickable ? x.paginationContainer.addClass(x.params.paginationModifierClass + "clickable") : x.params.paginationClickable = !1, x.paginationContainer.addClass(x.params.paginationModifierClass + x.params.paginationType)), (x.params.nextButton || x.params.prevButton) && (x.params.nextButton && (x.nextButton = e(x.params.nextButton), x.params.uniqueNavElements && "string" == typeof x.params.nextButton && x.nextButton.length > 1 && 1 === x.container.find(x.params.nextButton).length && (x.nextButton = x.container.find(x.params.nextButton))), x.params.prevButton && (x.prevButton = e(x.params.prevButton), x.params.uniqueNavElements && "string" == typeof x.params.prevButton && x.prevButton.length > 1 && 1 === x.container.find(x.params.prevButton).length && (x.prevButton = x.container.find(x.params.prevButton)))), x.isHorizontal = function() {
                return "horizontal" === x.params.direction
            }, x.rtl = x.isHorizontal() && ("rtl" === x.container[0].dir.toLowerCase() || "rtl" === x.container.css("direction")), x.rtl && x.classNames.push(x.params.containerModifierClass + "rtl"), x.rtl && (x.wrongRTL = "-webkit-box" === x.wrapper.css("display")), x.params.slidesPerColumn > 1 && x.classNames.push(x.params.containerModifierClass + "multirow"), x.device.android && x.classNames.push(x.params.containerModifierClass + "android"), x.container.addClass(x.classNames.join(" ")), x.translate = 0, x.progress = 0, x.velocity = 0, x.lockSwipeToNext = function() {
                x.params.allowSwipeToNext = !1, x.params.allowSwipeToPrev === !1 && x.params.grabCursor && x.unsetGrabCursor()
            }, x.lockSwipeToPrev = function() {
                x.params.allowSwipeToPrev = !1, x.params.allowSwipeToNext === !1 && x.params.grabCursor && x.unsetGrabCursor()
            }, x.lockSwipes = function() {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !1, x.params.grabCursor && x.unsetGrabCursor()
            }, x.unlockSwipeToNext = function() {
                x.params.allowSwipeToNext = !0, x.params.allowSwipeToPrev === !0 && x.params.grabCursor && x.setGrabCursor()
            }, x.unlockSwipeToPrev = function() {
                x.params.allowSwipeToPrev = !0, x.params.allowSwipeToNext === !0 && x.params.grabCursor && x.setGrabCursor()
            }, x.unlockSwipes = function() {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !0, x.params.grabCursor && x.setGrabCursor()
            }, x.setGrabCursor = function(e) {
                x.container[0].style.cursor = "move", x.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", x.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", x.container[0].style.cursor = e ? "grabbing" : "grab"
            }, x.unsetGrabCursor = function() {
                x.container[0].style.cursor = ""
            }, x.params.grabCursor && x.setGrabCursor(), x.imagesToLoad = [], x.imagesLoaded = 0, x.loadImage = function(e, a, t, s, r, i) {
                function n() {
                    i && i()
                }
                var o;
                e.complete && r ? n() : a ? (o = new window.Image, o.onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n()
            }, x.preloadImages = function() {
                function e() {
                    void 0 !== x && null !== x && x && (void 0 !== x.imagesLoaded && x.imagesLoaded++, x.imagesLoaded === x.imagesToLoad.length && (x.params.updateOnImagesReady && x.update(), x.emit("onImagesReady", x)))
                }
                x.imagesToLoad = x.container.find("img");
                for (var a = 0; a < x.imagesToLoad.length; a++) x.loadImage(x.imagesToLoad[a], x.imagesToLoad[a].currentSrc || x.imagesToLoad[a].getAttribute("src"), x.imagesToLoad[a].srcset || x.imagesToLoad[a].getAttribute("srcset"), x.imagesToLoad[a].sizes || x.imagesToLoad[a].getAttribute("sizes"), !0, e)
            }, x.autoplayTimeoutId = void 0, x.autoplaying = !1, x.autoplayPaused = !1, x.startAutoplay = function() {
                return void 0 === x.autoplayTimeoutId && (!!x.params.autoplay && (!x.autoplaying && (x.autoplaying = !0, x.emit("onAutoplayStart", x), void i())))
            }, x.stopAutoplay = function(e) {
                x.autoplayTimeoutId && (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplaying = !1, x.autoplayTimeoutId = void 0, x.emit("onAutoplayStop", x))
            }, x.pauseAutoplay = function(e) {
                x.autoplayPaused || (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId), x.autoplayPaused = !0, 0 === e ? (x.autoplayPaused = !1, i()) : x.wrapper.transitionEnd(function() {
                    x && (x.autoplayPaused = !1, x.autoplaying ? i() : x.stopAutoplay())
                }))
            }, x.minTranslate = function() {
                return -x.snapGrid[0]
            }, x.maxTranslate = function() {
                return -x.snapGrid[x.snapGrid.length - 1]
            }, x.updateAutoHeight = function() {
                var e, a = [],
                    t = 0;
                if ("auto" !== x.params.slidesPerView && x.params.slidesPerView > 1)
                    for (e = 0; e < Math.ceil(x.params.slidesPerView); e++) {
                        var s = x.activeIndex + e;
                        if (s > x.slides.length) break;
                        a.push(x.slides.eq(s)[0])
                    } else a.push(x.slides.eq(x.activeIndex)[0]);
                for (e = 0; e < a.length; e++)
                    if (void 0 !== a[e]) {
                        var r = a[e].offsetHeight;
                        t = r > t ? r : t
                    }
                t && x.wrapper.css("height", t + "px")
            }, x.updateContainerSize = function() {
                var e, a;
                e = void 0 !== x.params.width ? x.params.width : x.container[0].clientWidth, a = void 0 !== x.params.height ? x.params.height : x.container[0].clientHeight, 0 === e && x.isHorizontal() || 0 === a && !x.isHorizontal() || (e = e - parseInt(x.container.css("padding-left"), 10) - parseInt(x.container.css("padding-right"), 10), a = a - parseInt(x.container.css("padding-top"), 10) - parseInt(x.container.css("padding-bottom"), 10), x.width = e, x.height = a, x.size = x.isHorizontal() ? x.width : x.height)
            }, x.updateSlidesSize = function() {
                x.slides = x.wrapper.children("." + x.params.slideClass), x.snapGrid = [], x.slidesGrid = [], x.slidesSizesGrid = [];
                var e, a = x.params.spaceBetween,
                    t = -x.params.slidesOffsetBefore,
                    s = 0,
                    i = 0;
                if (void 0 !== x.size) {
                    "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * x.size), x.virtualSize = -a, x.rtl ? x.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : x.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var n;
                    x.params.slidesPerColumn > 1 && (n = Math.floor(x.slides.length / x.params.slidesPerColumn) === x.slides.length / x.params.slidesPerColumn ? x.slides.length : Math.ceil(x.slides.length / x.params.slidesPerColumn) * x.params.slidesPerColumn, "auto" !== x.params.slidesPerView && "row" === x.params.slidesPerColumnFill && (n = Math.max(n, x.params.slidesPerView * x.params.slidesPerColumn)));
                    var o, l = x.params.slidesPerColumn,
                        p = n / l,
                        d = p - (x.params.slidesPerColumn * p - x.slides.length);
                    for (e = 0; e < x.slides.length; e++) {
                        o = 0;
                        var m = x.slides.eq(e);
                        if (x.params.slidesPerColumn > 1) {
                            var u, c, g;
                            "column" === x.params.slidesPerColumnFill ? (c = Math.floor(e / l), g = e - c * l, (c > d || c === d && g === l - 1) && ++g >= l && (g = 0, c++), u = c + g * n / l, m.css({
                                "-webkit-box-ordinal-group": u,
                                "-moz-box-ordinal-group": u,
                                "-ms-flex-order": u,
                                "-webkit-order": u,
                                order: u
                            })) : (g = Math.floor(e / p), c = e - g * p), m.css("margin-" + (x.isHorizontal() ? "top" : "left"), 0 !== g && x.params.spaceBetween && x.params.spaceBetween + "px").attr("data-swiper-column", c).attr("data-swiper-row", g)
                        }
                        "none" !== m.css("display") && ("auto" === x.params.slidesPerView ? (o = x.isHorizontal() ? m.outerWidth(!0) : m.outerHeight(!0), x.params.roundLengths && (o = r(o))) : (o = (x.size - (x.params.slidesPerView - 1) * a) / x.params.slidesPerView, x.params.roundLengths && (o = r(o)), x.isHorizontal() ? x.slides[e].style.width = o + "px" : x.slides[e].style.height = o + "px"), x.slides[e].swiperSlideSize = o, x.slidesSizesGrid.push(o), x.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === s && 0 !== e && (t = t - x.size / 2 - a), 0 === e && (t = t - x.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % x.params.slidesPerGroup == 0 && x.snapGrid.push(t), x.slidesGrid.push(t)) : (i % x.params.slidesPerGroup == 0 && x.snapGrid.push(t), x.slidesGrid.push(t), t = t + o + a), x.virtualSize += o + a, s = o, i++)
                    }
                    x.virtualSize = Math.max(x.virtualSize, x.size) + x.params.slidesOffsetAfter;
                    var h;
                    if (x.rtl && x.wrongRTL && ("slide" === x.params.effect || "coverflow" === x.params.effect) && x.wrapper.css({
                            width: x.virtualSize + x.params.spaceBetween + "px"
                        }), x.support.flexbox && !x.params.setWrapperSize || (x.isHorizontal() ? x.wrapper.css({
                            width: x.virtualSize + x.params.spaceBetween + "px"
                        }) : x.wrapper.css({
                            height: x.virtualSize + x.params.spaceBetween + "px"
                        })), x.params.slidesPerColumn > 1 && (x.virtualSize = (o + x.params.spaceBetween) * n, x.virtualSize = Math.ceil(x.virtualSize / x.params.slidesPerColumn) - x.params.spaceBetween, x.isHorizontal() ? x.wrapper.css({
                            width: x.virtualSize + x.params.spaceBetween + "px"
                        }) : x.wrapper.css({
                            height: x.virtualSize + x.params.spaceBetween + "px"
                        }), x.params.centeredSlides)) {
                        for (h = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] < x.virtualSize + x.snapGrid[0] && h.push(x.snapGrid[e]);
                        x.snapGrid = h
                    }
                    if (!x.params.centeredSlides) {
                        for (h = [], e = 0; e < x.snapGrid.length; e++) x.snapGrid[e] <= x.virtualSize - x.size && h.push(x.snapGrid[e]);
                        x.snapGrid = h, Math.floor(x.virtualSize - x.size) - Math.floor(x.snapGrid[x.snapGrid.length - 1]) > 1 && x.snapGrid.push(x.virtualSize - x.size)
                    }
                    0 === x.snapGrid.length && (x.snapGrid = [0]), 0 !== x.params.spaceBetween && (x.isHorizontal() ? x.rtl ? x.slides.css({
                        marginLeft: a + "px"
                    }) : x.slides.css({
                        marginRight: a + "px"
                    }) : x.slides.css({
                        marginBottom: a + "px"
                    })), x.params.watchSlidesProgress && x.updateSlidesOffset()
                }
            }, x.updateSlidesOffset = function() {
                for (var e = 0; e < x.slides.length; e++) x.slides[e].swiperSlideOffset = x.isHorizontal() ? x.slides[e].offsetLeft : x.slides[e].offsetTop
            }, x.currentSlidesPerView = function() {
                var e, a, t = 1;
                if (x.params.centeredSlides) {
                    var s, r = x.slides[x.activeIndex].swiperSlideSize;
                    for (e = x.activeIndex + 1; e < x.slides.length; e++) x.slides[e] && !s && (r += x.slides[e].swiperSlideSize, t++, r > x.size && (s = !0));
                    for (a = x.activeIndex - 1; a >= 0; a--) x.slides[a] && !s && (r += x.slides[a].swiperSlideSize, t++, r > x.size && (s = !0))
                } else
                    for (e = x.activeIndex + 1; e < x.slides.length; e++) x.slidesGrid[e] - x.slidesGrid[x.activeIndex] < x.size && t++;
                return t
            }, x.updateSlidesProgress = function(e) {
                if (void 0 === e && (e = x.translate || 0), 0 !== x.slides.length) {
                    void 0 === x.slides[0].swiperSlideOffset && x.updateSlidesOffset();
                    var a = -e;
                    x.rtl && (a = e), x.slides.removeClass(x.params.slideVisibleClass);
                    for (var t = 0; t < x.slides.length; t++) {
                        var s = x.slides[t],
                            r = (a + (x.params.centeredSlides ? x.minTranslate() : 0) - s.swiperSlideOffset) / (s.swiperSlideSize + x.params.spaceBetween);
                        if (x.params.watchSlidesVisibility) {
                            var i = -(a - s.swiperSlideOffset),
                                n = i + x.slidesSizesGrid[t];
                            (i >= 0 && i < x.size || n > 0 && n <= x.size || i <= 0 && n >= x.size) && x.slides.eq(t).addClass(x.params.slideVisibleClass)
                        }
                        s.progress = x.rtl ? -r : r
                    }
                }
            }, x.updateProgress = function(e) {
                void 0 === e && (e = x.translate || 0);
                var a = x.maxTranslate() - x.minTranslate(),
                    t = x.isBeginning,
                    s = x.isEnd;
                0 === a ? (x.progress = 0, x.isBeginning = x.isEnd = !0) : (x.progress = (e - x.minTranslate()) / a, x.isBeginning = x.progress <= 0, x.isEnd = x.progress >= 1), x.isBeginning && !t && x.emit("onReachBeginning", x), x.isEnd && !s && x.emit("onReachEnd", x), x.params.watchSlidesProgress && x.updateSlidesProgress(e), x.emit("onProgress", x, x.progress)
            }, x.updateActiveIndex = function() {
                var e, a, t, s = x.rtl ? x.translate : -x.translate;
                for (a = 0; a < x.slidesGrid.length; a++) void 0 !== x.slidesGrid[a + 1] ? s >= x.slidesGrid[a] && s < x.slidesGrid[a + 1] - (x.slidesGrid[a + 1] - x.slidesGrid[a]) / 2 ? e = a : s >= x.slidesGrid[a] && s < x.slidesGrid[a + 1] && (e = a + 1) : s >= x.slidesGrid[a] && (e = a);
                x.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), t = Math.floor(e / x.params.slidesPerGroup), t >= x.snapGrid.length && (t = x.snapGrid.length - 1), e !== x.activeIndex && (x.snapIndex = t, x.previousIndex = x.activeIndex, x.activeIndex = e, x.updateClasses(), x.updateRealIndex())
            }, x.updateRealIndex = function() {
                x.realIndex = parseInt(x.slides.eq(x.activeIndex).attr("data-swiper-slide-index") || x.activeIndex, 10)
            }, x.updateClasses = function() {
                x.slides.removeClass(x.params.slideActiveClass + " " + x.params.slideNextClass + " " + x.params.slidePrevClass + " " + x.params.slideDuplicateActiveClass + " " + x.params.slideDuplicateNextClass + " " + x.params.slideDuplicatePrevClass);
                var a = x.slides.eq(x.activeIndex);
                a.addClass(x.params.slideActiveClass), s.loop && (a.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass));
                var t = a.next("." + x.params.slideClass).addClass(x.params.slideNextClass);
                x.params.loop && 0 === t.length && (t = x.slides.eq(0), t.addClass(x.params.slideNextClass));
                var r = a.prev("." + x.params.slideClass).addClass(x.params.slidePrevClass);
                if (x.params.loop && 0 === r.length && (r = x.slides.eq(-1), r.addClass(x.params.slidePrevClass)), s.loop && (t.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass), r.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass)), x.paginationContainer && x.paginationContainer.length > 0) {
                    var i, n = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length;
                    if (x.params.loop ? (i = Math.ceil((x.activeIndex - x.loopedSlides) / x.params.slidesPerGroup), i > x.slides.length - 1 - 2 * x.loopedSlides && (i -= x.slides.length - 2 * x.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== x.params.paginationType && (i = n + i)) : i = void 0 !== x.snapIndex ? x.snapIndex : x.activeIndex || 0, "bullets" === x.params.paginationType && x.bullets && x.bullets.length > 0 && (x.bullets.removeClass(x.params.bulletActiveClass), x.paginationContainer.length > 1 ? x.bullets.each(function() {
                            e(this).index() === i && e(this).addClass(x.params.bulletActiveClass)
                        }) : x.bullets.eq(i).addClass(x.params.bulletActiveClass)), "fraction" === x.params.paginationType && (x.paginationContainer.find("." + x.params.paginationCurrentClass).text(i + 1), x.paginationContainer.find("." + x.params.paginationTotalClass).text(n)), "progress" === x.params.paginationType) {
                        var o = (i + 1) / n,
                            l = o,
                            p = 1;
                        x.isHorizontal() || (p = o, l = 1), x.paginationContainer.find("." + x.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(x.params.speed)
                    }
                    "custom" === x.params.paginationType && x.params.paginationCustomRender && (x.paginationContainer.html(x.params.paginationCustomRender(x, i + 1, n)), x.emit("onPaginationRendered", x, x.paginationContainer[0]))
                }
                x.params.loop || (x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.isBeginning ? (x.prevButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.prevButton)) : (x.prevButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.prevButton))), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.isEnd ? (x.nextButton.addClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.disable(x.nextButton)) : (x.nextButton.removeClass(x.params.buttonDisabledClass), x.params.a11y && x.a11y && x.a11y.enable(x.nextButton))))
            }, x.updatePagination = function() {
                if (x.params.pagination && x.paginationContainer && x.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === x.params.paginationType) {
                        for (var a = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length, t = 0; t < a; t++) e += x.params.paginationBulletRender ? x.params.paginationBulletRender(x, t, x.params.bulletClass) : "<" + x.params.paginationElement + ' class="' + x.params.bulletClass + '"></' + x.params.paginationElement + ">";
                        x.paginationContainer.html(e), x.bullets = x.paginationContainer.find("." + x.params.bulletClass), x.params.paginationClickable && x.params.a11y && x.a11y && x.a11y.initPagination()
                    }
                    "fraction" === x.params.paginationType && (e = x.params.paginationFractionRender ? x.params.paginationFractionRender(x, x.params.paginationCurrentClass, x.params.paginationTotalClass) : '<span class="' + x.params.paginationCurrentClass + '"></span> / <span class="' + x.params.paginationTotalClass + '"></span>', x.paginationContainer.html(e)), "progress" === x.params.paginationType && (e = x.params.paginationProgressRender ? x.params.paginationProgressRender(x, x.params.paginationProgressbarClass) : '<span class="' + x.params.paginationProgressbarClass + '"></span>', x.paginationContainer.html(e)), "custom" !== x.params.paginationType && x.emit("onPaginationRendered", x, x.paginationContainer[0])
                }
            }, x.update = function(e) {
                function a() {
                    x.rtl, x.translate;
                    t = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate()), x.setWrapperTranslate(t), x.updateActiveIndex(), x.updateClasses()
                }
                if (x) {
                    x.updateContainerSize(), x.updateSlidesSize(), x.updateProgress(), x.updatePagination(), x.updateClasses(), x.params.scrollbar && x.scrollbar && x.scrollbar.set();
                    var t;
                    if (e) {
                        x.controller && x.controller.spline && (x.controller.spline = void 0), x.params.freeMode ? (a(), x.params.autoHeight && x.updateAutoHeight()) : (("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0)) || a()
                    } else x.params.autoHeight && x.updateAutoHeight()
                }
            }, x.onResize = function(e) {
                x.params.onBeforeResize && x.params.onBeforeResize(x), x.params.breakpoints && x.setBreakpoint();
                var a = x.params.allowSwipeToPrev,
                    t = x.params.allowSwipeToNext;
                x.params.allowSwipeToPrev = x.params.allowSwipeToNext = !0, x.updateContainerSize(), x.updateSlidesSize(), ("auto" === x.params.slidesPerView || x.params.freeMode || e) && x.updatePagination(), x.params.scrollbar && x.scrollbar && x.scrollbar.set(), x.controller && x.controller.spline && (x.controller.spline = void 0);
                var s = !1;
                if (x.params.freeMode) {
                    var r = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate());
                    x.setWrapperTranslate(r), x.updateActiveIndex(), x.updateClasses(), x.params.autoHeight && x.updateAutoHeight()
                } else x.updateClasses(), s = ("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0);
                x.params.lazyLoading && !s && x.lazy && x.lazy.load(), x.params.allowSwipeToPrev = a, x.params.allowSwipeToNext = t, x.params.onAfterResize && x.params.onAfterResize(x)
            }, x.touchEventsDesktop = {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            }, window.navigator.pointerEnabled ? x.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled && (x.touchEventsDesktop = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }), x.touchEvents = {
                start: x.support.touch || !x.params.simulateTouch ? "touchstart" : x.touchEventsDesktop.start,
                move: x.support.touch || !x.params.simulateTouch ? "touchmove" : x.touchEventsDesktop.move,
                end: x.support.touch || !x.params.simulateTouch ? "touchend" : x.touchEventsDesktop.end
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === x.params.touchEventsTarget ? x.container : x.wrapper).addClass("swiper-wp8-" + x.params.direction), x.initEvents = function(e) {
                var a = e ? "off" : "on",
                    t = e ? "removeEventListener" : "addEventListener",
                    r = "container" === x.params.touchEventsTarget ? x.container[0] : x.wrapper[0],
                    i = x.support.touch ? r : document,
                    n = !!x.params.nested;
                if (x.browser.ie) r[t](x.touchEvents.start, x.onTouchStart, !1), i[t](x.touchEvents.move, x.onTouchMove, n), i[t](x.touchEvents.end, x.onTouchEnd, !1);
                else {
                    if (x.support.touch) {
                        var o = !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        r[t](x.touchEvents.start, x.onTouchStart, o), r[t](x.touchEvents.move, x.onTouchMove, n), r[t](x.touchEvents.end, x.onTouchEnd, o)
                    }(s.simulateTouch && !x.device.ios && !x.device.android || s.simulateTouch && !x.support.touch && x.device.ios) && (r[t]("mousedown", x.onTouchStart, !1), document[t]("mousemove", x.onTouchMove, n), document[t]("mouseup", x.onTouchEnd, !1))
                }
                window[t]("resize", x.onResize), x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.nextButton[a]("click", x.onClickNext), x.params.a11y && x.a11y && x.nextButton[a]("keydown", x.a11y.onEnterKey)), x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.prevButton[a]("click", x.onClickPrev), x.params.a11y && x.a11y && x.prevButton[a]("keydown", x.a11y.onEnterKey)), x.params.pagination && x.params.paginationClickable && (x.paginationContainer[a]("click", "." + x.params.bulletClass, x.onClickIndex), x.params.a11y && x.a11y && x.paginationContainer[a]("keydown", "." + x.params.bulletClass, x.a11y.onEnterKey)), (x.params.preventClicks || x.params.preventClicksPropagation) && r[t]("click", x.preventClicks, !0)
            }, x.attachEvents = function() {
                x.initEvents()
            }, x.detachEvents = function() {
                x.initEvents(!0)
            }, x.allowClick = !0, x.preventClicks = function(e) {
                x.allowClick || (x.params.preventClicks && e.preventDefault(), x.params.preventClicksPropagation && x.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, x.onClickNext = function(e) {
                e.preventDefault(), x.isEnd && !x.params.loop || x.slideNext()
            }, x.onClickPrev = function(e) {
                e.preventDefault(), x.isBeginning && !x.params.loop || x.slidePrev()
            }, x.onClickIndex = function(a) {
                a.preventDefault();
                var t = e(this).index() * x.params.slidesPerGroup;
                x.params.loop && (t += x.loopedSlides), x.slideTo(t)
            }, x.updateClickedSlide = function(a) {
                var t = n(a, "." + x.params.slideClass),
                    s = !1;
                if (t)
                    for (var r = 0; r < x.slides.length; r++) x.slides[r] === t && (s = !0);
                if (!t || !s) return x.clickedSlide = void 0, void(x.clickedIndex = void 0);
                if (x.clickedSlide = t, x.clickedIndex = e(t).index(), x.params.slideToClickedSlide && void 0 !== x.clickedIndex && x.clickedIndex !== x.activeIndex) {
                    var i, o = x.clickedIndex,
                        l = "auto" === x.params.slidesPerView ? x.currentSlidesPerView() : x.params.slidesPerView;
                    if (x.params.loop) {
                        if (x.animating) return;
                        i = parseInt(e(x.clickedSlide).attr("data-swiper-slide-index"), 10), x.params.centeredSlides ? o < x.loopedSlides - l / 2 || o > x.slides.length - x.loopedSlides + l / 2 ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                            x.slideTo(o)
                        }, 0)) : x.slideTo(o) : o > x.slides.length - l ? (x.fixLoop(), o = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                            x.slideTo(o)
                        }, 0)) : x.slideTo(o)
                    } else x.slideTo(o)
                }
            };
            var b, C, S, z, M, P, E, I, k, D, L = "input, select, textarea, button, video",
                B = Date.now(),
                H = [];
            x.animating = !1, x.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var G, X;
            x.onTouchStart = function(a) {
                if (a.originalEvent && (a = a.originalEvent), (G = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
                    if (x.params.noSwiping && n(a, "." + x.params.noSwipingClass)) return void(x.allowClick = !0);
                    if (!x.params.swipeHandler || n(a, x.params.swipeHandler)) {
                        var t = x.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                            s = x.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                        if (!(x.device.ios && x.params.iOSEdgeSwipeDetection && t <= x.params.iOSEdgeSwipeThreshold)) {
                            if (b = !0, C = !1, S = !0, M = void 0, X = void 0, x.touches.startX = t, x.touches.startY = s, z = Date.now(), x.allowClick = !0, x.updateContainerSize(), x.swipeDirection = void 0, x.params.threshold > 0 && (I = !1), "touchstart" !== a.type) {
                                var r = !0;
                                e(a.target).is(L) && (r = !1), document.activeElement && e(document.activeElement).is(L) && document.activeElement.blur(), r && a.preventDefault()
                            }
                            x.emit("onTouchStart", x, a)
                        }
                    }
                }
            }, x.onTouchMove = function(a) {
                if (a.originalEvent && (a = a.originalEvent), !G || "mousemove" !== a.type) {
                    if (a.preventedByNestedSwiper) return x.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, void(x.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);
                    if (x.params.onlyExternal) return x.allowClick = !1, void(b && (x.touches.startX = x.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, x.touches.startY = x.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, z = Date.now()));
                    if (G && x.params.touchReleaseOnEdges && !x.params.loop)
                        if (x.isHorizontal()) {
                            if (x.touches.currentX < x.touches.startX && x.translate <= x.maxTranslate() || x.touches.currentX > x.touches.startX && x.translate >= x.minTranslate()) return
                        } else if (x.touches.currentY < x.touches.startY && x.translate <= x.maxTranslate() || x.touches.currentY > x.touches.startY && x.translate >= x.minTranslate()) return;
                    if (G && document.activeElement && a.target === document.activeElement && e(a.target).is(L)) return C = !0, void(x.allowClick = !1);
                    if (S && x.emit("onTouchMove", x, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                        if (x.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, x.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === M) {
                            var t;
                            x.isHorizontal() && x.touches.currentY === x.touches.startY || !x.isHorizontal() && x.touches.currentX === x.touches.startX ? M = !1 : (t = 180 * Math.atan2(Math.abs(x.touches.currentY - x.touches.startY), Math.abs(x.touches.currentX - x.touches.startX)) / Math.PI, M = x.isHorizontal() ? t > x.params.touchAngle : 90 - t > x.params.touchAngle)
                        }
                        if (M && x.emit("onTouchMoveOpposite", x, a), void 0 === X && (x.touches.currentX === x.touches.startX && x.touches.currentY === x.touches.startY || (X = !0)), b) {
                            if (M) return void(b = !1);
                            if (X) {
                                x.allowClick = !1, x.emit("onSliderMove", x, a), a.preventDefault(), x.params.touchMoveStopPropagation && !x.params.nested && a.stopPropagation(), C || (s.loop && x.fixLoop(), E = x.getWrapperTranslate(), x.setWrapperTransition(0), x.animating && x.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), x.params.autoplay && x.autoplaying && (x.params.autoplayDisableOnInteraction ? x.stopAutoplay() : x.pauseAutoplay()), D = !1, !x.params.grabCursor || x.params.allowSwipeToNext !== !0 && x.params.allowSwipeToPrev !== !0 || x.setGrabCursor(!0)), C = !0;
                                var r = x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY;
                                r *= x.params.touchRatio, x.rtl && (r = -r), x.swipeDirection = r > 0 ? "prev" : "next", P = r + E;
                                var i = !0;
                                if (r > 0 && P > x.minTranslate() ? (i = !1, x.params.resistance && (P = x.minTranslate() - 1 + Math.pow(-x.minTranslate() + E + r, x.params.resistanceRatio))) : r < 0 && P < x.maxTranslate() && (i = !1, x.params.resistance && (P = x.maxTranslate() + 1 - Math.pow(x.maxTranslate() - E - r, x.params.resistanceRatio))), i && (a.preventedByNestedSwiper = !0), !x.params.allowSwipeToNext && "next" === x.swipeDirection && P < E && (P = E), !x.params.allowSwipeToPrev && "prev" === x.swipeDirection && P > E && (P = E), x.params.threshold > 0) {
                                    if (!(Math.abs(r) > x.params.threshold || I)) return void(P = E);
                                    if (!I) return I = !0, x.touches.startX = x.touches.currentX, x.touches.startY = x.touches.currentY, P = E, void(x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY)
                                }
                                x.params.followFinger && ((x.params.freeMode || x.params.watchSlidesProgress) && x.updateActiveIndex(), x.params.freeMode && (0 === H.length && H.push({
                                    position: x.touches[x.isHorizontal() ? "startX" : "startY"],
                                    time: z
                                }), H.push({
                                    position: x.touches[x.isHorizontal() ? "currentX" : "currentY"],
                                    time: (new window.Date).getTime()
                                })), x.updateProgress(P), x.setWrapperTranslate(P))
                            }
                        }
                    }
                }
            }, x.onTouchEnd = function(a) {
                if (a.originalEvent && (a = a.originalEvent), S && x.emit("onTouchEnd", x, a), S = !1, b) {
                    x.params.grabCursor && C && b && (x.params.allowSwipeToNext === !0 || x.params.allowSwipeToPrev === !0) && x.setGrabCursor(!1);
                    var t = Date.now(),
                        s = t - z;
                    if (x.allowClick && (x.updateClickedSlide(a), x.emit("onTap", x, a), s < 300 && t - B > 300 && (k && clearTimeout(k), k = setTimeout(function() {
                            x && (x.params.paginationHide && x.paginationContainer.length > 0 && !e(a.target).hasClass(x.params.bulletClass) && x.paginationContainer.toggleClass(x.params.paginationHiddenClass), x.emit("onClick", x, a))
                        }, 300)), s < 300 && t - B < 300 && (k && clearTimeout(k), x.emit("onDoubleTap", x, a))), B = Date.now(), setTimeout(function() {
                            x && (x.allowClick = !0)
                        }, 0), !b || !C || !x.swipeDirection || 0 === x.touches.diff || P === E) return void(b = C = !1);
                    b = C = !1;
                    var r;
                    if (r = x.params.followFinger ? x.rtl ? x.translate : -x.translate : -P, x.params.freeMode) {
                        if (r < -x.minTranslate()) return void x.slideTo(x.activeIndex);
                        if (r > -x.maxTranslate()) return void(x.slides.length < x.snapGrid.length ? x.slideTo(x.snapGrid.length - 1) : x.slideTo(x.slides.length - 1));
                        if (x.params.freeModeMomentum) {
                            if (H.length > 1) {
                                var i = H.pop(),
                                    n = H.pop(),
                                    o = i.position - n.position,
                                    l = i.time - n.time;
                                x.velocity = o / l, x.velocity = x.velocity / 2, Math.abs(x.velocity) < x.params.freeModeMinimumVelocity && (x.velocity = 0), (l > 150 || (new window.Date).getTime() - i.time > 300) && (x.velocity = 0)
                            } else x.velocity = 0;
                            x.velocity = x.velocity * x.params.freeModeMomentumVelocityRatio, H.length = 0;
                            var p = 1e3 * x.params.freeModeMomentumRatio,
                                d = x.velocity * p,
                                m = x.translate + d;
                            x.rtl && (m = -m);
                            var u, c = !1,
                                g = 20 * Math.abs(x.velocity) * x.params.freeModeMomentumBounceRatio;
                            if (m < x.maxTranslate()) x.params.freeModeMomentumBounce ? (m + x.maxTranslate() < -g && (m = x.maxTranslate() - g), u = x.maxTranslate(), c = !0, D = !0) : m = x.maxTranslate();
                            else if (m > x.minTranslate()) x.params.freeModeMomentumBounce ? (m - x.minTranslate() > g && (m = x.minTranslate() + g), u = x.minTranslate(), c = !0, D = !0) : m = x.minTranslate();
                            else if (x.params.freeModeSticky) {
                                var h, v = 0;
                                for (v = 0; v < x.snapGrid.length; v += 1)
                                    if (x.snapGrid[v] > -m) {
                                        h = v;
                                        break
                                    }
                                m = Math.abs(x.snapGrid[h] - m) < Math.abs(x.snapGrid[h - 1] - m) || "next" === x.swipeDirection ? x.snapGrid[h] : x.snapGrid[h - 1], x.rtl || (m = -m)
                            }
                            if (0 !== x.velocity) p = x.rtl ? Math.abs((-m - x.translate) / x.velocity) : Math.abs((m - x.translate) / x.velocity);
                            else if (x.params.freeModeSticky) return void x.slideReset();
                            x.params.freeModeMomentumBounce && c ? (x.updateProgress(u), x.setWrapperTransition(p), x.setWrapperTranslate(m), x.onTransitionStart(), x.animating = !0, x.wrapper.transitionEnd(function() {
                                x && D && (x.emit("onMomentumBounce", x), x.setWrapperTransition(x.params.speed), x.setWrapperTranslate(u), x.wrapper.transitionEnd(function() {
                                    x && x.onTransitionEnd()
                                }))
                            })) : x.velocity ? (x.updateProgress(m), x.setWrapperTransition(p), x.setWrapperTranslate(m), x.onTransitionStart(), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() {
                                x && x.onTransitionEnd()
                            }))) : x.updateProgress(m), x.updateActiveIndex()
                        }
                        return void((!x.params.freeModeMomentum || s >= x.params.longSwipesMs) && (x.updateProgress(), x.updateActiveIndex()))
                    }
                    var f, w = 0,
                        y = x.slidesSizesGrid[0];
                    for (f = 0; f < x.slidesGrid.length; f += x.params.slidesPerGroup) void 0 !== x.slidesGrid[f + x.params.slidesPerGroup] ? r >= x.slidesGrid[f] && r < x.slidesGrid[f + x.params.slidesPerGroup] && (w = f, y = x.slidesGrid[f + x.params.slidesPerGroup] - x.slidesGrid[f]) : r >= x.slidesGrid[f] && (w = f, y = x.slidesGrid[x.slidesGrid.length - 1] - x.slidesGrid[x.slidesGrid.length - 2]);
                    var T = (r - x.slidesGrid[w]) / y;
                    if (s > x.params.longSwipesMs) {
                        if (!x.params.longSwipes) return void x.slideTo(x.activeIndex);
                        "next" === x.swipeDirection && (T >= x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w)), "prev" === x.swipeDirection && (T > 1 - x.params.longSwipesRatio ? x.slideTo(w + x.params.slidesPerGroup) : x.slideTo(w))
                    } else {
                        if (!x.params.shortSwipes) return void x.slideTo(x.activeIndex);
                        "next" === x.swipeDirection && x.slideTo(w + x.params.slidesPerGroup), "prev" === x.swipeDirection && x.slideTo(w)
                    }
                }
            }, x._slideTo = function(e, a) {
                return x.slideTo(e, a, !0, !0)
            }, x.slideTo = function(e, a, t, s) {
                void 0 === t && (t = !0), void 0 === e && (e = 0), e < 0 && (e = 0), x.snapIndex = Math.floor(e / x.params.slidesPerGroup), x.snapIndex >= x.snapGrid.length && (x.snapIndex = x.snapGrid.length - 1);
                var r = -x.snapGrid[x.snapIndex];
                if (x.params.autoplay && x.autoplaying && (s || !x.params.autoplayDisableOnInteraction ? x.pauseAutoplay(a) : x.stopAutoplay()), x.updateProgress(r), x.params.normalizeSlideIndex)
                    for (var i = 0; i < x.slidesGrid.length; i++) - Math.floor(100 * r) >= Math.floor(100 * x.slidesGrid[i]) && (e = i);
                return !(!x.params.allowSwipeToNext && r < x.translate && r < x.minTranslate()) && (!(!x.params.allowSwipeToPrev && r > x.translate && r > x.maxTranslate() && (x.activeIndex || 0) !== e) && (void 0 === a && (a = x.params.speed), x.previousIndex = x.activeIndex || 0, x.activeIndex = e, x.updateRealIndex(), x.rtl && -r === x.translate || !x.rtl && r === x.translate ? (x.params.autoHeight && x.updateAutoHeight(), x.updateClasses(), "slide" !== x.params.effect && x.setWrapperTranslate(r), !1) : (x.updateClasses(), x.onTransitionStart(t), 0 === a || x.browser.lteIE9 ? (x.setWrapperTranslate(r), x.setWrapperTransition(0), x.onTransitionEnd(t)) : (x.setWrapperTranslate(r), x.setWrapperTransition(a), x.animating || (x.animating = !0, x.wrapper.transitionEnd(function() {
                    x && x.onTransitionEnd(t)
                }))), !0)))
            }, x.onTransitionStart = function(e) {
                void 0 === e && (e = !0), x.params.autoHeight && x.updateAutoHeight(), x.lazy && x.lazy.onTransitionStart(), e && (x.emit("onTransitionStart", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeStart", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextStart", x) : x.emit("onSlidePrevStart", x)))
            }, x.onTransitionEnd = function(e) {
                x.animating = !1, x.setWrapperTransition(0), void 0 === e && (e = !0), x.lazy && x.lazy.onTransitionEnd(), e && (x.emit("onTransitionEnd", x), x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeEnd", x), x.activeIndex > x.previousIndex ? x.emit("onSlideNextEnd", x) : x.emit("onSlidePrevEnd", x))), x.params.history && x.history && x.history.setHistory(x.params.history, x.activeIndex), x.params.hashnav && x.hashnav && x.hashnav.setHash()
            }, x.slideNext = function(e, a, t) {
                if (x.params.loop) {
                    if (x.animating) return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex + x.params.slidesPerGroup, a, e, t)
                }
                return x.slideTo(x.activeIndex + x.params.slidesPerGroup, a, e, t)
            }, x._slideNext = function(e) {
                return x.slideNext(!0, e, !0)
            }, x.slidePrev = function(e, a, t) {
                if (x.params.loop) {
                    if (x.animating) return !1;
                    x.fixLoop();
                    x.container[0].clientLeft;
                    return x.slideTo(x.activeIndex - 1, a, e, t)
                }
                return x.slideTo(x.activeIndex - 1, a, e, t)
            }, x._slidePrev = function(e) {
                return x.slidePrev(!0, e, !0)
            }, x.slideReset = function(e, a, t) {
                return x.slideTo(x.activeIndex, a, e)
            }, x.disableTouchControl = function() {
                return x.params.onlyExternal = !0, !0
            }, x.enableTouchControl = function() {
                return x.params.onlyExternal = !1, !0
            }, x.setWrapperTransition = function(e, a) {
                x.wrapper.transition(e), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTransition(e), x.params.parallax && x.parallax && x.parallax.setTransition(e), x.params.scrollbar && x.scrollbar && x.scrollbar.setTransition(e), x.params.control && x.controller && x.controller.setTransition(e, a), x.emit("onSetTransition", x, e)
            }, x.setWrapperTranslate = function(e, a, t) {
                var s = 0,
                    i = 0;
                x.isHorizontal() ? s = x.rtl ? -e : e : i = e, x.params.roundLengths && (s = r(s), i = r(i)), x.params.virtualTranslate || (x.support.transforms3d ? x.wrapper.transform("translate3d(" + s + "px, " + i + "px, 0px)") : x.wrapper.transform("translate(" + s + "px, " + i + "px)")), x.translate = x.isHorizontal() ? s : i;
                var n, o = x.maxTranslate() - x.minTranslate();
                n = 0 === o ? 0 : (e - x.minTranslate()) / o, n !== x.progress && x.updateProgress(e), a && x.updateActiveIndex(), "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTranslate(x.translate), x.params.parallax && x.parallax && x.parallax.setTranslate(x.translate), x.params.scrollbar && x.scrollbar && x.scrollbar.setTranslate(x.translate), x.params.control && x.controller && x.controller.setTranslate(x.translate, t), x.emit("onSetTranslate", x, x.translate)
            }, x.getTranslate = function(e, a) {
                var t, s, r, i;
                return void 0 === a && (a = "x"), x.params.virtualTranslate ? x.rtl ? -x.translate : x.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = r.transform || r.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")), i = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (i = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), x.rtl && s && (s = -s), s || 0)
            }, x.getWrapperTranslate = function(e) {
                return void 0 === e && (e = x.isHorizontal() ? "x" : "y"), x.getTranslate(x.wrapper[0], e)
            }, x.observers = [], x.initObservers = function() {
                if (x.params.observeParents)
                    for (var e = x.container.parents(), a = 0; a < e.length; a++) o(e[a]);
                o(x.container[0], {
                    childList: !1
                }), o(x.wrapper[0], {
                    attributes: !1
                })
            }, x.disconnectObservers = function() {
                for (var e = 0; e < x.observers.length; e++) x.observers[e].disconnect();
                x.observers = []
            }, x.createLoop = function() {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove();
                var a = x.wrapper.children("." + x.params.slideClass);
                "auto" !== x.params.slidesPerView || x.params.loopedSlides || (x.params.loopedSlides = a.length), x.loopedSlides = parseInt(x.params.loopedSlides || x.params.slidesPerView, 10), x.loopedSlides = x.loopedSlides + x.params.loopAdditionalSlides, x.loopedSlides > a.length && (x.loopedSlides = a.length);
                var t, s = [],
                    r = [];
                for (a.each(function(t, i) {
                        var n = e(this);
                        t < x.loopedSlides && r.push(i), t < a.length && t >= a.length - x.loopedSlides && s.push(i), n.attr("data-swiper-slide-index", t)
                    }), t = 0; t < r.length; t++) x.wrapper.append(e(r[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass));
                for (t = s.length - 1; t >= 0; t--) x.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(x.params.slideDuplicateClass))
            }, x.destroyLoop = function() {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove(), x.slides.removeAttr("data-swiper-slide-index")
            }, x.reLoop = function(e) {
                var a = x.activeIndex - x.loopedSlides;
                x.destroyLoop(), x.createLoop(), x.updateSlidesSize(), e && x.slideTo(a + x.loopedSlides, 0, !1)
            }, x.fixLoop = function() {
                var e;
                x.activeIndex < x.loopedSlides ? (e = x.slides.length - 3 * x.loopedSlides + x.activeIndex, e += x.loopedSlides, x.slideTo(e, 0, !1, !0)) : ("auto" === x.params.slidesPerView && x.activeIndex >= 2 * x.loopedSlides || x.activeIndex > x.slides.length - 2 * x.params.slidesPerView) && (e = -x.slides.length + x.activeIndex + x.loopedSlides, e += x.loopedSlides, x.slideTo(e, 0, !1, !0))
            }, x.appendSlide = function(e) {
                if (x.params.loop && x.destroyLoop(), "object" == typeof e && e.length)
                    for (var a = 0; a < e.length; a++) e[a] && x.wrapper.append(e[a]);
                else x.wrapper.append(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0)
            }, x.prependSlide = function(e) {
                x.params.loop && x.destroyLoop();
                var a = x.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var t = 0; t < e.length; t++) e[t] && x.wrapper.prepend(e[t]);
                    a = x.activeIndex + e.length
                } else x.wrapper.prepend(e);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.slideTo(a, 0, !1)
            }, x.removeSlide = function(e) {
                x.params.loop && (x.destroyLoop(), x.slides = x.wrapper.children("." + x.params.slideClass));
                var a, t = x.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var s = 0; s < e.length; s++) a = e[s], x.slides[a] && x.slides.eq(a).remove(), a < t && t--;
                    t = Math.max(t, 0)
                } else a = e, x.slides[a] && x.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
                x.params.loop && x.createLoop(), x.params.observer && x.support.observer || x.update(!0), x.params.loop ? x.slideTo(t + x.loopedSlides, 0, !1) : x.slideTo(t, 0, !1)
            }, x.removeAllSlides = function() {
                for (var e = [], a = 0; a < x.slides.length; a++) e.push(a);
                x.removeSlide(e)
            }, x.effects = {
                fade: {
                    setTranslate: function() {
                        for (var e = 0; e < x.slides.length; e++) {
                            var a = x.slides.eq(e),
                                t = a[0].swiperSlideOffset,
                                s = -t;
                            x.params.virtualTranslate || (s -= x.translate);
                            var r = 0;
                            x.isHorizontal() || (r = s, s = 0);
                            var i = x.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                            a.css({
                                opacity: i
                            }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                        }
                    },
                    setTransition: function(e) {
                        if (x.slides.transition(e), x.params.virtualTranslate && 0 !== e) {
                            var a = !1;
                            x.slides.transitionEnd(function() {
                                if (!a && x) {
                                    a = !0, x.animating = !1;
                                    for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) x.wrapper.trigger(e[t])
                                }
                            })
                        }
                    }
                },
                flip: {
                    setTranslate: function() {
                        for (var a = 0; a < x.slides.length; a++) {
                            var t = x.slides.eq(a),
                                s = t[0].progress;
                            x.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
                            var r = t[0].swiperSlideOffset,
                                i = -180 * s,
                                n = i,
                                o = 0,
                                l = -r,
                                p = 0;
                            if (x.isHorizontal() ? x.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + x.slides.length, x.params.flip.slideShadows) {
                                var d = x.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                    m = x.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                0 === d.length && (d = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === m.length && (m = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(m)), d.length && (d[0].style.opacity = Math.max(-s, 0)), m.length && (m[0].style.opacity = Math.max(s, 0))
                            }
                            t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                        }
                    },
                    setTransition: function(a) {
                        if (x.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a), x.params.virtualTranslate && 0 !== a) {
                            var t = !1;
                            x.slides.eq(x.activeIndex).transitionEnd(function() {
                                if (!t && x && e(this).hasClass(x.params.slideActiveClass)) {
                                    t = !0, x.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < a.length; s++) x.wrapper.trigger(a[s])
                                }
                            })
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var a, t = 0;
                        x.params.cube.shadow && (x.isHorizontal() ? (a = x.wrapper.find(".swiper-cube-shadow"), 0 === a.length && (a = e('<div class="swiper-cube-shadow"></div>'), x.wrapper.append(a)), a.css({
                            height: x.width + "px"
                        })) : (a = x.container.find(".swiper-cube-shadow"), 0 === a.length && (a = e('<div class="swiper-cube-shadow"></div>'), x.container.append(a))));
                        for (var s = 0; s < x.slides.length; s++) {
                            var r = x.slides.eq(s),
                                i = 90 * s,
                                n = Math.floor(i / 360);
                            x.rtl && (i = -i, n = Math.floor(-i / 360));
                            var o = Math.max(Math.min(r[0].progress, 1), -1),
                                l = 0,
                                p = 0,
                                d = 0;
                            s % 4 == 0 ? (l = 4 * -n * x.size, d = 0) : (s - 1) % 4 == 0 ? (l = 0, d = 4 * -n * x.size) : (s - 2) % 4 == 0 ? (l = x.size + 4 * n * x.size, d = x.size) : (s - 3) % 4 == 0 && (l = -x.size, d = 3 * x.size + 4 * x.size * n), x.rtl && (l = -l), x.isHorizontal() || (p = l, l = 0);
                            var m = "rotateX(" + (x.isHorizontal() ? 0 : -i) + "deg) rotateY(" + (x.isHorizontal() ? i : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                            if (o <= 1 && o > -1 && (t = 90 * s + 90 * o, x.rtl && (t = 90 * -s - 90 * o)), r.transform(m), x.params.cube.slideShadows) {
                                var u = x.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                                    c = x.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), r.append(u)), 0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(c)), u.length && (u[0].style.opacity = Math.max(-o, 0)), c.length && (c[0].style.opacity = Math.max(o, 0))
                            }
                        }
                        if (x.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + x.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + x.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + x.size / 2 + "px",
                                "transform-origin": "50% 50% -" + x.size / 2 + "px"
                            }), x.params.cube.shadow)
                            if (x.isHorizontal()) a.transform("translate3d(0px, " + (x.width / 2 + x.params.cube.shadowOffset) + "px, " + -x.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + x.params.cube.shadowScale + ")");
                            else {
                                var g = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                    h = 1.5 - (Math.sin(2 * g * Math.PI / 360) / 2 + Math.cos(2 * g * Math.PI / 360) / 2),
                                    v = x.params.cube.shadowScale,
                                    f = x.params.cube.shadowScale / h,
                                    w = x.params.cube.shadowOffset;
                                a.transform("scale3d(" + v + ", 1, " + f + ") translate3d(0px, " + (x.height / 2 + w) + "px, " + -x.height / 2 / f + "px) rotateX(-90deg)")
                            }
                        var y = x.isSafari || x.isUiWebView ? -x.size / 2 : 0;
                        x.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (x.isHorizontal() ? 0 : t) + "deg) rotateY(" + (x.isHorizontal() ? -t : 0) + "deg)")
                    },
                    setTransition: function(e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), x.params.cube.shadow && !x.isHorizontal() && x.container.find(".swiper-cube-shadow").transition(e)
                    }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var a = x.translate, t = x.isHorizontal() ? -a + x.width / 2 : -a + x.height / 2, s = x.isHorizontal() ? x.params.coverflow.rotate : -x.params.coverflow.rotate, r = x.params.coverflow.depth, i = 0, n = x.slides.length; i < n; i++) {
                            var o = x.slides.eq(i),
                                l = x.slidesSizesGrid[i],
                                p = o[0].swiperSlideOffset,
                                d = (t - p - l / 2) / l * x.params.coverflow.modifier,
                                m = x.isHorizontal() ? s * d : 0,
                                u = x.isHorizontal() ? 0 : s * d,
                                c = -r * Math.abs(d),
                                g = x.isHorizontal() ? 0 : x.params.coverflow.stretch * d,
                                h = x.isHorizontal() ? x.params.coverflow.stretch * d : 0;
                            Math.abs(h) < .001 && (h = 0), Math.abs(g) < .001 && (g = 0), Math.abs(c) < .001 && (c = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0);
                            var v = "translate3d(" + h + "px," + g + "px," + c + "px)  rotateX(" + u + "deg) rotateY(" + m + "deg)";
                            if (o.transform(v), o[0].style.zIndex = 1 - Math.abs(Math.round(d)), x.params.coverflow.slideShadows) {
                                var f = x.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                                    w = x.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                0 === f.length && (f = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'), o.append(f)), 0 === w.length && (w = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), f.length && (f[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                            }
                        }
                        if (x.browser.ie) {
                            x.wrapper[0].style.perspectiveOrigin = t + "px 50%"
                        }
                    },
                    setTransition: function(e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                    }
                }
            }, x.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(a, t) {
                    if (void 0 !== a && (void 0 === t && (t = !0), 0 !== x.slides.length)) {
                        var s = x.slides.eq(a),
                            r = s.find("." + x.params.lazyLoadingClass + ":not(." + x.params.lazyStatusLoadedClass + "):not(." + x.params.lazyStatusLoadingClass + ")");
                        !s.hasClass(x.params.lazyLoadingClass) || s.hasClass(x.params.lazyStatusLoadedClass) || s.hasClass(x.params.lazyStatusLoadingClass) || (r = r.add(s[0])), 0 !== r.length && r.each(function() {
                            var a = e(this);
                            a.addClass(x.params.lazyStatusLoadingClass);
                            var r = a.attr("data-background"),
                                i = a.attr("data-src"),
                                n = a.attr("data-srcset"),
                                o = a.attr("data-sizes");
                            x.loadImage(a[0], i || r, n, o, !1, function() {
                                if (void 0 !== x && null !== x && x) {
                                    if (r ? (a.css("background-image", 'url("' + r + '")'), a.removeAttr("data-background")) : (n && (a.attr("srcset", n), a.removeAttr("data-srcset")), o && (a.attr("sizes", o), a.removeAttr("data-sizes")), i && (a.attr("src", i), a.removeAttr("data-src"))), a.addClass(x.params.lazyStatusLoadedClass).removeClass(x.params.lazyStatusLoadingClass), s.find("." + x.params.lazyPreloaderClass + ", ." + x.params.preloaderClass).remove(), x.params.loop && t) {
                                        var e = s.attr("data-swiper-slide-index");
                                        if (s.hasClass(x.params.slideDuplicateClass)) {
                                            var l = x.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + x.params.slideDuplicateClass + ")");
                                            x.lazy.loadImageInSlide(l.index(), !1)
                                        } else {
                                            var p = x.wrapper.children("." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            x.lazy.loadImageInSlide(p.index(), !1)
                                        }
                                    }
                                    x.emit("onLazyImageReady", x, s[0], a[0])
                                }
                            }), x.emit("onLazyImageLoad", x, s[0], a[0])
                        })
                    }
                },
                load: function() {
                    var a, t = x.params.slidesPerView;
                    if ("auto" === t && (t = 0), x.lazy.initialImageLoaded || (x.lazy.initialImageLoaded = !0), x.params.watchSlidesVisibility) x.wrapper.children("." + x.params.slideVisibleClass).each(function() {
                        x.lazy.loadImageInSlide(e(this).index())
                    });
                    else if (t > 1)
                        for (a = x.activeIndex; a < x.activeIndex + t; a++) x.slides[a] && x.lazy.loadImageInSlide(a);
                    else x.lazy.loadImageInSlide(x.activeIndex);
                    if (x.params.lazyLoadingInPrevNext)
                        if (t > 1 || x.params.lazyLoadingInPrevNextAmount && x.params.lazyLoadingInPrevNextAmount > 1) {
                            var s = x.params.lazyLoadingInPrevNextAmount,
                                r = t,
                                i = Math.min(x.activeIndex + r + Math.max(s, r), x.slides.length),
                                n = Math.max(x.activeIndex - Math.max(r, s), 0);
                            for (a = x.activeIndex + t; a < i; a++) x.slides[a] && x.lazy.loadImageInSlide(a);
                            for (a = n; a < x.activeIndex; a++) x.slides[a] && x.lazy.loadImageInSlide(a)
                        } else {
                            var o = x.wrapper.children("." + x.params.slideNextClass);
                            o.length > 0 && x.lazy.loadImageInSlide(o.index());
                            var l = x.wrapper.children("." + x.params.slidePrevClass);
                            l.length > 0 && x.lazy.loadImageInSlide(l.index())
                        }
                },
                onTransitionStart: function() {
                    x.params.lazyLoading && (x.params.lazyLoadingOnTransitionStart || !x.params.lazyLoadingOnTransitionStart && !x.lazy.initialImageLoaded) && x.lazy.load()
                },
                onTransitionEnd: function() {
                    x.params.lazyLoading && !x.params.lazyLoadingOnTransitionStart && x.lazy.load()
                }
            }, x.scrollbar = {
                isTouched: !1,
                setDragPosition: function(e) {
                    var a = x.scrollbar,
                        t = x.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                        s = t - a.track.offset()[x.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                        r = -x.minTranslate() * a.moveDivider,
                        i = -x.maxTranslate() * a.moveDivider;
                    s < r ? s = r : s > i && (s = i), s = -s / a.moveDivider, x.updateProgress(s), x.setWrapperTranslate(s, !0)
                },
                dragStart: function(e) {
                    var a = x.scrollbar;
                    a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), x.params.scrollbarHide && a.track.css("opacity", 1), x.wrapper.transition(100), a.drag.transition(100), x.emit("onScrollbarDragStart", x)
                },
                dragMove: function(e) {
                    var a = x.scrollbar;
                    a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), x.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), x.emit("onScrollbarDragMove", x))
                },
                dragEnd: function(e) {
                    var a = x.scrollbar;
                    a.isTouched && (a.isTouched = !1, x.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() {
                        a.track.css("opacity", 0), a.track.transition(400)
                    }, 1e3)), x.emit("onScrollbarDragEnd", x), x.params.scrollbarSnapOnRelease && x.slideReset())
                },
                draggableEvents: function() {
                    return x.params.simulateTouch !== !1 || x.support.touch ? x.touchEvents : x.touchEventsDesktop
                }(),
                enableDraggable: function() {
                    var a = x.scrollbar,
                        t = x.support.touch ? a.track : document;
                    e(a.track).on(a.draggableEvents.start, a.dragStart), e(t).on(a.draggableEvents.move, a.dragMove), e(t).on(a.draggableEvents.end, a.dragEnd)
                },
                disableDraggable: function() {
                    var a = x.scrollbar,
                        t = x.support.touch ? a.track : document;
                    e(a.track).off(a.draggableEvents.start, a.dragStart), e(t).off(a.draggableEvents.move, a.dragMove), e(t).off(a.draggableEvents.end, a.dragEnd)
                },
                set: function() {
                    if (x.params.scrollbar) {
                        var a = x.scrollbar;
                        a.track = e(x.params.scrollbar), x.params.uniqueNavElements && "string" == typeof x.params.scrollbar && a.track.length > 1 && 1 === x.container.find(x.params.scrollbar).length && (a.track = x.container.find(x.params.scrollbar)), a.drag = a.track.find(".swiper-scrollbar-drag"), 0 === a.drag.length && (a.drag = e('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)), a.drag[0].style.width = "", a.drag[0].style.height = "", a.trackSize = x.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight, a.divider = x.size / x.virtualSize, a.moveDivider = a.divider * (a.trackSize / x.size), a.dragSize = a.trackSize * a.divider, x.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px", a.divider >= 1 ? a.track[0].style.display = "none" : a.track[0].style.display = "", x.params.scrollbarHide && (a.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function() {
                    if (x.params.scrollbar) {
                        var e, a = x.scrollbar,
                            t = (x.translate, a.dragSize);
                        e = (a.trackSize - a.dragSize) * x.progress, x.rtl && x.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), x.isHorizontal() ? (x.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (x.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), x.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                            a.track[0].style.opacity = 0, a.track.transition(400)
                        }, 1e3))
                    }
                },
                setTransition: function(e) {
                    x.params.scrollbar && x.scrollbar.drag.transition(e)
                }
            }, x.controller = {
                LinearSpline: function(e, a) {
                    var t = function() {
                        var e, a, t;
                        return function(s, r) {
                            for (a = -1, e = s.length; e - a > 1;) s[t = e + a >> 1] <= r ? a = t : e = t;
                            return e
                        }
                    }();
                    this.x = e, this.y = a, this.lastIndex = e.length - 1;
                    var s, r;
                    this.x.length;
                    this.interpolate = function(e) {
                        return e ? (r = t(this.x, e), s = r - 1, (e - this.x[s]) * (this.y[r] - this.y[s]) / (this.x[r] - this.x[s]) + this.y[s]) : 0
                    }
                },
                getInterpolateFunction: function(e) {
                    x.controller.spline || (x.controller.spline = x.params.loop ? new x.controller.LinearSpline(x.slidesGrid, e.slidesGrid) : new x.controller.LinearSpline(x.snapGrid, e.snapGrid))
                },
                setTranslate: function(e, t) {
                    function s(a) {
                        e = a.rtl && "horizontal" === a.params.direction ? -x.translate : x.translate, "slide" === x.params.controlBy && (x.controller.getInterpolateFunction(a), i = -x.controller.spline.interpolate(-e)), i && "container" !== x.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (x.maxTranslate() - x.minTranslate()), i = (e - x.minTranslate()) * r + a.minTranslate()), x.params.controlInverse && (i = a.maxTranslate() - i), a.updateProgress(i), a.setWrapperTranslate(i, !1, x), a.updateActiveIndex()
                    }
                    var r, i, n = x.params.control;
                    if (Array.isArray(n))
                        for (var o = 0; o < n.length; o++) n[o] !== t && n[o] instanceof a && s(n[o]);
                    else n instanceof a && t !== n && s(n)
                },
                setTransition: function(e, t) {
                    function s(a) {
                        a.setWrapperTransition(e, x), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                            i && (a.params.loop && "slide" === x.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                        }))
                    }
                    var r, i = x.params.control;
                    if (Array.isArray(i))
                        for (r = 0; r < i.length; r++) i[r] !== t && i[r] instanceof a && s(i[r]);
                    else i instanceof a && t !== i && s(i)
                }
            }, x.hashnav = {
                onHashCange: function(e, a) {
                    var t = document.location.hash.replace("#", "");
                    t !== x.slides.eq(x.activeIndex).attr("data-hash") && x.slideTo(x.wrapper.children("." + x.params.slideClass + '[data-hash="' + t + '"]').index())
                },
                attachEvents: function(a) {
                    var t = a ? "off" : "on";
                    e(window)[t]("hashchange", x.hashnav.onHashCange)
                },
                setHash: function() {
                    if (x.hashnav.initialized && x.params.hashnav)
                        if (x.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + x.slides.eq(x.activeIndex).attr("data-hash") || "");
                        else {
                            var e = x.slides.eq(x.activeIndex),
                                a = e.attr("data-hash") || e.attr("data-history");
                            document.location.hash = a || ""
                        }
                },
                init: function() {
                    if (x.params.hashnav && !x.params.history) {
                        x.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e)
                            for (var a = 0, t = x.slides.length; a < t; a++) {
                                var s = x.slides.eq(a),
                                    r = s.attr("data-hash") || s.attr("data-history");
                                if (r === e && !s.hasClass(x.params.slideDuplicateClass)) {
                                    var i = s.index();
                                    x.slideTo(i, 0, x.params.runCallbacksOnInit, !0)
                                }
                            }
                        x.params.hashnavWatchState && x.hashnav.attachEvents()
                    }
                },
                destroy: function() {
                    x.params.hashnavWatchState && x.hashnav.attachEvents(!0)
                }
            }, x.history = {
                init: function() {
                    if (x.params.history) {
                        if (!window.history || !window.history.pushState) return x.params.history = !1, void(x.params.hashnav = !0);
                        x.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, x.params.runCallbacksOnInit), x.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                    }
                },
                setHistoryPopState: function() {
                    x.history.paths = x.history.getPathValues(), x.history.scrollToSlide(x.params.speed, x.history.paths.value, !1)
                },
                getPathValues: function() {
                    var e = window.location.pathname.slice(1).split("/"),
                        a = e.length;
                    return {
                        key: e[a - 2],
                        value: e[a - 1]
                    }
                },
                setHistory: function(e, a) {
                    if (x.history.initialized && x.params.history) {
                        var t = x.slides.eq(a),
                            s = this.slugify(t.attr("data-history"));
                        window.location.pathname.includes(e) || (s = e + "/" + s), x.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s)
                    }
                },
                slugify: function(e) {
                    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                },
                scrollToSlide: function(e, a, t) {
                    if (a)
                        for (var s = 0, r = x.slides.length; s < r; s++) {
                            var i = x.slides.eq(s),
                                n = this.slugify(i.attr("data-history"));
                            if (n === a && !i.hasClass(x.params.slideDuplicateClass)) {
                                var o = i.index();
                                x.slideTo(o, e, t)
                            }
                        } else x.slideTo(0, e, t)
                }
            }, x.disableKeyboardControl = function() {
                x.params.keyboardControl = !1, e(document).off("keydown", l)
            }, x.enableKeyboardControl = function() {
                x.params.keyboardControl = !0, e(document).on("keydown", l)
            }, x.mousewheel = {
                event: !1,
                lastScrollTime: (new window.Date).getTime()
            }, x.params.mousewheelControl && (x.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var e = "onwheel" in document;
                if (!e) {
                    var a = document.createElement("div");
                    a.setAttribute("onwheel", "return;"), e = "function" == typeof a.onwheel
                }
                return !e && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (e = document.implementation.hasFeature("Events.wheel", "3.0")), e
            }() ? "wheel" : "mousewheel"), x.disableMousewheelControl = function() {
                if (!x.mousewheel.event) return !1;
                var a = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (a = e(x.params.mousewheelEventsTarged)), a.off(x.mousewheel.event, d), x.params.mousewheelControl = !1, !0
            }, x.enableMousewheelControl = function() {
                if (!x.mousewheel.event) return !1;
                var a = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (a = e(x.params.mousewheelEventsTarged)), a.on(x.mousewheel.event, d), x.params.mousewheelControl = !0, !0
            }, x.parallax = {
                setTranslate: function() {
                    x.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        m(this, x.progress)
                    }), x.slides.each(function() {
                        var a = e(this);
                        a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            m(this, Math.min(Math.max(a[0].progress, -1), 1))
                        })
                    })
                },
                setTransition: function(a) {
                    void 0 === a && (a = x.params.speed), x.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var t = e(this),
                            s = parseInt(t.attr("data-swiper-parallax-duration"), 10) || a;
                        0 === a && (s = 0), t.transition(s)
                    })
                }
            }, x.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    slide: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    image: void 0,
                    imageWrap: void 0,
                    zoomMax: x.params.zoomMax
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                },
                getDistanceBetweenTouches: function(e) {
                    if (e.targetTouches.length < 2) return 1;
                    var a = e.targetTouches[0].pageX,
                        t = e.targetTouches[0].pageY,
                        s = e.targetTouches[1].pageX,
                        r = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(s - a, 2) + Math.pow(r - t, 2))
                },
                onGestureStart: function(a) {
                    var t = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchstart" !== a.type || "touchstart" === a.type && a.targetTouches.length < 2) return;
                        t.gesture.scaleStart = t.getDistanceBetweenTouches(a)
                    }
                    if (!(t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = e(this), 0 === t.gesture.slide.length && (t.gesture.slide = x.slides.eq(x.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + x.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || x.params.zoomMax, 0 !== t.gesture.imageWrap.length))) return void(t.gesture.image = void 0);
                    t.gesture.image.transition(0), t.isScaling = !0
                },
                onGestureChange: function(e) {
                    var a = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                        a.gesture.scaleMove = a.getDistanceBetweenTouches(e)
                    }
                    a.gesture.image && 0 !== a.gesture.image.length && (x.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < x.params.zoomMin && (a.scale = x.params.zoomMin + 1 - Math.pow(x.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
                },
                onGestureEnd: function(e) {
                    var a = x.zoom;
                    !x.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), x.params.zoomMin), a.gesture.image.transition(x.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0))
                },
                onTouchStart: function(e, a) {
                    var t = e.zoom;
                    t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY))
                },
                onTouchMove: function(e) {
                    var a = x.zoom;
                    if (a.gesture.image && 0 !== a.gesture.image.length && (x.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
                        a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = x.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = x.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), x.rtl && (a.image.startX = -a.image.startX), x.rtl && (a.image.startY = -a.image.startY));
                        var t = a.image.width * a.scale,
                            s = a.image.height * a.scale;
                        if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                            if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
                                if (x.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void(a.image.isTouched = !1);
                                if (!x.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void(a.image.isTouched = !1)
                            }
                            e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function(e, a) {
                    var t = e.zoom;
                    if (t.gesture.image && 0 !== t.gesture.image.length) {
                        if (!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void(t.image.isMoved = !1);
                        t.image.isTouched = !1, t.image.isMoved = !1;
                        var s = 300,
                            r = 300,
                            i = t.velocity.x * s,
                            n = t.image.currentX + i,
                            o = t.velocity.y * r,
                            l = t.image.currentY + o;
                        0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (r = Math.abs((l - t.image.currentY) / t.velocity.y));
                        var p = Math.max(s, r);
                        t.image.currentX = n, t.image.currentY = l;
                        var d = t.image.width * t.scale,
                            m = t.image.height * t.scale;
                        t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - m / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function(e) {
                    var a = e.zoom;
                    a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1)
                },
                toggleZoom: function(a, t) {
                    var s = a.zoom;
                    if (s.gesture.slide || (s.gesture.slide = a.clickedSlide ? e(a.clickedSlide) : a.slides.eq(a.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + a.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length) {
                        var r, i, n, o, l, p, d, m, u, c, g, h, v, f, w, y, x, T;
                        void 0 === s.image.touchesStart.x && t ? (r = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, i = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (r = s.image.touchesStart.x, i = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-swiper-zoom") || a.params.zoomMax, t ? (x = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, n = s.gesture.slide.offset().left, o = s.gesture.slide.offset().top, l = n + x / 2 - r, p = o + T / 2 - i, u = s.gesture.image[0].offsetWidth, c = s.gesture.image[0].offsetHeight, g = u * s.scale, h = c * s.scale, v = Math.min(x / 2 - g / 2, 0), f = Math.min(T / 2 - h / 2, 0), w = -v, y = -f, d = l * s.scale, m = p * s.scale, d < v && (d = v), d > w && (d = w), m < f && (m = f), m > y && (m = y)) : (d = 0, m = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + m + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"))
                    }
                },
                attachEvents: function(a) {
                    var t = a ? "off" : "on";
                    if (x.params.zoom) {
                        var s = (x.slides, !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        });
                        x.support.gestures ? (x.slides[t]("gesturestart", x.zoom.onGestureStart, s), x.slides[t]("gesturechange", x.zoom.onGestureChange, s), x.slides[t]("gestureend", x.zoom.onGestureEnd, s)) : "touchstart" === x.touchEvents.start && (x.slides[t](x.touchEvents.start, x.zoom.onGestureStart, s), x.slides[t](x.touchEvents.move, x.zoom.onGestureChange, s), x.slides[t](x.touchEvents.end, x.zoom.onGestureEnd, s)), x[t]("touchStart", x.zoom.onTouchStart), x.slides.each(function(a, s) {
                            e(s).find("." + x.params.zoomContainerClass).length > 0 && e(s)[t](x.touchEvents.move, x.zoom.onTouchMove)
                        }), x[t]("touchEnd", x.zoom.onTouchEnd), x[t]("transitionEnd", x.zoom.onTransitionEnd), x.params.zoomToggle && x.on("doubleTap", x.zoom.toggleZoom)
                    }
                },
                init: function() {
                    x.zoom.attachEvents()
                },
                destroy: function() {
                    x.zoom.attachEvents(!0)
                }
            }, x._plugins = [];
            for (var Y in x.plugins) {
                var A = x.plugins[Y](x, x.params[Y]);
                A && x._plugins.push(A)
            }
            return x.callPlugins = function(e) {
                for (var a = 0; a < x._plugins.length; a++) e in x._plugins[a] && x._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, x.emitterEventListeners = {}, x.emit = function(e) {
                x.params[e] && x.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (x.emitterEventListeners[e])
                    for (a = 0; a < x.emitterEventListeners[e].length; a++) x.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                x.callPlugins && x.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, x.on = function(e, a) {
                return e = u(e), x.emitterEventListeners[e] || (x.emitterEventListeners[e] = []), x.emitterEventListeners[e].push(a), x
            }, x.off = function(e, a) {
                var t;
                if (e = u(e), void 0 === a) return x.emitterEventListeners[e] = [], x;
                if (x.emitterEventListeners[e] && 0 !== x.emitterEventListeners[e].length) {
                    for (t = 0; t < x.emitterEventListeners[e].length; t++) x.emitterEventListeners[e][t] === a && x.emitterEventListeners[e].splice(t, 1);
                    return x
                }
            }, x.once = function(e, a) {
                e = u(e);
                var t = function() {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), x.off(e, t)
                };
                return x.on(e, t), x
            }, x.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function(e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function(a) {
                    13 === a.keyCode && (e(a.target).is(x.params.nextButton) ? (x.onClickNext(a), x.isEnd ? x.a11y.notify(x.params.lastSlideMessage) : x.a11y.notify(x.params.nextSlideMessage)) : e(a.target).is(x.params.prevButton) && (x.onClickPrev(a), x.isBeginning ? x.a11y.notify(x.params.firstSlideMessage) : x.a11y.notify(x.params.prevSlideMessage)), e(a.target).is("." + x.params.bulletClass) && e(a.target)[0].click())
                },
                liveRegion: e('<span class="' + x.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = x.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function() {
                    x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.a11y.makeFocusable(x.nextButton), x.a11y.addRole(x.nextButton, "button"), x.a11y.addLabel(x.nextButton, x.params.nextSlideMessage)), x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.a11y.makeFocusable(x.prevButton), x.a11y.addRole(x.prevButton, "button"), x.a11y.addLabel(x.prevButton, x.params.prevSlideMessage)), e(x.container).append(x.a11y.liveRegion)
                },
                initPagination: function() {
                    x.params.pagination && x.params.paginationClickable && x.bullets && x.bullets.length && x.bullets.each(function() {
                        var a = e(this);
                        x.a11y.makeFocusable(a), x.a11y.addRole(a, "button"), x.a11y.addLabel(a, x.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                    })
                },
                destroy: function() {
                    x.a11y.liveRegion && x.a11y.liveRegion.length > 0 && x.a11y.liveRegion.remove()
                }
            }, x.init = function() {
                x.params.loop && x.createLoop(), x.updateContainerSize(), x.updateSlidesSize(), x.updatePagination(), x.params.scrollbar && x.scrollbar && (x.scrollbar.set(), x.params.scrollbarDraggable && x.scrollbar.enableDraggable()), "slide" !== x.params.effect && x.effects[x.params.effect] && (x.params.loop || x.updateProgress(), x.effects[x.params.effect].setTranslate()), x.params.loop ? x.slideTo(x.params.initialSlide + x.loopedSlides, 0, x.params.runCallbacksOnInit) : (x.slideTo(x.params.initialSlide, 0, x.params.runCallbacksOnInit), 0 === x.params.initialSlide && (x.parallax && x.params.parallax && x.parallax.setTranslate(), x.lazy && x.params.lazyLoading && (x.lazy.load(), x.lazy.initialImageLoaded = !0))), x.attachEvents(), x.params.observer && x.support.observer && x.initObservers(), x.params.preloadImages && !x.params.lazyLoading && x.preloadImages(), x.params.zoom && x.zoom && x.zoom.init(), x.params.autoplay && x.startAutoplay(), x.params.keyboardControl && x.enableKeyboardControl && x.enableKeyboardControl(), x.params.mousewheelControl && x.enableMousewheelControl && x.enableMousewheelControl(), x.params.hashnavReplaceState && (x.params.replaceState = x.params.hashnavReplaceState), x.params.history && x.history && x.history.init(), x.params.hashnav && x.hashnav && x.hashnav.init(), x.params.a11y && x.a11y && x.a11y.init(), x.emit("onInit", x)
            }, x.cleanupStyles = function() {
                x.container.removeClass(x.classNames.join(" ")).removeAttr("style"), x.wrapper.removeAttr("style"), x.slides && x.slides.length && x.slides.removeClass([x.params.slideVisibleClass, x.params.slideActiveClass, x.params.slideNextClass, x.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), x.paginationContainer && x.paginationContainer.length && x.paginationContainer.removeClass(x.params.paginationHiddenClass), x.bullets && x.bullets.length && x.bullets.removeClass(x.params.bulletActiveClass), x.params.prevButton && e(x.params.prevButton).removeClass(x.params.buttonDisabledClass), x.params.nextButton && e(x.params.nextButton).removeClass(x.params.buttonDisabledClass), x.params.scrollbar && x.scrollbar && (x.scrollbar.track && x.scrollbar.track.length && x.scrollbar.track.removeAttr("style"), x.scrollbar.drag && x.scrollbar.drag.length && x.scrollbar.drag.removeAttr("style"))
            }, x.destroy = function(e, a) {
                x.detachEvents(), x.stopAutoplay(), x.params.scrollbar && x.scrollbar && x.params.scrollbarDraggable && x.scrollbar.disableDraggable(), x.params.loop && x.destroyLoop(), a && x.cleanupStyles(), x.disconnectObservers(), x.params.zoom && x.zoom && x.zoom.destroy(), x.params.keyboardControl && x.disableKeyboardControl && x.disableKeyboardControl(), x.params.mousewheelControl && x.disableMousewheelControl && x.disableMousewheelControl(), x.params.a11y && x.a11y && x.a11y.destroy(), x.params.history && !x.params.replaceState && window.removeEventListener("popstate", x.history.setHistoryPopState), x.params.hashnav && x.hashnav && x.hashnav.destroy(), x.emit("onDestroy"), e !== !1 && (x = null)
            }, x.init(), x
        }
    };
    a.prototype = {
        isSafari: function() {
            var e = window.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function() {
                var e = document.createElement("div");
                return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
            }()
        },
        device: function() {
            var e = window.navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                r = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: t || r || s,
                android: a
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                    if (a[t] in e) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }(),
            passiveListener: function() {
                var e = !1;
                try {
                    var a = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    window.addEventListener("testPassiveListener", null, a)
                } catch (e) {}
                return e
            }(),
            gestures: function() {
                return "ongesturestart" in window
            }()
        },
        plugins: {}
    };
    for (var t = ["jQuery", "Zepto", "Dom7"], s = 0; s < t.length; s++) window[t[s]] && function(e) {
        e.fn.swiper = function(t) {
            var s;
            return e(this).each(function() {
                var e = new a(this, t);
                s || (s = e)
            }), s
        }
    }(window[t[s]]);
    var r;
    r = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function(e) {
        function a(i) {
            if (i.target === this)
                for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a)
        }
        var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            r = this;
        if (e)
            for (t = 0; t < s.length; t++) r.on(s[t], a);
        return this
    }), "transform" in r.fn || (r.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in r.fn || (r.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    }), "outerWidth" in r.fn || (r.fn.outerWidth = function(e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    })), window.Swiper = a
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
});

/*!
 * Masonry PACKAGED v4.2.2
 * by David DeSandro
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }), void 0 !== n ? n : t
        }

        function h(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, o(a))
    }

    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var n = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return o(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                var s = i[n],
                    r = o && o[s];
                r && (this.off(t, s), delete o[s]), s.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
    }

    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                z = a.borderTopWidth + a.borderBottomWidth,
                I = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (I ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i],
                n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    };
    var o = Array.prototype.slice;
    i.makeArray = function(t) {
        if (Array.isArray(t)) return t;
        if (null === t || void 0 === t) return [];
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? o.call(t) : [t]
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            clearTimeout(t);
            var e = arguments,
                s = this;
            this[n] = setTimeout(function() {
                o.apply(s, e), delete s[n]
            }, i)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function(e, o) {
        i.docReady(function() {
            var s = i.toDashed(o),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, o, u)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function o(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        d = o.prototype = Object.create(t.prototype);
    d.constructor = o, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() {
        this.size = e(this.element)
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = parseFloat(o),
            r = parseFloat(n),
            a = this.layout.size;
        o.indexOf("%") != -1 && (s = s / 100 * a.width), n.indexOf("%") != -1 && (r = r / 100 * a.height), s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom",
            h = o ? "top" : "bottom",
            d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition();
        var s = t - i,
            r = e - o,
            a = {};
        a.transform = this.getTranslate(s, r), this.transition({
            to: a,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + n(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c)
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n, f[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }
    var u = t.console,
        h = t.jQuery,
        d = function() {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    o.extend(c, e.prototype), c.option = function(t) {
        o.extend(this.options, t)
    }, c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n],
                r = new i(s, this);
            o.push(r)
        }
        return o
    }, c._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function() {
        this.getSize()
    }, c.getSize = function() {
        this.size = i(this.element)
    }, c._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, c._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function() {
        this.resizeContainer()
    }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }

        function o() {
            r++, r == s && i()
        }
        var n = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, o)
        })
    }, c.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), h)
            if (this.$element = this.$element || h(this.element), e) {
                var n = h.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t),
            s = {
                left: e.left - o.left - n.marginLeft,
                top: e.top - o.top - n.marginTop,
                right: o.right - e.right - n.marginRight,
                bottom: o.bottom - e.bottom - n.marginBottom
            };
        return s
    }, c.handleEvent = o.handleEvent, c.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function() {
        this.resize()
    }, o.debounceMethod(s, "onresize", 100), c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = n, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) {
        o[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function(t, e) {
        function n() {
            i.apply(this, arguments)
        }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            o = e(i);
        this.containerWidth = o && o.innerWidth
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
                x: this.columnWidth * s.col,
                y: s.y
            }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
        return r
    }, o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, o._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
        return e
    }, o._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, o._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft"),
            s = n ? o.left : o.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, o._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, o._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, o.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = o._getOption;
    return o._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n],
                    r = i.sortData[s],
                    a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var e, i, o, n = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            o = !0, t()
        })
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return {
            matches: i,
            needReveal: o,
            needHide: n
        }
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t);
        } : "function" == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return o(e.element, t)
        }
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                s = n && n[1],
                r = e(s, o),
                a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            } : function(t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, l._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, l._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, l._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, d
});

/*!
 * imagesLoaded PACKAGED v4.1.3
 */

! function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                n = i[e] = i[e] || [];
            return -1 == n.indexOf(t) && n.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return -1 != n && i.splice(n, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            t = t || [];
            for (var r = this._onceEvents && this._onceEvents[e]; o;) {
                var s = r && r[o];
                s && (this.off(e, o), delete r[o]), o.apply(this, t), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t.allOff = t.removeAllListeners = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        var t = [];
        if (Array.isArray(e)) t = e;
        else if ("number" == typeof e.length)
            for (var i = 0; i < e.length; i++) t.push(e[i]);
        else t.push(e);
        return t
    }

    function o(e, t, r) {
        return this instanceof o ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = n(e), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
            this.check()
        }.bind(this))) : new o(e, t, r)
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }
    var h = e.jQuery,
        a = e.console;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(e) {
        var t = getComputedStyle(e);
        if (t)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
            }
    }, o.prototype.addImage = function(e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function(e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function() {
        function e(e, i, n) {
            setTimeout(function() {
                t.progress(e, i, n)
            })
        }
        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function(e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function() {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function(t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function(e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});

/*! 
 * PhotoSwipe - v4.1.2 - 2017-04-05
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipe = b()
}(this, function() {
    "use strict";
    var a = function(a, b, c, d) {
        var e = {
            features: null,
            bind: function(a, b, c, d) {
                var e = (d ? "remove" : "add") + "EventListener";
                b = b.split(" ");
                for (var f = 0; f < b.length; f++) b[f] && a[e](b[f], c, !1)
            },
            isArray: function(a) {
                return a instanceof Array
            },
            createEl: function(a, b) {
                var c = document.createElement(b || "div");
                return a && (c.className = a), c
            },
            getScrollY: function() {
                var a = window.pageYOffset;
                return void 0 !== a ? a : document.documentElement.scrollTop
            },
            unbind: function(a, b, c) {
                e.bind(a, b, c, !0)
            },
            removeClass: function(a, b) {
                var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                a.className = a.className.replace(c, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(a, b) {
                e.hasClass(a, b) || (a.className += (a.className ? " " : "") + b)
            },
            hasClass: function(a, b) {
                return a.className && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
            },
            getChildByClass: function(a, b) {
                for (var c = a.firstChild; c;) {
                    if (e.hasClass(c, b)) return c;
                    c = c.nextSibling
                }
            },
            arraySearch: function(a, b, c) {
                for (var d = a.length; d--;)
                    if (a[d][c] === b) return d;
                return -1
            },
            extend: function(a, b, c) {
                for (var d in b)
                    if (b.hasOwnProperty(d)) {
                        if (c && a.hasOwnProperty(d)) continue;
                        a[d] = b[d]
                    }
            },
            easing: {
                sine: {
                    out: function(a) {
                        return Math.sin(a * (Math.PI / 2))
                    },
                    inOut: function(a) {
                        return -(Math.cos(Math.PI * a) - 1) / 2
                    }
                },
                cubic: {
                    out: function(a) {
                        return --a * a * a + 1
                    }
                }
            },
            detectFeatures: function() {
                if (e.features) return e.features;
                var a = e.createEl(),
                    b = a.style,
                    c = "",
                    d = {};
                if (d.oldIE = document.all && !document.addEventListener, d.touch = "ontouchstart" in window, window.requestAnimationFrame && (d.raf = window.requestAnimationFrame, d.caf = window.cancelAnimationFrame), d.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !d.pointerEvent) {
                    var f = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        g && g.length > 0 && (g = parseInt(g[1], 10), g >= 1 && g < 8 && (d.isOldIOSPhone = !0))
                    }
                    var h = f.match(/Android\s([0-9\.]*)/),
                        i = h ? h[1] : 0;
                    i = parseFloat(i), i >= 1 && (i < 4.4 && (d.isOldAndroid = !0), d.androidVersion = i), d.isMobileOpera = /opera mini|opera mobi/i.test(f)
                }
                for (var j, k, l = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], n = 0; n < 4; n++) {
                    c = m[n];
                    for (var o = 0; o < 3; o++) j = l[o], k = c + (c ? j.charAt(0).toUpperCase() + j.slice(1) : j), !d[j] && k in b && (d[j] = k);
                    c && !d.raf && (c = c.toLowerCase(), d.raf = window[c + "RequestAnimationFrame"], d.raf && (d.caf = window[c + "CancelAnimationFrame"] || window[c + "CancelRequestAnimationFrame"]))
                }
                if (!d.raf) {
                    var p = 0;
                    d.raf = function(a) {
                        var b = (new Date).getTime(),
                            c = Math.max(0, 16 - (b - p)),
                            d = window.setTimeout(function() {
                                a(b + c)
                            }, c);
                        return p = b + c, d
                    }, d.caf = function(a) {
                        clearTimeout(a)
                    }
                }
                return d.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, e.features = d, d
            }
        };
        e.detectFeatures(), e.features.oldIE && (e.bind = function(a, b, c, d) {
            b = b.split(" ");
            for (var e, f = (d ? "detach" : "attach") + "Event", g = function() {
                    c.handleEvent.call(c)
                }, h = 0; h < b.length; h++)
                if (e = b[h])
                    if ("object" == typeof c && c.handleEvent) {
                        if (d) {
                            if (!c["oldIE" + e]) return !1
                        } else c["oldIE" + e] = g;
                        a[f]("on" + e, c["oldIE" + e])
                    } else a[f]("on" + e, c)
        });
        var f = this,
            g = 25,
            h = 3,
            i = {
                allowPanToNext: !0,
                spacing: .12,
                bgOpacity: 1,
                mouseUsed: !1,
                loop: !0,
                pinchToClose: !0,
                closeOnScroll: !0,
                closeOnVerticalDrag: !0,
                verticalDragRange: .75,
                hideAnimationDuration: 333,
                showAnimationDuration: 333,
                showHideOpacity: !1,
                focus: !0,
                escKey: !0,
                arrowKeys: !0,
                mainScrollEndFriction: .35,
                panEndFriction: .35,
                isClickableElement: function(a) {
                    return "A" === a.tagName
                },
                getDoubleTapZoom: function(a, b) {
                    return a ? 1 : b.initialZoomLevel < .7 ? 1 : 1.33
                },
                maxSpreadZoom: 1.33,
                modal: !0,
                scaleMode: "fit"
            };
        e.extend(i, d);
        var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma = function() {
                return {
                    x: 0,
                    y: 0
                }
            },
            na = ma(),
            oa = ma(),
            pa = ma(),
            qa = {},
            ra = 0,
            sa = {},
            ta = ma(),
            ua = 0,
            va = !0,
            wa = [],
            xa = {},
            ya = !1,
            za = function(a, b) {
                e.extend(f, b.publicMethods), wa.push(a)
            },
            Aa = function(a) {
                var b = ac();
                return a > b - 1 ? a - b : a < 0 ? b + a : a
            },
            Ba = {},
            Ca = function(a, b) {
                return Ba[a] || (Ba[a] = []), Ba[a].push(b)
            },
            Da = function(a) {
                var b = Ba[a];
                if (b) {
                    var c = Array.prototype.slice.call(arguments);
                    c.shift();
                    for (var d = 0; d < b.length; d++) b[d].apply(f, c)
                }
            },
            Ea = function() {
                return (new Date).getTime()
            },
            Fa = function(a) {
                ja = a, f.bg.style.opacity = a * i.bgOpacity
            },
            Ga = function(a, b, c, d, e) {
                (!ya || e && e !== f.currItem) && (d /= e ? e.fitRatio : f.currItem.fitRatio), a[E] = u + b + "px, " + c + "px" + v + " scale(" + d + ")"
            },
            Ha = function(a) {
                ea && (a && (s > f.currItem.fitRatio ? ya || (mc(f.currItem, !1, !0), ya = !0) : ya && (mc(f.currItem), ya = !1)), Ga(ea, pa.x, pa.y, s))
            },
            Ia = function(a) {
                a.container && Ga(a.container.style, a.initialPosition.x, a.initialPosition.y, a.initialZoomLevel, a)
            },
            Ja = function(a, b) {
                b[E] = u + a + "px, 0px" + v
            },
            Ka = function(a, b) {
                if (!i.loop && b) {
                    var c = m + (ta.x * ra - a) / ta.x,
                        d = Math.round(a - tb.x);
                    (c < 0 && d > 0 || c >= ac() - 1 && d < 0) && (a = tb.x + d * i.mainScrollEndFriction)
                }
                tb.x = a, Ja(a, n)
            },
            La = function(a, b) {
                var c = ub[a] - sa[a];
                return oa[a] + na[a] + c - c * (b / t)
            },
            Ma = function(a, b) {
                a.x = b.x, a.y = b.y, b.id && (a.id = b.id)
            },
            Na = function(a) {
                a.x = Math.round(a.x), a.y = Math.round(a.y)
            },
            Oa = null,
            Pa = function() {
                Oa && (e.unbind(document, "mousemove", Pa), e.addClass(a, "pswp--has_mouse"), i.mouseUsed = !0, Da("mouseUsed")), Oa = setTimeout(function() {
                    Oa = null
                }, 100)
            },
            Qa = function() {
                e.bind(document, "keydown", f), N.transform && e.bind(f.scrollWrap, "click", f), i.mouseUsed || e.bind(document, "mousemove", Pa), e.bind(window, "resize scroll orientationchange", f), Da("bindEvents")
            },
            Ra = function() {
                e.unbind(window, "resize scroll orientationchange", f), e.unbind(window, "scroll", r.scroll), e.unbind(document, "keydown", f), e.unbind(document, "mousemove", Pa), N.transform && e.unbind(f.scrollWrap, "click", f), V && e.unbind(window, p, f), clearTimeout(O), Da("unbindEvents")
            },
            Sa = function(a, b) {
                var c = ic(f.currItem, qa, a);
                return b && (da = c), c
            },
            Ta = function(a) {
                return a || (a = f.currItem), a.initialZoomLevel
            },
            Ua = function(a) {
                return a || (a = f.currItem), a.w > 0 ? i.maxSpreadZoom : 1
            },
            Va = function(a, b, c, d) {
                return d === f.currItem.initialZoomLevel ? (c[a] = f.currItem.initialPosition[a], !0) : (c[a] = La(a, d), c[a] > b.min[a] ? (c[a] = b.min[a], !0) : c[a] < b.max[a] && (c[a] = b.max[a], !0))
            },
            Wa = function() {
                if (E) {
                    var b = N.perspective && !G;
                    return u = "translate" + (b ? "3d(" : "("), void(v = N.perspective ? ", 0px)" : ")")
                }
                E = "left", e.addClass(a, "pswp--ie"), Ja = function(a, b) {
                    b.left = a + "px"
                }, Ia = function(a) {
                    var b = a.fitRatio > 1 ? 1 : a.fitRatio,
                        c = a.container.style,
                        d = b * a.w,
                        e = b * a.h;
                    c.width = d + "px", c.height = e + "px", c.left = a.initialPosition.x + "px", c.top = a.initialPosition.y + "px"
                }, Ha = function() {
                    if (ea) {
                        var a = ea,
                            b = f.currItem,
                            c = b.fitRatio > 1 ? 1 : b.fitRatio,
                            d = c * b.w,
                            e = c * b.h;
                        a.width = d + "px", a.height = e + "px", a.left = pa.x + "px", a.top = pa.y + "px"
                    }
                }
            },
            Xa = function(a) {
                var b = "";
                i.escKey && 27 === a.keyCode ? b = "close" : i.arrowKeys && (37 === a.keyCode ? b = "prev" : 39 === a.keyCode && (b = "next")), b && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault ? a.preventDefault() : a.returnValue = !1, f[b]()))
            },
            Ya = function(a) {
                a && (Y || X || fa || T) && (a.preventDefault(), a.stopPropagation())
            },
            Za = function() {
                f.setScrollOffset(0, e.getScrollY())
            },
            $a = {},
            _a = 0,
            ab = function(a) {
                $a[a] && ($a[a].raf && I($a[a].raf), _a--, delete $a[a])
            },
            bb = function(a) {
                $a[a] && ab(a), $a[a] || (_a++, $a[a] = {})
            },
            cb = function() {
                for (var a in $a) $a.hasOwnProperty(a) && ab(a)
            },
            db = function(a, b, c, d, e, f, g) {
                var h, i = Ea();
                bb(a);
                var j = function() {
                    if ($a[a]) {
                        if (h = Ea() - i, h >= d) return ab(a), f(c), void(g && g());
                        f((c - b) * e(h / d) + b), $a[a].raf = H(j)
                    }
                };
                j()
            },
            eb = {
                shout: Da,
                listen: Ca,
                viewportSize: qa,
                options: i,
                isMainScrollAnimating: function() {
                    return fa
                },
                getZoomLevel: function() {
                    return s
                },
                getCurrentIndex: function() {
                    return m
                },
                isDragging: function() {
                    return V
                },
                isZooming: function() {
                    return aa
                },
                setScrollOffset: function(a, b) {
                    sa.x = a, M = sa.y = b, Da("updateScrollOffset", sa)
                },
                applyZoomPan: function(a, b, c, d) {
                    pa.x = b, pa.y = c, s = a, Ha(d)
                },
                init: function() {
                    if (!j && !k) {
                        var c;
                        f.framework = e, f.template = a, f.bg = e.getChildByClass(a, "pswp__bg"), J = a.className, j = !0, N = e.detectFeatures(), H = N.raf, I = N.caf, E = N.transform, L = N.oldIE, f.scrollWrap = e.getChildByClass(a, "pswp__scroll-wrap"), f.container = e.getChildByClass(f.scrollWrap, "pswp__container"), n = f.container.style, f.itemHolders = y = [{
                            el: f.container.children[0],
                            wrap: 0,
                            index: -1
                        }, {
                            el: f.container.children[1],
                            wrap: 0,
                            index: -1
                        }, {
                            el: f.container.children[2],
                            wrap: 0,
                            index: -1
                        }], y[0].el.style.display = y[2].el.style.display = "none", Wa(), r = {
                            resize: f.updateSize,
                            orientationchange: function() {
                                clearTimeout(O), O = setTimeout(function() {
                                    qa.x !== f.scrollWrap.clientWidth && f.updateSize()
                                }, 500)
                            },
                            scroll: Za,
                            keydown: Xa,
                            click: Ya
                        };
                        var d = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
                        for (N.animationName && N.transform && !d || (i.showAnimationDuration = i.hideAnimationDuration = 0), c = 0; c < wa.length; c++) f["init" + wa[c]]();
                        if (b) {
                            var g = f.ui = new b(f, e);
                            g.init()
                        }
                        Da("firstUpdate"), m = m || i.index || 0, (isNaN(m) || m < 0 || m >= ac()) && (m = 0), f.currItem = _b(m), (N.isOldIOSPhone || N.isOldAndroid) && (va = !1), a.setAttribute("aria-hidden", "false"), i.modal && (va ? a.style.position = "fixed" : (a.style.position = "absolute", a.style.top = e.getScrollY() + "px")), void 0 === M && (Da("initialLayout"), M = K = e.getScrollY());
                        var l = "pswp--open ";
                        for (i.mainClass && (l += i.mainClass + " "), i.showHideOpacity && (l += "pswp--animate_opacity "), l += G ? "pswp--touch" : "pswp--notouch", l += N.animationName ? " pswp--css_animation" : "", l += N.svg ? " pswp--svg" : "", e.addClass(a, l), f.updateSize(), o = -1, ua = null, c = 0; c < h; c++) Ja((c + o) * ta.x, y[c].el.style);
                        L || e.bind(f.scrollWrap, q, f), Ca("initialZoomInEnd", function() {
                            f.setContent(y[0], m - 1), f.setContent(y[2], m + 1), y[0].el.style.display = y[2].el.style.display = "block", i.focus && a.focus(), Qa()
                        }), f.setContent(y[1], m), f.updateCurrItem(), Da("afterInit"), va || (w = setInterval(function() {
                            _a || V || aa || s !== f.currItem.initialZoomLevel || f.updateSize()
                        }, 1e3)), e.addClass(a, "pswp--visible")
                    }
                },
                close: function() {
                    j && (j = !1, k = !0, Da("close"), Ra(), cc(f.currItem, null, !0, f.destroy))
                },
                destroy: function() {
                    Da("destroy"), Xb && clearTimeout(Xb), a.setAttribute("aria-hidden", "true"), a.className = J, w && clearInterval(w), e.unbind(f.scrollWrap, q, f), e.unbind(window, "scroll", f), zb(), cb(), Ba = null
                },
                panTo: function(a, b, c) {
                    c || (a > da.min.x ? a = da.min.x : a < da.max.x && (a = da.max.x), b > da.min.y ? b = da.min.y : b < da.max.y && (b = da.max.y)), pa.x = a, pa.y = b, Ha()
                },
                handleEvent: function(a) {
                    a = a || window.event, r[a.type] && r[a.type](a)
                },
                goTo: function(a) {
                    a = Aa(a);
                    var b = a - m;
                    ua = b, m = a, f.currItem = _b(m), ra -= b, Ka(ta.x * ra), cb(), fa = !1, f.updateCurrItem()
                },
                next: function() {
                    f.goTo(m + 1)
                },
                prev: function() {
                    f.goTo(m - 1)
                },
                updateCurrZoomItem: function(a) {
                    if (a && Da("beforeChange", 0), y[1].el.children.length) {
                        var b = y[1].el.children[0];
                        ea = e.hasClass(b, "pswp__zoom-wrap") ? b.style : null
                    } else ea = null;
                    da = f.currItem.bounds, t = s = f.currItem.initialZoomLevel, pa.x = da.center.x, pa.y = da.center.y, a && Da("afterChange")
                },
                invalidateCurrItems: function() {
                    x = !0;
                    for (var a = 0; a < h; a++) y[a].item && (y[a].item.needsUpdate = !0)
                },
                updateCurrItem: function(a) {
                    if (0 !== ua) {
                        var b, c = Math.abs(ua);
                        if (!(a && c < 2)) {
                            f.currItem = _b(m), ya = !1, Da("beforeChange", ua), c >= h && (o += ua + (ua > 0 ? -h : h), c = h);
                            for (var d = 0; d < c; d++) ua > 0 ? (b = y.shift(), y[h - 1] = b, o++, Ja((o + 2) * ta.x, b.el.style), f.setContent(b, m - c + d + 1 + 1)) : (b = y.pop(), y.unshift(b), o--, Ja(o * ta.x, b.el.style), f.setContent(b, m + c - d - 1 - 1));
                            if (ea && 1 === Math.abs(ua)) {
                                var e = _b(z);
                                e.initialZoomLevel !== s && (ic(e, qa), mc(e), Ia(e))
                            }
                            ua = 0, f.updateCurrZoomItem(), z = m, Da("afterChange")
                        }
                    }
                },
                updateSize: function(b) {
                    if (!va && i.modal) {
                        var c = e.getScrollY();
                        if (M !== c && (a.style.top = c + "px", M = c), !b && xa.x === window.innerWidth && xa.y === window.innerHeight) return;
                        xa.x = window.innerWidth, xa.y = window.innerHeight, a.style.height = xa.y + "px"
                    }
                    if (qa.x = f.scrollWrap.clientWidth, qa.y = f.scrollWrap.clientHeight, Za(), ta.x = qa.x + Math.round(qa.x * i.spacing), ta.y = qa.y, Ka(ta.x * ra), Da("beforeResize"), void 0 !== o) {
                        for (var d, g, j, k = 0; k < h; k++) d = y[k], Ja((k + o) * ta.x, d.el.style), j = m + k - 1, i.loop && ac() > 2 && (j = Aa(j)), g = _b(j), g && (x || g.needsUpdate || !g.bounds) ? (f.cleanSlide(g), f.setContent(d, j), 1 === k && (f.currItem = g, f.updateCurrZoomItem(!0)), g.needsUpdate = !1) : d.index === -1 && j >= 0 && f.setContent(d, j), g && g.container && (ic(g, qa), mc(g), Ia(g));
                        x = !1
                    }
                    t = s = f.currItem.initialZoomLevel, da = f.currItem.bounds, da && (pa.x = da.center.x, pa.y = da.center.y, Ha(!0)), Da("resize")
                },
                zoomTo: function(a, b, c, d, f) {
                    b && (t = s, ub.x = Math.abs(b.x) - pa.x, ub.y = Math.abs(b.y) - pa.y, Ma(oa, pa));
                    var g = Sa(a, !1),
                        h = {};
                    Va("x", g, h, a), Va("y", g, h, a);
                    var i = s,
                        j = {
                            x: pa.x,
                            y: pa.y
                        };
                    Na(h);
                    var k = function(b) {
                        1 === b ? (s = a, pa.x = h.x, pa.y = h.y) : (s = (a - i) * b + i, pa.x = (h.x - j.x) * b + j.x, pa.y = (h.y - j.y) * b + j.y), f && f(b), Ha(1 === b)
                    };
                    c ? db("customZoomTo", 0, 1, c, d || e.easing.sine.inOut, k) : k(1)
                }
            },
            fb = 30,
            gb = 10,
            hb = {},
            ib = {},
            jb = {},
            kb = {},
            lb = {},
            mb = [],
            nb = {},
            ob = [],
            pb = {},
            qb = 0,
            rb = ma(),
            sb = 0,
            tb = ma(),
            ub = ma(),
            vb = ma(),
            wb = function(a, b) {
                return a.x === b.x && a.y === b.y
            },
            xb = function(a, b) {
                return Math.abs(a.x - b.x) < g && Math.abs(a.y - b.y) < g
            },
            yb = function(a, b) {
                return pb.x = Math.abs(a.x - b.x), pb.y = Math.abs(a.y - b.y), Math.sqrt(pb.x * pb.x + pb.y * pb.y)
            },
            zb = function() {
                Z && (I(Z), Z = null)
            },
            Ab = function() {
                V && (Z = H(Ab), Qb())
            },
            Bb = function() {
                return !("fit" === i.scaleMode && s === f.currItem.initialZoomLevel)
            },
            Cb = function(a, b) {
                return !(!a || a === document) && (!(a.getAttribute("class") && a.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (b(a) ? a : Cb(a.parentNode, b)))
            },
            Db = {},
            Eb = function(a, b) {
                return Db.prevent = !Cb(a.target, i.isClickableElement), Da("preventDragEvent", a, b, Db), Db.prevent
            },
            Fb = function(a, b) {
                return b.x = a.pageX, b.y = a.pageY, b.id = a.identifier, b
            },
            Gb = function(a, b, c) {
                c.x = .5 * (a.x + b.x), c.y = .5 * (a.y + b.y)
            },
            Hb = function(a, b, c) {
                if (a - Q > 50) {
                    var d = ob.length > 2 ? ob.shift() : {};
                    d.x = b, d.y = c, ob.push(d), Q = a
                }
            },
            Ib = function() {
                var a = pa.y - f.currItem.initialPosition.y;
                return 1 - Math.abs(a / (qa.y / 2))
            },
            Jb = {},
            Kb = {},
            Lb = [],
            Mb = function(a) {
                for (; Lb.length > 0;) Lb.pop();
                return F ? (la = 0, mb.forEach(function(a) {
                    0 === la ? Lb[0] = a : 1 === la && (Lb[1] = a), la++
                })) : a.type.indexOf("touch") > -1 ? a.touches && a.touches.length > 0 && (Lb[0] = Fb(a.touches[0], Jb), a.touches.length > 1 && (Lb[1] = Fb(a.touches[1], Kb))) : (Jb.x = a.pageX, Jb.y = a.pageY, Jb.id = "", Lb[0] = Jb), Lb
            },
            Nb = function(a, b) {
                var c, d, e, g, h = 0,
                    j = pa[a] + b[a],
                    k = b[a] > 0,
                    l = tb.x + b.x,
                    m = tb.x - nb.x;
                return c = j > da.min[a] || j < da.max[a] ? i.panEndFriction : 1, j = pa[a] + b[a] * c, !i.allowPanToNext && s !== f.currItem.initialZoomLevel || (ea ? "h" !== ga || "x" !== a || X || (k ? (j > da.min[a] && (c = i.panEndFriction, h = da.min[a] - j, d = da.min[a] - oa[a]), (d <= 0 || m < 0) && ac() > 1 ? (g = l, m < 0 && l > nb.x && (g = nb.x)) : da.min.x !== da.max.x && (e = j)) : (j < da.max[a] && (c = i.panEndFriction, h = j - da.max[a], d = oa[a] - da.max[a]), (d <= 0 || m > 0) && ac() > 1 ? (g = l, m > 0 && l < nb.x && (g = nb.x)) : da.min.x !== da.max.x && (e = j))) : g = l, "x" !== a) ? void(fa || $ || s > f.currItem.fitRatio && (pa[a] += b[a] * c)) : (void 0 !== g && (Ka(g, !0), $ = g !== nb.x), da.min.x !== da.max.x && (void 0 !== e ? pa.x = e : $ || (pa.x += b.x * c)), void 0 !== g)
            },
            Ob = function(a) {
                if (!("mousedown" === a.type && a.button > 0)) {
                    if ($b) return void a.preventDefault();
                    if (!U || "mousedown" !== a.type) {
                        if (Eb(a, !0) && a.preventDefault(), Da("pointerDown"), F) {
                            var b = e.arraySearch(mb, a.pointerId, "id");
                            b < 0 && (b = mb.length), mb[b] = {
                                x: a.pageX,
                                y: a.pageY,
                                id: a.pointerId
                            }
                        }
                        var c = Mb(a),
                            d = c.length;
                        _ = null, cb(), V && 1 !== d || (V = ha = !0, e.bind(window, p, f), S = ka = ia = T = $ = Y = W = X = !1, ga = null, Da("firstTouchStart", c), Ma(oa, pa), na.x = na.y = 0, Ma(kb, c[0]), Ma(lb, kb), nb.x = ta.x * ra, ob = [{
                            x: kb.x,
                            y: kb.y
                        }], Q = P = Ea(), Sa(s, !0), zb(), Ab()), !aa && d > 1 && !fa && !$ && (t = s, X = !1, aa = W = !0, na.y = na.x = 0, Ma(oa, pa), Ma(hb, c[0]), Ma(ib, c[1]), Gb(hb, ib, vb), ub.x = Math.abs(vb.x) - pa.x, ub.y = Math.abs(vb.y) - pa.y, ba = ca = yb(hb, ib))
                    }
                }
            },
            Pb = function(a) {
                if (a.preventDefault(), F) {
                    var b = e.arraySearch(mb, a.pointerId, "id");
                    if (b > -1) {
                        var c = mb[b];
                        c.x = a.pageX, c.y = a.pageY
                    }
                }
                if (V) {
                    var d = Mb(a);
                    if (ga || Y || aa) _ = d;
                    else if (tb.x !== ta.x * ra) ga = "h";
                    else {
                        var f = Math.abs(d[0].x - kb.x) - Math.abs(d[0].y - kb.y);
                        Math.abs(f) >= gb && (ga = f > 0 ? "h" : "v", _ = d)
                    }
                }
            },
            Qb = function() {
                if (_) {
                    var a = _.length;
                    if (0 !== a)
                        if (Ma(hb, _[0]), jb.x = hb.x - kb.x, jb.y = hb.y - kb.y, aa && a > 1) {
                            if (kb.x = hb.x, kb.y = hb.y, !jb.x && !jb.y && wb(_[1], ib)) return;
                            Ma(ib, _[1]), X || (X = !0, Da("zoomGestureStarted"));
                            var b = yb(hb, ib),
                                c = Vb(b);
                            c > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (ka = !0);
                            var d = 1,
                                e = Ta(),
                                g = Ua();
                            if (c < e)
                                if (i.pinchToClose && !ka && t <= f.currItem.initialZoomLevel) {
                                    var h = e - c,
                                        j = 1 - h / (e / 1.2);
                                    Fa(j), Da("onPinchClose", j), ia = !0
                                } else d = (e - c) / e, d > 1 && (d = 1), c = e - d * (e / 3);
                            else c > g && (d = (c - g) / (6 * e), d > 1 && (d = 1), c = g + d * e);
                            d < 0 && (d = 0), ba = b, Gb(hb, ib, rb), na.x += rb.x - vb.x, na.y += rb.y - vb.y, Ma(vb, rb), pa.x = La("x", c), pa.y = La("y", c), S = c > s, s = c, Ha()
                        } else {
                            if (!ga) return;
                            if (ha && (ha = !1, Math.abs(jb.x) >= gb && (jb.x -= _[0].x - lb.x), Math.abs(jb.y) >= gb && (jb.y -= _[0].y - lb.y)), kb.x = hb.x, kb.y = hb.y, 0 === jb.x && 0 === jb.y) return;
                            if ("v" === ga && i.closeOnVerticalDrag && !Bb()) {
                                na.y += jb.y, pa.y += jb.y;
                                var k = Ib();
                                return T = !0, Da("onVerticalDrag", k), Fa(k), void Ha()
                            }
                            Hb(Ea(), hb.x, hb.y), Y = !0, da = f.currItem.bounds;
                            var l = Nb("x", jb);
                            l || (Nb("y", jb), Na(pa), Ha())
                        }
                }
            },
            Rb = function(a) {
                if (N.isOldAndroid) {
                    if (U && "mouseup" === a.type) return;
                    a.type.indexOf("touch") > -1 && (clearTimeout(U), U = setTimeout(function() {
                        U = 0
                    }, 600))
                }
                Da("pointerUp"), Eb(a, !1) && a.preventDefault();
                var b;
                if (F) {
                    var c = e.arraySearch(mb, a.pointerId, "id");
                    if (c > -1)
                        if (b = mb.splice(c, 1)[0], navigator.pointerEnabled) b.type = a.pointerType || "mouse";
                        else {
                            var d = {
                                4: "mouse",
                                2: "touch",
                                3: "pen"
                            };
                            b.type = d[a.pointerType], b.type || (b.type = a.pointerType || "mouse")
                        }
                }
                var g, h = Mb(a),
                    j = h.length;
                if ("mouseup" === a.type && (j = 0), 2 === j) return _ = null, !0;
                1 === j && Ma(lb, h[0]), 0 !== j || ga || fa || (b || ("mouseup" === a.type ? b = {
                    x: a.pageX,
                    y: a.pageY,
                    type: "mouse"
                } : a.changedTouches && a.changedTouches[0] && (b = {
                    x: a.changedTouches[0].pageX,
                    y: a.changedTouches[0].pageY,
                    type: "touch"
                })), Da("touchRelease", a, b));
                var k = -1;
                if (0 === j && (V = !1, e.unbind(window, p, f), zb(), aa ? k = 0 : sb !== -1 && (k = Ea() - sb)), sb = 1 === j ? Ea() : -1, g = k !== -1 && k < 150 ? "zoom" : "swipe", aa && j < 2 && (aa = !1, 1 === j && (g = "zoomPointerUp"), Da("zoomGestureEnded")), _ = null, Y || X || fa || T)
                    if (cb(), R || (R = Sb()), R.calculateSwipeSpeed("x"), T) {
                        var l = Ib();
                        if (l < i.verticalDragRange) f.close();
                        else {
                            var m = pa.y,
                                n = ja;
                            db("verticalDrag", 0, 1, 300, e.easing.cubic.out, function(a) {
                                pa.y = (f.currItem.initialPosition.y - m) * a + m, Fa((1 - n) * a + n), Ha()
                            }), Da("onVerticalDrag", 1)
                        }
                    } else {
                        if (($ || fa) && 0 === j) {
                            var o = Ub(g, R);
                            if (o) return;
                            g = "zoomPointerUp"
                        }
                        if (!fa) return "swipe" !== g ? void Wb() : void(!$ && s > f.currItem.fitRatio && Tb(R))
                    }
            },
            Sb = function() {
                var a, b, c = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function(d) {
                        ob.length > 1 ? (a = Ea() - Q + 50, b = ob[ob.length - 2][d]) : (a = Ea() - P, b = lb[d]), c.lastFlickOffset[d] = kb[d] - b, c.lastFlickDist[d] = Math.abs(c.lastFlickOffset[d]), c.lastFlickDist[d] > 20 ? c.lastFlickSpeed[d] = c.lastFlickOffset[d] / a : c.lastFlickSpeed[d] = 0, Math.abs(c.lastFlickSpeed[d]) < .1 && (c.lastFlickSpeed[d] = 0), c.slowDownRatio[d] = .95, c.slowDownRatioReverse[d] = 1 - c.slowDownRatio[d], c.speedDecelerationRatio[d] = 1
                    },
                    calculateOverBoundsAnimOffset: function(a, b) {
                        c.backAnimStarted[a] || (pa[a] > da.min[a] ? c.backAnimDestination[a] = da.min[a] : pa[a] < da.max[a] && (c.backAnimDestination[a] = da.max[a]), void 0 !== c.backAnimDestination[a] && (c.slowDownRatio[a] = .7, c.slowDownRatioReverse[a] = 1 - c.slowDownRatio[a], c.speedDecelerationRatioAbs[a] < .05 && (c.lastFlickSpeed[a] = 0, c.backAnimStarted[a] = !0, db("bounceZoomPan" + a, pa[a], c.backAnimDestination[a], b || 300, e.easing.sine.out, function(b) {
                            pa[a] = b, Ha()
                        }))))
                    },
                    calculateAnimOffset: function(a) {
                        c.backAnimStarted[a] || (c.speedDecelerationRatio[a] = c.speedDecelerationRatio[a] * (c.slowDownRatio[a] + c.slowDownRatioReverse[a] - c.slowDownRatioReverse[a] * c.timeDiff / 10), c.speedDecelerationRatioAbs[a] = Math.abs(c.lastFlickSpeed[a] * c.speedDecelerationRatio[a]), c.distanceOffset[a] = c.lastFlickSpeed[a] * c.speedDecelerationRatio[a] * c.timeDiff, pa[a] += c.distanceOffset[a])
                    },
                    panAnimLoop: function() {
                        if ($a.zoomPan && ($a.zoomPan.raf = H(c.panAnimLoop), c.now = Ea(), c.timeDiff = c.now - c.lastNow, c.lastNow = c.now, c.calculateAnimOffset("x"), c.calculateAnimOffset("y"), Ha(), c.calculateOverBoundsAnimOffset("x"), c.calculateOverBoundsAnimOffset("y"), c.speedDecelerationRatioAbs.x < .05 && c.speedDecelerationRatioAbs.y < .05)) return pa.x = Math.round(pa.x), pa.y = Math.round(pa.y), Ha(), void ab("zoomPan")
                    }
                };
                return c
            },
            Tb = function(a) {
                return a.calculateSwipeSpeed("y"), da = f.currItem.bounds, a.backAnimDestination = {}, a.backAnimStarted = {}, Math.abs(a.lastFlickSpeed.x) <= .05 && Math.abs(a.lastFlickSpeed.y) <= .05 ? (a.speedDecelerationRatioAbs.x = a.speedDecelerationRatioAbs.y = 0, a.calculateOverBoundsAnimOffset("x"), a.calculateOverBoundsAnimOffset("y"), !0) : (bb("zoomPan"), a.lastNow = Ea(), void a.panAnimLoop())
            },
            Ub = function(a, b) {
                var c;
                fa || (qb = m);
                var d;
                if ("swipe" === a) {
                    var g = kb.x - lb.x,
                        h = b.lastFlickDist.x < 10;
                    g > fb && (h || b.lastFlickOffset.x > 20) ? d = -1 : g < -fb && (h || b.lastFlickOffset.x < -20) && (d = 1)
                }
                var j;
                d && (m += d, m < 0 ? (m = i.loop ? ac() - 1 : 0, j = !0) : m >= ac() && (m = i.loop ? 0 : ac() - 1, j = !0), j && !i.loop || (ua += d, ra -= d, c = !0));
                var k, l = ta.x * ra,
                    n = Math.abs(l - tb.x);
                return c || l > tb.x == b.lastFlickSpeed.x > 0 ? (k = Math.abs(b.lastFlickSpeed.x) > 0 ? n / Math.abs(b.lastFlickSpeed.x) : 333, k = Math.min(k, 400), k = Math.max(k, 250)) : k = 333, qb === m && (c = !1), fa = !0, Da("mainScrollAnimStart"), db("mainScroll", tb.x, l, k, e.easing.cubic.out, Ka, function() {
                    cb(), fa = !1, qb = -1, (c || qb !== m) && f.updateCurrItem(), Da("mainScrollAnimComplete")
                }), c && f.updateCurrItem(!0), c
            },
            Vb = function(a) {
                return 1 / ca * a * t
            },
            Wb = function() {
                var a = s,
                    b = Ta(),
                    c = Ua();
                s < b ? a = b : s > c && (a = c);
                var d, g = 1,
                    h = ja;
                return ia && !S && !ka && s < b ? (f.close(), !0) : (ia && (d = function(a) {
                    Fa((g - h) * a + h)
                }), f.zoomTo(a, 0, 200, e.easing.cubic.out, d), !0)
            };
        za("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var a = function(a, b, c, d, e) {
                        A = a + b, B = a + c, C = a + d, D = e ? a + e : ""
                    };
                    F = N.pointerEvent, F && N.touch && (N.touch = !1), F ? navigator.pointerEnabled ? a("pointer", "down", "move", "up", "cancel") : a("MSPointer", "Down", "Move", "Up", "Cancel") : N.touch ? (a("touch", "start", "move", "end", "cancel"), G = !0) : a("mouse", "down", "move", "up"), p = B + " " + C + " " + D, q = A, F && !G && (G = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), f.likelyTouchDevice = G, r[A] = Ob, r[B] = Pb, r[C] = Rb, D && (r[D] = r[C]), N.touch && (q += " mousedown", p += " mousemove mouseup", r.mousedown = r[A], r.mousemove = r[B], r.mouseup = r[C]), G || (i.allowPanToNext = !1)
                }
            }
        });
        var Xb, Yb, Zb, $b, _b, ac, bc, cc = function(b, c, d, g) {
                Xb && clearTimeout(Xb), $b = !0, Zb = !0;
                var h;
                b.initialLayout ? (h = b.initialLayout, b.initialLayout = null) : h = i.getThumbBoundsFn && i.getThumbBoundsFn(m);
                var j = d ? i.hideAnimationDuration : i.showAnimationDuration,
                    k = function() {
                        ab("initialZoom"), d ? (f.template.removeAttribute("style"), f.bg.removeAttribute("style")) : (Fa(1), c && (c.style.display = "block"), e.addClass(a, "pswp--animated-in"), Da("initialZoom" + (d ? "OutEnd" : "InEnd"))), g && g(), $b = !1
                    };
                if (!j || !h || void 0 === h.x) return Da("initialZoom" + (d ? "Out" : "In")), s = b.initialZoomLevel, Ma(pa, b.initialPosition), Ha(), a.style.opacity = d ? 0 : 1, Fa(1), void(j ? setTimeout(function() {
                    k()
                }, j) : k());
                var n = function() {
                    var c = l,
                        g = !f.currItem.src || f.currItem.loadError || i.showHideOpacity;
                    b.miniImg && (b.miniImg.style.webkitBackfaceVisibility = "hidden"), d || (s = h.w / b.w, pa.x = h.x, pa.y = h.y - K, f[g ? "template" : "bg"].style.opacity = .001, Ha()), bb("initialZoom"), d && !c && e.removeClass(a, "pswp--animated-in"), g && (d ? e[(c ? "remove" : "add") + "Class"](a, "pswp--animate_opacity") : setTimeout(function() {
                        e.addClass(a, "pswp--animate_opacity")
                    }, 30)), Xb = setTimeout(function() {
                        if (Da("initialZoom" + (d ? "Out" : "In")), d) {
                            var f = h.w / b.w,
                                i = {
                                    x: pa.x,
                                    y: pa.y
                                },
                                l = s,
                                m = ja,
                                n = function(b) {
                                    1 === b ? (s = f, pa.x = h.x, pa.y = h.y - M) : (s = (f - l) * b + l, pa.x = (h.x - i.x) * b + i.x, pa.y = (h.y - M - i.y) * b + i.y), Ha(), g ? a.style.opacity = 1 - b : Fa(m - b * m)
                                };
                            c ? db("initialZoom", 0, 1, j, e.easing.cubic.out, n, k) : (n(1), Xb = setTimeout(k, j + 20))
                        } else s = b.initialZoomLevel, Ma(pa, b.initialPosition), Ha(), Fa(1), g ? a.style.opacity = 1 : Fa(1), Xb = setTimeout(k, j + 20)
                    }, d ? 25 : 90)
                };
                n()
            },
            dc = {},
            ec = [],
            fc = {
                index: 0,
                errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                forceProgressiveLoading: !1,
                preload: [1, 1],
                getNumItemsFn: function() {
                    return Yb.length
                }
            },
            gc = function() {
                return {
                    center: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    },
                    min: {
                        x: 0,
                        y: 0
                    }
                }
            },
            hc = function(a, b, c) {
                var d = a.bounds;
                d.center.x = Math.round((dc.x - b) / 2), d.center.y = Math.round((dc.y - c) / 2) + a.vGap.top, d.max.x = b > dc.x ? Math.round(dc.x - b) : d.center.x, d.max.y = c > dc.y ? Math.round(dc.y - c) + a.vGap.top : d.center.y, d.min.x = b > dc.x ? 0 : d.center.x, d.min.y = c > dc.y ? a.vGap.top : d.center.y
            },
            ic = function(a, b, c) {
                if (a.src && !a.loadError) {
                    var d = !c;
                    if (d && (a.vGap || (a.vGap = {
                            top: 0,
                            bottom: 0
                        }), Da("parseVerticalMargin", a)), dc.x = b.x, dc.y = b.y - a.vGap.top - a.vGap.bottom, d) {
                        var e = dc.x / a.w,
                            f = dc.y / a.h;
                        a.fitRatio = e < f ? e : f;
                        var g = i.scaleMode;
                        "orig" === g ? c = 1 : "fit" === g && (c = a.fitRatio), c > 1 && (c = 1), a.initialZoomLevel = c, a.bounds || (a.bounds = gc())
                    }
                    if (!c) return;
                    return hc(a, a.w * c, a.h * c), d && c === a.initialZoomLevel && (a.initialPosition = a.bounds.center), a.bounds
                }
                return a.w = a.h = 0, a.initialZoomLevel = a.fitRatio = 1, a.bounds = gc(), a.initialPosition = a.bounds.center, a.bounds
            },
            jc = function(a, b, c, d, e, g) {
                b.loadError || d && (b.imageAppended = !0, mc(b, d, b === f.currItem && ya), c.appendChild(d), g && setTimeout(function() {
                    b && b.loaded && b.placeholder && (b.placeholder.style.display = "none", b.placeholder = null)
                }, 500))
            },
            kc = function(a) {
                a.loading = !0, a.loaded = !1;
                var b = a.img = e.createEl("pswp__img", "img"),
                    c = function() {
                        a.loading = !1, a.loaded = !0, a.loadComplete ? a.loadComplete(a) : a.img = null, b.onload = b.onerror = null, b = null
                    };
                return b.onload = c, b.onerror = function() {
                    a.loadError = !0, c()
                }, b.src = a.src, b
            },
            lc = function(a, b) {
                if (a.src && a.loadError && a.container) return b && (a.container.innerHTML = ""), a.container.innerHTML = i.errorMsg.replace("%url%", a.src), !0
            },
            mc = function(a, b, c) {
                if (a.src) {
                    b || (b = a.container.lastChild);
                    var d = c ? a.w : Math.round(a.w * a.fitRatio),
                        e = c ? a.h : Math.round(a.h * a.fitRatio);
                    a.placeholder && !a.loaded && (a.placeholder.style.width = d + "px", a.placeholder.style.height = e + "px"), b.style.width = d + "px", b.style.height = e + "px"
                }
            },
            nc = function() {
                if (ec.length) {
                    for (var a, b = 0; b < ec.length; b++) a = ec[b], a.holder.index === a.index && jc(a.index, a.item, a.baseDiv, a.img, !1, a.clearPlaceholder);
                    ec = []
                }
            };
        za("Controller", {
            publicMethods: {
                lazyLoadItem: function(a) {
                    a = Aa(a);
                    var b = _b(a);
                    b && (!b.loaded && !b.loading || x) && (Da("gettingData", a, b), b.src && kc(b))
                },
                initController: function() {
                    e.extend(i, fc, !0), f.items = Yb = c, _b = f.getItemAt, ac = i.getNumItemsFn, bc = i.loop, ac() < 3 && (i.loop = !1), Ca("beforeChange", function(a) {
                        var b, c = i.preload,
                            d = null === a || a >= 0,
                            e = Math.min(c[0], ac()),
                            g = Math.min(c[1], ac());
                        for (b = 1; b <= (d ? g : e); b++) f.lazyLoadItem(m + b);
                        for (b = 1; b <= (d ? e : g); b++) f.lazyLoadItem(m - b)
                    }), Ca("initialLayout", function() {
                        f.currItem.initialLayout = i.getThumbBoundsFn && i.getThumbBoundsFn(m)
                    }), Ca("mainScrollAnimComplete", nc), Ca("initialZoomInEnd", nc), Ca("destroy", function() {
                        for (var a, b = 0; b < Yb.length; b++) a = Yb[b], a.container && (a.container = null), a.placeholder && (a.placeholder = null), a.img && (a.img = null), a.preloader && (a.preloader = null), a.loadError && (a.loaded = a.loadError = !1);
                        ec = null
                    })
                },
                getItemAt: function(a) {
                    return a >= 0 && (void 0 !== Yb[a] && Yb[a])
                },
                allowProgressiveImg: function() {
                    return i.forceProgressiveLoading || !G || i.mouseUsed || screen.width > 1200
                },
                setContent: function(a, b) {
                    i.loop && (b = Aa(b));
                    var c = f.getItemAt(a.index);
                    c && (c.container = null);
                    var d, g = f.getItemAt(b);
                    if (!g) return void(a.el.innerHTML = "");
                    Da("gettingData", b, g), a.index = b, a.item = g;
                    var h = g.container = e.createEl("pswp__zoom-wrap");
                    if (!g.src && g.html && (g.html.tagName ? h.appendChild(g.html) : h.innerHTML = g.html), lc(g), ic(g, qa), !g.src || g.loadError || g.loaded) g.src && !g.loadError && (d = e.createEl("pswp__img", "img"), d.style.opacity = 1, d.src = g.src, mc(g, d), jc(b, g, h, d, !0));
                    else {
                        if (g.loadComplete = function(c) {
                                if (j) {
                                    if (a && a.index === b) {
                                        if (lc(c, !0)) return c.loadComplete = c.img = null, ic(c, qa), Ia(c), void(a.index === m && f.updateCurrZoomItem());
                                        c.imageAppended ? !$b && c.placeholder && (c.placeholder.style.display = "none", c.placeholder = null) : N.transform && (fa || $b) ? ec.push({
                                            item: c,
                                            baseDiv: h,
                                            img: c.img,
                                            index: b,
                                            holder: a,
                                            clearPlaceholder: !0
                                        }) : jc(b, c, h, c.img, fa || $b, !0)
                                    }
                                    c.loadComplete = null, c.img = null, Da("imageLoadComplete", b, c)
                                }
                            }, e.features.transform) {
                            var k = "pswp__img pswp__img--placeholder";
                            k += g.msrc ? "" : " pswp__img--placeholder--blank";
                            var l = e.createEl(k, g.msrc ? "img" : "");
                            g.msrc && (l.src = g.msrc), mc(g, l), h.appendChild(l), g.placeholder = l
                        }
                        g.loading || kc(g), f.allowProgressiveImg() && (!Zb && N.transform ? ec.push({
                            item: g,
                            baseDiv: h,
                            img: g.img,
                            index: b,
                            holder: a
                        }) : jc(b, g, h, g.img, !0, !0))
                    }
                    Zb || b !== m ? Ia(g) : (ea = h.style, cc(g, d || g.img)), a.el.innerHTML = "", a.el.appendChild(h)
                },
                cleanSlide: function(a) {
                    a.img && (a.img.onload = a.img.onerror = null), a.loaded = a.loading = a.img = a.imageAppended = !1
                }
            }
        });
        var oc, pc = {},
            qc = function(a, b, c) {
                var d = document.createEvent("CustomEvent"),
                    e = {
                        origEvent: a,
                        target: a.target,
                        releasePoint: b,
                        pointerType: c || "touch"
                    };
                d.initCustomEvent("pswpTap", !0, !0, e), a.target.dispatchEvent(d)
            };
        za("Tap", {
            publicMethods: {
                initTap: function() {
                    Ca("firstTouchStart", f.onTapStart), Ca("touchRelease", f.onTapRelease), Ca("destroy", function() {
                        pc = {}, oc = null
                    })
                },
                onTapStart: function(a) {
                    a.length > 1 && (clearTimeout(oc), oc = null)
                },
                onTapRelease: function(a, b) {
                    if (b && !Y && !W && !_a) {
                        var c = b;
                        if (oc && (clearTimeout(oc), oc = null, xb(c, pc))) return void Da("doubleTap", c);
                        if ("mouse" === b.type) return void qc(a, b, "mouse");
                        var d = a.target.tagName.toUpperCase();
                        if ("BUTTON" === d || e.hasClass(a.target, "pswp__single-tap")) return void qc(a, b);
                        Ma(pc, c), oc = setTimeout(function() {
                            qc(a, b), oc = null
                        }, 300)
                    }
                }
            }
        });
        var rc;
        za("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    L || (G ? Ca("mouseUsed", function() {
                        f.setupDesktopZoom()
                    }) : f.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(b) {
                    rc = {};
                    var c = "wheel mousewheel DOMMouseScroll";
                    Ca("bindEvents", function() {
                        e.bind(a, c, f.handleMouseWheel)
                    }), Ca("unbindEvents", function() {
                        rc && e.unbind(a, c, f.handleMouseWheel)
                    }), f.mouseZoomedIn = !1;
                    var d, g = function() {
                            f.mouseZoomedIn && (e.removeClass(a, "pswp--zoomed-in"), f.mouseZoomedIn = !1), s < 1 ? e.addClass(a, "pswp--zoom-allowed") : e.removeClass(a, "pswp--zoom-allowed"), h()
                        },
                        h = function() {
                            d && (e.removeClass(a, "pswp--dragging"), d = !1)
                        };
                    Ca("resize", g), Ca("afterChange", g), Ca("pointerDown", function() {
                        f.mouseZoomedIn && (d = !0, e.addClass(a, "pswp--dragging"))
                    }), Ca("pointerUp", h), b || g()
                },
                handleMouseWheel: function(a) {
                    if (s <= f.currItem.fitRatio) return i.modal && (!i.closeOnScroll || _a || V ? a.preventDefault() : E && Math.abs(a.deltaY) > 2 && (l = !0, f.close())), !0;
                    if (a.stopPropagation(), rc.x = 0, "deltaX" in a) 1 === a.deltaMode ? (rc.x = 18 * a.deltaX, rc.y = 18 * a.deltaY) : (rc.x = a.deltaX, rc.y = a.deltaY);
                    else if ("wheelDelta" in a) a.wheelDeltaX && (rc.x = -.16 * a.wheelDeltaX), a.wheelDeltaY ? rc.y = -.16 * a.wheelDeltaY : rc.y = -.16 * a.wheelDelta;
                    else {
                        if (!("detail" in a)) return;
                        rc.y = a.detail
                    }
                    Sa(s, !0);
                    var b = pa.x - rc.x,
                        c = pa.y - rc.y;
                    (i.modal || b <= da.min.x && b >= da.max.x && c <= da.min.y && c >= da.max.y) && a.preventDefault(), f.panTo(b, c)
                },
                toggleDesktopZoom: function(b) {
                    b = b || {
                        x: qa.x / 2 + sa.x,
                        y: qa.y / 2 + sa.y
                    };
                    var c = i.getDoubleTapZoom(!0, f.currItem),
                        d = s === c;
                    f.mouseZoomedIn = !d, f.zoomTo(d ? f.currItem.initialZoomLevel : c, b, 333), e[(d ? "remove" : "add") + "Class"](a, "pswp--zoomed-in")
                }
            }
        });
        var sc, tc, uc, vc, wc, xc, yc, zc, Ac, Bc, Cc, Dc, Ec = {
                history: !0,
                galleryUID: 1
            },
            Fc = function() {
                return Cc.hash.substring(1)
            },
            Gc = function() {
                sc && clearTimeout(sc), uc && clearTimeout(uc)
            },
            Hc = function() {
                var a = Fc(),
                    b = {};
                if (a.length < 5) return b;
                var c, d = a.split("&");
                for (c = 0; c < d.length; c++)
                    if (d[c]) {
                        var e = d[c].split("=");
                        e.length < 2 || (b[e[0]] = e[1])
                    }
                if (i.galleryPIDs) {
                    var f = b.pid;
                    for (b.pid = 0, c = 0; c < Yb.length; c++)
                        if (Yb[c].pid === f) {
                            b.pid = c;
                            break
                        }
                } else b.pid = parseInt(b.pid, 10) - 1;
                return b.pid < 0 && (b.pid = 0), b
            },
            Ic = function() {
                if (uc && clearTimeout(uc), _a || V) return void(uc = setTimeout(Ic, 500));
                vc ? clearTimeout(tc) : vc = !0;
                var a = m + 1,
                    b = _b(m);
                b.hasOwnProperty("pid") && (a = b.pid);
                var c = yc + "&gid=" + i.galleryUID + "&pid=" + a;
                zc || Cc.hash.indexOf(c) === -1 && (Bc = !0);
                var d = Cc.href.split("#")[0] + "#" + c;
                Dc ? "#" + c !== window.location.hash && history[zc ? "replaceState" : "pushState"]("", document.title, d) : zc ? Cc.replace(d) : Cc.hash = c, zc = !0, tc = setTimeout(function() {
                    vc = !1
                }, 60)
            };
        za("History", {
            publicMethods: {
                initHistory: function() {
                    if (e.extend(i, Ec, !0), i.history) {
                        Cc = window.location, Bc = !1, Ac = !1, zc = !1, yc = Fc(), Dc = "pushState" in history, yc.indexOf("gid=") > -1 && (yc = yc.split("&gid=")[0], yc = yc.split("?gid=")[0]), Ca("afterChange", f.updateURL), Ca("unbindEvents", function() {
                            e.unbind(window, "hashchange", f.onHashChange)
                        });
                        var a = function() {
                            xc = !0, Ac || (Bc ? history.back() : yc ? Cc.hash = yc : Dc ? history.pushState("", document.title, Cc.pathname + Cc.search) : Cc.hash = ""), Gc()
                        };
                        Ca("unbindEvents", function() {
                            l && a()
                        }), Ca("destroy", function() {
                            xc || a()
                        }), Ca("firstUpdate", function() {
                            m = Hc().pid
                        });
                        var b = yc.indexOf("pid=");
                        b > -1 && (yc = yc.substring(0, b), "&" === yc.slice(-1) && (yc = yc.slice(0, -1))), setTimeout(function() {
                            j && e.bind(window, "hashchange", f.onHashChange)
                        }, 40)
                    }
                },
                onHashChange: function() {
                    return Fc() === yc ? (Ac = !0, void f.close()) : void(vc || (wc = !0, f.goTo(Hc().pid), wc = !1))
                },
                updateURL: function() {
                    Gc(), wc || (zc ? sc = setTimeout(Ic, 800) : Ic())
                }
            }
        }), e.extend(f, eb)
    };
    return a
});

/*! 
 * PhotoSwipe Default UI - 4.1.2 - 2017-04-05
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipeUI_Default = b()
}(this, function() {
    "use strict";
    var a = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = this,
            w = !1,
            x = !0,
            y = !0,
            z = {
                barsSize: {
                    top: 44,
                    bottom: "auto"
                },
                closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                timeToIdle: 4e3,
                timeToIdleOutside: 1e3,
                loadingIndicatorDelay: 1e3,
                addCaptionHTMLFn: function(a, b) {
                    return a.title ? (b.children[0].innerHTML = a.title, !0) : (b.children[0].innerHTML = "", !1)
                },
                closeEl: !0,
                captionEl: !0,
                fullscreenEl: !0,
                zoomEl: !0,
                shareEl: !0,
                counterEl: !0,
                arrowEl: !0,
                preloaderEl: !0,
                tapToClose: !1,
                tapToToggleControls: !0,
                clickToCloseNonZoomable: !0,
                shareButtons: [{
                    id: "facebook",
                    label: "Share on Facebook",
                    url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                }, {
                    id: "twitter",
                    label: "Tweet",
                    url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                }, {
                    id: "pinterest",
                    label: "Pin it",
                    url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                }, {
                    id: "download",
                    label: "Download image",
                    url: "{{raw_image_url}}",
                    download: !0
                }],
                getImageURLForShare: function() {
                    return a.currItem.src || ""
                },
                getPageURLForShare: function() {
                    return window.location.href
                },
                getTextForShare: function() {
                    return a.currItem.title || ""
                },
                indexIndicatorSep: " / ",
                fitControlsWidth: 1200
            },
            A = function(a) {
                if (r) return !0;
                a = a || window.event, q.timeToIdle && q.mouseUsed && !k && K();
                for (var c, d, e = a.target || a.srcElement, f = e.getAttribute("class") || "", g = 0; g < S.length; g++) c = S[g], c.onTap && f.indexOf("pswp__" + c.name) > -1 && (c.onTap(), d = !0);
                if (d) {
                    a.stopPropagation && a.stopPropagation(), r = !0;
                    var h = b.features.isOldAndroid ? 600 : 30;
                    s = setTimeout(function() {
                        r = !1
                    }, h)
                }
            },
            B = function() {
                return !a.likelyTouchDevice || q.mouseUsed || screen.width > q.fitControlsWidth
            },
            C = function(a, c, d) {
                b[(d ? "add" : "remove") + "Class"](a, "pswp__" + c)
            },
            D = function() {
                var a = 1 === q.getNumItemsFn();
                a !== p && (C(d, "ui--one-slide", a), p = a)
            },
            E = function() {
                C(i, "share-modal--hidden", y)
            },
            F = function() {
                return y = !y, y ? (b.removeClass(i, "pswp__share-modal--fade-in"), setTimeout(function() {
                    y && E()
                }, 300)) : (E(), setTimeout(function() {
                    y || b.addClass(i, "pswp__share-modal--fade-in")
                }, 30)), y || H(), !1
            },
            G = function(b) {
                b = b || window.event;
                var c = b.target || b.srcElement;
                return a.shout("shareLinkClick", b, c), !!c.href && (!!c.hasAttribute("download") || (window.open(c.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), y || F(), !1))
            },
            H = function() {
                for (var a, b, c, d, e, f = "", g = 0; g < q.shareButtons.length; g++) a = q.shareButtons[g], c = q.getImageURLForShare(a), d = q.getPageURLForShare(a), e = q.getTextForShare(a), b = a.url.replace("{{url}}", encodeURIComponent(d)).replace("{{image_url}}", encodeURIComponent(c)).replace("{{raw_image_url}}", c).replace("{{text}}", encodeURIComponent(e)), f += '<a href="' + b + '" target="_blank" class="pswp__share--' + a.id + '"' + (a.download ? "download" : "") + ">" + a.label + "</a>", q.parseShareButtonOut && (f = q.parseShareButtonOut(a, f));
                i.children[0].innerHTML = f, i.children[0].onclick = G
            },
            I = function(a) {
                for (var c = 0; c < q.closeElClasses.length; c++)
                    if (b.hasClass(a, "pswp__" + q.closeElClasses[c])) return !0
            },
            J = 0,
            K = function() {
                clearTimeout(u), J = 0, k && v.setIdle(!1)
            },
            L = function(a) {
                a = a ? a : window.event;
                var b = a.relatedTarget || a.toElement;
                b && "HTML" !== b.nodeName || (clearTimeout(u), u = setTimeout(function() {
                    v.setIdle(!0)
                }, q.timeToIdleOutside))
            },
            M = function() {
                q.fullscreenEl && !b.features.isOldAndroid && (c || (c = v.getFullscreenAPI()), c ? (b.bind(document, c.eventK, v.updateFullscreen), v.updateFullscreen(), b.addClass(a.template, "pswp--supports-fs")) : b.removeClass(a.template, "pswp--supports-fs"))
            },
            N = function() {
                q.preloaderEl && (O(!0), l("beforeChange", function() {
                    clearTimeout(o), o = setTimeout(function() {
                        a.currItem && a.currItem.loading ? (!a.allowProgressiveImg() || a.currItem.img && !a.currItem.img.naturalWidth) && O(!1) : O(!0)
                    }, q.loadingIndicatorDelay)
                }), l("imageLoadComplete", function(b, c) {
                    a.currItem === c && O(!0)
                }))
            },
            O = function(a) {
                n !== a && (C(m, "preloader--active", !a), n = a)
            },
            P = function(a) {
                var c = a.vGap;
                if (B()) {
                    var g = q.barsSize;
                    if (q.captionEl && "auto" === g.bottom)
                        if (f || (f = b.createEl("pswp__caption pswp__caption--fake"), f.appendChild(b.createEl("pswp__caption__center")), d.insertBefore(f, e), b.addClass(d, "pswp__ui--fit")), q.addCaptionHTMLFn(a, f, !0)) {
                            var h = f.clientHeight;
                            c.bottom = parseInt(h, 10) || 44
                        } else c.bottom = g.top;
                    else c.bottom = "auto" === g.bottom ? 0 : g.bottom;
                    c.top = g.top
                } else c.top = c.bottom = 0
            },
            Q = function() {
                q.timeToIdle && l("mouseUsed", function() {
                    b.bind(document, "mousemove", K), b.bind(document, "mouseout", L), t = setInterval(function() {
                        J++, 2 === J && v.setIdle(!0)
                    }, q.timeToIdle / 2)
                })
            },
            R = function() {
                l("onVerticalDrag", function(a) {
                    x && a < .95 ? v.hideControls() : !x && a >= .95 && v.showControls()
                });
                var a;
                l("onPinchClose", function(b) {
                    x && b < .9 ? (v.hideControls(), a = !0) : a && !x && b > .9 && v.showControls()
                }), l("zoomGestureEnded", function() {
                    a = !1, a && !x && v.showControls()
                })
            },
            S = [{
                name: "caption",
                option: "captionEl",
                onInit: function(a) {
                    e = a
                }
            }, {
                name: "share-modal",
                option: "shareEl",
                onInit: function(a) {
                    i = a
                },
                onTap: function() {
                    F()
                }
            }, {
                name: "button--share",
                option: "shareEl",
                onInit: function(a) {
                    h = a
                },
                onTap: function() {
                    F()
                }
            }, {
                name: "button--zoom",
                option: "zoomEl",
                onTap: a.toggleDesktopZoom
            }, {
                name: "counter",
                option: "counterEl",
                onInit: function(a) {
                    g = a
                }
            }, {
                name: "button--close",
                option: "closeEl",
                onTap: a.close
            }, {
                name: "button--arrow--left",
                option: "arrowEl",
                onTap: a.prev
            }, {
                name: "button--arrow--right",
                option: "arrowEl",
                onTap: a.next
            }, {
                name: "button--fs",
                option: "fullscreenEl",
                onTap: function() {
                    c.isFullscreen() ? c.exit() : c.enter()
                }
            }, {
                name: "preloader",
                option: "preloaderEl",
                onInit: function(a) {
                    m = a
                }
            }],
            T = function() {
                var a, c, e, f = function(d) {
                    if (d)
                        for (var f = d.length, g = 0; g < f; g++) {
                            a = d[g], c = a.className;
                            for (var h = 0; h < S.length; h++) e = S[h], c.indexOf("pswp__" + e.name) > -1 && (q[e.option] ? (b.removeClass(a, "pswp__element--disabled"), e.onInit && e.onInit(a)) : b.addClass(a, "pswp__element--disabled"))
                        }
                };
                f(d.children);
                var g = b.getChildByClass(d, "pswp__top-bar");
                g && f(g.children)
            };
        v.init = function() {
            b.extend(a.options, z, !0), q = a.options, d = b.getChildByClass(a.scrollWrap, "pswp__ui"), l = a.listen, R(), l("beforeChange", v.update), l("doubleTap", function(b) {
                var c = a.currItem.initialZoomLevel;
                a.getZoomLevel() !== c ? a.zoomTo(c, b, 333) : a.zoomTo(q.getDoubleTapZoom(!1, a.currItem), b, 333)
            }), l("preventDragEvent", function(a, b, c) {
                var d = a.target || a.srcElement;
                d && d.getAttribute("class") && a.type.indexOf("mouse") > -1 && (d.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(d.tagName)) && (c.prevent = !1)
            }), l("bindEvents", function() {
                b.bind(d, "pswpTap click", A), b.bind(a.scrollWrap, "pswpTap", v.onGlobalTap), a.likelyTouchDevice || b.bind(a.scrollWrap, "mouseover", v.onMouseOver)
            }), l("unbindEvents", function() {
                y || F(), t && clearInterval(t), b.unbind(document, "mouseout", L), b.unbind(document, "mousemove", K), b.unbind(d, "pswpTap click", A), b.unbind(a.scrollWrap, "pswpTap", v.onGlobalTap), b.unbind(a.scrollWrap, "mouseover", v.onMouseOver), c && (b.unbind(document, c.eventK, v.updateFullscreen), c.isFullscreen() && (q.hideAnimationDuration = 0, c.exit()), c = null)
            }), l("destroy", function() {
                q.captionEl && (f && d.removeChild(f), b.removeClass(e, "pswp__caption--empty")), i && (i.children[0].onclick = null), b.removeClass(d, "pswp__ui--over-close"), b.addClass(d, "pswp__ui--hidden"), v.setIdle(!1)
            }), q.showAnimationDuration || b.removeClass(d, "pswp__ui--hidden"), l("initialZoomIn", function() {
                q.showAnimationDuration && b.removeClass(d, "pswp__ui--hidden")
            }), l("initialZoomOut", function() {
                b.addClass(d, "pswp__ui--hidden")
            }), l("parseVerticalMargin", P), T(), q.shareEl && h && i && (y = !0), D(), Q(), M(), N()
        }, v.setIdle = function(a) {
            k = a, C(d, "ui--idle", a)
        }, v.update = function() {
            x && a.currItem ? (v.updateIndexIndicator(), q.captionEl && (q.addCaptionHTMLFn(a.currItem, e), C(e, "caption--empty", !a.currItem.title)), w = !0) : w = !1, y || F(), D()
        }, v.updateFullscreen = function(d) {
            d && setTimeout(function() {
                a.setScrollOffset(0, b.getScrollY())
            }, 50), b[(c.isFullscreen() ? "add" : "remove") + "Class"](a.template, "pswp--fs")
        }, v.updateIndexIndicator = function() {
            q.counterEl && (g.innerHTML = a.getCurrentIndex() + 1 + q.indexIndicatorSep + q.getNumItemsFn())
        }, v.onGlobalTap = function(c) {
            c = c || window.event;
            var d = c.target || c.srcElement;
            if (!r)
                if (c.detail && "mouse" === c.detail.pointerType) {
                    if (I(d)) return void a.close();
                    b.hasClass(d, "pswp__img") && (1 === a.getZoomLevel() && a.getZoomLevel() <= a.currItem.fitRatio ? q.clickToCloseNonZoomable && a.close() : a.toggleDesktopZoom(c.detail.releasePoint))
                } else if (q.tapToToggleControls && (x ? v.hideControls() : v.showControls()), q.tapToClose && (b.hasClass(d, "pswp__img") || I(d))) return void a.close()
        }, v.onMouseOver = function(a) {
            a = a || window.event;
            var b = a.target || a.srcElement;
            C(d, "ui--over-close", I(b))
        }, v.hideControls = function() {
            b.addClass(d, "pswp__ui--hidden"), x = !1
        }, v.showControls = function() {
            x = !0, w || v.update(), b.removeClass(d, "pswp__ui--hidden")
        }, v.supportsFullscreen = function() {
            var a = document;
            return !!(a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen || a.msExitFullscreen)
        }, v.getFullscreenAPI = function() {
            var b, c = document.documentElement,
                d = "fullscreenchange";
            return c.requestFullscreen ? b = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: d
            } : c.mozRequestFullScreen ? b = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + d
            } : c.webkitRequestFullscreen ? b = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + d
            } : c.msRequestFullscreen && (b = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }), b && (b.enter = function() {
                return j = q.closeOnScroll, q.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK ? a.template[this.enterK]() : void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }, b.exit = function() {
                return q.closeOnScroll = j, document[this.exitK]()
            }, b.isFullscreen = function() {
                return document[this.elementK]
            }), b
        }
    };
    return a
});

/*! 
 * skrollr 0.6.30 (2015-08-12)
 */

! function(a, b, c) {
    "use strict";

    function d(c) {
        if (e = b.documentElement, f = b.body, T(), ha = this, c = c || {}, ma = c.constants || {}, c.easing)
            for (var d in c.easing) W[d] = c.easing[d];
        ta = c.edgeStrategy || "set", ka = {
            beforerender: c.beforerender,
            render: c.render,
            keyframe: c.keyframe
        }, la = c.forceHeight !== !1, la && (Ka = c.scale || 1), na = c.mobileDeceleration || y, pa = c.smoothScrolling !== !1, qa = c.smoothScrollingDuration || A, ra = {
            targetTop: ha.getScrollTop()
        }, Sa = (c.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || a.opera)
        })(), Sa ? (ja = b.getElementById(c.skrollrBody || z), ja && ga(), X(), Ea(e, [s, v], [t])) : Ea(e, [s, u], [t]), ha.refresh(), wa(a, "resize orientationchange", function() {
            var a = e.clientWidth,
                b = e.clientHeight;
            (b !== Pa || a !== Oa) && (Pa = b, Oa = a, Qa = !0)
        });
        var g = U();
        return function h() {
            $(), va = g(h)
        }(), ha
    }
    var e, f, g = {
            get: function() {
                return ha
            },
            init: function(a) {
                return ha || new d(a)
            },
            VERSION: "0.6.30"
        },
        h = Object.prototype.hasOwnProperty,
        i = a.Math,
        j = a.getComputedStyle,
        k = "touchstart",
        l = "touchmove",
        m = "touchcancel",
        n = "touchend",
        o = "skrollable",
        p = o + "-before",
        q = o + "-between",
        r = o + "-after",
        s = "skrollr",
        t = "no-" + s,
        u = s + "-desktop",
        v = s + "-mobile",
        w = "linear",
        x = 1e3,
        y = .004,
        z = "skrollr-body",
        A = 200,
        B = "start",
        C = "end",
        D = "center",
        E = "bottom",
        F = "___skrollable_id",
        G = /^(?:input|textarea|button|select)$/i,
        H = /^\s+|\s+$/g,
        I = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
        J = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
        K = /^(@?[a-z\-]+)\[(\w+)\]$/,
        L = /-([a-z0-9_])/g,
        M = function(a, b) {
            return b.toUpperCase()
        },
        N = /[\-+]?[\d]*\.?[\d]+/g,
        O = /\{\?\}/g,
        P = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        Q = /[a-z\-]+-gradient/g,
        R = "",
        S = "",
        T = function() {
            var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (j) {
                var b = j(f, null);
                for (var c in b)
                    if (R = c.match(a) || +c == c && b[c].match(a)) break;
                if (!R) return void(R = S = "");
                R = R[0], "-" === R.slice(0, 1) ? (S = R, R = {
                    "-webkit-": "webkit",
                    "-moz-": "Moz",
                    "-ms-": "ms",
                    "-o-": "O"
                }[R]) : S = "-" + R.toLowerCase() + "-"
            }
        },
        U = function() {
            var b = a.requestAnimationFrame || a[R.toLowerCase() + "RequestAnimationFrame"],
                c = Ha();
            return (Sa || !b) && (b = function(b) {
                var d = Ha() - c,
                    e = i.max(0, 1e3 / 60 - d);
                return a.setTimeout(function() {
                    c = Ha(), b()
                }, e)
            }), b
        },
        V = function() {
            var b = a.cancelAnimationFrame || a[R.toLowerCase() + "CancelAnimationFrame"];
            return (Sa || !b) && (b = function(b) {
                return a.clearTimeout(b)
            }), b
        },
        W = {
            begin: function() {
                return 0
            },
            end: function() {
                return 1
            },
            linear: function(a) {
                return a
            },
            quadratic: function(a) {
                return a * a
            },
            cubic: function(a) {
                return a * a * a
            },
            swing: function(a) {
                return -i.cos(a * i.PI) / 2 + .5
            },
            sqrt: function(a) {
                return i.sqrt(a)
            },
            outCubic: function(a) {
                return i.pow(a - 1, 3) + 1
            },
            bounce: function(a) {
                var b;
                if (.5083 >= a) b = 3;
                else if (.8489 >= a) b = 9;
                else if (.96208 >= a) b = 27;
                else {
                    if (!(.99981 >= a)) return 1;
                    b = 91
                }
                return 1 - i.abs(3 * i.cos(a * b * 1.028) / b)
            }
        };
    d.prototype.refresh = function(a) {
        var d, e, f = !1;
        for (a === c ? (f = !0, ia = [], Ra = 0, a = b.getElementsByTagName("*")) : a.length === c && (a = [a]), d = 0, e = a.length; e > d; d++) {
            var g = a[d],
                h = g,
                i = [],
                j = pa,
                k = ta,
                l = !1;
            if (f && F in g && delete g[F], g.attributes) {
                for (var m = 0, n = g.attributes.length; n > m; m++) {
                    var p = g.attributes[m];
                    if ("data-anchor-target" !== p.name)
                        if ("data-smooth-scrolling" !== p.name)
                            if ("data-edge-strategy" !== p.name)
                                if ("data-emit-events" !== p.name) {
                                    var q = p.name.match(I);
                                    if (null !== q) {
                                        var r = {
                                            props: p.value,
                                            element: g,
                                            eventType: p.name.replace(L, M)
                                        };
                                        i.push(r);
                                        var s = q[1];
                                        s && (r.constant = s.substr(1));
                                        var t = q[2];
                                        /p$/.test(t) ? (r.isPercentage = !0, r.offset = (0 | t.slice(0, -1)) / 100) : r.offset = 0 | t;
                                        var u = q[3],
                                            v = q[4] || u;
                                        u && u !== B && u !== C ? (r.mode = "relative", r.anchors = [u, v]) : (r.mode = "absolute", u === C ? r.isEnd = !0 : r.isPercentage || (r.offset = r.offset * Ka))
                                    }
                                } else l = !0;
                    else k = p.value;
                    else j = "off" !== p.value;
                    else if (h = b.querySelector(p.value), null === h) throw 'Unable to find anchor target "' + p.value + '"'
                }
                if (i.length) {
                    var w, x, y;
                    !f && F in g ? (y = g[F], w = ia[y].styleAttr, x = ia[y].classAttr) : (y = g[F] = Ra++, w = g.style.cssText, x = Da(g)), ia[y] = {
                        element: g,
                        styleAttr: w,
                        classAttr: x,
                        anchorTarget: h,
                        keyFrames: i,
                        smoothScrolling: j,
                        edgeStrategy: k,
                        emitEvents: l,
                        lastFrameIndex: -1
                    }, Ea(g, [o], [])
                }
            }
        }
        for (Aa(), d = 0, e = a.length; e > d; d++) {
            var z = ia[a[d][F]];
            z !== c && (_(z), ba(z))
        }
        return ha
    }, d.prototype.relativeToAbsolute = function(a, b, c) {
        var d = e.clientHeight,
            f = a.getBoundingClientRect(),
            g = f.top,
            h = f.bottom - f.top;
        return b === E ? g -= d : b === D && (g -= d / 2), c === E ? g += h : c === D && (g += h / 2), g += ha.getScrollTop(), g + .5 | 0
    }, d.prototype.animateTo = function(a, b) {
        b = b || {};
        var d = Ha(),
            e = ha.getScrollTop(),
            f = b.duration === c ? x : b.duration;
        return oa = {
            startTop: e,
            topDiff: a - e,
            targetTop: a,
            duration: f,
            startTime: d,
            endTime: d + f,
            easing: W[b.easing || w],
            done: b.done
        }, oa.topDiff || (oa.done && oa.done.call(ha, !1), oa = c), ha
    }, d.prototype.stopAnimateTo = function() {
        oa && oa.done && oa.done.call(ha, !0), oa = c
    }, d.prototype.isAnimatingTo = function() {
        return !!oa
    }, d.prototype.isMobile = function() {
        return Sa
    }, d.prototype.setScrollTop = function(b, c) {
        return sa = c === !0, Sa ? Ta = i.min(i.max(b, 0), Ja) : a.scrollTo(0, b), ha
    }, d.prototype.getScrollTop = function() {
        return Sa ? Ta : a.pageYOffset || e.scrollTop || f.scrollTop || 0
    }, d.prototype.getMaxScrollTop = function() {
        return Ja
    }, d.prototype.on = function(a, b) {
        return ka[a] = b, ha
    }, d.prototype.off = function(a) {
        return delete ka[a], ha
    }, d.prototype.destroy = function() {
        var a = V();
        a(va), ya(), Ea(e, [t], [s, u, v]);
        for (var b = 0, d = ia.length; d > b; b++) fa(ia[b].element);
        e.style.overflow = f.style.overflow = "", e.style.height = f.style.height = "", ja && g.setStyle(ja, "transform", "none"), ha = c, ja = c, ka = c, la = c, Ja = 0, Ka = 1, ma = c, na = c, La = "down", Ma = -1, Oa = 0, Pa = 0, Qa = !1, oa = c, pa = c, qa = c, ra = c, sa = c, Ra = 0, ta = c, Sa = !1, Ta = 0, ua = c
    };
    var X = function() {
            var d, g, h, j, o, p, q, r, s, t, u, v;
            wa(e, [k, l, m, n].join(" "), function(a) {
                var e = a.changedTouches[0];
                for (j = a.target; 3 === j.nodeType;) j = j.parentNode;
                switch (o = e.clientY, p = e.clientX, t = a.timeStamp, G.test(j.tagName) || a.preventDefault(), a.type) {
                    case k:
                        d && d.blur(), ha.stopAnimateTo(), d = j, g = q = o, h = p, s = t;
                        break;
                    case l:
                        G.test(j.tagName) && b.activeElement !== j && a.preventDefault(), r = o - q, v = t - u, ha.setScrollTop(Ta - r, !0), q = o, u = t;
                        break;
                    default:
                    case m:
                    case n:
                        var f = g - o,
                            w = h - p,
                            x = w * w + f * f;
                        if (49 > x) {
                            if (!G.test(d.tagName)) {
                                d.focus();
                                var y = b.createEvent("MouseEvents");
                                y.initMouseEvent("click", !0, !0, a.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), d.dispatchEvent(y)
                            }
                            return
                        }
                        d = c;
                        var z = r / v;
                        z = i.max(i.min(z, 3), -3);
                        var A = i.abs(z / na),
                            B = z * A + .5 * na * A * A,
                            C = ha.getScrollTop() - B,
                            D = 0;
                        C > Ja ? (D = (Ja - C) / B, C = Ja) : 0 > C && (D = -C / B, C = 0), A *= 1 - D, ha.animateTo(C + .5 | 0, {
                            easing: "outCubic",
                            duration: A
                        })
                }
            }), a.scrollTo(0, 0), e.style.overflow = f.style.overflow = "hidden"
        },
        Y = function() {
            var a, b, c, d, f, g, h, j, k, l, m, n = e.clientHeight,
                o = Ba();
            for (j = 0, k = ia.length; k > j; j++)
                for (a = ia[j], b = a.element, c = a.anchorTarget, d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], l = h.offset, m = o[h.constant] || 0, h.frame = l, h.isPercentage && (l *= n, h.frame = l), "relative" === h.mode && (fa(b), h.frame = ha.relativeToAbsolute(c, h.anchors[0], h.anchors[1]) - l, fa(b, !0)), h.frame += m, la && !h.isEnd && h.frame > Ja && (Ja = h.frame);
            for (Ja = i.max(Ja, Ca()), j = 0, k = ia.length; k > j; j++) {
                for (a = ia[j], d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], m = o[h.constant] || 0, h.isEnd && (h.frame = Ja - h.offset + m);
                a.keyFrames.sort(Ia)
            }
        },
        Z = function(a, b) {
            for (var c = 0, d = ia.length; d > c; c++) {
                var e, f, i = ia[c],
                    j = i.element,
                    k = i.smoothScrolling ? a : b,
                    l = i.keyFrames,
                    m = l.length,
                    n = l[0],
                    s = l[l.length - 1],
                    t = k < n.frame,
                    u = k > s.frame,
                    v = t ? n : s,
                    w = i.emitEvents,
                    x = i.lastFrameIndex;
                if (t || u) {
                    if (t && -1 === i.edge || u && 1 === i.edge) continue;
                    switch (t ? (Ea(j, [p], [r, q]), w && x > -1 && (za(j, n.eventType, La), i.lastFrameIndex = -1)) : (Ea(j, [r], [p, q]), w && m > x && (za(j, s.eventType, La), i.lastFrameIndex = m)), i.edge = t ? -1 : 1, i.edgeStrategy) {
                        case "reset":
                            fa(j);
                            continue;
                        case "ease":
                            k = v.frame;
                            break;
                        default:
                        case "set":
                            var y = v.props;
                            for (e in y) h.call(y, e) && (f = ea(y[e].value), 0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f));
                            continue
                    }
                } else 0 !== i.edge && (Ea(j, [o, q], [p, r]), i.edge = 0);
                for (var z = 0; m - 1 > z; z++)
                    if (k >= l[z].frame && k <= l[z + 1].frame) {
                        var A = l[z],
                            B = l[z + 1];
                        for (e in A.props)
                            if (h.call(A.props, e)) {
                                var C = (k - A.frame) / (B.frame - A.frame);
                                C = A.props[e].easing(C), f = da(A.props[e].value, B.props[e].value, C), f = ea(f), 0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f)
                            }
                        w && x !== z && ("down" === La ? za(j, A.eventType, La) : za(j, B.eventType, La), i.lastFrameIndex = z);
                        break
                    }
            }
        },
        $ = function() {
            Qa && (Qa = !1, Aa());
            var a, b, d = ha.getScrollTop(),
                e = Ha();
            if (oa) e >= oa.endTime ? (d = oa.targetTop, a = oa.done, oa = c) : (b = oa.easing((e - oa.startTime) / oa.duration), d = oa.startTop + b * oa.topDiff | 0), ha.setScrollTop(d, !0);
            else if (!sa) {
                var f = ra.targetTop - d;
                f && (ra = {
                    startTop: Ma,
                    topDiff: d - Ma,
                    targetTop: d,
                    startTime: Na,
                    endTime: Na + qa
                }), e <= ra.endTime && (b = W.sqrt((e - ra.startTime) / qa), d = ra.startTop + b * ra.topDiff | 0)
            }
            if (sa || Ma !== d) {
                La = d > Ma ? "down" : Ma > d ? "up" : La, sa = !1;
                var h = {
                        curTop: d,
                        lastTop: Ma,
                        maxTop: Ja,
                        direction: La
                    },
                    i = ka.beforerender && ka.beforerender.call(ha, h);
                i !== !1 && (Z(d, ha.getScrollTop()), Sa && ja && g.setStyle(ja, "transform", "translate(0, " + -Ta + "px) " + ua), Ma = d, ka.render && ka.render.call(ha, h)), a && a.call(ha, !1)
            }
            Na = e
        },
        _ = function(a) {
            for (var b = 0, c = a.keyFrames.length; c > b; b++) {
                for (var d, e, f, g, h = a.keyFrames[b], i = {}; null !== (g = J.exec(h.props));) f = g[1], e = g[2], d = f.match(K), null !== d ? (f = d[1], d = d[2]) : d = w, e = e.indexOf("!") ? aa(e) : [e.slice(1)], i[f] = {
                    value: e,
                    easing: W[d]
                };
                h.props = i
            }
        },
        aa = function(a) {
            var b = [];
            return P.lastIndex = 0, a = a.replace(P, function(a) {
                return a.replace(N, function(a) {
                    return a / 255 * 100 + "%"
                })
            }), S && (Q.lastIndex = 0, a = a.replace(Q, function(a) {
                return S + a
            })), a = a.replace(N, function(a) {
                return b.push(+a), "{?}"
            }), b.unshift(a), b
        },
        ba = function(a) {
            var b, c, d = {};
            for (b = 0, c = a.keyFrames.length; c > b; b++) ca(a.keyFrames[b], d);
            for (d = {}, b = a.keyFrames.length - 1; b >= 0; b--) ca(a.keyFrames[b], d)
        },
        ca = function(a, b) {
            var c;
            for (c in b) h.call(a.props, c) || (a.props[c] = b[c]);
            for (c in a.props) b[c] = a.props[c]
        },
        da = function(a, b, c) {
            var d, e = a.length;
            if (e !== b.length) throw "Can't interpolate between \"" + a[0] + '" and "' + b[0] + '"';
            var f = [a[0]];
            for (d = 1; e > d; d++) f[d] = a[d] + (b[d] - a[d]) * c;
            return f
        },
        ea = function(a) {
            var b = 1;
            return O.lastIndex = 0, a[0].replace(O, function() {
                return a[b++]
            })
        },
        fa = function(a, b) {
            a = [].concat(a);
            for (var c, d, e = 0, f = a.length; f > e; e++) d = a[e], c = ia[d[F]], c && (b ? (d.style.cssText = c.dirtyStyleAttr, Ea(d, c.dirtyClassAttr)) : (c.dirtyStyleAttr = d.style.cssText, c.dirtyClassAttr = Da(d), d.style.cssText = c.styleAttr, Ea(d, c.classAttr)))
        },
        ga = function() {
            ua = "translateZ(0)", g.setStyle(ja, "transform", ua);
            var a = j(ja),
                b = a.getPropertyValue("transform"),
                c = a.getPropertyValue(S + "transform"),
                d = b && "none" !== b || c && "none" !== c;
            d || (ua = "")
        };
    g.setStyle = function(a, b, c) {
        var d = a.style;
        if (b = b.replace(L, M).replace("-", ""), "zIndex" === b) isNaN(c) ? d[b] = c : d[b] = "" + (0 | c);
        else if ("float" === b) d.styleFloat = d.cssFloat = c;
        else try {
            R && (d[R + b.slice(0, 1).toUpperCase() + b.slice(1)] = c), d[b] = c
        } catch (e) {}
    };
    var ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa = g.addEvent = function(b, c, d) {
            var e = function(b) {
                return b = b || a.event, b.target || (b.target = b.srcElement), b.preventDefault || (b.preventDefault = function() {
                    b.returnValue = !1, b.defaultPrevented = !0
                }), d.call(this, b)
            };
            c = c.split(" ");
            for (var f, g = 0, h = c.length; h > g; g++) f = c[g], b.addEventListener ? b.addEventListener(f, d, !1) : b.attachEvent("on" + f, e), Ua.push({
                element: b,
                name: f,
                listener: d
            })
        },
        xa = g.removeEvent = function(a, b, c) {
            b = b.split(" ");
            for (var d = 0, e = b.length; e > d; d++) a.removeEventListener ? a.removeEventListener(b[d], c, !1) : a.detachEvent("on" + b[d], c)
        },
        ya = function() {
            for (var a, b = 0, c = Ua.length; c > b; b++) a = Ua[b], xa(a.element, a.name, a.listener);
            Ua = []
        },
        za = function(a, b, c) {
            ka.keyframe && ka.keyframe.call(ha, a, b, c)
        },
        Aa = function() {
            var a = ha.getScrollTop();
            Ja = 0, la && !Sa && (f.style.height = ""), Y(), la && !Sa && (f.style.height = Ja + e.clientHeight + "px"), Sa ? ha.setScrollTop(i.min(ha.getScrollTop(), Ja)) : ha.setScrollTop(a, !0), sa = !0
        },
        Ba = function() {
            var a, b, c = e.clientHeight,
                d = {};
            for (a in ma) b = ma[a], "function" == typeof b ? b = b.call(ha) : /p$/.test(b) && (b = b.slice(0, -1) / 100 * c), d[a] = b;
            return d
        },
        Ca = function() {
            var a, b = 0;
            return ja && (b = i.max(ja.offsetHeight, ja.scrollHeight)), a = i.max(b, f.scrollHeight, f.offsetHeight, e.scrollHeight, e.offsetHeight, e.clientHeight), a - e.clientHeight
        },
        Da = function(b) {
            var c = "className";
            return a.SVGElement && b instanceof a.SVGElement && (b = b[c], c = "baseVal"), b[c]
        },
        Ea = function(b, d, e) {
            var f = "className";
            if (a.SVGElement && b instanceof a.SVGElement && (b = b[f], f = "baseVal"), e === c) return void(b[f] = d);
            for (var g = b[f], h = 0, i = e.length; i > h; h++) g = Ga(g).replace(Ga(e[h]), " ");
            g = Fa(g);
            for (var j = 0, k = d.length; k > j; j++) - 1 === Ga(g).indexOf(Ga(d[j])) && (g += " " + d[j]);
            b[f] = Fa(g)
        },
        Fa = function(a) {
            return a.replace(H, "")
        },
        Ga = function(a) {
            return " " + a + " "
        },
        Ha = Date.now || function() {
            return +new Date
        },
        Ia = function(a, b) {
            return a.frame - b.frame
        },
        Ja = 0,
        Ka = 1,
        La = "down",
        Ma = -1,
        Na = Ha(),
        Oa = 0,
        Pa = 0,
        Qa = !1,
        Ra = 0,
        Sa = !1,
        Ta = 0,
        Ua = [];
    "function" == typeof define && define.amd ? define([], function() {
        return g
    }) : "undefined" != typeof module && module.exports ? module.exports = g : a.skrollr = g
}(window, document);

/*!
 * Name    : Just Another Parallax [Jarallax]
 * Version : 1.10.6
 * Author  : nK <https://nkdev.info>
 * GitHub  : https://github.com/nk-o/jarallax
 */
! function(o) {
    var n = {};

    function i(e) {
        if (n[e]) return n[e].exports;
        var t = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return o[e].call(t.exports, t, t.exports, i), t.l = !0, t.exports
    }
    i.m = o, i.c = n, i.d = function(e, t, o) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (i.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) i.d(o, n, function(e) {
                return t[e]
            }.bind(null, n));
        return o
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 11)
}([, , function(e, t, o) {
    "use strict";
    e.exports = function(e) {
        "complete" === document.readyState || "interactive" === document.readyState ? e.call() : document.attachEvent ? document.attachEvent("onreadystatechange", function() {
            "interactive" === document.readyState && e.call()
        }) : document.addEventListener && document.addEventListener("DOMContentLoaded", e)
    }
}, , function(o, e, t) {
    "use strict";
    (function(e) {
        var t;
        t = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}, o.exports = t
    }).call(this, t(5))
}, function(e, t, o) {
    "use strict";
    var n, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" === ("undefined" == typeof window ? "undefined" : i(window)) && (n = window)
    }
    e.exports = n
}, , , , , , function(e, t, o) {
    e.exports = o(12)
}, function(e, t, o) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = l(o(2)),
        a = o(4),
        r = l(o(13));

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var s = a.window.jarallax;
    if (a.window.jarallax = r.default, a.window.jarallax.noConflict = function() {
            return a.window.jarallax = s, this
        }, void 0 !== a.jQuery) {
        var c = function() {
            var e = arguments || [];
            Array.prototype.unshift.call(e, this);
            var t = r.default.apply(a.window, e);
            return "object" !== (void 0 === t ? "undefined" : n(t)) ? t : this
        };
        c.constructor = r.default.constructor;
        var u = a.jQuery.fn.jarallax;
        a.jQuery.fn.jarallax = c, a.jQuery.fn.jarallax.noConflict = function() {
            return a.jQuery.fn.jarallax = u, this
        }
    }(0, i.default)(function() {
        (0, r.default)(document.querySelectorAll("[data-jarallax]"))
    })
}, function(e, j, S) {
    "use strict";
    (function(e) {
        Object.defineProperty(j, "__esModule", {
            value: !0
        });
        var d = function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var o = [],
                        n = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var r, l = e[Symbol.iterator](); !(n = (r = l.next()).done) && (o.push(r.value), !t || o.length !== t); n = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !n && l.return && l.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return o
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            t = function() {
                function n(e, t) {
                    for (var o = 0; o < t.length; o++) {
                        var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(e, t, o) {
                    return t && n(e.prototype, t), o && n(e, o), e
                }
            }(),
            p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = a(S(2)),
            n = a(S(14)),
            i = S(4);

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var s = -1 < navigator.userAgent.indexOf("MSIE ") || -1 < navigator.userAgent.indexOf("Trident/") || -1 < navigator.userAgent.indexOf("Edge/"),
            r = function() {
                for (var e = "transform WebkitTransform MozTransform".split(" "), t = document.createElement("div"), o = 0; o < e.length; o++)
                    if (t && void 0 !== t.style[e[o]]) return e[o];
                return !1
            }(),
            b = void 0,
            v = void 0,
            l = void 0,
            c = !1,
            u = !1;

        function m(e) {
            b = i.window.innerWidth || document.documentElement.clientWidth, v = i.window.innerHeight || document.documentElement.clientHeight, "object" !== (void 0 === e ? "undefined" : p(e)) || "load" !== e.type && "dom-loaded" !== e.type || (c = !0)
        }
        m(), i.window.addEventListener("resize", m), i.window.addEventListener("orientationchange", m), i.window.addEventListener("load", m), (0, o.default)(function() {
            m({
                type: "dom-loaded"
            })
        });
        var f = [],
            y = !1;

        function g() {
            if (f.length) {
                l = void 0 !== i.window.pageYOffset ? i.window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                var t = c || !y || y.width !== b || y.height !== v,
                    o = u || t || !y || y.y !== l;
                u = c = !1, (t || o) && (f.forEach(function(e) {
                    t && e.onResize(), o && e.onScroll()
                }), y = {
                    width: b,
                    height: v,
                    y: l
                }), (0, n.default)(g)
            }
        }
        var h = !!e.ResizeObserver && new e.ResizeObserver(function(e) {
                e && e.length && (0, n.default)(function() {
                    e.forEach(function(e) {
                        e.target && e.target.jarallax && (c || e.target.jarallax.onResize(), u = !0)
                    })
                })
            }),
            x = 0,
            w = function() {
                function u(e, t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, u);
                    var o = this;
                    o.instanceID = x++, o.$item = e, o.defaults = {
                        type: "scroll",
                        speed: .5,
                        imgSrc: null,
                        imgElement: ".jarallax-img",
                        imgSize: "cover",
                        imgPosition: "50% 50%",
                        imgRepeat: "no-repeat",
                        keepImg: !1,
                        elementInViewport: null,
                        zIndex: -100,
                        disableParallax: !1,
                        disableVideo: !1,
                        automaticResize: !0,
                        videoSrc: null,
                        videoStartTime: 0,
                        videoEndTime: 0,
                        videoVolume: 0,
                        videoPlayOnlyVisible: !0,
                        onScroll: null,
                        onInit: null,
                        onDestroy: null,
                        onCoverImage: null
                    };
                    var n = o.$item.getAttribute("data-jarallax"),
                        i = JSON.parse(n || "{}");
                    n && console.warn("Detected usage of deprecated data-jarallax JSON options, you should use pure data-attribute options. See info here - https://github.com/nk-o/jarallax/issues/53");
                    var a = o.$item.dataset || {},
                        r = {};
                    if (Object.keys(a).forEach(function(e) {
                            var t = e.substr(0, 1).toLowerCase() + e.substr(1);
                            t && void 0 !== o.defaults[t] && (r[t] = a[e])
                        }), o.options = o.extend({}, o.defaults, i, r, t), o.pureOptions = o.extend({}, o.options), Object.keys(o.options).forEach(function(e) {
                            "true" === o.options[e] ? o.options[e] = !0 : "false" === o.options[e] && (o.options[e] = !1)
                        }), o.options.speed = Math.min(2, Math.max(-1, parseFloat(o.options.speed))), (o.options.noAndroid || o.options.noIos) && (console.warn("Detected usage of deprecated noAndroid or noIos options, you should use disableParallax option. See info here - https://github.com/nk-o/jarallax/#disable-on-mobile-devices"), o.options.disableParallax || (o.options.noIos && o.options.noAndroid ? o.options.disableParallax = /iPad|iPhone|iPod|Android/ : o.options.noIos ? o.options.disableParallax = /iPad|iPhone|iPod/ : o.options.noAndroid && (o.options.disableParallax = /Android/))), "string" == typeof o.options.disableParallax && (o.options.disableParallax = new RegExp(o.options.disableParallax)), o.options.disableParallax instanceof RegExp) {
                        var l = o.options.disableParallax;
                        o.options.disableParallax = function() {
                            return l.test(navigator.userAgent)
                        }
                    }
                    if ("function" != typeof o.options.disableParallax && (o.options.disableParallax = function() {
                            return !1
                        }), "string" == typeof o.options.disableVideo && (o.options.disableVideo = new RegExp(o.options.disableVideo)), o.options.disableVideo instanceof RegExp) {
                        var s = o.options.disableVideo;
                        o.options.disableVideo = function() {
                            return s.test(navigator.userAgent)
                        }
                    }
                    "function" != typeof o.options.disableVideo && (o.options.disableVideo = function() {
                        return !1
                    });
                    var c = o.options.elementInViewport;
                    c && "object" === (void 0 === c ? "undefined" : p(c)) && void 0 !== c.length && (c = d(c, 1)[0]);
                    c instanceof Element || (c = null), o.options.elementInViewport = c, o.image = {
                        src: o.options.imgSrc || null,
                        $container: null,
                        useImgTag: !1,
                        position: /iPad|iPhone|iPod|Android/.test(navigator.userAgent) ? "absolute" : "fixed"
                    }, o.initImg() && o.canInitParallax() && o.init()
                }
                return t(u, [{
                    key: "css",
                    value: function(t, o) {
                        return "string" == typeof o ? i.window.getComputedStyle(t).getPropertyValue(o) : (o.transform && r && (o[r] = o.transform), Object.keys(o).forEach(function(e) {
                            t.style[e] = o[e]
                        }), t)
                    }
                }, {
                    key: "extend",
                    value: function(o) {
                        var n = arguments;
                        return o = o || {}, Object.keys(arguments).forEach(function(t) {
                            n[t] && Object.keys(n[t]).forEach(function(e) {
                                o[e] = n[t][e]
                            })
                        }), o
                    }
                }, {
                    key: "getWindowData",
                    value: function() {
                        return {
                            width: b,
                            height: v,
                            y: l
                        }
                    }
                }, {
                    key: "initImg",
                    value: function() {
                        var e = this,
                            t = e.options.imgElement;
                        return t && "string" == typeof t && (t = e.$item.querySelector(t)), t instanceof Element || (t = null), t && (e.options.keepImg ? e.image.$item = t.cloneNode(!0) : (e.image.$item = t, e.image.$itemParent = t.parentNode), e.image.useImgTag = !0), !!e.image.$item || (null === e.image.src && (e.image.src = e.css(e.$item, "background-image").replace(/^url\(['"]?/g, "").replace(/['"]?\)$/g, "")), !(!e.image.src || "none" === e.image.src))
                    }
                }, {
                    key: "canInitParallax",
                    value: function() {
                        return r && !this.options.disableParallax()
                    }
                }, {
                    key: "init",
                    value: function() {
                        var e = this,
                            t = {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                pointerEvents: "none"
                            },
                            o = {};
                        if (!e.options.keepImg) {
                            var n = e.$item.getAttribute("style");
                            if (n && e.$item.setAttribute("data-jarallax-original-styles", n), e.image.useImgTag) {
                                var i = e.image.$item.getAttribute("style");
                                i && e.image.$item.setAttribute("data-jarallax-original-styles", i)
                            }
                        }
                        if ("static" === e.css(e.$item, "position") && e.css(e.$item, {
                                position: "relative"
                            }), "auto" === e.css(e.$item, "z-index") && e.css(e.$item, {
                                zIndex: 0
                            }), e.image.$container = document.createElement("div"), e.css(e.image.$container, t), e.css(e.image.$container, {
                                "z-index": e.options.zIndex
                            }), s && e.css(e.image.$container, {
                                opacity: .9999
                            }), e.image.$container.setAttribute("id", "jarallax-container-" + e.instanceID), e.$item.appendChild(e.image.$container), e.image.useImgTag ? o = e.extend({
                                "object-fit": e.options.imgSize,
                                "object-position": e.options.imgPosition,
                                "font-family": "object-fit: " + e.options.imgSize + "; object-position: " + e.options.imgPosition + ";",
                                "max-width": "none"
                            }, t, o) : (e.image.$item = document.createElement("div"), e.image.src && (o = e.extend({
                                "background-position": e.options.imgPosition,
                                "background-size": e.options.imgSize,
                                "background-repeat": e.options.imgRepeat,
                                "background-image": 'url("' + e.image.src + '")'
                            }, t, o))), "opacity" !== e.options.type && "scale" !== e.options.type && "scale-opacity" !== e.options.type && 1 !== e.options.speed || (e.image.position = "absolute"), "fixed" === e.image.position)
                            for (var a = 0, r = e.$item; null !== r && r !== document && 0 === a;) {
                                var l = e.css(r, "-webkit-transform") || e.css(r, "-moz-transform") || e.css(r, "transform");
                                l && "none" !== l && (a = 1, e.image.position = "absolute"), r = r.parentNode
                            }
                        o.position = e.image.position, e.css(e.image.$item, o), e.image.$container.appendChild(e.image.$item), e.onResize(), e.onScroll(!0), e.options.automaticResize && h && h.observe(e.$item), e.options.onInit && e.options.onInit.call(e), "none" !== e.css(e.$item, "background-image") && e.css(e.$item, {
                            "background-image": "none"
                        }), e.addToParallaxList()
                    }
                }, {
                    key: "addToParallaxList",
                    value: function() {
                        f.push(this), 1 === f.length && g()
                    }
                }, {
                    key: "removeFromParallaxList",
                    value: function() {
                        var o = this;
                        f.forEach(function(e, t) {
                            e.instanceID === o.instanceID && f.splice(t, 1)
                        })
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        var e = this;
                        e.removeFromParallaxList();
                        var t = e.$item.getAttribute("data-jarallax-original-styles");
                        if (e.$item.removeAttribute("data-jarallax-original-styles"), t ? e.$item.setAttribute("style", t) : e.$item.removeAttribute("style"), e.image.useImgTag) {
                            var o = e.image.$item.getAttribute("data-jarallax-original-styles");
                            e.image.$item.removeAttribute("data-jarallax-original-styles"), o ? e.image.$item.setAttribute("style", t) : e.image.$item.removeAttribute("style"), e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item)
                        }
                        e.$clipStyles && e.$clipStyles.parentNode.removeChild(e.$clipStyles), e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax
                    }
                }, {
                    key: "clipContainer",
                    value: function() {
                        if ("fixed" === this.image.position) {
                            var e = this,
                                t = e.image.$container.getBoundingClientRect(),
                                o = t.width,
                                n = t.height;
                            if (!e.$clipStyles) e.$clipStyles = document.createElement("style"), e.$clipStyles.setAttribute("type", "text/css"), e.$clipStyles.setAttribute("id", "jarallax-clip-" + e.instanceID), (document.head || document.getElementsByTagName("head")[0]).appendChild(e.$clipStyles);
                            var i = "#jarallax-container-" + e.instanceID + " {\n           clip: rect(0 " + o + "px " + n + "px 0);\n           clip: rect(0, " + o + "px, " + n + "px, 0);\n        }";
                            e.$clipStyles.styleSheet ? e.$clipStyles.styleSheet.cssText = i : e.$clipStyles.innerHTML = i
                        }
                    }
                }, {
                    key: "coverImage",
                    value: function() {
                        var e = this,
                            t = e.image.$container.getBoundingClientRect(),
                            o = t.height,
                            n = e.options.speed,
                            i = "scroll" === e.options.type || "scroll-opacity" === e.options.type,
                            a = 0,
                            r = o,
                            l = 0;
                        return i && (n < 0 ? (a = n * Math.max(o, v), v < o && (a -= n * (o - v))) : a = n * (o + v), 1 < n ? r = Math.abs(a - v) : n < 0 ? r = a / n + Math.abs(a) : r += (v - o) * (1 - n), a /= 2), e.parallaxScrollDistance = a, l = i ? (v - r) / 2 : (o - r) / 2, e.css(e.image.$item, {
                            height: r + "px",
                            marginTop: l + "px",
                            left: "fixed" === e.image.position ? t.left + "px" : "0",
                            width: t.width + "px"
                        }), e.options.onCoverImage && e.options.onCoverImage.call(e), {
                            image: {
                                height: r,
                                marginTop: l
                            },
                            container: t
                        }
                    }
                }, {
                    key: "isVisible",
                    value: function() {
                        return this.isElementInViewport || !1
                    }
                }, {
                    key: "onScroll",
                    value: function(e) {
                        var t = this,
                            o = t.$item.getBoundingClientRect(),
                            n = o.top,
                            i = o.height,
                            a = {},
                            r = o;
                        if (t.options.elementInViewport && (r = t.options.elementInViewport.getBoundingClientRect()), t.isElementInViewport = 0 <= r.bottom && 0 <= r.right && r.top <= v && r.left <= b, e || t.isElementInViewport) {
                            var l = Math.max(0, n),
                                s = Math.max(0, i + n),
                                c = Math.max(0, -n),
                                u = Math.max(0, n + i - v),
                                d = Math.max(0, i - (n + i - v)),
                                p = Math.max(0, -n + v - i),
                                m = 1 - 2 * (v - n) / (v + i),
                                f = 1;
                            if (i < v ? f = 1 - (c || u) / i : s <= v ? f = s / v : d <= v && (f = d / v), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (a.transform = "translate3d(0,0,0)", a.opacity = f), "scale" === t.options.type || "scale-opacity" === t.options.type) {
                                var y = 1;
                                t.options.speed < 0 ? y -= t.options.speed * f : y += t.options.speed * (1 - f), a.transform = "scale(" + y + ") translate3d(0,0,0)"
                            }
                            if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                                var g = t.parallaxScrollDistance * m;
                                "absolute" === t.image.position && (g -= n), a.transform = "translate3d(0," + g + "px,0)"
                            }
                            t.css(t.image.$item, a), t.options.onScroll && t.options.onScroll.call(t, {
                                section: o,
                                beforeTop: l,
                                beforeTopEnd: s,
                                afterTop: c,
                                beforeBottom: u,
                                beforeBottomEnd: d,
                                afterBottom: p,
                                visiblePercent: f,
                                fromViewportCenter: m
                            })
                        }
                    }
                }, {
                    key: "onResize",
                    value: function() {
                        this.coverImage(), this.clipContainer()
                    }
                }]), u
            }(),
            $ = function(e) {
                ("object" === ("undefined" == typeof HTMLElement ? "undefined" : p(HTMLElement)) ? e instanceof HTMLElement : e && "object" === (void 0 === e ? "undefined" : p(e)) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
                for (var t = arguments[1], o = Array.prototype.slice.call(arguments, 2), n = e.length, i = 0, a = void 0; i < n; i++)
                    if ("object" === (void 0 === t ? "undefined" : p(t)) || void 0 === t ? e[i].jarallax || (e[i].jarallax = new w(e[i], t)) : e[i].jarallax && (a = e[i].jarallax[t].apply(e[i].jarallax, o)), void 0 !== a) return a;
                return e
            };
        $.constructor = w, j.default = $
    }).call(this, S(5))
}, function(e, t, o) {
    "use strict";
    var n = o(4),
        i = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || function(e) {
            var t = +new Date,
                o = Math.max(0, 16 - (t - a)),
                n = setTimeout(e, o);
            return a = t, n
        },
        a = +new Date;
    var r = n.cancelAnimationFrame || n.webkitCancelAnimationFrame || n.mozCancelAnimationFrame || clearTimeout;
    Function.prototype.bind && (i = i.bind(n), r = r.bind(n)), (e.exports = i).cancel = r
}]);
//# sourceMappingURL=jarallax.min.js.map

/*! medium-zoom 1.0.2 | MIT License | https://github.com/francoischalifour/medium-zoom */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.mediumZoom = t()
}(this, function() {
    "use strict";
    var H = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var o = arguments[t];
                for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
            }
            return e
        },
        o = function(e) {
            return "IMG" === e.tagName
        },
        C = function(e) {
            return e && 1 === e.nodeType
        },
        O = function(e) {
            return ".svg" === (e.currentSrc || e.src).substr(-4).toLowerCase()
        },
        l = function(e) {
            try {
                return Array.isArray(e) ? e.filter(o) : (t = e, NodeList.prototype.isPrototypeOf(t) ? [].slice.call(e).filter(o) : C(e) ? [e].filter(o) : "string" == typeof e ? [].slice.call(document.querySelectorAll(e)).filter(o) : [])
            } catch (e) {
                throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom")
            }
            var t
        },
        x = function(e, t) {
            var o = H({
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            }, t);
            if ("function" == typeof window.CustomEvent) return new CustomEvent(e, o);
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, o.bubbles, o.cancelable, o.detail), n
        },
        c = window.Promise || function(e) {
            function t() {}
            e(t, t)
        };
    return function(e, t) {
            void 0 === t && (t = {});
            var o = t.insertAt;
            if (e && "undefined" != typeof document) {
                var n = document.head || document.getElementsByTagName("head")[0],
                    i = document.createElement("style");
                i.type = "text/css", "top" === o && n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e))
            }
        }(".medium-zoom-overlay{bottom:0;left:0;opacity:0;position:fixed;right:0;top:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{cursor:pointer;cursor:zoom-out;position:relative;will-change:transform}"),
        function t(e) {
            var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                n = function() {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    var i = t.reduce(function(e, t) {
                        return [].concat(e, l(t))
                    }, []);
                    return i.filter(function(e) {
                        return -1 === v.indexOf(e)
                    }).forEach(function(e) {
                        v.push(e), e.classList.add("medium-zoom-image")
                    }), d.forEach(function(e) {
                        var t = e.type,
                            o = e.listener,
                            n = e.options;
                        i.forEach(function(e) {
                            e.addEventListener(t, o, n)
                        })
                    }), L
                },
                i = function() {
                    var p = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).target,
                        g = function() {
                            var e = {
                                    width: window.innerWidth,
                                    height: window.innerHeight,
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0
                                },
                                t = void 0,
                                o = void 0;
                            if (b.container)
                                if (b.container instanceof Object) t = (e = H({}, e, b.container)).width - e.left - e.right - 2 * b.margin, o = e.height - e.top - e.bottom - 2 * b.margin;
                                else {
                                    var n = (C(b.container) ? b.container : document.querySelector(b.container)).getBoundingClientRect(),
                                        i = n.width,
                                        r = n.height,
                                        d = n.left,
                                        a = n.top;
                                    e = H({}, e, {
                                        width: i,
                                        height: r,
                                        left: d,
                                        top: a
                                    })
                                }
                            t = t || e.width - 2 * b.margin, o = o || e.height - 2 * b.margin;
                            var m = E.zoomedHd || E.original,
                                l = O(m) ? t : m.naturalWidth || t,
                                c = O(m) ? o : m.naturalHeight || o,
                                u = m.getBoundingClientRect(),
                                s = u.top,
                                f = u.left,
                                p = u.width,
                                g = u.height,
                                h = Math.min(l, t) / p,
                                v = Math.min(c, o) / g,
                                z = Math.min(h, v),
                                y = "scale(" + z + ") translate3d(" + ((t - p) / 2 - f + b.margin + e.left) / z + "px, " + ((o - g) / 2 - s + b.margin + e.top) / z + "px, 0)";
                            E.zoomed.style.transform = y, E.zoomedHd && (E.zoomedHd.style.transform = y)
                        };
                    return new c(function(t) {
                        if (p && -1 === v.indexOf(p)) t(L);
                        else if (E.zoomed) t(L);
                        else {
                            if (p) E.original = p;
                            else {
                                if (!(0 < v.length)) return void t(L);
                                var e = v;
                                E.original = e[0]
                            }
                            var o, n, i, r, d, a, m, l, c;
                            if (E.original.dispatchEvent(x("medium-zoom:open", {
                                    detail: {
                                        zoom: L
                                    }
                                })), y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, z = !0, E.zoomed = (o = E.original, n = o.getBoundingClientRect(), i = n.top, r = n.left, d = n.width, a = n.height, m = o.cloneNode(), l = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, c = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0, m.removeAttribute("id"), m.style.position = "absolute", m.style.top = i + l + "px", m.style.left = r + c + "px", m.style.width = d + "px", m.style.height = a + "px", m.style.transform = "", m), document.body.appendChild(w), b.template) {
                                var u = C(b.template) ? b.template : document.querySelector(b.template);
                                E.template = document.createElement("div"), E.template.appendChild(u.content.cloneNode(!0)), document.body.appendChild(E.template)
                            }
                            if (document.body.appendChild(E.zoomed), window.requestAnimationFrame(function() {
                                    document.body.classList.add("medium-zoom--opened")
                                }), E.original.classList.add("medium-zoom-image--hidden"), E.zoomed.classList.add("medium-zoom-image--opened"), E.zoomed.addEventListener("click", h), E.zoomed.addEventListener("transitionend", function e() {
                                    z = !1, E.zoomed.removeEventListener("transitionend", e), E.original.dispatchEvent(x("medium-zoom:opened", {
                                        detail: {
                                            zoom: L
                                        }
                                    })), t(L)
                                }), E.original.getAttribute("data-zoom-src")) {
                                E.zoomedHd = E.zoomed.cloneNode(), E.zoomedHd.removeAttribute("srcset"), E.zoomedHd.removeAttribute("sizes"), E.zoomedHd.src = E.zoomed.getAttribute("data-zoom-src"), E.zoomedHd.onerror = function() {
                                    clearInterval(s), console.warn("Unable to reach the zoom image target " + E.zoomedHd.src), E.zoomedHd = null, g()
                                };
                                var s = setInterval(function() {
                                    E.zoomedHd.complete && (clearInterval(s), E.zoomedHd.classList.add("medium-zoom-image--opened"), E.zoomedHd.addEventListener("click", h), document.body.appendChild(E.zoomedHd), g())
                                }, 10)
                            } else if (E.original.hasAttribute("srcset")) {
                                E.zoomedHd = E.zoomed.cloneNode(), E.zoomedHd.removeAttribute("sizes");
                                var f = E.zoomedHd.addEventListener("load", function() {
                                    E.zoomedHd.removeEventListener("load", f), E.zoomedHd.classList.add("medium-zoom-image--opened"), E.zoomedHd.addEventListener("click", h), document.body.appendChild(E.zoomedHd), g()
                                })
                            } else g()
                        }
                    })
                },
                h = function() {
                    return new c(function(t) {
                        !z && E.original ? (z = !0, document.body.classList.remove("medium-zoom--opened"), E.zoomed.style.transform = "", E.zoomedHd && (E.zoomedHd.style.transform = ""), E.template && (E.template.style.transition = "opacity 150ms", E.template.style.opacity = 0), E.original.dispatchEvent(x("medium-zoom:close", {
                            detail: {
                                zoom: L
                            }
                        })), E.zoomed.addEventListener("transitionend", function e() {
                            E.original.classList.remove("medium-zoom-image--hidden"), document.body.removeChild(E.zoomed), E.zoomedHd && document.body.removeChild(E.zoomedHd), document.body.removeChild(w), E.zoomed.classList.remove("medium-zoom-image--opened"), E.template && document.body.removeChild(E.template), z = !1, E.zoomed.removeEventListener("transitionend", e), E.original.dispatchEvent(x("medium-zoom:closed", {
                                detail: {
                                    zoom: L
                                }
                            })), E.original = null, E.zoomed = null, E.zoomedHd = null, E.template = null, t(L)
                        })) : t(L)
                    })
                },
                r = function() {
                    var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).target;
                    return E.original ? h() : i({
                        target: e
                    })
                },
                v = [],
                d = [],
                z = !1,
                y = 0,
                b = o,
                E = {
                    original: null,
                    zoomed: null,
                    zoomedHd: null,
                    template: null
                };
            "[object Object]" === Object.prototype.toString.call(e) ? b = e : (e || "string" == typeof e) && n(e), b = H({
                margin: 0,
                background: "#fff",
                scrollOffset: 40,
                container: null,
                template: null
            }, b);
            var a, m, w = (a = b.background, (m = document.createElement("div")).classList.add("medium-zoom-overlay"), m.style.background = a, m);
            document.addEventListener("click", function(e) {
                var t = e.target;
                t !== w ? -1 !== v.indexOf(t) && r({
                    target: t
                }) : h()
            }), document.addEventListener("keyup", function(e) {
                27 === (e.keyCode || e.which) && h()
            }), document.addEventListener("scroll", function() {
                if (!z && E.original) {
                    var e = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    Math.abs(y - e) > b.scrollOffset && setTimeout(h, 150)
                }
            }), window.addEventListener("resize", h);
            var L = {
                open: i,
                close: h,
                toggle: r,
                update: function() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e;
                    if (e.background && (w.style.background = e.background), e.container && e.container instanceof Object && (t.container = H({}, b.container, e.container)), e.template) {
                        var o = C(e.template) ? e.template : document.querySelector(e.template);
                        t.template = o
                    }
                    return b = H({}, b, t), v.forEach(function(e) {
                        e.dispatchEvent(x("medium-zoom:update", {
                            detail: {
                                zoom: L
                            }
                        }))
                    }), L
                },
                clone: function() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    return t(H({}, b, e))
                },
                attach: n,
                detach: function() {
                    for (var e = arguments.length, t = Array(e), o = 0; o < e; o++) t[o] = arguments[o];
                    E.zoomed && h();
                    var n = 0 < t.length ? t.reduce(function(e, t) {
                        return [].concat(e, l(t))
                    }, []) : v;
                    return n.forEach(function(e) {
                        e.classList.remove("medium-zoom-image"), e.dispatchEvent(x("medium-zoom:detach", {
                            detail: {
                                zoom: L
                            }
                        }))
                    }), v = v.filter(function(e) {
                        return -1 === n.indexOf(e)
                    }), L
                },
                on: function(t, o) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    return v.forEach(function(e) {
                        e.addEventListener("medium-zoom:" + t, o, n)
                    }), d.push({
                        type: "medium-zoom:" + t,
                        listener: o,
                        options: n
                    }), L
                },
                off: function(t, o) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    return v.forEach(function(e) {
                        e.removeEventListener("medium-zoom:" + t, o, n)
                    }), d = d.filter(function(e) {
                        return !(e.type === "medium-zoom:" + t && e.listener.toString() === o.toString())
                    }), L
                },
                getOptions: function() {
                    return b
                },
                getImages: function() {
                    return v
                },
                getZoomedImage: function() {
                    return E.original
                }
            };
            return L
        }
});

/*! npm.im/object-fit-images 3.2.2 */
var objectFitImages = function() {
    "use strict";

    function t(t, e) {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E"
    }

    function e(t) {
        if (t.srcset && !m && window.picturefill) {
            var e = window.picturefill._;
            t[e.ns] && t[e.ns].evaled || e.fillImg(t, {
                reselect: !0
            }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, {
                reselect: !0
            })), t.currentSrc = t[e.ns].curSrc || t.src
        }
    }

    function i(t) {
        for (var e, i = getComputedStyle(t).fontFamily, r = {}; null !== (e = l.exec(i));) r[e[1]] = e[2];
        return r
    }

    function r(e, i, r) {
        var n = t(i || 1, r || 0);
        p.call(e, "src") !== n && b.call(e, "src", n)
    }

    function n(t, e) {
        t.naturalWidth ? e(t) : setTimeout(n, 100, t, e)
    }

    function c(t) {
        var c = i(t),
            o = t[a];
        if (c["object-fit"] = c["object-fit"] || "fill", !o.img) {
            if ("fill" === c["object-fit"]) return;
            if (!o.skipTest && g && !c["object-position"]) return
        }
        if (!o.img) {
            o.img = new Image(t.width, t.height), o.img.srcset = p.call(t, "data-ofi-srcset") || t.srcset, o.img.src = p.call(t, "data-ofi-src") || t.src, b.call(t, "data-ofi-src", t.src), t.srcset && b.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = "");
            try {
                s(t)
            } catch (t) {
                window.console && console.warn("https://bit.ly/ofi-old-browser")
            }
        }
        e(o.img), t.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = c["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? n(o.img, function() {
            o.img.naturalWidth > t.width || o.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto"
        }) : t.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(o.img, function(e) {
            r(t, e.naturalWidth, e.naturalHeight)
        })
    }

    function s(t) {
        var e = {
            get: function(e) {
                return t[a].img[e || "src"]
            },
            set: function(e, i) {
                return t[a].img[i || "src"] = e, b.call(t, "data-ofi-" + i, e), c(t), e
            }
        };
        Object.defineProperty(t, "src", e), Object.defineProperty(t, "currentSrc", {
            get: function() {
                return e.get("currentSrc")
            }
        }), Object.defineProperty(t, "srcset", {
            get: function() {
                return e.get("srcset")
            },
            set: function(t) {
                return e.set(t, "srcset")
            }
        })
    }

    function o(t, e) {
        var i = !h && !t;
        if (e = e || {}, f && !e.skipTest || !d) return !1;
        t ? "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]) : t = document.getElementsByTagName("img");
        for (var r = 0; r < t.length; r++) t[r][a] = t[r][a] || {
            skipTest: e.skipTest
        }, c(t[r]);
        i && (document.body.addEventListener("load", function(t) {
            "IMG" === t.target.tagName && o(t.target, {
                skipTest: e.skipTest
            })
        }, !0), h = !0, t = "img"), e.watchMQ && window.addEventListener("resize", o.bind(null, t, {
            skipTest: e.skipTest
        }))
    }
    var a = "bfred-it:object-fit-images",
        l = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
        u = "undefined" == typeof Image ? {
            style: {
                "object-position": 1
            }
        } : new Image,
        g = "object-fit" in u.style,
        f = "object-position" in u.style,
        d = "background-size" in u.style,
        m = "string" == typeof u.currentSrc,
        p = u.getAttribute,
        b = u.setAttribute,
        h = !1;
    return o.supportsObjectFit = g, o.supportsObjectPosition = f,
        function() {
            function t(t, e) {
                return t[a] && t[a].img && ("src" === e || "srcset" === e) ? t[a].img : t
            }
            f || (HTMLImageElement.prototype.getAttribute = function(e) {
                return p.call(t(this, e), e)
            }, HTMLImageElement.prototype.setAttribute = function(e, i) {
                return b.call(t(this, e), e, String(i))
            })
        }(), o
}();

/*!
 * Validator v0.11.9 for Bootstrap 3, by @1000hz
 * Copyright 2017 Cina Saffary
 * Licensed under http://opensource.org/licenses/MIT
 *
 * https://github.com/1000hz/bootstrap-validator
 */

+
function(a) {
    "use strict";

    function b(b) {
        return b.is('[type="checkbox"]') ? b.prop("checked") : b.is('[type="radio"]') ? !!a('[name="' + b.attr("name") + '"]:checked').length : b.is("select[multiple]") ? (b.val() || []).length : b.val()
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b),
                f = c.data("bs.validator");
            (f || "destroy" != b) && (f || c.data("bs.validator", f = new d(this, e)), "string" == typeof b && f[b]())
        })
    }
    var d = function(c, e) {
        this.options = e, this.validators = a.extend({}, d.VALIDATORS, e.custom), this.$element = a(c), this.$btn = a('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]')), this.update(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", a.proxy(this.onInput, this)), this.$element.on("submit.bs.validator", a.proxy(this.onSubmit, this)), this.$element.on("reset.bs.validator", a.proxy(this.reset, this)), this.$element.find("[data-match]").each(function() {
            var c = a(this),
                d = c.attr("data-match");
            a(d).on("input.bs.validator", function() {
                b(c) && c.trigger("input.bs.validator")
            })
        }), this.$inputs.filter(function() {
            return b(a(this)) && !a(this).closest(".has-error").length
        }).trigger("focusout"), this.$element.attr("novalidate", !0)
    };
    d.VERSION = "0.11.9", d.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)', d.FOCUS_OFFSET = 20, d.DEFAULTS = {
        delay: 500,
        html: !1,
        disable: !0,
        focus: !0,
        custom: {},
        errors: {
            match: "Does not match",
            minlength: "Not long enough"
        },
        feedback: {
            success: "glyphicon-ok",
            error: "glyphicon-remove"
        }
    }, d.VALIDATORS = {
        "native": function(a) {
            var b = a[0];
            return b.checkValidity ? !b.checkValidity() && !b.validity.valid && (b.validationMessage || "error!") : void 0
        },
        match: function(b) {
            var c = b.attr("data-match");
            return b.val() !== a(c).val() && d.DEFAULTS.errors.match
        },
        minlength: function(a) {
            var b = a.attr("data-minlength");
            return a.val().length < b && d.DEFAULTS.errors.minlength
        }
    }, d.prototype.update = function() {
        var b = this;
        return this.$inputs = this.$element.find(d.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]').each(function() {
            b.clearErrors(a(this))
        })), this.toggleSubmit(), this
    }, d.prototype.onInput = function(b) {
        var c = this,
            d = a(b.target),
            e = "focusout" !== b.type;
        this.$inputs.is(d) && this.validateInput(d, e).done(function() {
            c.toggleSubmit()
        })
    }, d.prototype.validateInput = function(c, d) {
        var e = (b(c), c.data("bs.validator.errors"));
        c.is('[type="radio"]') && (c = this.$element.find('input[name="' + c.attr("name") + '"]'));
        var f = a.Event("validate.bs.validator", {
            relatedTarget: c[0]
        });
        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
            var g = this;
            return this.runValidators(c).done(function(b) {
                c.data("bs.validator.errors", b), b.length ? d ? g.defer(c, g.showErrors) : g.showErrors(c) : g.clearErrors(c), e && b.toString() === e.toString() || (f = b.length ? a.Event("invalid.bs.validator", {
                    relatedTarget: c[0],
                    detail: b
                }) : a.Event("valid.bs.validator", {
                    relatedTarget: c[0],
                    detail: e
                }), g.$element.trigger(f)), g.toggleSubmit(), g.$element.trigger(a.Event("validated.bs.validator", {
                    relatedTarget: c[0]
                }))
            })
        }
    }, d.prototype.runValidators = function(c) {
        function d(a) {
            return c.attr("data-" + a + "-error")
        }

        function e() {
            var a = c[0].validity;
            return a.typeMismatch ? c.attr("data-type-error") : a.patternMismatch ? c.attr("data-pattern-error") : a.stepMismatch ? c.attr("data-step-error") : a.rangeOverflow ? c.attr("data-max-error") : a.rangeUnderflow ? c.attr("data-min-error") : a.valueMissing ? c.attr("data-required-error") : null
        }

        function f() {
            return c.attr("data-error")
        }

        function g(a) {
            return d(a) || e() || f()
        }
        var h = [],
            i = a.Deferred();
        return c.data("bs.validator.deferred") && c.data("bs.validator.deferred").reject(), c.data("bs.validator.deferred", i), a.each(this.validators, a.proxy(function(a, d) {
            var e = null;
            !b(c) && !c.attr("required") || void 0 === c.attr("data-" + a) && "native" != a || !(e = d.call(this, c)) || (e = g(a) || e, !~h.indexOf(e) && h.push(e))
        }, this)), !h.length && b(c) && c.attr("data-remote") ? this.defer(c, function() {
            var d = {};
            d[c.attr("name")] = b(c), a.get(c.attr("data-remote"), d).fail(function(a, b, c) {
                h.push(g("remote") || c)
            }).always(function() {
                i.resolve(h)
            })
        }) : i.resolve(h), i.promise()
    }, d.prototype.validate = function() {
        var b = this;
        return a.when(this.$inputs.map(function() {
            return b.validateInput(a(this), !1)
        })).then(function() {
            b.toggleSubmit(), b.focusError()
        }), this
    }, d.prototype.focusError = function() {
        if (this.options.focus) {
            var b = this.$element.find(".has-error :input:first");
            0 !== b.length && (a("html, body").animate({
                scrollTop: b.offset().top - d.FOCUS_OFFSET
            }, 250), b.focus())
        }
    }, d.prototype.showErrors = function(b) {
        var c = this.options.html ? "html" : "text",
            d = b.data("bs.validator.errors"),
            e = b.closest(".form-group"),
            f = e.find(".help-block.with-errors"),
            g = e.find(".form-control-feedback");
        d.length && (d = a("<ul/>").addClass("list-unstyled").append(a.map(d, function(b) {
            return a("<li/>")[c](b)
        })), void 0 === f.data("bs.validator.originalContent") && f.data("bs.validator.originalContent", f.html()), f.empty().append(d), e.addClass("has-error has-danger"), e.hasClass("has-feedback") && g.removeClass(this.options.feedback.success) && g.addClass(this.options.feedback.error) && e.removeClass("has-success"))
    }, d.prototype.clearErrors = function(a) {
        var c = a.closest(".form-group"),
            d = c.find(".help-block.with-errors"),
            e = c.find(".form-control-feedback");
        d.html(d.data("bs.validator.originalContent")), c.removeClass("has-error has-danger has-success"), c.hasClass("has-feedback") && e.removeClass(this.options.feedback.error) && e.removeClass(this.options.feedback.success) && b(a) && e.addClass(this.options.feedback.success) && c.addClass("has-success")
    }, d.prototype.hasErrors = function() {
        function b() {
            return !!(a(this).data("bs.validator.errors") || []).length
        }
        return !!this.$inputs.filter(b).length
    }, d.prototype.isIncomplete = function() {
        function c() {
            var c = b(a(this));
            return !("string" == typeof c ? a.trim(c) : c)
        }
        return !!this.$inputs.filter("[required]").filter(c).length
    }, d.prototype.onSubmit = function(a) {
        this.validate(), (this.isIncomplete() || this.hasErrors()) && a.preventDefault()
    }, d.prototype.toggleSubmit = function() {
        this.options.disable && this.$btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors())
    }, d.prototype.defer = function(b, c) {
        return c = a.proxy(c, this, b), this.options.delay ? (window.clearTimeout(b.data("bs.validator.timeout")), void b.data("bs.validator.timeout", window.setTimeout(c, this.options.delay))) : c()
    }, d.prototype.reset = function() {
        return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success), this.$inputs.removeData(["bs.validator.errors", "bs.validator.deferred"]).each(function() {
            var b = a(this),
                c = b.data("bs.validator.timeout");
            window.clearTimeout(c) && b.removeData("bs.validator.timeout")
        }), this.$element.find(".help-block.with-errors").each(function() {
            var b = a(this),
                c = b.data("bs.validator.originalContent");
            b.removeData("bs.validator.originalContent").html(c)
        }), this.$btn.removeClass("disabled"), this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"), this
    }, d.prototype.destroy = function() {
        return this.reset(), this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"), this.$inputs.off(".bs.validator"), this.options = null, this.validators = null, this.$element = null, this.$btn = null, this.$inputs = null, this
    };
    var e = a.fn.validator;
    a.fn.validator = c, a.fn.validator.Constructor = d, a.fn.validator.noConflict = function() {
        return a.fn.validator = e, this
    }, a(window).on("load", function() {
        a('form[data-toggle="validator"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery);

/*! 
 * jquery-countimator 14-10-2015 
 */
! function(a, b) {
    function c(c, k) {
        function l() {
            function d() {
                k.animateOnInit && k.animateOnAppear && i(c) && (a(b).off("scroll touchmove", d), w.call(B))
            }
            var e, f, g, h = (o(), p()),
                j = n();
            h || (e = r(), e && ("number" != typeof k.value ? k.value = e.nodeValue : k.count = e.nodeValue)), j || (f = s(), f && (k.max = f.nodeValue)), g = C.find("script[type*='text/x-']"), g.length && (k.template = g.html(), g.remove()), a(b).on("resize", function() {
                q.call(B)
            }), a(b).on("scroll touchmove", d), k.animateOnInit ? k.animateOnAppear && i(c) ? (k.count = "number" == typeof h ? h : 0, w.call(B)) : u.call(this) : (k.count = o(), u.call(this)), q.call(this)
        }

        function m() {
            var a = parseFloat(k.min);
            return isNaN(a) ? 0 : a
        }

        function n() {
            var a = parseFloat(k.max);
            return isNaN(a) ? 0 : a
        }

        function o() {
            var a = (n(), m()),
                b = (p(), parseFloat(k.value));
            return isNaN(b) && (b = a), b
        }

        function p() {
            var a = (n(), m()),
                b = parseFloat(k.count);
            return isNaN(b) && (b = a), b
        }

        function q() {}

        function r(a) {
            var b = C.find(k.countSelector)[0];
            return b || (b = C.find("*").last().siblings().addBack()[0]), h(b || c)[0]
        }

        function s(a) {
            var b = C.find(k.maxSelector)[0];
            return b ? h(b)[0] : null
        }

        function t(a) {
            var b = k.decimals,
                c = k.decimalDelimiter,
                d = k.thousandDelimiter,
                e = f(a, b, c, d);
            return e = g(e, k.pad)
        }

        function u() {
            var e, f, g, h, i, j, l, q, u, v = n(),
                w = m(),
                x = o(),
                y = p(),
                z = t(y),
                A = t(x),
                B = t(v),
                C = t(w),
                D = k.engine || "undefined" != typeof b.Handlebars ? b.Handlebars : null,
                E = k.template;
            try {
                g = a(k.template), E = g.length && g[0].innerHTML || E
            } catch (F) {}
            D && E ? (h = D.compile(E), h && (i = a.extend({}, k, {
                count: z,
                value: A,
                max: B,
                min: C
            }), e = h(i)), f = document.createElement("div"), f.innerHTML = e, j = f.childNodes, a(c).contents().remove(), a(c).append(j)) : (l = r(), l && (l.nodeValue = z), q = s(), q && (q.nodeValue = B), l || q || (c.innerHTML = z)), k.style && (u = a.fn[d].getStyle(k.style), u && u.render && u.render.call(c, y, k))
        }

        function v(a) {
            k.value = a, D || w()
        }

        function w() {
            D || (z = (new Date).getTime(), A = p(), D = !0, "function" == typeof k.start && k.start.call(c), j(x))
        }

        function x() {
            var a = k.duration,
                b = (n(), o()),
                d = (new Date).getTime(),
                e = z + a,
                f = Math.min((a - (e - d)) / a, 1),
                g = A + f * (b - A);
            k.count = g, u.call(this), "function" == typeof k.step && k.step.call(c, g, k), 1 > f && D ? j(x) : y.call(this)
        }

        function y() {
            D = !1, "function" == typeof k.complete && k.complete.call(c)
        }
        var z, A, B = this,
            C = a(c),
            D = !1;
        k = a.extend({}, e, k, C.data()), this.resize = function() {
            q.call(this)
        }, this.animate = function(a) {
            v.call(this, a)
        }, this.setOptions = function(b) {
            var c = this.getOptions();
            a.extend(!0, k, b), k.value !== c.value && w()
        }, this.getOptions = function() {
            return a.extend(!0, {}, k)
        }, l.call(this)
    }
    var d = "countimator",
        e = {
            count: 0,
            value: null,
            min: null,
            max: 0,
            duration: 1e3,
            countSelector: ".counter-count",
            maxSelector: ".counter-max",
            template: null,
            engine: null,
            animateOnInit: !0,
            animateOnAppear: !0,
            decimals: 0,
            decimalDelimiter: ".",
            thousandDelimiter: null,
            pad: !1,
            style: null,
            start: function() {},
            step: function(a) {},
            complete: function() {}
        },
        f = function(a, b, c, d) {
            b = isNaN(b = Math.abs(b)) ? 2 : b, c = "undefined" == typeof c ? "." : c, d = "undefined" == typeof d ? "," : d, d = "string" == typeof d ? d : "";
            var e = 0 > a ? "-" : "",
                f = Math.abs(+a || 0).toFixed(b),
                g = String(parseInt(f)),
                h = g.length > 3 ? g.length % 3 : 0;
            return e + (h ? g.substr(0, h) + d : "") + g.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + d) + (b ? c + Math.abs(f - g).toFixed(b).slice(2) : "")
        },
        g = function(a, b) {
            for (var c = "" + a; c.length < b;) c = "0" + c;
            return c
        },
        h = function(b) {
            return a(b).contents().filter(function() {
                return 3 === this.nodeType
            })
        },
        i = function(c) {
            var d = a(c),
                e = a(b),
                f = e.scrollTop(),
                g = f + e.height(),
                h = d.offset().top,
                i = h + d.height();
            return g >= i && h >= f
        },
        j = b.mozRequestAnimationFrame || b.RequestAnimationFrame || b.msRequestAnimationFrame || b.oRequestAnimationFrame || function(a) {
            b.setTimeout(a, 1e3 / 60)
        };
    a.fn[d] = function(b) {
            return this.each(function() {
                var e = a.extend(!0, {}, b),
                    f = a(this).data(d);
                return f ? f.setOptions(e) : a(this).data(d, new c(this, e)), a(this)
            })
        },
        function() {
            var b = {};
            a.fn[d].registerStyle = function(a, c) {
                b[a] = c
            }, a.fn[d].getStyle = function(a) {
                return b[a]
            }
        }()
}(jQuery, window);


/*!
 * Waypoints - 4.0.1
 * Copyright © 2011-2016 Caleb Troughton
 * Licensed under the MIT license.
 *
 * https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
 */
! function() {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.Context.refreshAll();
        for (var e in i) i[e].enabled = !0;
        return this
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s];
                if (null !== a.triggerPoint) {
                    var l = o.oldScroll < a.triggerPoint,
                        h = o.newScroll >= a.triggerPoint,
                        p = l && h,
                        u = !l && !h;
                    (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
                }
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();

/*!
 * Mailchimp Ajax Submit
 * jQuery Plugin
 * Author: Siddharth Doshi
 */
(function($) {
    "use strict";
    $.ajaxChimp = {
        responses: {
            "We have sent you a confirmation email": 0,
            "Please enter a value": 1,
            "An email address must contain a single @": 2,
            "The domain portion of the email address is invalid (the portion after the @: )": 3,
            "The username portion of the email address is invalid (the portion before the @: )": 4,
            "This email address looks fake or invalid. Please enter a real email address": 5
        },
        translations: {
            en: null
        },
        init: function(selector, options) {
            $(selector).ajaxChimp(options)
        }
    };
    $.fn.ajaxChimp = function(options) {
        $(this).each(function(i, elem) {
            var form = $(elem);
            var email = form.find("input[type=email]");
            var label = form.find("label[for=" + email.attr("id") + "]");
            var settings = $.extend({
                url: form.attr("action"),
                language: "en"
            }, options);
            var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
            form.attr("novalidate", "true");
            email.attr("name", "EMAIL");
            form.submit(function() {
                var msg;

                function successCallback(resp) {
                    if (resp.result === "success") {
                        msg = "We have sent you a confirmation email";
                        label.removeClass("error").addClass("valid");
                        email.removeClass("error").addClass("valid")
                    } else {
                        email.removeClass("valid").addClass("error");
                        label.removeClass("valid").addClass("error");
                        var index = -1;
                        try {
                            var parts = resp.msg.split(" - ", 2);
                            if (parts[1] === undefined) {
                                msg = resp.msg
                            } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1]
                                } else {
                                    index = -1;
                                    msg = resp.msg
                                }
                            }
                        } catch (e) {
                            index = -1;
                            msg = resp.msg
                        }
                    }
                    if (settings.language !== "en" && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
                        msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]
                    }
                    label.html(msg);
                    label.show(2e3);
                    if (settings.callback) {
                        settings.callback(resp)
                    }
                }
                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function(index, item) {
                    data[item.name] = item.value
                });
                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: "jsonp",
                    error: function(resp, text) {
                        console.log("mailchimp ajax submit error: " + text)
                    }
                });
                var submitMsg = "Submitting...";
                if (settings.language !== "en" && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]["submit"]) {
                    submitMsg = $.ajaxChimp.translations[settings.language]["submit"]
                }
                label.html(submitMsg).show(2e3);
                return false
            })
        });
        return this
    }
})(jQuery);

/**
 * jquery.dlmenu.js v1.0.1
 * http://www.codrops.com
 */
! function(n, i, e) {
    "use strict";
    var t = i.Modernizr,
        s = n("body");
    n.DLMenu = function(i, e) {
        this.$el = n(e), this._init(i)
    }, n.DLMenu.defaults = {
        animationClasses: {
            classin: "dl-animate-in-1",
            classout: "dl-animate-out-1"
        },
        onLevelClick: function(n, i) {
            var e = n.closest(".dl-menu__wrap"),
                t = n.find(".dl-submenu"),
                s = e.find(".dl-back"),
                o = e.find(".dl-menu").outerHeight(!0);
            e.css("height", t.outerHeight(!0)), s.on("click", function() {
                e.css("height", o)
            })
        },
        onLinkClick: function(n, i) {
            return !1
        }
    }, n.DLMenu.prototype = {
        _init: function(i) {
            this.options = n.extend(!0, {}, n.DLMenu.defaults, i), this._config();
            var e = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd",
                    msAnimation: "MSAnimationEnd",
                    animation: "animationend"
                },
                s = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                };
            this.animEndEventName = e[t.prefixed("animation")] + ".dlmenu", this.transEndEventName = s[t.prefixed("transition")] + ".dlmenu", this.supportAnimations = t.cssanimations, this.supportTransitions = t.csstransitions, this._initEvents()
        },
        _config: function() {
            this.open = !1, this.$trigger = this.$el.children(".dl-trigger"), this.$menu = this.$el.children("ul.dl-menu"), this.$menuitems = this.$menu.find("li:not(.dl-back)"), this.$el.find("ul.dl-submenu").prepend('<li class="dl-back"><a href="#">&nbsp;</a></li>'), this.$back = this.$menu.find("li.dl-back")
        },
        _initEvents: function() {
            var i = this;
            this.$trigger.on("click.dlmenu", function() {
                return i.open ? i._closeMenu() : i._openMenu(), !1
            }), this.$menuitems.on("click.dlmenu", function(e) {
                e.stopPropagation();
                var t = n(this),
                    s = t.children("ul.dl-submenu");
                if (s.length > 0) {
                    var o = s.clone().css("opacity", 0).insertAfter(i.$menu),
                        a = function() {
                            i.$menu.off(i.animEndEventName).removeClass(i.options.animationClasses.classout).addClass("dl-subview"), t.addClass("dl-subviewopen").parents(".dl-subviewopen:first").removeClass("dl-subviewopen").addClass("dl-subview"), o.remove()
                        };
                    return setTimeout(function() {
                        o.addClass(i.options.animationClasses.classin), i.$menu.addClass(i.options.animationClasses.classout), i.supportAnimations ? i.$menu.on(i.animEndEventName, a) : a.call(), i.options.onLevelClick(t, t.children("a:first").text())
                    }), !1
                }
                i.options.onLinkClick(t, e)
            }), this.$back.on("click.dlmenu", function(e) {
                var t = n(this),
                    s = t.parents("ul.dl-submenu:first"),
                    o = s.parent(),
                    a = s.clone().insertAfter(i.$menu),
                    l = function() {
                        i.$menu.off(i.animEndEventName).removeClass(i.options.animationClasses.classin), a.remove()
                    };
                return setTimeout(function() {
                    a.addClass(i.options.animationClasses.classout), i.$menu.addClass(i.options.animationClasses.classin), i.supportAnimations ? i.$menu.on(i.animEndEventName, l) : l.call(), o.removeClass("dl-subviewopen");
                    var n = t.parents(".dl-subview:first");
                    n.is("li") && n.addClass("dl-subviewopen"), n.removeClass("dl-subview")
                }), !1
            })
        },
        closeMenu: function() {
            this.open && this._closeMenu()
        },
        _closeMenu: function() {
            var n = this,
                i = function() {
                    n.$menu.off(n.transEndEventName), n._resetMenu()
                };
            this.$menu.removeClass("dl-menuopen"), this.$menu.addClass("dl-menu-toggle"), this.$trigger.removeClass("dl-active"), this.supportTransitions ? this.$menu.on(this.transEndEventName, i) : i.call(), this.open = !1
        },
        openMenu: function() {
            this.open || this._openMenu()
        },
        _openMenu: function() {
            var i = this;
            s.off("click").on("click.dlmenu", function() {
                i._closeMenu()
            }), this.$menu.addClass("dl-menuopen dl-menu-toggle").on(this.transEndEventName, function() {
                n(this).removeClass("dl-menu-toggle")
            }), this.$trigger.addClass("dl-active"), this.open = !0
        },
        _resetMenu: function() {
            this.$menu.removeClass("dl-subview"), this.$menuitems.removeClass("dl-subview dl-subviewopen")
        }
    };
    var o = function(n) {
        i.console && i.console.error(n)
    };
    n.fn.dlmenu = function(i) {
        if ("string" == typeof i) {
            var e = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var t = n.data(this, "dlmenu");
                t ? n.isFunction(t[i]) && "_" !== i.charAt(0) ? t[i].apply(t, e) : o("no such method '" + i + "' for dlmenu instance") : o("cannot call methods on dlmenu prior to initialization; attempted to call method '" + i + "'")
            })
        } else this.each(function() {
            var e = n.data(this, "dlmenu");
            e ? e._init() : e = n.data(this, "dlmenu", new n.DLMenu(i, this))
        });
        return this
    }
}(jQuery, window);