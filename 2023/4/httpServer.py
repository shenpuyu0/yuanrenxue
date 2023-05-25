# !/usr/bin/env python3
# -*- coding:UTF-8 -*-
"""
@Author    : SPY
@Time      : 2023/5/24 17:11
@File      : httpServer.py
@Remarks   : 
"""
import requests
from flask import Flask,request

app = Flask(__name__)

@app.route("/api/loginInfo")
def logininfo():
    return {}
@app.route("/match2023/corejs/match4.js")
def js():
    with open("./encrypt.js", "r", encoding="UTF-8") as f:
        return f.read()


with open("./index.html", "r", encoding="UTF-8") as f:
    _html = f.read()
@app.route("/")
def html():
    return _html

@app.route("/api/match2023/3", methods=["POST"])
def post():
    # payload = request.form.to_dict()
    response = requests.post("https://match2023.yuanrenxue.cn/api/match2023/3", data =payload)
    # print(response.text)
    return {"status": "1", "state": "success", "data": [{"value": 9508}, {"value": 3182}, {"value": 8739}, {"value": 5367}, {"value": 145}, {"value": 3416}, {"value": 7663}, {"value": 2491}, {"value": 4782}, {"value": 9745}]}

# @app.route("/static/match2023/js/jquery.cookie.min.js")
def js2():
    return """
    /*! jquery.cookie v1.4.1 | MIT */
!function(a) {
    /*校核一下本地时间与系统时间,若系统时间偏慢则提醒一下*/
    ;;"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function(a) {
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
            return a = decodeURIComponent(a.replace(g, " ")),
            h.json ? JSON.parse(a) : a
        } catch (b) {}
    }
    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }
    var g = /\+/g
      , h = a.cookie = function(e, g, i) {
        if (void 0 !== g && !a.isFunction(g)) {
            if (i = a.extend({}, h.defaults, i),
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
        return l
    }
    ;
    h.defaults = {},
    a.removeCookie = function(b, c) {
        return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({}, c, {
            expires: -1
        })),
        !a.cookie(b))
    }
});

    """


app.run("0.0.0.0", 9999)





"http://10.0.15.108:9998/service/tlsProxy"