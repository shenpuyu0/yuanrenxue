globalThis.decrypt = function decrypt(ts, page, encrypted) {
    // (new A["h5"](A["lo"]({a: keys}, B["ae"])))["ik"]({a: parseResult2Buffer(result)})
    function parseResult2Buffer(t) {
        function B_d_D(t, n) {
            return t > 0 ? (n > 31 ? 0 : t >>> n) : t >> (n > 31 ? 31 : n) >>> 0
        }

        function A_auf(t) {
            var r = A_aug(t, 0, t.length)
                , i = 3 * B_d_D(r, 2)
                , u = 3 & r;
            0 !== u && r < t.length && (i += u - 1)
            return new Uint8Array(i)
        }

        function A_aug(t, n) {
            for (var e, r = t.length, l = r, A = 0; l > 0 && A < 2; ) {
                if (--l,
                61 !== (e = t.charCodeAt(l))) {
                    if (100 == (32 | e)) {
                        if (l === 0)
                            break;
                        --l,
                            e = t.charCodeAt(l)
                    }
                    if (51 === e) {
                        if (l === 0)
                            break;
                        --l,
                            e = t.charCodeAt(l)
                    }
                    if (37 !== e)
                        break;
                    ++A,
                        r = l
                } else {
                    ++A,
                        r = l;
                }
            }
            return r
        }

        function A_auh(t, n, a, e, r, l) {
            var i, u, o, s, h, c, f = "Invalid encoding before padding", b = "Invalid character", p = B_d_D(l, 2), d = 3 & l, g = new Int8Array([-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -1, -2, -2, -2, -2, -2, 62, -2, 62, -2, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -2, -2, -2, -1, -2, -2, -2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -2, -2, -2, -2, 63, -2, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -2, -2, -2, -2, -2]);
            for (i = n,
                     u = 0; i < a; ++i) {
                if (u |= o = t.charCodeAt(i),
                    !((s = g[127 & o]) >= 0)) {
                    if (-1 === s && d > 1) {
                        if (u > 127)
                            break;
                        if (3 === d) {
                            if (0 != (3 & p))
                                throw A.e(A.br(f, t, i));
                            e[r] = p >>> 10,
                                e[r + 1] = p >>> 2
                        } else {
                            if (0 != (15 & p))
                                throw A.e(A.br(f, t, i));
                            e[r] = p >>> 4
                        }
                        return c = 3 * (3 - d),
                        37 === o && (c += 2),
                            A_ahQ(t, i + 1, a, -c - 1)
                    }
                    throw A.e(A.br(b, t, i))
                }
                p = 16777215 & (p << 6 | s),
                0 === (d = d + 1 & 3) && (h = r + 1,
                    e[r] = p >>> 16 & 255,
                    r = h + 1,
                    e[h] = p >>> 8 & 255,
                    h = r + 1,
                    e[r] = 255 & p,
                    r = h,
                    p = 0)
            }
            if (u >= 0 && u <= 127)
                return (p << 2 | d) >>> 0;
            for (i = n; i < a && !((o = B.c.ag(t, i)) > 127); ++i)
                ;
            throw A.e(A.br(b, t, i))
        }

        function A_ahQ(t, n, a, e) {
            var r, l;
            if (n === a)
                return e;
            for (r = -e - 1; r > 0; ) {
                if (l = t.charCodeAt(n),
                3 === r) {
                    if (61 === l) {
                        r -= 3,
                            ++n;
                        break
                    }
                    if (37 !== l)
                        break;
                    if (--r,
                    ++n === a)
                        break;
                    l = t.charCodeAt(n)
                }
                if (2 === (r > 3 ? r - 3 : r)) {
                    if (51 !== l)
                        break;
                    if (--r,
                    ++n === a)
                        break;
                    l = t.charCodeAt(n)
                }
                if (100 != (32 | l))
                    break;
                if (--r,
                ++n === a)
                    break
            }
            if (n !== a)
                throw A.e(A.br("Invalid padding character", t, n));
            return -r - 1
        }

        function Tr(t) {
            var r = A_auf(t);
            A_auh(t, 0, t.length, r, 0, 0);
            return r
        }

        return Tr(t)
    }
    function getKeys(ts, page) {
        function p() {
            this.b = this.a = 0;
            this.uT = function uT() {
                var t = this
                    , n = t.c
                    , a = t.b
                    , e = t.b = a + 1;
                n[a] = 239,
                    a = t.b = e + 1,
                    n[e] = 191,
                    t.b = a + 1,
                    n[a] = 189
            }
            ;
            this.S9 = function S9(t, n) {
                var a, e, r, l, A = this;
                return 56320 == (64512 & n) ? (a = 65536 + ((1023 & t) << 10) | 1023 & n,
                    e = A.c,
                    r = A.b,
                    l = A.b = r + 1,
                    e[r] = a >>> 18 | 240,
                    r = A.b = l + 1,
                    e[l] = a >>> 12 & 63 | 128,
                    l = A.b = r + 1,
                    e[r] = a >>> 6 & 63 | 128,
                    A.b = l + 1,
                    e[l] = 63 & a | 128,
                    !0) : (A.uT(),
                    !1)
            }
            ;
            this.MJ = function MJ(t, n, a) {
                var e, r, l, A, i, u, o, s = this;
                for (n !== a && 55296 == (64512 & t.charCodeAt(a - 1)) && --a,
                         r = (e = s.c).length,
                         l = n; l < a; ++l)
                    if ((A = t.charCodeAt(l)) <= 127) {
                        if ((i = s.b) >= r)
                            break;
                        s.b = i + 1,
                            e[i] = A
                    } else if (55296 === (i = 64512 & A)) {
                        if (s.b + 4 > r)
                            break;
                        u = l + 1,
                        s.S9(A, t.charCodeAt(u)) && (l = u)
                    } else if (56320 === i) {
                        if (s.b + 3 > r)
                            break;
                        s.uT()
                    } else if (A <= 2047) {
                        if ((o = (i = s.b) + 1) >= r)
                            break;
                        s.b = o,
                            e[i] = A >>> 6 | 192,
                            s.b = o + 1,
                            e[o] = 63 & A | 128
                    } else {
                        if ((i = s.b) + 2 >= r)
                            break;
                        o = s.b = i + 1,
                            e[i] = A >>> 12 | 224,
                            i = s.b = o + 1,
                            e[o] = A >>> 6 & 63 | 128,
                            s.b = i + 1,
                            e[i] = 63 & A | 128
                    }
                return l
            }
            this.parse = function(t) {
                this.c = new Uint8Array(3 * t.length);
                this.MJ(t, 0, 16) !== 16 && (t.charCodeAt(16 - 1),
                    this.uT());
                return new Uint8Array(this.c.subarray(0, this.b))
            }
        }
        return (new p).parse(ts + "" + page + "00")
    }
    let keys = getKeys(ts, page);
    let buffer = parseResult2Buffer(encrypted);
    var r = new A.MJ({a: keys}, B["ae"], null);
    r.d = $.bz().b3(0, "AES/ECB/PKCS7", window.ttt.hu);
    // let result = (new A["h5"](A["lo"]({a: keys}, B["ae"])))["ik"]({a: buffer});
    // let result = (new A["h5"](r))["ik"]({a: buffer});

    var d = $.bz().b3(0, "AES/ECB/PKCS7", window.ttt.hu);
    d.c=false;
    d.b.a.c = false;
    debugger;
    d.b.a.b = d.b.a.iV(false, {a: keys});
    d.b.a.d = A.hn(d.b.a.f, !0, window.ttt.S);
    let result = B.J0.bm(d.iP(buffer));
    console.log(result);
}
;

