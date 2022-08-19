/*!
 * pep.js
 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : a.Dragdealer = b()
}(this, function() {
    function j(a) {
        var b = "Webkit Moz ms O".split(" "),
            c = document.documentElement.style;
        if (void 0 !== c[a]) return a;
        a = a.charAt(0).toUpperCase() + a.substr(1);
        for (var d = 0; d < b.length; d++)
            if (void 0 !== c[b[d] + a]) return b[d] + a
    }

    function k(a) {
        i.backfaceVisibility && i.perspective && (a.style[i.perspective] = "1000px", a.style[i.backfaceVisibility] = "hidden")
    }
    var a = function(a, b) {
        this.options = this.applyDefaults(b || {}), this.bindMethods(), this.wrapper = this.getWrapperElement(a), this.wrapper && (this.handle = this.getHandleElement(this.wrapper, this.options.handleClass), this.handle && (this.init(), this.bindEventListeners()))
    };
    a.prototype = {
        defaults: {
            disabled: !1,
            horizontal: !0,
            vertical: !1,
            slide: !0,
            steps: 0,
            snap: !1,
            loose: !1,
            speed: .1,
            xPrecision: 0,
            yPrecision: 0,
            handleClass: "handle",
            css3: !0,
            activeClass: "active",
            tapping: !0
        },
        init: function() {
            this.options.css3 && k(this.handle), this.value = {
                prev: [-1, -1],
                current: [this.options.x || 0, this.options.y || 0],
                target: [this.options.x || 0, this.options.y || 0]
            }, this.offset = {
                wrapper: [0, 0],
                mouse: [0, 0],
                prev: [-999999, -999999],
                current: [0, 0],
                target: [0, 0]
            }, this.change = [0, 0], this.stepRatios = this.calculateStepRatios(), this.activity = !1, this.dragging = !1, this.tapping = !1, this.reflow(), this.options.disabled && this.disable()
        },
        applyDefaults: function(a) {
            for (var b in this.defaults) a.hasOwnProperty(b) || (a[b] = this.defaults[b]);
            return a
        },
        getWrapperElement: function(a) {
            return "string" == typeof a ? document.getElementById(a) : a
        },
        getHandleElement: function(a, b) {
            var c, d, e;
            if (a.getElementsByClassName) {
                if (c = a.getElementsByClassName(b), c.length > 0) return c[0]
            } else
                for (d = new RegExp("(^|\\s)" + b + "(\\s|$)"), c = a.getElementsByTagName("*"), e = 0; e < c.length; e++)
                    if (d.test(c[e].className)) return c[e]
        },
        calculateStepRatios: function() {
            var a = [];
            if (this.options.steps >= 1)
                for (var b = 0; b <= this.options.steps - 1; b++) a[b] = this.options.steps > 1 ? b / (this.options.steps - 1) : 0;
            return a
        },
        setWrapperOffset: function() {
            this.offset.wrapper = h.get(this.wrapper)
        },
        calculateBounds: function() {
            var a = {
                top: this.options.top || 0,
                bottom: -(this.options.bottom || 0) + this.wrapper.offsetHeight,
                left: this.options.left || 0,
                right: -(this.options.right || 0) + this.wrapper.offsetWidth
            };
            return a.availWidth = a.right - a.left - this.handle.offsetWidth, a.availHeight = a.bottom - a.top - this.handle.offsetHeight, a
        },
        calculateValuePrecision: function() {
            var a = this.options.xPrecision || Math.abs(this.bounds.availWidth),
                b = this.options.yPrecision || Math.abs(this.bounds.availHeight);
            return [a ? 1 / a : 0, b ? 1 / b : 0]
        },
        bindMethods: function() {
            this.requestAnimationFrame = "function" == typeof this.options.customRequestAnimationFrame ? b(this.options.customRequestAnimationFrame, window) : b(m, window), this.cancelAnimationFrame = "function" == typeof this.options.customCancelAnimationFrame ? b(this.options.customCancelAnimationFrame, window) : b(n, window), this.animateWithRequestAnimationFrame = b(this.animateWithRequestAnimationFrame, this), this.animate = b(this.animate, this), this.onHandleMouseDown = b(this.onHandleMouseDown, this), this.onHandleTouchStart = b(this.onHandleTouchStart, this), this.onDocumentMouseMove = b(this.onDocumentMouseMove, this), this.onWrapperTouchMove = b(this.onWrapperTouchMove, this), this.onWrapperMouseDown = b(this.onWrapperMouseDown, this), this.onWrapperTouchStart = b(this.onWrapperTouchStart, this), this.onDocumentMouseUp = b(this.onDocumentMouseUp, this), this.onDocumentTouchEnd = b(this.onDocumentTouchEnd, this), this.onHandleClick = b(this.onHandleClick, this), this.onWindowResize = b(this.onWindowResize, this)
        },
        bindEventListeners: function() {
            c(this.handle, "mousedown", this.onHandleMouseDown), c(this.handle, "touchstart", this.onHandleTouchStart), c(document, "mousemove", this.onDocumentMouseMove), c(this.wrapper, "touchmove", this.onWrapperTouchMove), c(this.wrapper, "mousedown", this.onWrapperMouseDown), c(this.wrapper, "touchstart", this.onWrapperTouchStart), c(document, "mouseup", this.onDocumentMouseUp), c(document, "touchend", this.onDocumentTouchEnd), c(this.handle, "click", this.onHandleClick), c(window, "resize", this.onWindowResize), this.animate(!1, !0), this.interval = this.requestAnimationFrame(this.animateWithRequestAnimationFrame)
        },
        unbindEventListeners: function() {
            d(this.handle, "mousedown", this.onHandleMouseDown), d(this.handle, "touchstart", this.onHandleTouchStart), d(document, "mousemove", this.onDocumentMouseMove), d(this.wrapper, "touchmove", this.onWrapperTouchMove), d(this.wrapper, "mousedown", this.onWrapperMouseDown), d(this.wrapper, "touchstart", this.onWrapperTouchStart), d(document, "mouseup", this.onDocumentMouseUp), d(document, "touchend", this.onDocumentTouchEnd), d(this.handle, "click", this.onHandleClick), d(window, "resize", this.onWindowResize), this.cancelAnimationFrame(this.interval)
        },
        onHandleMouseDown: function(a) {
            g.refresh(a), e(a), f(a), this.activity = !1, this.startDrag()
        },
        onHandleTouchStart: function(a) {
            g.refresh(a), f(a), this.activity = !1, this.startDrag()
        },
        onDocumentMouseMove: function(a) {
            g.refresh(a), this.dragging && (this.activity = !0, e(a))
        },
        onWrapperTouchMove: function(a) {
            return g.refresh(a), !this.activity && this.draggingOnDisabledAxis() ? (this.dragging && this.stopDrag(), void 0) : (e(a), this.activity = !0, void 0)
        },
        onWrapperMouseDown: function(a) {
            g.refresh(a), e(a), this.startTap()
        },
        onWrapperTouchStart: function(a) {
            g.refresh(a), e(a), this.startTap()
        },
        onDocumentMouseUp: function() {
            this.stopDrag(), this.stopTap()
        },
        onDocumentTouchEnd: function() {
            this.stopDrag(), this.stopTap()
        },
        onHandleClick: function(a) {
            this.activity && (e(a), f(a))
        },
        onWindowResize: function() {
            this.reflow()
        },
        enable: function() {
            this.disabled = !1, this.handle.className = this.handle.className.replace(/\s?disabled/g, "")
        },
        disable: function() {
            this.disabled = !0, this.handle.className += " disabled"
        },
        reflow: function() {
            this.setWrapperOffset(), this.bounds = this.calculateBounds(), this.valuePrecision = this.calculateValuePrecision(), this.updateOffsetFromValue()
        },
        getStep: function() {
            return [this.getStepNumber(this.value.target[0]), this.getStepNumber(this.value.target[1])]
        },
        getValue: function() {
            return this.value.target
        },
        setStep: function(a, b, c) {
            this.setValue(this.options.steps && a > 1 ? (a - 1) / (this.options.steps - 1) : 0, this.options.steps && b > 1 ? (b - 1) / (this.options.steps - 1) : 0, c)
        },
        setValue: function(a, b, c) {
            this.setTargetValue([a, b || 0]), c && (this.groupCopy(this.value.current, this.value.target), this.updateOffsetFromValue(), this.callAnimationCallback())
        },
        startTap: function() {
            !this.disabled && this.options.tapping && (this.tapping = !0, this.setWrapperOffset(), this.setTargetValueByOffset([g.x - this.offset.wrapper[0] - this.handle.offsetWidth / 2, g.y - this.offset.wrapper[1] - this.handle.offsetHeight / 2]))
        },
        stopTap: function() {
            !this.disabled && this.tapping && (this.tapping = !1, this.setTargetValue(this.value.current))
        },
        startDrag: function() {
            this.disabled || (this.dragging = !0, this.setWrapperOffset(), this.offset.mouse = [g.x - h.get(this.handle)[0], g.y - h.get(this.handle)[1]], this.wrapper.className.match(this.options.activeClass) || (this.wrapper.className += " " + this.options.activeClass), this.callDragStartCallback())
        },
        stopDrag: function() {
            if (!this.disabled && this.dragging) {
                this.dragging = !1;
                var a = this.groupClone(this.value.current);
                if (this.options.slide) {
                    var b = this.change;
                    a[0] += 4 * b[0], a[1] += 4 * b[1]
                }
                this.setTargetValue(a), this.wrapper.className = this.wrapper.className.replace(" " + this.options.activeClass, ""), this.callDragStopCallback()
            }
        },
        callAnimationCallback: function() {
            var a = this.value.current;
            this.options.snap && this.options.steps > 1 && (a = this.getClosestSteps(a)), this.groupCompare(a, this.value.prev) || ("function" == typeof this.options.animationCallback && this.options.animationCallback.call(this, a[0], a[1]), this.groupCopy(this.value.prev, a))
        },
        callTargetCallback: function() {
            "function" == typeof this.options.callback && this.options.callback.call(this, this.value.target[0], this.value.target[1])
        },
        callDragStartCallback: function() {
            "function" == typeof this.options.dragStartCallback && this.options.dragStartCallback.call(this, this.value.target[0], this.value.target[1])
        },
        callDragStopCallback: function() {
            "function" == typeof this.options.dragStopCallback && this.options.dragStopCallback.call(this, this.value.target[0], this.value.target[1])
        },
        animateWithRequestAnimationFrame: function(a) {
            a ? (this.timeOffset = this.timeStamp ? a - this.timeStamp : 0, this.timeStamp = a) : this.timeOffset = 25, this.animate(), this.interval = this.requestAnimationFrame(this.animateWithRequestAnimationFrame)
        },
        animate: function(a, b) {
            if (!a || this.dragging) {
                if (this.dragging) {
                    var c = this.groupClone(this.value.target),
                        d = [g.x - this.offset.wrapper[0] - this.offset.mouse[0], g.y - this.offset.wrapper[1] - this.offset.mouse[1]];
                    this.setTargetValueByOffset(d, this.options.loose), this.change = [this.value.target[0] - c[0], this.value.target[1] - c[1]]
                }(this.dragging || b) && this.groupCopy(this.value.current, this.value.target), (this.dragging || this.glide() || b) && (this.updateOffsetFromValue(), this.callAnimationCallback())
            }
        },
        glide: function() {
            var a = [this.value.target[0] - this.value.current[0], this.value.target[1] - this.value.current[1]];
            return a[0] || a[1] ? (Math.abs(a[0]) > this.valuePrecision[0] || Math.abs(a[1]) > this.valuePrecision[1] ? (this.value.current[0] += a[0] * Math.min(this.options.speed * this.timeOffset / 25, 1), this.value.current[1] += a[1] * Math.min(this.options.speed * this.timeOffset / 25, 1)) : this.groupCopy(this.value.current, this.value.target), !0) : !1
        },
        updateOffsetFromValue: function() {
            this.offset.current = this.options.snap ? this.getOffsetsByRatios(this.getClosestSteps(this.value.current)) : this.getOffsetsByRatios(this.value.current), this.groupCompare(this.offset.current, this.offset.prev) || (this.renderHandlePosition(), this.groupCopy(this.offset.prev, this.offset.current))
        },
        renderHandlePosition: function() {
            var a = "";
            return this.options.css3 && i.transform ? (this.options.horizontal && (a += "translateX(" + this.offset.current[0] + "px)"), this.options.vertical && (a += " translateY(" + this.offset.current[1] + "px)"), this.handle.style[i.transform] = a, void 0) : (this.options.horizontal && (this.handle.style.left = this.offset.current[0] + "px"), this.options.vertical && (this.handle.style.top = this.offset.current[1] + "px"), void 0)
        },
        setTargetValue: function(a, b) {
            var c = b ? this.getLooseValue(a) : this.getProperValue(a);
            this.groupCopy(this.value.target, c), this.offset.target = this.getOffsetsByRatios(c), this.callTargetCallback()
        },
        setTargetValueByOffset: function(a, b) {
            var c = this.getRatiosByOffsets(a),
                d = b ? this.getLooseValue(c) : this.getProperValue(c);
            this.groupCopy(this.value.target, d), this.offset.target = this.getOffsetsByRatios(d)
        },
        getLooseValue: function(a) {
            var b = this.getProperValue(a);
            return [b[0] + (a[0] - b[0]) / 4, b[1] + (a[1] - b[1]) / 4]
        },
        getProperValue: function(a) {
            var b = this.groupClone(a);
            return b[0] = Math.max(b[0], 0), b[1] = Math.max(b[1], 0), b[0] = Math.min(b[0], 1), b[1] = Math.min(b[1], 1), (!this.dragging && !this.tapping || this.options.snap) && this.options.steps > 1 && (b = this.getClosestSteps(b)), b
        },
        getRatiosByOffsets: function(a) {
            return [this.getRatioByOffset(a[0], this.bounds.availWidth, this.bounds.left), this.getRatioByOffset(a[1], this.bounds.availHeight, this.bounds.top)]
        },
        getRatioByOffset: function(a, b, c) {
            return b ? (a - c) / b : 0
        },
        getOffsetsByRatios: function(a) {
            return [this.getOffsetByRatio(a[0], this.bounds.availWidth, this.bounds.left), this.getOffsetByRatio(a[1], this.bounds.availHeight, this.bounds.top)]
        },
        getOffsetByRatio: function(a, b, c) {
            return Math.round(a * b) + c
        },
        getStepNumber: function(a) {
            return this.getClosestStep(a) * (this.options.steps - 1) + 1
        },
        getClosestSteps: function(a) {
            return [this.getClosestStep(a[0]), this.getClosestStep(a[1])]
        },
        getClosestStep: function(a) {
            for (var b = 0, c = 1, d = 0; d <= this.options.steps - 1; d++) Math.abs(this.stepRatios[d] - a) < c && (c = Math.abs(this.stepRatios[d] - a), b = d);
            return this.stepRatios[b]
        },
        groupCompare: function(a, b) {
            return a[0] == b[0] && a[1] == b[1]
        },
        groupCopy: function(a, b) {
            a[0] = b[0], a[1] = b[1]
        },
        groupClone: function(a) {
            return [a[0], a[1]]
        },
        draggingOnDisabledAxis: function() {
            return !this.options.horizontal && g.xDiff > g.yDiff || !this.options.vertical && g.yDiff > g.xDiff
        }
    };
    for (var b = function(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }, c = function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
        }, d = function(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
        }, e = function(a) {
            a || (a = window.event), a.preventDefault && a.preventDefault(), a.returnValue = !1
        }, f = function(a) {
            a || (a = window.event), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
        }, g = {
            x: 0,
            y: 0,
            xDiff: 0,
            yDiff: 0,
            refresh: function(a) {
                a || (a = window.event), "mousemove" == a.type ? this.set(a) : a.touches && this.set(a.touches[0])
            },
            set: function(a) {
                var b = this.x,
                    c = this.y;
                a.clientX || a.clientY ? (this.x = a.clientX, this.y = a.clientY) : (a.pageX || a.pageY) && (this.x = a.pageX - document.body.scrollLeft - document.documentElement.scrollLeft, this.y = a.pageY - document.body.scrollTop - document.documentElement.scrollTop), this.xDiff = Math.abs(this.x - b), this.yDiff = Math.abs(this.y - c)
            }
        }, h = {
            get: function(a) {
                var b = {
                    left: 0,
                    top: 0
                };
                return void 0 !== a.getBoundingClientRect && (b = a.getBoundingClientRect()), [b.left, b.top]
            }
        }, i = {
            transform: j("transform"),
            perspective: j("perspective"),
            backfaceVisibility: j("backfaceVisibility")
        }, l = ["webkit", "moz"], m = window.requestAnimationFrame, n = window.cancelAnimationFrame, o = 0; o < l.length && !m; ++o) m = window[l[o] + "RequestAnimationFrame"], n = window[l[o] + "CancelAnimationFrame"] || window[l[o] + "CancelRequestAnimationFrame"];
    return m || (m = function(a) {
        return setTimeout(a, 25)
    }, n = clearTimeout), a
});

/*!
 * Elastic border
 */
