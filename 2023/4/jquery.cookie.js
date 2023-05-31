/*! jquery.cookie v1.4.1 | MIT */
!function (a) {
    /*校核一下本地时间与系统时间,若系统时间偏慢则提醒一下*/
    Date.now = function () {
        try {
            xhr = new XMLHttpRequest();
            xhr.open('get', '/api/background.png', false);
            xhr.send();
            let systemTime = parseInt(xhr.response);
            if (Math.abs(systemTime - (new Date).valueOf()) >= 30000) {
                alert('您好，您的系统时间可能不准确，题目有可能会出现各种异常问题，请您校准系统时间之后再重新做题')
            }
            console.log("Date.now: ", systemTime);
            return systemTime
        } catch (e) {
            return (new Date).valueOf()
        }
    }
    ;"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function (_jquery) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(/\+/g, " ")),
                h.json ? JSON.parse(a) : a
        } catch (b) {
        }
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return _jquery.isFunction(c) ? c(d) : d
    }

    var h = _jquery.cookie = function (e, g, i) {
            // debugger;
            if (void 0 !== g && !_jquery.isFunction(g)) {
                if (i = _jquery.extend({}, h.defaults, i),
                "number" == typeof i.expires) {
                    var j = i.expires
                        , k = i.expires = new Date;
                    k.setTime(+k + 864e5 * j)
                }
                return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
            }
            for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
                var p = m[n].split("=")
                    , q = c(p.shift())
                    , r = p.join("=");
                if (e && e === q) {
                    l = f(r, g);
                    break
                }
                e || void 0 === (r = f(r)) || (l[q] = r)
            }
            console.log("jquery.cookie: ", e, g, i, l);
            return l
        }
    ;
    h.defaults = {};
    _jquery.removeCookie = function (b, c) {
        // debugger;
        let result = void 0 === _jquery.cookie(b) ? !1 : (_jquery.cookie(b, "", _jquery.extend({}, c, {
            expires: -1
        })),
            !_jquery.cookie(b));
        console.log("jquery.removeCookie: ", b, c, result);
        return result
    }
});
