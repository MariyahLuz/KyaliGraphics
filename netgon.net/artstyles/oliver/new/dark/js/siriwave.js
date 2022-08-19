! function() {
    function t(t) {
        this.controller = t.controller, this.definition = t.definition, this.tick = 0, this._respawn()
    }

    function i(t) {
        this.controller = t.controller, this.definition = t.definition
    }

    function e(e) {
        e = e || {}, this.phase = 0, this.run = !1, this.cache = {}, null == e.container && (console.warn("SiriWaveJS: no container defined, using body"), e.container = document.body), this.style = e.style || "ios", this.container = e.container, this.width = e.width || window.getComputedStyle(this.container).width.replace("px", ""), this.height = e.height || window.getComputedStyle(this.container).height.replace("px", ""), this.ratio = e.ratio || window.devicePixelRatio || 1, this.cache.width = this.ratio * this.width, this.cache.height = this.ratio * this.height, this.cache.height2 = this.cache.height / 2, this.cache.width2 = this.cache.width / 2, this.cache.width4 = this.cache.width / 4, this.cache.heightMax = this.cache.height2 - 4, this.amplitude = void 0 == e.amplitude ? 1 : e.amplitude, this.speed = void 0 == e.speed ? .2 : e.speed, this.frequency = void 0 == e.frequency ? 6 : e.frequency, this.color = this._hex2rgb(e.color || "#fff"), this.speedInterpolationSpeed = e.speedInterpolationSpeed || .005, this.amplitudeInterpolationSpeed = e.amplitudeInterpolationSpeed || .05, this.cache.interpolation = {
            speed: this.speed,
            amplitude: this.amplitude
        }, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = this.cache.width, this.canvas.height = this.cache.height, e.cover ? this.canvas.style.width = this.canvas.style.height = "100%" : (this.canvas.style.width = this.cache.width / this.ratio + "px", this.canvas.style.height = this.cache.height / this.ratio + "px"), this.curves = [];
        var o = 0,
            h = 0;
        if ("ios9" === this.style)
            for (; o < t.prototype.definition.length; o++)
                for (h = 0; h < 3 * Math.random() | 0; h++) this.curves.push(new t({
                    controller: this,
                    definition: t.prototype.definition[o]
                }));
        else
            for (; o < i.prototype.definition.length; o++) this.curves.push(new i({
                controller: this,
                definition: i.prototype.definition[o]
            }));
        this.container.appendChild(this.canvas), e.autostart && this.start()
    }
    t.prototype._respawn = function() {
        this.amplitude = .3 + .7 * Math.random(), this.seed = Math.random(), this.openClass = 2 + 3 * Math.random() | 0
    }, t.prototype._ypos = function(t) {
        var i = this.tick,
            e = -1 * Math.abs(Math.sin(i)) * this.controller.amplitude * this.amplitude * this.controller.cache.heightMax * Math.pow(1 / (1 + Math.pow(this.openClass * t, 2)), 2);
        return Math.abs(e) < .001 && this._respawn(), e
    }, t.prototype._draw = function(t) {
        var i = this.controller.ctx;
        this.tick += this.controller.speed * (1 - .5 * Math.sin(this.seed * Math.PI)), i.beginPath();
        for (var e, o, h = this.controller.cache.width2 + (-this.controller.cache.width4 + this.seed * this.controller.cache.width2), n = this.controller.cache.height2, a = null, s = -3; s <= 3; s += .01) e = h + s * this.controller.cache.width4, o = n + (t || 1) * this._ypos(s), a = a || e, i.lineTo(e, o);
        var r = Math.abs(this._ypos(0)),
            c = i.createRadialGradient(h, n, 1.15 * r, h, n, .3 * r);
        c.addColorStop(0, "rgba(" + this.definition.color + ", 0.4)"), c.addColorStop(1, "rgba(" + this.definition.color + ", 0.2)"), i.fillStyle = c, i.lineTo(a, n), i.closePath(), i.fill()
    }, t.prototype.draw = function() {
        this._draw(-1), this._draw(1)
    }, t.prototype.definition = [{
        color: "32,133,252"
    }, {
        color: "94,252,169"
    }, {
        color: "253,71,103"
    }], i.prototype._globAttenuationEquation = function(t) {
        return null == i.prototype._globAttenuationEquation.cache[t] && (i.prototype._globAttenuationEquation.cache[t] = Math.pow(4 / (4 + Math.pow(t, 4)), 4)), i.prototype._globAttenuationEquation.cache[t]
    }, i.prototype._globAttenuationEquation.cache = {}, i.prototype._xpos = function(t) {
        return this.controller.cache.width2 + t * this.controller.cache.width4
    }, i.prototype._ypos = function(t) {
        var i = this.controller.cache.heightMax * this.controller.amplitude / this.definition.attenuation;
        return this.controller.cache.height2 + this._globAttenuationEquation(t) * i * Math.sin(this.controller.frequency * t - this.controller.phase)
    }, i.prototype.draw = function() {
        var t = this.controller.ctx;
        t.moveTo(0, 0), t.beginPath(), t.strokeStyle = "rgba(" + this.controller.color + "," + this.definition.opacity + ")", t.lineWidth = this.definition.lineWidth;
        for (var i = -2; i <= 2; i += .01) {
            var e = this._ypos(i);
            Math.abs(i) >= 1.9 && (e = this.controller.cache.height2), t.lineTo(this._xpos(i), e)
        }
        t.stroke()
    }, i.prototype.definition = [{
        attenuation: -2,
        lineWidth: 1,
        opacity: .1
    }, {
        attenuation: -6,
        lineWidth: 1,
        opacity: .2
    }, {
        attenuation: 4,
        lineWidth: 1,
        opacity: .4
    }, {
        attenuation: 2,
        lineWidth: 1,
        opacity: .6
    }, {
        attenuation: 1,
        lineWidth: 1.5,
        opacity: 1
    }], e.prototype._hex2rgb = function(t) {
        var i = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        t = t.replace(i, function(t, i, e, o) {
            return i + i + e + e + o + o
        });
        var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return e ? parseInt(e[1], 16).toString() + "," + parseInt(e[2], 16).toString() + "," + parseInt(e[3], 16).toString() : null
    }, e.prototype._interpolate = function(t) {
        increment = this[t + "InterpolationSpeed"], Math.abs(this.cache.interpolation[t] - this[t]) <= increment ? this[t] = this.cache.interpolation[t] : this.cache.interpolation[t] > this[t] ? this[t] += increment : this[t] -= increment
    }, e.prototype._clear = function() {
        this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillRect(0, 0, this.cache.width, this.cache.height), this.ctx.globalCompositeOperation = "source-over"
    }, e.prototype._draw = function() {
        for (var t = 0, i = this.curves.length; t < i; t++) this.curves[t].draw()
    }, e.prototype._startDrawCycle = function() {
        !1 !== this.run && (this._clear(), this._interpolate("amplitude"), this._interpolate("speed"), this._draw(), this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI), window.requestAnimationFrame ? window.requestAnimationFrame(this._startDrawCycle.bind(this)) : setTimeout(this._startDrawCycle.bind(this), 20))
    }, e.prototype.start = function() {
        this.phase = 0, this.run = !0, this._startDrawCycle()
    }, e.prototype.stop = function() {
        this.phase = 0, this.run = !1
    }, e.prototype.setSpeed = function(t, i) {
        this.cache.interpolation.speed = t
    }, e.prototype.setAmplitude = function(t) {
        this.cache.interpolation.amplitude = Math.max(Math.min(t, 1), 0)
    }, "function" == typeof define && define.amd ? define(function() {
        return e
    }) : window.SiriWave = e
}();
//init
var siriWave = new SiriWave({
    container: document.getElementById('wave'),
    speed: 0.02,
    color: '#fff',
    frequency: 4,
    autostart: true,
    amplitude: 0
});

setTimeout(function() {
    siriWave.setAmplitude(1);
}, 1000);