$(".elastic-border").each(function(t) {
    function s(t, i, o) {
        this.x = t, this.ix = t, this.vx = 0, this.cx = 0, this.y = i, this.iy = i, this.cy = 0, this.canvas = o
    }

    function h() {
        var t = $(".elastic-border"),
            i = t.get(0).getContext("2d");
        for (a = requestAnimationFrame(h), i.clearRect(0, 0, t.width(), t.height()), i.fillStyle = l.leftColor, i.fillRect(0, 0, t.width(), t.height()), o = 0; o <= l.totalPoints - 1; o++) n[o].move();
        for (i.fillStyle = l.rightColor, i.strokeStyle = l.rightColor, i.lineWidth = 1, i.beginPath(), i.moveTo($(window).width() / 2, 0), o = 0; o <= l.totalPoints - 1; o++) e = n[o], null != n[o + 1] ? (e.cx = (e.x + n[o + 1].x) / 2 - 1e-4, e.cy = (e.y + n[o + 1].y) / 2) : (e.cx = e.ix, e.cy = e.iy), i.bezierCurveTo(e.x, e.y, e.cx, e.cy, e.cx, e.cy);
        if (i.lineTo($(window).width(), $(window).height()), i.lineTo($(window).width(), 0), i.closePath(), i.fill(), l.showIndicators) {
            for (i.fillStyle = "#000", i.beginPath(), o = 0; o <= l.totalPoints - 1; o++) e = n[o], i.rect(e.x - 2, e.y - 2, 4, 4);
            i.fill(), i.fillStyle = "#fff", i.beginPath();
            for (var o = 0; o <= l.totalPoints - 1; o++) {
                var e = n[o];
                i.rect(e.cx - 1, e.cy - 1, 2, 2)
            }
            i.fill()
        }
    }
    var n = [],
        a = null,
        l = new function() {
            this.totalPoints = 2, this.viscosity = 10, this.mouseDist = 100, this.damping = .05, this.showIndicators = !1, this.leftColor = "#ffffff", this.rightColor = "#110f10"
        },
        e = 0,
        r = 0,
        i = 0,
        o = 0,
        c = 0,
        f = 0;
    $(document).on("mousemove", function(t) {
            c = e < t.pageX ? 1 : e > t.pageX ? -1 : 0, r < t.pageY ? 1 : r > t.pageY ? -1 : 0, e = t.pageX, r = t.pageY
        }),
        function t() {
            f = e - i, r - o, i = e, o = r, setTimeout(t, 50)
        }(), s.prototype.move = function() {
            this.vx += (this.ix - this.x) / l.viscosity;
            var t = this.ix - e,
                i = this.y - r,
                o = this.canvas.data("gap");
            (0 < c && e > this.x || c < 0 && e < this.x) && Math.sqrt(t * t) < l.mouseDist && Math.sqrt(i * i) < o && (this.vx = f / 8), this.vx *= 1 - l.damping, this.x += this.vx
        }, $(window).on("resize", function() {
            ! function() {
                var t = $(".elastic-border");
                t.get(0).getContext("2d"), cancelAnimationFrame(a), $(".elastic-border").get(0).width = $(window).width(), $(".elastic-border").get(0).height = $(window).height(), n = [];
                for (var i = t.height() / (l.totalPoints - 1), o = $(window).width() / 2, e = 0; e <= l.totalPoints - 1; e++) n.push(new s(o, e * i, t));
                h(), t.data("gap", i)
            }()
        }).trigger("resize")
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

/*-----------------------------------------------------------------
  Preloader
-------------------------------------------------------------------*/

$('body').imagesLoaded({
    background: !0
}).always(function(e) {
    setTimeout(function() {
        $(".loading").animate({
            opacity: 0,
            left: "100%"
        }, 600);
    }, 2000);
});