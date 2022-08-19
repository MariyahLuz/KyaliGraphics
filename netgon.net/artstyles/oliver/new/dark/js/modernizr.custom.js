/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-appearance-backdropfilter-backgroundblendmode-backgroundcliptext-backgroundsize-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-borderradius-boxshadow-boxsizing-checked-cssall-cssanimations-csschunit-csscolumns-cssexunit-cssfilters-cssgradients-cssinvalid-cssmask-csspointerevents-csspositionsticky-csspseudoanimations-csspseudotransitions-cssresize-cssscrollbar-csstransforms-csstransforms3d-csstransitions-cssvalid-cubicbezierrange-ellipsis-flexbox-flexboxlegacy-flexboxtweener-flexwrap-fontface-generatedcontent-lastchild-mediaqueries-multiplebgs-nthchild-opacity-overflowscrolling-preserve3d-rgba-shapes-siblinggeneral-subpixelfont-supports-target-textalignlast-textshadow-userselect-wrapflow-setclasses !*/
! function(e, t, n) {
    function r(e, t) {
        return typeof e === t
    }

    function i() {
        var e, t, n, i, s, o, a;
        for (var d in b)
            if (b.hasOwnProperty(d)) {
                if (e = [], t = b[d], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                    for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                for (i = r(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) o = e[s], a = o.split("."), 1 === a.length ? Modernizr[a[0]] = i : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = i), v.push((i ? "" : "no-") + a.join("-"))
            }
    }

    function s(e) {
        var t = z.className,
            n = Modernizr._config.classPrefix || "";
        if (C && (t = t.baseVal), Modernizr._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2")
        }
        Modernizr._config.enableClasses && (t += " " + n + e.join(" " + n), C ? z.className.baseVal = t : z.className = t)
    }

    function o() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : C ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }

    function a(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
            return t + n.toUpperCase()
        }).replace(/^-/, "")
    }

    function d() {
        var e = t.body;
        return e || (e = o(C ? "svg" : "body"), e.fake = !0), e
    }

    function l(e, n, r, i) {
        var s, a, l, u, c = "modernizr",
            f = o("div"),
            p = d();
        if (parseInt(r, 10))
            for (; r--;) l = o("div"), l.id = i ? i[r] : c + (r + 1), f.appendChild(l);
        return s = o("style"), s.type = "text/css", s.id = "s" + c, (p.fake ? p : f).appendChild(s), p.appendChild(f), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(t.createTextNode(e)), f.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", u = z.style.overflow, z.style.overflow = "hidden", z.appendChild(p)), a = n(f, e), p.fake ? (p.parentNode.removeChild(p), z.style.overflow = u, z.offsetHeight) : f.parentNode.removeChild(f), !!a
    }

    function u(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function c(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }

    function f(e, t, n) {
        var i;
        for (var s in e)
            if (e[s] in t) return n === !1 ? e[s] : (i = t[e[s]], r(i, "function") ? c(i, n || t) : i);
        return !1
    }

    function p(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function m(t, r) {
        var i = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; i--;)
                if (e.CSS.supports(p(t[i]), r)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var s = []; i--;) s.push("(" + p(t[i]) + ":" + r + ")");
            return s = s.join(" or "), l("@supports (" + s + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == getComputedStyle(e, null).position
            })
        }
        return n
    }

    function h(e, t, i, s) {
        function d() {
            c && (delete A.style, delete A.modElem)
        }
        if (s = r(s, "undefined") ? !1 : s, !r(i, "undefined")) {
            var l = m(e, i);
            if (!r(l, "undefined")) return l
        }
        for (var c, f, p, h, g, x = ["modernizr", "tspan"]; !A.style;) c = !0, A.modElem = o(x.shift()), A.style = A.modElem.style;
        for (p = e.length, f = 0; p > f; f++)
            if (h = e[f], g = A.style[h], u(h, "-") && (h = a(h)), A.style[h] !== n) {
                if (s || r(i, "undefined")) return d(), "pfx" == t ? h : !0;
                try {
                    A.style[h] = i
                } catch (v) {}
                if (A.style[h] != g) return d(), "pfx" == t ? h : !0
            }
        return d(), !1
    }

    function g(e, t, n, i, s) {
        var o = e.charAt(0).toUpperCase() + e.slice(1),
            a = (e + " " + E.join(o + " ") + o).split(" ");
        return r(t, "string") || r(t, "undefined") ? h(a, t, i, s) : (a = (e + " " + L.join(o + " ") + o).split(" "), f(a, t, n))
    }

    function x(e, t, r) {
        return g(e, n, n, t, r)
    }
    var v = [],
        b = [],
        y = {
            _version: "3.3.1",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout(function() {
                    t(n[e])
                }, 0)
            },
            addTest: function(e, t, n) {
                b.push({
                    name: e,
                    fn: t,
                    options: n
                })
            },
            addAsyncTest: function(e) {
                b.push({
                    name: null,
                    fn: e
                })
            }
        },
        Modernizr = function() {};
    Modernizr.prototype = y, Modernizr = new Modernizr;
    var T = "CSS" in e && "supports" in e.CSS,
        w = "supportsCSS" in e;
    Modernizr.addTest("supports", T || w), Modernizr.addTest("target", function() {
        var t = e.document;
        if (!("querySelectorAll" in t)) return !1;
        try {
            return t.querySelectorAll(":target"), !0
        } catch (n) {
            return !1
        }
    });
    var z = t.documentElement;
    Modernizr.addTest("cssall", "all" in z.style);
    var C = "svg" === z.nodeName.toLowerCase();
    Modernizr.addTest("bgpositionshorthand", function() {
        var e = o("a"),
            t = e.style,
            n = "right 10px bottom 10px";
        return t.cssText = "background-position: " + n + ";", t.backgroundPosition === n
    }), Modernizr.addTest("multiplebgs", function() {
        var e = o("a").style;
        return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
    }), Modernizr.addTest("csspointerevents", function() {
        var e = o("a").style;
        return e.cssText = "pointer-events:auto", "auto" === e.pointerEvents
    }), Modernizr.addTest("rgba", function() {
        var e = o("a").style;
        return e.cssText = "background-color:rgba(150,255,150,.5)", ("" + e.backgroundColor).indexOf("rgba") > -1
    });
    var S = {
        elem: o("modernizr")
    };
    Modernizr._q.push(function() {
        delete S.elem
    }), Modernizr.addTest("csschunit", function() {
        var e, t = S.elem.style;
        try {
            t.fontSize = "3ch", e = -1 !== t.fontSize.indexOf("ch")
        } catch (n) {
            e = !1
        }
        return e
    }), Modernizr.addTest("cssexunit", function() {
        var e, t = S.elem.style;
        try {
            t.fontSize = "3ex", e = -1 !== t.fontSize.indexOf("ex")
        } catch (n) {
            e = !1
        }
        return e
    });
    var k = y._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    y._prefixes = k, Modernizr.addTest("cubicbezierrange", function() {
        var e = o("a");
        return e.style.cssText = k.join("transition-timing-function:cubic-bezier(1,0,0,1.1); "), !!e.style.length
    }), Modernizr.addTest("cssgradients", function() {
        for (var e, t = "background-image:", n = "gradient(linear,left top,right bottom,from(#9f9),to(white));", r = "", i = 0, s = k.length - 1; s > i; i++) e = 0 === i ? "to " : "", r += t + k[i] + "linear-gradient(" + e + "left top, #9f9, white);";
        Modernizr._config.usePrefixes && (r += t + "-webkit-" + n);
        var a = o("a"),
            d = a.style;
        return d.cssText = r, ("" + d.backgroundImage).indexOf("gradient") > -1
    }), Modernizr.addTest("opacity", function() {
        var e = o("a").style;
        return e.cssText = k.join("opacity:.55;"), /^0.55$/.test(e.opacity)
    }), Modernizr.addTest("csspositionsticky", function() {
        var e = "position:",
            t = "sticky",
            n = o("a"),
            r = n.style;
        return r.cssText = e + k.join(t + ";" + e).slice(0, -e.length), -1 !== r.position.indexOf(t)
    });
    var _ = y.testStyles = l;
    Modernizr.addTest("checked", function() {
        return _("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(e) {
            var t = o("input");
            return t.setAttribute("type", "checkbox"), t.setAttribute("checked", "checked"), e.appendChild(t), 20 === t.offsetLeft
        })
    });
    var P = function() {
        var e = navigator.userAgent,
            t = e.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1),
            n = e.match(/w(eb)?osbrowser/gi),
            r = e.match(/windows phone/gi) && e.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9,
            i = 533 > t && e.match(/android/gi);
        return n || i || r
    }();
    P ? Modernizr.addTest("fontface", !1) : _('@font-face {font-family:"font";src:url("https://")}', function(e, n) {
        var r = t.getElementById("smodernizr"),
            i = r.sheet || r.styleSheet,
            s = i ? i.cssRules && i.cssRules[0] ? i.cssRules[0].cssText : i.cssText || "" : "",
            o = /src/i.test(s) && 0 === s.indexOf(n.split(" ")[0]);
        Modernizr.addTest("fontface", o)
    }), _('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}', function(e) {
        Modernizr.addTest("generatedcontent", e.offsetHeight >= 7)
    }), Modernizr.addTest("cssinvalid", function() {
        return _("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:invalid{width:50px}", function(e) {
            var t = o("input");
            return t.required = !0, e.appendChild(t), t.clientWidth > 10
        })
    }), _("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(e) {
        Modernizr.addTest("lastchild", e.lastChild.offsetWidth > e.firstChild.offsetWidth)
    }, 2), _("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}", function(e) {
        for (var t = e.getElementsByTagName("div"), n = !0, r = 0; 5 > r; r++) n = n && t[r].offsetWidth === r % 2 + 1;
        Modernizr.addTest("nthchild", n)
    }, 5), _("#modernizr{overflow: scroll; width: 40px; height: 40px; }#" + k.join("scrollbar{width:0px} #modernizr::").split("#").slice(1).join("#") + "scrollbar{width:0px}", function(e) {
        Modernizr.addTest("cssscrollbar", 40 == e.scrollWidth)
    }), Modernizr.addTest("siblinggeneral", function() {
        return _("#modernizr div {width:100px} #modernizr div ~ div {width:200px;display:block}", function(e) {
            return 200 == e.lastChild.offsetWidth
        }, 2)
    }), _("#modernizr{position: absolute; top: -10em; visibility:hidden; font: normal 10px arial;}#subpixel{float: left; font-size: 33.3333%;}", function(t) {
        var n = t.firstChild;
        n.innerHTML = "This is a text written in Arial", Modernizr.addTest("subpixelfont", e.getComputedStyle ? "44px" !== e.getComputedStyle(n, null).getPropertyValue("width") : !1)
    }, 1, ["subpixel"]), Modernizr.addTest("cssvalid", function() {
        return _("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}", function(e) {
            var t = o("input");
            return e.appendChild(t), t.clientWidth > 10
        })
    });
    var R = function() {
        var t = e.matchMedia || e.msMatchMedia;
        return t ? function(e) {
            var n = t(e);
            return n && n.matches || !1
        } : function(t) {
            var n = !1;
            return l("@media " + t + " { #modernizr { position: absolute; } }", function(t) {
                n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
            }), n
        }
    }();
    y.mq = R, Modernizr.addTest("mediaqueries", R("only all"));
    var A = {
        style: S.elem.style
    };
    Modernizr._q.unshift(function() {
        delete A.style
    });
    var j = "Moz O ms Webkit",
        E = y._config.usePrefixes ? j.split(" ") : [];
    y._cssomPrefixes = E;
    var O = function(t) {
        var r, i = k.length,
            s = e.CSSRule;
        if ("undefined" == typeof s) return n;
        if (!t) return !1;
        if (t = t.replace(/^@/, ""), r = t.replace(/-/g, "_").toUpperCase() + "_RULE", r in s) return "@" + t;
        for (var o = 0; i > o; o++) {
            var a = k[o],
                d = a.toUpperCase() + "_" + r;
            if (d in s) return "@-" + a.toLowerCase() + "-" + t
        }
        return !1
    };
    y.atRule = O;
    var L = y._config.usePrefixes ? j.toLowerCase().split(" ") : [];
    y._domPrefixes = L;
    var N = y.testProp = function(e, t, r) {
        return h([e], n, t, r)
    };
    Modernizr.addTest("textshadow", N("textShadow", "1px 1px")), y.testAllProps = g, y.testAllProps = x, Modernizr.addTest("cssanimations", x("animationName", "a", !0)), Modernizr.addTest("csspseudoanimations", function() {
            var t = !1;
            if (!Modernizr.cssanimations || !e.getComputedStyle) return t;
            var n = ["@", Modernizr._prefixes.join("keyframes csspseudoanimations { from { font-size: 10px; } }@").replace(/\@$/, ""), '#modernizr:before { content:" "; font-size:5px;', Modernizr._prefixes.join("animation:csspseudoanimations 1ms infinite;"), "}"].join("");
            return Modernizr.testStyles(n, function(n) {
                t = "10px" === e.getComputedStyle(n, ":before").getPropertyValue("font-size")
            }), t
        }), Modernizr.addTest("appearance", x("appearance")), Modernizr.addTest("backdropfilter", x("backdropFilter")), Modernizr.addTest("backgroundcliptext", function() {
            return x("backgroundClip", "text")
        }), Modernizr.addTest("bgpositionxy", function() {
            return x("backgroundPositionX", "3px", !0) && x("backgroundPositionY", "5px", !0)
        }), Modernizr.addTest("bgrepeatround", x("backgroundRepeat", "round")), Modernizr.addTest("bgrepeatspace", x("backgroundRepeat", "space")), Modernizr.addTest("backgroundsize", x("backgroundSize", "100%", !0)), Modernizr.addTest("bgsizecover", x("backgroundSize", "cover")), Modernizr.addTest("borderradius", x("borderRadius", "0px", !0)), Modernizr.addTest("boxshadow", x("boxShadow", "1px 1px", !0)), Modernizr.addTest("boxsizing", x("boxSizing", "border-box", !0) && (t.documentMode === n || t.documentMode > 7)),
        function() {
            Modernizr.addTest("csscolumns", function() {
                var e = !1,
                    t = x("columnCount");
                try {
                    (e = !!t) && (e = new Boolean(e))
                } catch (n) {}
                return e
            });
            for (var e, t, n = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], r = 0; r < n.length; r++) e = n[r].toLowerCase(), t = x("column" + n[r]), ("breakbefore" === e || "breakafter" === e || "breakinside" == e) && (t = t || x(n[r])), Modernizr.addTest("csscolumns." + e, t)
        }(), Modernizr.addTest("ellipsis", x("textOverflow", "ellipsis")), Modernizr.addTest("cssfilters", function() {
            if (Modernizr.supports) return x("filter", "blur(2px)");
            var e = o("a");
            return e.style.cssText = k.join("filter:blur(2px); "), !!e.style.length && (t.documentMode === n || t.documentMode > 9)
        }), Modernizr.addTest("flexbox", x("flexBasis", "1px", !0)), Modernizr.addTest("flexboxlegacy", x("boxDirection", "reverse", !0)), Modernizr.addTest("flexboxtweener", x("flexAlign", "end", !0)), Modernizr.addTest("flexwrap", x("flexWrap", "wrap", !0)), Modernizr.addTest("cssmask", x("maskRepeat", "repeat-x", !0)), Modernizr.addTest("overflowscrolling", x("overflowScrolling", "touch", !0)), Modernizr.addTest("cssresize", x("resize", "both", !0)), Modernizr.addTest("shapes", x("shapeOutside", "content-box", !0)), Modernizr.addTest("textalignlast", x("textAlignLast")), Modernizr.addTest("csstransforms", function() {
            return -1 === navigator.userAgent.indexOf("Android 2.") && x("transform", "scale(1)", !0)
        }), Modernizr.addTest("csstransforms3d", function() {
            var e = !!x("perspective", "1px", !0),
                t = Modernizr._config.usePrefixes;
            if (e && (!t || "webkitPerspective" in z.style)) {
                var n, r = "#modernizr{width:0;height:0}";
                Modernizr.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", _(r + n, function(t) {
                    e = 7 === t.offsetWidth && 18 === t.offsetHeight
                })
            }
            return e
        }), Modernizr.addTest("preserve3d", x("transformStyle", "preserve-3d")), Modernizr.addTest("csstransitions", x("transition", "all", !0)), Modernizr.addTest("csspseudotransitions", function() {
            var t = !1;
            if (!Modernizr.csstransitions || !e.getComputedStyle) return t;
            var n = '#modernizr:before { content:" "; font-size:5px;' + Modernizr._prefixes.join("transition:0s 100s;") + "}#modernizr.trigger:before { font-size:10px; }";
            return Modernizr.testStyles(n, function(n) {
                e.getComputedStyle(n, ":before").getPropertyValue("font-size"), n.className += "trigger", t = "5px" === e.getComputedStyle(n, ":before").getPropertyValue("font-size")
            }), t
        }), Modernizr.addTest("userselect", x("userSelect", "none", !0));
    var W = y.prefixed = function(e, t, n) {
        return 0 === e.indexOf("@") ? O(e) : (-1 != e.indexOf("-") && (e = a(e)), t ? g(e, t, n) : g(e, "pfx"))
    };
    Modernizr.addTest("backgroundblendmode", W("backgroundBlendMode", "text")), Modernizr.addTest("wrapflow", function() {
        var e = W("wrapFlow");
        if (!e || C) return !1;
        var t = e.replace(/([A-Z])/g, function(e, t) {
                return "-" + t.toLowerCase()
            }).replace(/^ms-/, "-ms-"),
            r = o("div"),
            i = o("div"),
            s = o("span");
        i.style.cssText = "position: absolute; left: 50px; width: 100px; height: 20px;" + t + ":end;", s.innerText = "X", r.appendChild(i), r.appendChild(s), z.appendChild(r);
        var a = s.offsetLeft;
        return z.removeChild(r), i = s = r = n, 150 == a
    }), i(), s(v), delete y.addTest, delete y.addAsyncTest;
    for (var B = 0; B < Modernizr._q.length; B++) Modernizr._q[B]();
    e.Modernizr = Modernizr
}(window, document);