let page = 1;
let ts = 1687412613585;
let encrypted = '5qFoDNhBFpRRubozs3Ht5BeP8LDm2rHgqWOsC7IHqMrTAVJdMV3x0GhRGn0rZJ2gsg7InxjRe+sIwk7s1qPjaRyprHCSHys2/kEnS/xRkgvyDtxryslkMN1oxioByDZSuY7JzcuuTPe1S1zXIXy2LBDXhRBAE3cSCLv4hI04tdG/K3FfMt2zbbRd73P5VMZj/VWpbRnBXzix+f3RSmjBaT5J8tx5zEHG1N3KshpMhtoMEHLDkAtdr/2BcXppZT/2L7p89C5T2rxugQtbWKMlYPPOpJUUD/6ZklCKPdi1Ew8=';


// decrypt(ts, page, encrypted)
var A = {
    Mi(t, n, a) {},
    dM: (t, n, a) => (A.Mi(t, n, a), null == a ? new DataView(t, n) : new DataView(t, n, a)),
    am: (t, n, a) => (t = A.dM(t.buffer, t.byteOffset, t.length)).getUint32(n, B.h === a),
    a5(t, n, a, e) {
        var r, l = a ? J.tk(t, e) : J.Vw(t, e);
        if (0 !== t && null != n) for (r = 0; r < l.length; ++r) l[r] = n;
        return l
    }
}
function iV(n, a) {
    let this_e = [99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22]
    function mw(t) {
        var n = this_e;
        return (255 & n[255 & t] | (255 & n[t >>> 8 & 255]) << 8 | (255 & n[t >>> 16 & 255]) << 16 | n[t >>> 24 & 255] << 24) >>> 0
    }
    var r, l, i, u, o, s, h, c, f, b, p, d, g, w, y, v, R, m, S, x = a.a;
    // if (x === $ && A.d(), (e = x.length) < 16 || e > 32 || 0 != (7 & e)) {
    //     throw "Key length not 128/192/256 bits.";
    // }
    l = (r = x.length >>> 2) + 6;
    this.a = l;
    i = l + 1;
    u = J.io(i, t.eH);
    l = t.S;
    for (o = 0; o < i; ++o) {
        u[o] = A.a5(4, 0, !1, l);
    }
    switch (r) {
        case 4:
            s = A.am(x, 0, B.h);
            (l = u[0])[0] = s;
            h = A.am(x, 4, B.h);
            l[1] = h;
            c = A.am(x, 8, B.h);
            l[2] = c;
            f = A.am(x, 12, B.h);
            l[3] = f;
            x = this.r;
            for (o = 1; o <= 10; ++o) {
                s = (s ^ mw((f >>> 8 | (f & 255) << 24) >>> 0) ^ x[o - 1]) >>> 0;
                (l = u[o])[0] = s;
                h = (h ^ s) >>> 0;
                l[1] = h;
                c = (c ^ h) >>> 0;
                l[2] = c;
                f = (f ^ c) >>> 0;
                l[3] = f;
            }
            break;
        case 6:
            s = A.am(x, 0, B.h);
            (l = u[0])[0] = s;
            h = A.am(x, 4, B.h);
            l[1] = h;
            c = A.am(x, 8, B.h);
            l[2] = c;
            f = A.am(x, 12, B.h);
            l[3] = f;
            b = A.am(x, 16, B.h);
            p = A.am(x, 20, B.h);
            for (o = 1, d = 1; (x = u[o])[0] = b, x[1] = p, g = d << 1, s = (s ^ mw((p >>> 8 | (p & 255) << 24) >>> 0) ^ d) >>> 0, x[2] = s, h = (h ^ s) >>> 0, x[3] = h, c = (c ^ h) >>> 0, (x = u[o + 1])[0] = c, f = (f ^ c) >>> 0, x[1] = f, b = (b ^ f) >>> 0, x[2] = b, p = (p ^ b) >>> 0, x[3] = p, d = g << 1, s = (s ^ mw((p >>> 8 | (p & 255) << 24) >>> 0) ^ g) >>> 0, (x = u[o + 2])[0] = s, h = (h ^ s) >>> 0, x[1] = h, c = (c ^ h) >>> 0, x[2] = c, f = (f ^ c) >>> 0, x[3] = f, !((o += 3) >= 13);) {
                p = (p ^ (b = (b ^ f) >>> 0)) >>> 0;
            }
            break;
        case 8:
            s = A.am(x, 0, B.h);
            (l = u[0])[0] = s;
            h = A.am(x, 4, B.h);
            l[1] = h;
            c = A.am(x, 8, B.h);
            l[2] = c;
            f = A.am(x, 12, B.h);
            l[3] = f;
            b = A.am(x, 16, B.h);
            (l = u[1])[0] = b;
            p = A.am(x, 20, B.h);
            l[1] = p;
            w = A.am(x, 24, B.h);
            l[2] = w;
            y = A.am(x, 28, B.h);
            l[3] = y;
            for (o = 2, d = 1; g = d << 1, s = (s ^ mw((y >>> 8 | (y & 255) << 24) >>> 0) ^ d) >>> 0, (x = u[o])[0] = s, h = (h ^ s) >>> 0, x[1] = h, c = (c ^ h) >>> 0, x[2] = c, f = (f ^ c) >>> 0, x[3] = f, !(++o >= 15); d = g) {
                b = (b ^ mw(f)) >>> 0, (x = u[o])[0] = b, p = (p ^ b) >>> 0, x[1] = p, w = (w ^ p) >>> 0, x[2] = w, y = (y ^ w) >>> 0, x[3] = y, ++o;
            }
            break;
        default:
            throw "Should never get here";
    }
    if (!n) {
        for (x = this.a, v = 1; v < x; ++v) {
            for (o = 0; o < 4; ++o) {
                R = (l = u[v])[o];
                S = 3233857728 & (R ^= (2139062143 & (m = R ^ (R >>> 8 | (R & 255) << 24))) << 1 ^ 27 * (m >>> 7 & 16843009));
                S ^= S >>> 1;
                m ^= (1061109567 & R & 1073741823) << 2 ^ S >>> 2 ^ S >>> 5;
                l[o] = (R ^ m ^ (m >>> 16 | (m & 65535) << 16)) >>> 0;
            }
        }
    }
    return u
}