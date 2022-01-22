(function () {
	function aa(a, b) {
		return function () {
			return a.apply(b, arguments)
		}
	}

	function s() { }

	function t() {
		return t.__super__.constructor.apply(this, arguments)
	}

	function ba() {
		this.progress = 0
	}

	function e() {
		this.bindings = {}
	}

	function o() {
		function a(a) {
			var c = a.open;
			return a.open = function (d, f) {
				return I(d) && b.trigger("request", {
					type: d,
					url: f,
					request: a
				}), c.apply(a, arguments)
			}
		}
		var b = this;
		o.__super__.constructor.apply(this, arguments), window.XMLHttpRequest = function (b) {
			return b = new U(b), a(b), b
		};
		try {
			D(window.XMLHttpRequest, U)
		} catch (a) { }
		if (null != W) {
			window.XDomainRequest = function () {
				var b = new W;
				return a(b), b
			};
			try {
				D(window.XDomainRequest, W)
			} catch (a) { }
		}
		if (null != X && C.ajax.trackWebSockets) {
			window.WebSocket = function (a, c) {
				var d = null == c ? new X(a) : new X(a, c);
				return I("socket") && b.trigger("request", {
					type: "socket",
					url: a,
					protocols: c,
					request: d
				}), d
			};
			try {
				D(window.WebSocket, X)
			} catch (a) { }
		}
	}

	function n() {
		this.complete = aa(this.complete, this);
		var a = this;
		this.elements = [], da().on("request", function () {
			return a.watch.apply(a, arguments)
		})
	}

	function r(a) {
		var b;
		null == a && (a = {}), this.complete = aa(this.complete, this), this.elements = [], null == a.selectors && (a.selectors = []);
		for (var c = 0, d = (b = a.selectors).length; c < d; c++) a = b[c], this.elements.push(new Q(a, this.complete))
	}

	function a(a, b) {
		this.selector = a, this.completeCallback = b, this.progress = 0, this.check()
	}

	function u() {
		var a, b = this;
		this.progress = null == (a = this.states[document.readyState]) ? 100 : a;
		var c = document.onreadystatechange;
		document.onreadystatechange = function () {
			return null != b.states[document.readyState] && (b.progress = b.states[document.readyState]), "function" == typeof c ? c.apply(null, arguments) : void 0
		}
	}

	function ca(a) {
		this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = C.initialRate, this.progress = this.lastProgress = this.catchup = 0, null != this.source && (this.progress = l(this.source, "progress"))
	}

	function m() {
		var a;
		return null == (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? +new Date : a
	}

	function c(a, b, c) {
		if ("function" == typeof a.addEventListener) return a.addEventListener(b, c, !1);
		var d;
		"function" != typeof a["on" + b] || "object" != typeof a["on" + b].eventListeners ? (d = new ra, "function" == typeof a["on" + b] && d.on(b, a["on" + b]), a["on" + b] = function (a) {
			return d.trigger(b, a)
		}, a["on" + b].eventListeners = d) : d = a["on" + b].eventListeners, d.on(b, c)
	}

	function l() {
		var a = arguments[0],
			b = arguments[1],
			c = 3 <= arguments.length ? ma.call(arguments, 2) : [];
		return "function" == typeof a[b] ? a[b].apply(a, c) : a[b]
	}

	function y(a) {
		for (var b, c = C.ajax.ignoreURLs, d = 0, f = c.length; d < f; d++)
			if ("string" == typeof (b = c[d])) {
				if (-1 !== a.indexOf(b)) return 1;
			} else if (b.test(a)) return 1
	}

	function E() {
		return C.restartOnPushState && qa.restart()
	}
	var G, Z, da, ea, fa, ga, ha, ia, ja, ka, la, ma = [].slice,
		L = {}.hasOwnProperty,
		x = function (a, b) {
			function c() {
				this.constructor = a
			}
			for (var d in b) L.call(b, d) && (a[d] = b[d]);
			return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
		},
		na = [].indexOf || function (a) {
			for (var b = 0, c = this.length; b < c; b++)
				if (b in this && this[b] === a) return b;
			return -1
		},
		T = {
			className: "",
			catchupTime: 100,
			initialRate: .03,
			minTime: 250,
			ghostTime: 100,
			maxProgressPerFrame: 20,
			easeFactor: 1.25,
			startOnPageLoad: !0,
			restartOnPushState: !0,
			restartOnRequestAfter: 500,
			target: "body",
			elements: {
				checkInterval: 100,
				selectors: ["body"]
			},
			eventLag: {
				minSamples: 10,
				sampleCount: 3,
				lagThreshold: 3
			},
			ajax: {
				trackMethods: ["GET"],
				trackWebSockets: !0,
				ignoreURLs: []
			}
		},
		R = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
		oa = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	null == R && (R = function (a) {
		return setTimeout(a, 50)
	}, oa = function (a) {
		return clearTimeout(a)
	});
	var pa = function () {
		for (var a, b, c, d = arguments[0], f = 2 <= arguments.length ? ma.call(arguments, 1) : [], g = 0, h = f.length; g < h; g++)
			if (b = f[g])
				for (a in b) L.call(b, a) && (c = b[a], null != d[a] && "object" == typeof d[a] && null != c && "object" == typeof c ? pa(d[a], c) : d[a] = c);
		return d
	},
		M = function (a, b) {
			var c;
			if (null == a && (a = "options"), null == b && (b = !0), c = document.querySelector("[data-pace-" + a + "]")) {
				if (c = c.getAttribute("data-pace-" + a), !b) return c;
				try {
					return JSON.parse(c)
				} catch (a) {
					return "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", a) : void 0
				}
			}
		};
	s.prototype.on = function (a, b, c, d) {
		var e;
		return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({
			handler: b,
			ctx: c,
			once: d
		})
	}, s.prototype.once = function (a, b, c) {
		return this.on(a, b, c, !0)
	}, s.prototype.off = function (a, b) {
		var c, d;
		if (null != (null == (c = this.bindings) ? void 0 : c[a])) {
			if (null == b) return delete this.bindings[a];
			for (c = 0, d = []; c < this.bindings[a].length;) this.bindings[a][c].handler === b ? d.push(this.bindings[a].splice(c, 1)) : d.push(c++);
			return d
		}
	}, s.prototype.trigger = function () {
		var a = arguments[0],
			b = 2 <= arguments.length ? ma.call(arguments, 1) : [];
		if (null != (f = this.bindings) && f[a]) {
			for (var c = 0, d = []; c < this.bindings[a].length;) {
				var e = (g = this.bindings[a][c]).handler,
					f = g.ctx,
					g = g.once;
				e.apply(null == f ? this : f, b), g ? d.push(this.bindings[a].splice(c, 1)) : d.push(c++)
			}
			return d
		}
	};
	var qa = window.Pace || {};
	window.Pace = qa, pa(qa, s.prototype);
	for (var C = qa.options = pa({}, T, window.paceOptions, M()), M = 0, N = (ka = ["ajax", "document", "eventLag", "elements"]).length; M < N; M++) !0 === C[ga = ka[M]] && (C[ga] = T[ga]);
	x(t, Error);
	var _ = t;
	ba.prototype.getElement = function () {
		var a;
		if (null == this.el) {
			if (!(a = document.querySelector(C.target))) throw new _;
			this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/(pace-done )|/, "pace-running "), this.el.innerHTML = "<div class=\"pace-progress" + ("" === C.className ? "" : " " + C.className) + "\">\n  <div class=\"pace-progress-inner\"></div>\n</div>\n<div class=\"pace-activity\"></div>", null == a.firstChild ? a.appendChild(this.el) : a.insertBefore(this.el, a.firstChild)
		}
		return this.el
	}, ba.prototype.finish = function () {
		var a = this.getElement();
		return a.className = a.className.replace("pace-active", "pace-inactive"), document.body.className = document.body.className.replace("pace-running ", "pace-done ")
	}, ba.prototype.update = function (a) {
		return this.progress = a, qa.trigger("progress", a), this.render()
	}, ba.prototype.destroy = function () {
		try {
			this.getElement().parentNode.removeChild(this.getElement())
		} catch (a) {
			_ = a
		}
		return this.el = void 0
	}, ba.prototype.render = function () {
		var a, b;
		if (null == document.querySelector(C.target)) return !1;
		var c = document.querySelector(".rtl"),
			d = this.getElement(),
			f = 0;
		for (o = c ? "translate3d(-" + this.progress + "%, 0, 0)" : "translate3d(" + this.progress + "%, 0, 0)", c = (b = ["webkitTransform", "msTransform", "transform"]).length; f < c; f++) d.children[0].style[b[f]] = o;
		return (!this.lastRenderedProgress || 0 | this.lastRenderedProgress | 0 !== this.progress) && (d.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), 100 <= this.progress ? a = "99" : (a = 10 > this.progress ? "0" : "", a += 0 | this.progress), d.children[0].setAttribute("data-progress", "" + a)), qa.trigger("change", this.progress), this.lastRenderedProgress = this.progress
	}, ba.prototype.done = function () {
		return 100 <= this.progress
	}, e.prototype.trigger = function (a, b) {
		var c;
		if (null != this.bindings[a]) {
			for (var d = [], e = 0, f = (c = this.bindings[a]).length; e < f; e++) d.push(c[e].call(this, b));
			return d
		}
	}, e.prototype.on = function (a, b) {
		var c;
		return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
	};
	var ra = e,
		U = window.XMLHttpRequest,
		W = window.XDomainRequest,
		X = window.WebSocket,
		D = function (a, b) {
			var c, d = [];
			for (c in b.prototype) try {
				null == a[c] && "function" != typeof b[c] ? "function" == typeof Object.defineProperty ? d.push(Object.defineProperty(a, c, {
					get: function (a) {
						return function () {
							return b.prototype[a]
						}
					}(c),
					configurable: !0,
					enumerable: !0
				})) : d.push(a[c] = b.prototype[c]) : d.push(void 0)
			} catch (a) { }
			return d
		},
		H = [];
	qa.ignore = function () {
		var a = arguments[0],
			b = 2 <= arguments.length ? ma.call(arguments, 1) : [];
		return H.unshift("ignore"), b = a.apply(null, b), H.shift(), b
	}, qa.track = function () {
		var a = arguments[0],
			b = 2 <= arguments.length ? ma.call(arguments, 1) : [];
		return H.unshift("track"), b = a.apply(null, b), H.shift(), b
	};
	var I = function (a) {
		return null == a && (a = "GET"), "track" === H[0] ? "force" : !H.length && C.ajax && ("socket" === a && C.ajax.trackWebSockets || (a = a.toUpperCase(), 0 <= na.call(C.ajax.trackMethods, a)))
	};
	x(o, ra);
	var z = null;
	(da = function () {
		return z = null == z ? new o : z
	})().on("request", function (a) {
		var b, c = a.type,
			d = a.request,
			f = a.url;
		if (!y(f)) return qa.running || !1 === C.restartOnRequestAfter && "force" !== I(c) ? void 0 : (b = arguments, "boolean" == typeof (f = C.restartOnRequestAfter || 0) && (f = 0), setTimeout(function () {
			var a;
			if ("socket" === c ? 1 > d.readyState : 0 < (e = d.readyState) && 4 > e) {
				qa.restart();
				for (var f = [], e = 0, g = (a = qa.sources).length; e < g; e++) {
					if ((ga = a[e]) instanceof sa) {
						ga.watch.apply(ga, b);
						break
					}
					f.push(void 0)
				}
				return f
			}
		}, f))
	}), n.prototype.watch = function (a) {
		var b = a.type,
			c = a.request;
		if (a = a.url, !y(a)) return c = new ("socket" === b ? K : J)(c, this.complete), this.elements.push(c)
	}, n.prototype.complete = function (a) {
		return this.elements = this.elements.filter(function (b) {
			return b !== a
		})
	};
	var sa = n,
		J = function (a, b) {
			var d, e = this;
			if (this.progress = 0, null != window.ProgressEvent) {
				c(a, "progress", function (a) {
					return a.lengthComputable ? e.progress = 100 * a.loaded / a.total : e.progress += (100 - e.progress) / 2
				});
				for (var f = 0, g = (d = ["load", "abort", "timeout", "error"]).length; f < g; f++) c(a, d[f], function () {
					return b(e), e.progress = 100
				})
			} else {
				var h = a.onreadystatechange;
				a.onreadystatechange = function () {
					var c;
					return 0 === (c = a.readyState) || 4 === c ? (b(e), e.progress = 100) : 3 === a.readyState && (e.progress = 50), "function" == typeof h ? h.apply(null, arguments) : void 0
				}
			}
		},
		K = function (a, b) {
			for (var d, e = this, f = this.progress = 0, g = (d = ["error", "open"]).length; f < g; f++) c(a, d[f], function () {
				return b(e), e.progress = 100
			})
		};
	r.prototype.complete = function (a) {
		return this.elements = this.elements.filter(function (b) {
			return b !== a
		})
	}, a.prototype.check = function () {
		var a = this;
		return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
			return a.check()
		}, C.elements.checkInterval)
	}, a.prototype.done = function () {
		return this.completeCallback(this), this.completeCallback = null, this.progress = 100
	};
	var Q = a;
	u.prototype.states = {
		loading: 0,
		interactive: 50,
		complete: 100
	}, x = function () {
		var b, d = this;
		this.progress = 0;
		var f = [],
			a = 0,
			g = m(),
			h = setInterval(function () {
				var c = m() - g - 50;
				g = m(), f.push(c), f.length > C.eventLag.sampleCount && f.shift();
				for (var i, j = c = 0, k = 0, l = f.length; k < l; k++) i = f[k], j += Math.abs(i), c++;
				return b = j / c, ++a >= C.eventLag.minSamples && b < C.eventLag.lagThreshold ? (d.progress = 100, clearInterval(h)) : d.progress = 100 * (3 / (3 + b))
			}, 50)
	}, ca.prototype.tick = function (a, b) {
		return 100 <= (b = null == b ? l(this.source, "progress") : b) && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), b = 1 - Math.pow(this.progress / 100, C.easeFactor), this.progress += b * this.rate * a, this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
	};
	var V = G = ia = Z = fa = ha = null;
	qa.running = !1, null != window.history.pushState && (ja = window.history.pushState, window.history.pushState = function () {
		return E(), ja.apply(window.history, arguments)
	}), null != window.history.replaceState && (la = window.history.replaceState, window.history.replaceState = function () {
		return E(), la.apply(window.history, arguments)
	});
	var ta = {
		ajax: sa,
		elements: r,
		document: u,
		eventLag: x
	};
	(ea = function () {
		var a, b, c;
		qa.sources = ha = [];
		for (var d = 0, f = (b = ["ajax", "elements", "document", "eventLag"]).length; d < f; d++) !1 !== C[a = b[d]] && ha.push(new ta[a](C[a]));
		for (a = 0, d = (f = null == (c = C.extraSources) ? [] : c).length; a < d; a++) ga = f[a], ha.push(new ga(C));
		return qa.bar = Z = new ba, fa = [], ia = new ca
	})(), qa.stop = function () {
		return qa.trigger("stop"), qa.running = !1, Z.destroy(), V = !0, null != G && ("function" == typeof oa && oa(G), G = null), ea()
	}, qa.restart = function () {
		return qa.trigger("restart"), qa.stop(), qa.start()
	}, qa.go = function () {
		var b, a, c, d;
		return qa.running = !0, Z.render(), b = m(), V = !1, a = function (g, j) {
			Z.progress;
			for (var e, k, q, t, v, w = k = 0, x = !0, y = q = 0, z = ha.length; q < z; y = ++q) {
				ga = ha[y];
				for (var l, A = null == fa[y] ? fa[y] = [] : fa[y], p = t = 0, B = (y = null == (v = ga.elements) ? [ga] : v).length; t < B; p = ++t) l = y[p], x &= (l = null == A[p] ? A[p] = new ca(l) : A[p]).done, l.done || (w++, k += l.tick(g))
			}
			return e = k / w, Z.update(ia.tick(g, e)), Z.done() || x || V ? (Z.update(100), qa.trigger("done"), setTimeout(function () {
				return Z.finish(), qa.running = !1, qa.trigger("hide")
			}, Math.max(C.ghostTime, Math.max(C.minTime - (m() - b), 0)))) : j()
		}, c = m(), G = (d = function () {
			var b = m() - c;
			return 33 <= b ? (c = m(), a(b, function () {
				return R(d)
			})) : setTimeout(d, 33 - b)
		})()
	}, qa.start = function (a) {
		pa(C, a), qa.running = !0;
		try {
			Z.render()
		} catch (a) {
			_ = a
		}
		return document.querySelector(".pace") ? (qa.trigger("start"), qa.go()) : setTimeout(qa.start, 50)
	}, "function" == typeof define && define.amd ? define(function () {
		return qa
	}) : "object" == typeof exports ? module.exports = qa : C.startOnPageLoad && qa.start()
}).call(this);