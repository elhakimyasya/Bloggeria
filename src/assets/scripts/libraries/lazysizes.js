window.lazySizesConfig = window.lazySizesConfig || {}, lazySizesConfig.loadMode = 1, lazySizesConfig.preloadAfterLoad = !1;
! function (a) {
    var b = function (aa, ba, v) {
        function r(a, b) {
            return _a[b] || (_a[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), _a[b].test(a.getAttribute("class") || "") && _a[b]
        }

        function ca(a, b) {
            r(a, b) || a.setAttribute("class", (a.getAttribute("class") || "").trim() + " " + b)
        }

        function u(a, b) {
            (b = r(a, b)) && a.setAttribute("class", (a.getAttribute("class") || "").replace(b, " "))
        }

        function c(b, c, d, e, f) {
            var g = ba.createEvent("Event");
            return (d = d || {}).instance = ka, g.initEvent(c, !e, !f), g.detail = d, b.dispatchEvent(g), g
        }

        function f(b, c) {
            var d;
            !V && (d = aa.picturefill || la.pf) ? (c && c.src && !b.getAttribute("srcset") && b.setAttribute("srcset", c.src), d({
                reevaluate: !0,
                elements: [b]
            })) : c && c.src && (b.src = c.src)
        }

        function g(b, c, d) {
            for (d = d || b.offsetWidth; d < la.minSize && c && !b._lazysizesWidth;) d = c.offsetWidth, c = c.parentNode;
            return d
        }

        function i(b, a) {
            return a ? function () {
                cb(b)
            } : function () {
                var a = this,
                    c = arguments;
                cb(function () {
                    b.apply(a, c)
                })
            }
        }

        function e(b) {
            function c() {
                d = null, b()
            }
            var d, f, g = function () {
                var a = v.now() - f;
                99 > a ? Y(g, 99 - a) : (Ya || c)(c)
            };
            return function () {
                f = v.now(), d = d || Y(g, 99)
            }
        }

        function n(b, d, e) {
            var f = b.parentNode;
            f && (e = g(b, f, e), (d = c(b, "lazybeforesizes", {
                width: e,
                dataAttr: !!d
            })).defaultPrevented || (e = d.detail.width) && e !== b._lazysizesWidth && na(b, f, d, e))
        }

        function da(a) {
            Ja--, a && !(0 > Ja) && a.target || (Ja = 0)
        }

        function ea(a) {
            return null == Aa && (Aa = "hidden" == (getComputedStyle(ba.body, null) || {}).visibility), Aa || "hidden" != (getComputedStyle(a.parentNode, null) || {}).visibility || "hidden" != (getComputedStyle(a, null) || {}).visibility
        }

        function o() {
            var b, h, j, k, p, q, v, w, x, y = ka.elements;
            if ((sa = la.loadMode) && 8 > Ja && (b = y.length)) {
                var d = 0;
                for (Ka++; d < b; d++)
                    if (y[d] && !y[d]._lazyRace)
                        if (!Ha || ka.prematureUnveil && ka.prematureUnveil(y[d])) Pa(y[d]);
                        else {
                            (q = y[d].getAttribute("data-expand")) && (k = +q) || (k = Ia), w || (w = !la.expand || 1 > la.expand ? 500 < Xa.clientHeight && 500 < Xa.clientWidth ? 500 : 370 : la.expand, A = (ka._defEx = w) * la.expFactor, x = la.hFac, Aa = null, Ia < A && 1 > Ja && 2 < Ka && 2 < sa && !ba.hidden ? (Ia = A, Ka = 0) : Ia = 1 < sa && 1 < Ka && 6 > Ja ? w : 0), v !== k && (ua = innerWidth + k * x, va = innerHeight + k, p = -1 * k, v = k);
                            var z = y[d].getBoundingClientRect();
                            if ((z = (za = z.bottom) >= p && (wa = z.top) <= va && (ya = z.right) >= p * x && (xa = z.left) <= ua && (za || ya || xa || wa) && (la.loadHidden || ea(y[d]))) && !(z = qa && 3 > Ja && !q && (3 > sa || 4 > Ka))) {
                                z = void 0;
                                var A = k,
                                    B = C = y[d],
                                    C = ea(C);
                                for (wa -= A, za += A, xa -= A, ya += A; C && (B = B.offsetParent) && B != ba.body && B != Xa;)(C = 0 < ((getComputedStyle(B, null) || {}).opacity || 1)) && "visible" != (getComputedStyle(B, null) || {}).overflow && (z = B.getBoundingClientRect(), C = ya > z.left && xa < z.right && za > z.top - 1 && wa < z.bottom + 1);
                                z = C
                            }
                            if (!z) !j && qa && !h && 4 > Ja && 4 > Ka && 2 < sa && (pa[0] || la.preloadAfterLoad) && (pa[0] || !q && (za || ya || xa || wa || "auto" != y[d].getAttribute(la.sizesAttr))) && (h = pa[0] || y[d]);
                            else if (Pa(y[d]), j = !0, 9 < Ja) break
                        } h && !j && Pa(h)
            }
        }

        function fa(a) {
            var b = a.target;
            return b._lazyCache ? void delete b._lazyCache : (da(a), ca(b, la.loadedClass), u(b, la.loadingClass), bb(b, Na), void c(b, "lazyloaded"))
        }

        function ga(b) {
            var c, d = b.getAttribute(la.srcsetAttr);
            (c = la.customMedia[b.getAttribute("data-media") || b.getAttribute("media")]) && b.setAttribute("media", c), b.setAttribute("srcset", d)
        }

        function t() {
            3 == la.loadMode && (la.loadMode = 2), Qa()
        }

        function ha() {
            Ca = !1, Da = v.now(), Ba()
        }

        function ia() {
            var a = Wa;
            for (Wa = Ua.length ? Va : Ua, Ta = !(Sa = !0); a.length;) a.shift()();
            Sa = !1
        }

        function ja(a, b) {
            Sa && !b ? a.apply(this, arguments) : (Wa.push(a), Ta || (Ta = !0, (ba.hidden ? Y : Z)(ia)))
        }
        var ka, la;
        if (function () {
            var a, b = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                fastLoadedClass: "ls-is-cached",
                iframeLoadMode: 0,
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            for (a in la = aa.lazySizesConfig || aa.lazysizesConfig || {}, b) a in la || (la[a] = b[a])
        }(), !ba || !ba.getElementsByClassName) return {
            init: function () { },
            cfg: la,
            noSupport: !0
        };
        var ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya, za, Aa, Ba, Ca, Da, Ea, Fa, Ga, Ha, Ia, Ja, Ka, La, Ma, Na, Oa, Pa, Qa, Ra, Sa, Ta, Ua, Va, Wa, Xa = ba.documentElement,
            V = aa.HTMLPictureElement,
            X = aa.addEventListener.bind(aa),
            Y = aa.setTimeout,
            Z = aa.requestAnimationFrame || Y,
            Ya = aa.requestIdleCallback,
            Za = /^picture$/i,
            $a = ["load", "error", "lazyincluded", "_lazyloaded"],
            _a = {},
            ab = Array.prototype.forEach,
            bb = function (b, c, a) {
                var d = a ? "addEventListener" : "removeEventListener";
                a && bb(b, c), $a.forEach(function (a) {
                    b[d](a, c)
                })
            },
            cb = (Va = [], Wa = Ua = [], ja._lsFlush = ia, ja),
            db = (Ha = "onscroll" in aa && !/(gle|ing)bot/.test(navigator.userAgent), Ka = -1, Ba = o, Da = Ja = Ia = 0, Ea = la.throttleDelay, Fa = la.ricTimeout, Ga = Ya && 49 < Fa ? function () {
                Ya(ha, {
                    timeout: Fa
                }), Fa !== la.ricTimeout && (Fa = la.ricTimeout)
            } : i(function () {
                Y(ha)
            }, !0), Ma = i(fa), Na = function (a) {
                Ma({
                    target: a.target
                })
            }, Oa = i(function (b, g, h, j, k) {
                var m, n, p, q, t;
                (p = c(b, "lazybeforeunveil", g)).defaultPrevented || (j && (h ? ca(b, la.autosizesClass) : b.setAttribute("sizes", j)), m = b.getAttribute(la.srcsetAttr), h = b.getAttribute(la.srcAttr), k && (n = (t = b.parentNode) && Za.test(t.nodeName || "")), q = g.firesLoad || "src" in b && (m || h || n), p = {
                    target: b
                }, ca(b, la.loadingClass), q && (clearTimeout(ra), ra = Y(da, 2500), bb(b, Na, !0)), n && ab.call(t.getElementsByTagName("source"), ga), m ? b.setAttribute("srcset", m) : h && !n && (/^iframe$/i.test(b.nodeName) ? (j = h, 0 == (t = (g = b).getAttribute("data-load-mode") || la.iframeLoadMode) ? g.contentWindow.location.replace(j) : 1 == t && (g.src = j)) : b.src = h), k && (m || n) && f(b, {
                    src: h
                })), b._lazyRace && delete b._lazyRace, u(b, la.lazyClass), cb(function () {
                    var a = b.complete && 1 < b.naturalWidth;
                    q && !a || (a && ca(b, la.fastLoadedClass), fa(p), b._lazyCache = !0, Y(function () {
                        "_lazyCache" in b && delete b._lazyCache
                    }, 9)), "lazy" == b.loading && Ja--
                }, !0)
            }), Qa = e(function () {
                la.loadMode = 3, La()
            }), Ra = function () {
                return qa ? void 0 : 999 > v.now() - ta ? void Y(Ra, 999) : (qa = !0, la.loadMode = 3, La(), void X("scroll", t, !0))
            }, {
                _: function () {
                    ta = v.now(), ka.elements = ba.getElementsByClassName(la.lazyClass), pa = ba.getElementsByClassName(la.lazyClass + " " + la.preloadClass), X("scroll", La, !0), X("resize", La, !0), X("pageshow", function (a) {
                        var b;
                        !a.persisted || (b = ba.querySelectorAll("." + la.loadingClass)).length && b.forEach && Z(function () {
                            b.forEach(function (a) {
                                a.complete && Pa(a)
                            })
                        })
                    }), aa.MutationObserver ? new MutationObserver(La).observe(Xa, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (Xa.addEventListener("DOMNodeInserted", La, !0), Xa.addEventListener("DOMAttrModified", La, !0), setInterval(La, 999)), X("hashchange", La, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (a) {
                        ba.addEventListener(a, La, !0)
                    }), /d$|^c/.test(ba.readyState) ? Ra() : (X("load", Ra), ba.addEventListener("DOMContentLoaded", La), Y(Ra, 2e4)), ka.elements.length ? (o(), cb._lsFlush()) : La()
                },
                checkElems: La = function (a) {
                    var b;
                    (a = !0 === a) && (Fa = 33), Ca || (Ca = !0, 0 > (b = Ea - (v.now() - Da)) && (b = 0), a || 9 > b ? Ga() : Y(Ga, b))
                },
                unveil: Pa = function (b) {
                    var d, e, f, g;
                    b._lazyRace || (e = /^img$/i.test(b.nodeName), ((g = "auto" == (f = b.getAttribute(la.sizesAttr) || b.getAttribute("sizes"))) || !qa) && e && (b.getAttribute("src") || b.srcset) && !b.complete && !r(b, la.errorClass) && r(b, la.lazyClass) || (d = c(b, "lazyunveilread").detail, g && eb.updateElem(b, !0, b.offsetWidth), b._lazyRace = !0, Ja++, Oa(b, d, g, f, e)))
                },
                _aLSL: t
            }),
            eb = (na = i(function (b, c, d, a) {
                if (b._lazysizesWidth = a, a += "px", b.setAttribute("sizes", a), Za.test(c.nodeName || ""))
                    for (var e = 0, g = (c = c.getElementsByTagName("source")).length; e < g; e++) c[e].setAttribute("sizes", a);
                d.detail.dataAttr || f(b, d.detail)
            }), {
                _: function () {
                    ma = ba.getElementsByClassName(la.autosizesClass), X("resize", oa)
                },
                checkElems: oa = e(function () {
                    var a, b = ma.length;
                    if (b)
                        for (a = 0; a < b; a++) n(ma[a])
                }),
                updateElem: n
            }),
            fb = function () {
                !fb.i && ba.getElementsByClassName && (fb.i = !0, eb._(), db._())
            };
        return Y(function () {
            la.init && fb()
        }), ka = {
            cfg: la,
            autoSizer: eb,
            loader: db,
            init: fb,
            uP: f,
            aC: ca,
            rC: u,
            hC: r,
            fire: c,
            gW: g,
            rAF: cb
        }
    }(a, a.document, Date);
    a.lazySizes = b, "object" == typeof module && module.exports && (module.exports = b)
}("undefined" == typeof window ? {} : window), document.addEventListener("lazybeforeunveil", function (a) {
    var b = a.target.getAttribute("data-image");
    b && (a.target.style.backgroundImage = "url(" + b + ")")
});