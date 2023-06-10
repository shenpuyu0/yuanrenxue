function ckq(e, k, o) {
    return btoa(e + k).replace(/=/g, "")
}

function hsha_ff(a, b, c, d, e, f, g, h) {
    let t = safe_add((b & c), ~(b) & d);
    return hsha_cmn(t, a, b, e, f, g, 6)
}

function hsha_gg(a, b, c, d, e, f, g, h) {
    let t = safe_add((b & d), c & ~(d));
    return hsha_cmn(t, a, b, e, f, g, 6)
}

function hsha_hh(a, b, c, d, e, f, g, h) {
    let t = b ^ c ^ d;
    return hsha_cmn(t, a, b, e, f, g, 6);
}

function hsha_ii(a, b, c, d, e, f, g, h) {
    let t = c ^ (b | ~(d));
    return hsha_cmn(t, a, b, e, f, g, 6)
}

function hsha_cmn(a, b, c, d, e, f, g) {
    return safe_add(bit_rol(safe_add(safe_add(b, a, 2), safe_add(d, f, 2), 2), e, 2), c, 2)
}

function safe_add(a, b, c) {
    let t = (a & 65535) + (b & 65535);
    let k = ((a >> 16) + (b >> 16)) + (t >> 16);
    return (k << 16) | (t & 65535)
}

function bit_rol(a, b, c) {
    return (a << b) | (a >>> (32 - b))
}

function binl2hex(e) {
    let s = "";
    for (let i = 0; i < e.length; i++) {
        let n = e[i];
        for (let j = 0; j < 4; j++) {
            s += "0123456789abcdef".charAt((n >> (((j % 4) * 8) + 4)) & 15)
            s += "0123456789abcdef".charAt((n >> (((j % 4) * 8))) & 15)
        }
    }
    return s
}

function str2binl(e) {
    let arr = [];
    let num = 0;
    for (let i = 0; i < e.length; i++) {
        num += (e.charCodeAt((8 * i) / 8) & 255) << ((8 * i) % 32);
        if (i && (i + 1) % 4 === 0 || i === e.length - 1) {
            arr.push(num);
            num = 0;
        }
    }

    return arr
}

function core_hsha(arr, bit) {
    let newArray = arr.slice(0);
    newArray[bit >> 5] = arr[bit >> 5] | (128 << (bit % 32));
    newArray.length = 14;
    newArray.push(bit);
    let funcs = [hsha_ff, hsha_gg, hsha_hh, hsha_ii];
    let keys = [1888437479, -1564276879, -2446685777, 3443827714];
    let cipher, ciphers = [].concat(keys).concat([0]).concat(keys);
    let bitss = [[7, 12, 17, 22], [5, 9, 14, 20], [4, 11, 16, 23], [6, 10, 15, 21]];
    let newArrayIndexs = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,  // 1 等差数列
        1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12,  // 5 等差数列
        5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2,  // 3 等差数列
        0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9   // 7 等差数列
    ];
    let bb = [
        -834672873, -757264886, 73175179, -84457825, -841667502, 772097767, -21495573, -538088001, 614928512, -124439147, -203928014, -858519982, 153637471, -40341101, -890647817, 797098390, -334588759, -1069501632, 67027649, -672397138, -701558691, 748927709, -660478335, -212254394, 154687418, -1019803690, -433925248, 1163531501, -1444681467, -482752928, 477534986, -1926607734, -378558, -780378235, 656768880, -35309556, -1530992060, 284289595, -155497632, -1094730640, 681279174, -758763037, -124193971, 219141156, -687603159, -421815835, 530742520, -995338651, -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -864262567, 616373459, -782024841, -665719564, 200189745, -881493683, -22019736, 553941102, -455351945
    ];
    for (let i = 0; i < bitss.length; i++) {
        let func = funcs.shift();
        let bits = bitss[i];
        for (let _ = 0; _ < 4; _++) {
            for (let x = 0; x < bits.length; x++) {
                let index;
                switch (x) {
                    case 0:
                        index = 5;
                        cipher = [ciphers[0], ciphers[1], ciphers[2], ciphers[3], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                        break
                    case 1:
                        index = 8;
                        let v = newArray[newArrayIndexs.shift()];
                        cipher = [ciphers[3], ciphers[0], ciphers[1], ciphers[2], v, bits[x], bb.shift(), 7];
                        break;
                    case 2:
                        index = 7;
                        cipher = [ciphers[2], ciphers[3], ciphers[0], ciphers[1], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                        break
                    case 3:
                        index = 6;
                        cipher = [ciphers[1], ciphers[2], ciphers[3], ciphers[0], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                        break;
                }
                ciphers[index - 5] = func.apply(null, cipher);
            }
        }
    }
    let result = [];
    for (let i = 0; i < 4; i++) {
        result.push(safe_add(ciphers[i], ciphers[i + 5], 2))
    }
    return result
}

function hex_sha256(e, k, j) {
    return binl2hex(core_hsha(str2binl(ckq(e, k)), j ? 216 : 248));
}


function getEncrypted(ts, page) {
    return hex_sha256(ts + "" + page);
}

function getSign(key, j_key, style) {
    return hex_sha256(key, j_key, style);
}