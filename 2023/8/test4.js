ts = 1687412613585;
page = 1;
ts = ts + "";
keys = new Uint8Array(16);
for (let i = 0; i <ts.length; i++) {
    keys[i] = ts.charCodeAt(i)
}
keys[ts.length] = page;
console.log(keys);
result = "sHocaJmADC5jT/yvytoTMAZ0GUMAHSRdscxpIpsxS2Y7vQ4ms7mvgAqb162ilC8sL94b+cPX82S6gKCp2w9N0eszuGK09d+UkSpIy05okmTK3fx1z//tr3I04Gw8pUb+W9qvLAIVnDbFSlPhIaIaiCY9uKBEAV/jJw8XfnCkuanu9M3LQANqbx9Yc4ykri/1e0qpCvYAmrZivw/7LbuhILx75XLJwhsVO7VEBBNEhwVYaWTjYutCXcThMY6bLlDpBUd5ZSR2BlRNyWHarel4PAIzP0ktcjCbkDH+9lyvi1A=";

// (new A["h5"](A["lo"](new A["hi"](n), B["ae"])))["ik"](new A["ev"](B["av"]["bm"](t["a"])), new A["hc"](a["a"]));
// (new A["h5"](A["lo"](new A["hi"](n), B["ae"])))["ik"](new A["ev"](B["av"]["bm"](t["a"])))
// (new A["h5"](A["lo"](new A["hi"](n), B["ae"])))["ik"]({a:new Uint8Array([176,122,28,104,153,128,12,46,99,79,252,175,202,218,19,48,6,116,25,67,0,29,36,93,177,204,105,34,155,49,75,102,59,189,14,38,179,185,175,128,10,155,215,173,162,148,47,44,47,222,27,249,195,215,243,100,186,128,160,169,219,15,77,209,235,51,184,98,180,245,223,148,145,42,72,203,78,104,146,100,202,221,252,117,207,255,237,175,114,52,224,108,60,165,70,254,91,218,175,44,2,21,156,54,197,74,83,225,33,162,26,136,38,61,184,160,68,1,95,227,39,15,23,126,112,164,185,169,238,244,205,203,64,3,106,111,31,88,115,140,164,174,47,245,123,74,169,10,246,0,154,182,98,191,15,251,45,187,161,32,188,123,229,114,201,194,27,21,59,181,68,4,19,68,135,5,88,105,100,227,98,235,66,93,196,225,49,142,155,46,80,233,5,71,121,101,36,118,6,84,77,201,97,218,173,233,120,60,2,51,63,73,45,114,48,155,144,49,254,246,92,175,139,80])});
// (new A["h5"](A["lo"](new A["hi"](n), B["ae"])))["ik"]({a:B["av"]["bm"](t["a"])})
// (new A["h5"](A["lo"]({a: keys}, B["ae"])))["ik"]({a:B["av"]["bm"](result)})


// var r = new A.MJ({a: keys},B["ae"],null);
// r.d = $.bz().b3(0, "AES/ECB/PKCS7", window.ttt.hu);
// B.x.vs(0, (new A["h5"](r)).a.Tw({a: buffer}, null, undefined), !0)





function getKeys(ts, page){
    function p(){
        this.b = this.a = 0;
        this.uT = function uT() {
            var t = this, n = t.c, a = t.b, e = t.b = a + 1;
            n[a] = 239, a = t.b = e + 1, n[e] = 191, t.b = a + 1, n[a] = 189
        };
        this.S9 = function S9(t, n) {
            var a, e, r, l, A = this;
            return 56320 == (64512 & n) ? (a = 65536 + ((1023 & t) << 10) | 1023 & n, e = A.c, r = A.b, l = A.b = r + 1, e[r] = a >>> 18 | 240, r = A.b = l + 1, e[l] = a >>> 12 & 63 | 128, l = A.b = r + 1, e[r] = a >>> 6 & 63 | 128, A.b = l + 1, e[l] = 63 & a | 128, !0) : (A.uT(), !1)
        };
        this.MJ = function MJ(t, n, a) {
            var e, r, l, A, i, u, o, s = this;
            for (n !== a && 55296 == (64512 & t.charCodeAt(a - 1)) && --a, r = (e = s.c).length, l = n; l < a; ++l) if ((A = t.charCodeAt(l)) <= 127) {
                if ((i = s.b) >= r) break;
                s.b = i + 1, e[i] = A
            } else if (55296 === (i = 64512 & A)) {
                if (s.b + 4 > r) break;
                u = l + 1, s.S9(A, t.charCodeAt(u)) && (l = u)
            } else if (56320 === i) {
                if (s.b + 3 > r) break;
                s.uT()
            } else if (A <= 2047) {
                if ((o = (i = s.b) + 1) >= r) break;
                s.b = o, e[i] = A >>> 6 | 192, s.b = o + 1, e[o] = 63 & A | 128
            } else {
                if ((i = s.b) + 2 >= r) break;
                o = s.b = i + 1, e[i] = A >>> 12 | 224, i = s.b = o + 1, e[o] = A >>> 6 & 63 | 128, s.b = i + 1, e[i] = 63 & A | 128
            }
            return l
        }
        this.parse = function (t){
            this.c = new Uint8Array(3 * t.length);
            this.MJ(t, 0, 16) !== 16 && (t.charCodeAt(16 - 1), this.uT());
            return new Uint8Array(this.c.subarray(0, this.b))
        }
    }
    return (new p).parse(ts + "" + page + "00")
}
keys = getKeys("1687413009266", 1)

console.log(keys);