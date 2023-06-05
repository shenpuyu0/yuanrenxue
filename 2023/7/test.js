function MMM(n, $, h, o) {
    switch (n) {
        case 47:
            CALL(3, i, l[u++]);
            break
        case 42:
            CALL(3, i, typeof CALL(4, i));
            break
        case 19:
            $ = CALL(4, i);
            h = CALL(4, i);
            CALL(3, i, new (CALL(2, e.bind, h, CALL(5, [null], $))));
            break
        case 38:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) == $);
            break
        case 51:
            (($ = CALL(4, i)) || 1) && CALL(3, i, CALL(4, i) >> $);
            break
        case 25:
            (($ = CALL(4, i)) || 8) && CALL(3, i, CALL(4, i) / $);
            break
        case 1:
            $ = CALL(4, i);
            h = $ ? CALL(6, i, -$) : [];
            i.length -= $;
            CALL(4, i) ?
                CALL(3, i, e.apply(CALL(4, i), CALL(4, i), h)) :
                CALL(3, i, e.apply(CALL(4, i), d[0][0], h));
            break
        case 50:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) === $);
            break
        case 40:
            CALL(3, i, ~CALL(4, i));
            break
        case 55:
            i[i.length - 1] += String.fromCharCode(85 ^ l[u++]);
            break
        case 39:
            (r = i[i.length - 1]);
            break
        case 21:
            (i[i.length - 2 - CALL(4, i)] = CALL(4, i));
            break
        case 34:
            (($ = CALL(4, i)) && CALL(3, i, CALL(4, i) < $));
            break
        case 57:
            (($ = CALL(4, i)) && CALL(3, i, CALL(4, i) % $));
            break
        case 5:
            (($ = CALL(4, i)) && CALL(3, i, CALL(4, i)[CALL(4, i)] = $));
            break
        case 0:
            CALL(3, i, CALL(4, i)[CALL(4, i)]);
            break
        case 9:
            CALL(3, i, undefined);
            break
        case 20:
            $ = CALL(4, i)
            CALL(3, i, CALL(4, i) instanceof $);
            break
        case 30:
            $ = i[i.length - 1];
            i[i.length - 1] = i[i.length - 2];
            i[i.length - 2] = $;
            break
        case 28:
            CALL(3, i, null);
            break
        case 14:
            CALL(3, i, -CALL(4, i));
            break
        case 2:
            CALL(3, i, {});
            break
        case 58:
            CALL(3, i, !CALL(4, i));
            break
        case 29:
            $ = CALL(4, i);
            h = l[u++];
            (0 == (o = l[u++]) ?
                CALL(7, i, $, d[0][0], CALL(4, i) ?
                    d[0][0][$] :
                    undefined) :
                CALL(7, i, o, d[h], CALL(4, i) ?
                    d[h][o] :
                    undefined));
            break
        case 36:
            ($ = CALL(4, i)) && CALL(3, i, CALL(4, i) ^ $);
            break
        case 44:
            (($ = CALL(4, i)) || 5) && CALL(3, i, CALL(4, i) in $);
            break
        case 24:
            (($ = CALL(4, i)) && CALL(3, i, CALL(4, i) + $));
            break
        case 61:
            $ = CALL(4, i)
            CALL(3, i, CALL(4, i) & $);
            break
        case 18:
            CALL(3, i, "");
            break
        case 12:
            CALL(3, i, i[CALL(4, i)]);
            break
        case 17:
            (($ = CALL(4, i)) && CALL(3, i, CALL(4, i) > $));
            break
        case 60:
            CALL(4, s);
            break
        case 6:
            CALL(3, i, i[i.length - 2 - CALL(4, i)]);
            break
        case 48:
            $ = CALL(4, i);
            h = CALL(4, i);
            o = CALL(4, i);
            CALL(3, i, (function n() {
                var r = [], u = arguments.length, A, D, F;
                r.length = o;
                u = u < h ? u : h;
                for (let i = 0; i < u; i++) {
                    r[i] = arguments[i];
                }
                A = CALL(5, [this, arguments, n], r);
                D = e.call(5, d, [A])
                F = e(l, $, D, f);
                return F
            }));
            break
        case 56:
            t = true;
            break
        case 26:
            CALL(3, i, i[i.length - 1]);
            break
        case 43:
            u = l[u++];
            break
        case 27:
            CALL(3, i, !0);
            break
        case 7:
            for (h in (($ = []) || 8) && CALL(4, i)) {
                CALL(3, $, h)
            }
            CALL(3, i, $);
            break
        case 33:
            var K = CALL(4, i);
            CALL(3, i[i["length"] - 2], K);
            break
        case 52:
            $ = CALL(4, i);
            if (0 == (h = l[u++])) {
                d[0][0][$] = CALL(4, i)
            } else {
                i[h] = CALL(4, i)
            }
            break
        case 49:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) >>> $);
            break
        case 59:
            CALL(3, s, l[u++]);
            break
        case 23:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) * $);
            break
        case 4:
            f = [];
            break
        case 35:
            CALL(3, i, []);
            break
        case 13:
            CALL(3, i, +CALL(4, i));
            break
        case 31:
            $ = CALL(4, i);
            h = CALL(4, i);
            -1 != d.indexOf($) ? CALL(3, i, false) : CALL(3, i, delete $[h]);
            break
        case 41:
            CALL(3, f, CALL(4, i));
            break
        case 54:
            $ = l[u++];
            h = CALL(4, i);
            u = $;
            break
        case 22:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) <= $);
            break
        case 46:
            throw CALL(4, i);
        case 45:
            $ = CALL(4, i);
            N = CALL(4, i);
            CALL(3, i, N | $);
            break
        case 11:
            $ = CALL(4, i);
            h = CALL(4, i);
            CALL(7, i, h, $, CALL(4, i) ? $[h] : undefined);
            break
        case 37:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) << $);
            break
        case 53:
            CALL(4, i);
            break
        case 16:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) >= $);
            break
        case 15:
            $ = CALL(4, i);
            h = l[u++]
            0 == (o = l[u++]) ? CALL(3, i, d[h][0][$]) : CALL(3, i, d[h][o]);
            break
        case 32:
            $ = CALL(4, i);
            CALL(3, i, CALL(4, i) - $);
            break
        case 3:
            CALL(3, i, [CALL(4, i)]);
            break
        case 10:
            l = CALL(6, l, u)
            u = 0
            break
        case 8:
            $ = CALL(4, i);
            h = CALL(4, i);
            o = CALL(4, i);
            var zn = CALL(4, i);
            var Hn = CALL(4, i);
            zn[Hn] = h;
            $ ? CALL(3, i, h) : CALL(3, i, o);
            break
    }
}