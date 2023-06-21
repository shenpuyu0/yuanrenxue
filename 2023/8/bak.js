Array.prototype.insert = function (index, value) {
    this.splice(index, 0, value);
}
console.debug = function info(){
    if (!console.openDebug){return};
    console.log.apply(this, arguments);
}
function binl2hex(e) {
    let s = "";
    for (let i = 0; i < e.length; i++) {
        let n = e[i];
        for (let j = 0; j < 4; j++) {
            s += "0123456789abcdef".charAt((n >> (((3 - (j % 4)) * 8) + 4)) & 15)
            s += "0123456789abcdef".charAt((n >> (((3 - (j % 4))) * 8)) & 15)
        }
    }
    return s
}


function safe_add(a, b) {
    let t = (a & 65535) + (b & 65535);
    let k = ((a >> 16) + (b >> 16)) + (t >> 16);
    return (k << 16) | (t & 65535)
}

function bit_rol(a, b) {
    return (a >>> b) | (a << (32 - b))
}

function bit_1(e, a, b, c) {
    return ((bit_rol(e, a) ^ bit_rol(e, b)) ^ bit_rol(e, c))
}

function bit_2(e, a, b, c) {
    return bit_rol(e, a) ^ bit_rol(e, b) ^ (e >>> c);
}

function bit_3(e, o, u) {
    return (e & o) | (~e & u)
}

function bit_4(e, o, u) {
    return ((e & o) ^ (e & u)) | (o & u)
}

function core(arr, array64) {
    let args = Array.from(arr);
    Object.defineProperty(args, "setValue", {
        value: function (e, value) {
            let b = e >= 4 ? 7 : 3;
            for (let i = b; i > e; i--) {
                this[i] = this[i - 1];
            }
            this[e] = value;
        }
    });
    let arr64_1 = [
        1116112408, 1898775441, 1045445271, 39215452573, 961954463, 1508954993, 248242748, 4105243221
        , 2664381080, 531198401, 54125278, 142687487, 187478388, 2157878206, 28758103, 3247857580
        , 3835787401, 487524774, 26457078, 6048876628, 770578983, 1249198522, 155575772, 1997886786
        , 2500470882, 2821587349, 295295408, 321713671, 33785891, 4575528711, 115555993, 338444895
        , 66655505, 77555912, 129222172, 145457291, 1654453700, 1986661051, 2154274350, 2456952737
        , 2730587221, 2827855211, 3258757800, 3358775771, 3516588817, 3658787504, 4053455709, 278575344
        , 438757734, 506587588, 658757857, 883875787, 958857577, 2312534674, 4752747440, 1546764778
        , 2142472782, 2028777515, 2278527832, 2878758724, 2487678674, 2757857547, 3204857829, 3387637898
    ];
    // let i = 0;
    // for (const number of [
    //     [4, 0], [4, 0], [7, 3], [7, 3]
    // ]) {
    //     let a = safe_add(safe_add(safe_add(safe_add(args[7], bit_1(args[4], 6, 11, 25)), bit_3(args[4], args[5], args[6])), arr64_1[i]), array64[i]);
    //     let b = safe_add(bit_1(args[0], 2, 13, 22), bit_4(args[0], args[1], args[2]));
    //     args.setValue(number[0], safe_add(args[3], a));
    //     console.debug("set ", number[0], " ==> ", args.join(", "));
    //     args.setValue(number[1], safe_add(a, b));
    //     console.debug("set ", number[1], " ==> ", args.join(", "));
    //     i++
    // }
    for (let i = 0; i < arr64_1.length; i++) {
        let a = safe_add(safe_add(safe_add(safe_add(args[7], bit_1(args[4], 6, 11, 25)), bit_3(args[4], args[5], args[6])), arr64_1[i]), array64[i]);
        let b = safe_add(bit_1(args[0], 2, 13, 22), bit_4(args[0], args[1], args[2]));
        args.setValue(4, safe_add(args[3], a));
        console.debug("set 4 ==> ", args.join(", "));
        args.setValue(0, safe_add(a, b));
        console.debug("set 0 ==> ", args.join(", "));
    }

    return Array.from(args)
}

function ckq(ts) {
    ts = ts + "";
    let k, s = []
    for (let i = 0, j = 0; i < ts.length; i++, j++) {
        if (j && j % 4 === 0) {
            s.push(k);
            k = undefined
        }
        let n = ts.charCodeAt(i);
        k = k | ((n & 255) << (24 - ((j * 8) % 32)));
        console.debug("k: ", k);
    }
    s.push(k);
    return s
}

function create_array64(ts, bit) {
    ts = ts + "";
    let newArray = ckq(ts);
    newArray[bit >> 5] = newArray[bit >> 5] | (128 << (24 - (bit % 32)));
    newArray.length = 15;
    newArray.push(bit);

    let _s = 0;
    while (newArray.length < 64) {
        switch (newArray.length) {
            case 22:
                _s += 9;
                break
            case 31:
                _s -= 9;
                break
        }
        let s = safe_add(safe_add(safe_add(bit_2(newArray.at(-2), 17, 19, 10), newArray.length > 30 ? newArray.at(-7) : undefined), bit_2(newArray.at(-15), 7, 18, 3)), newArray[newArray.length - 16 + _s]);
        newArray.push(s);
    }
    return newArray
}

function _$td(ts, e) {
    ts = ts + "";
    let array64 = create_array64(ts, e);
    let keys = [1787869703, 3187657277, 1013543642, 2787687687, 1355786819, 2608768764, 528687666, 1548757865];
    let ss = core(keys, array64);
    let s = [];
    for (let i = 0; i < ss.length; i++) {
        s.push(safe_add(ss[i], keys[i]))
    }
    return binl2hex(s);
}


// console.debug(_$t(1687165281200, 104));
// console.debug("5420edabb2d4a5e7682078ee2f5d1d2866e25908ab1e9650bfc39baca52d6ea4");
// console.debug(_$t(1687249321571, 104));
// console.debug("a1322916ccd60b950b9d3717cb2bcf345d472dcc6860c855ef4d194180e1f18e");

function _$a() {
    this.getArray = function getArray(array, arr16) {
        let arr = Array.from(array);

        let numbers = [
            7815274277, 5475875749, 1516242449, 1518797949
            , 1518678769, 1518867549, 157858877, 1515875749
            , 1558778249, 1589854249, 1505780579, 1558707849
            , 1557858749, 1515877809, 1515875709, 1518587577
        ]

        // TODO 不同时间的值不同
        //      应该是根据时间戳或者其他依据，在某段时间内固定
        numbers[2] = 1516548949;


        for (let i = 0; i < numbers.length / 4; i++) {
            arr[5] = arr[1] & arr[2];
            console.debug("==> 5: ", arr[5]);
            arr[0] = arr[0] + ((((arr[5] | (arr[1] & arr[3])) | (arr[2] & arr[3])) + arr16[i % 16]) + numbers[i * 4]);
            console.debug("==> 0: ", arr[0]);
            arr[0] = (arr[0] << 3) | (arr[0] >>> 29);
            console.debug("==> 0: ", arr[0]);

            arr[4] = arr[0] & arr[1];
            console.debug("==> 4: ", arr[4]);
            arr[3] = arr[3] + ((((arr[4] | (arr[0] & arr[2])) | arr[5]) + arr16[(i + 4) % 16]) + numbers[i * 4 + 1]);
            console.debug("==> 3: ", arr[3]);
            arr[3] = (arr[3] << 5) | (arr[3] >>> 27);
            console.debug("==> 3: ", arr[3]);

            arr[7] = arr[3] & arr[0];
            console.debug("==> 7: ", arr[7]);
            arr[2] = arr[2] + ((((arr[7] | (arr[3] & arr[1])) | arr[4]) + arr16[(i + 8) % 16]) + numbers[i * 4 + 2]);
            console.debug("==> 2: ", arr[2]);
            arr[2] = (arr[2] << 9) | (arr[2] >>> 23);
            console.debug("==> 2: ", arr[2]);

            if (i < 3) {
                arr[6] = arr[2] & arr[3];
                console.debug("==> 6: ", arr[6]);
                arr[1] = arr[1] + ((((arr[6] | (arr[2] & arr[0])) | arr[7]) + arr16[(i + 12) % 16]) + numbers[i * 4 + 3]);
            } else {
                arr[1] = arr[1] + (((((arr[2] & arr[3]) | (arr[2] & arr[0])) | arr[7]) + arr16[(i + 12) % 16]) + numbers[i * 4 + 3]);
            }
            console.debug("==> 1: ", arr[1]);
            arr[1] = (arr[1] << 13) | (arr[1] >>> 19);
            console.debug("==> 1: ", arr[1]);

            console.debug(JSON.stringify(arr));
        }

        numbers = [
            1855875780, 1859787573, 1858708778, 1852785793
            , 1858754193, 1578876578, 1875587593, 1858765785
            , 1858757593, 1875757893, 1857745743, 1897898700
            , 1887008799, 1877885500, 1856578778, 1898745503
        ];
        for (let i = 0; i < 4; i++) {
            let k = [0, 2, 1, 3][i];
            arr[5] = arr[1] ^ arr[2];
            arr[0] = arr[0] + (((arr[5] ^ arr[3]) + arr16[k]) + numbers[i * 4])
            arr.h0 = arr[0];
            arr[0] = (arr[0] << 3) | (arr[0] >>> 29);
            arr[3] = arr[3] + (((arr[5] ^ arr[0]) + arr16[k + 8]) + numbers[i * 4 + 1]);
            arr.h3 = arr[3];
            arr[3] = (arr[3] << 9) | (arr[3] >>> 23);

            arr[7] = arr[3] ^ arr[0];
            arr[2] = arr[2] + (((arr[7] ^ arr[1]) + arr16[k + 4]) + numbers[i * 4 + 2]);
            arr.h2 = arr[2];
            arr[2] = (arr[2] << 11) | (arr[2] >>> 21);
            arr[1] = arr[1] + (((arr[7] ^ arr[2]) + arr16[k + 12]) + numbers[i * 4 + 3]);
            arr.h1 = arr[1];
            arr[1] = (arr[1] << 15) | (arr[1] >>> 17);

            // console.debug(JSON.stringify(arr));
        }
        return arr
    }

    this.signed = function signed(arr) {
        arr = Array.from(arr);
        arr.length = 8;
        let arr16 = [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 512, 0, 0];
        let shifts = [3, 7, 11, 19]
        for (let i = 0; i < arr16.length - 1; i++) {
            let index = (4 - (i % 4)) % 4;
            arr[index] = arr[index] + (((arr[(index + 1) % 4] & arr[(index + 2) % 4]) ^ (~arr[(index + 1) % 4] & arr[(index + 3) % 4])) + arr16[i]);
            console.debug(index, arr[index]);
            arr[index] = (arr[index] << shifts[i % 4]) | (arr[index] >>> (32 - shifts[i % 4]));
            console.debug(index, arr[index]);
        }
        console.debug(JSON.stringify(arr))
        arr = this.getArray(arr, arr16);
        this.sign2 = [
            (arr.h0 << 3) | (arr.h0 >>> 29),
            (arr.h1 << 15) | (arr.h1 >>> 17),
            (arr.h2 << 11) | (arr.h2 >>> 21),
            (arr.h3 << 9) | (arr.h3 >>> 23)
        ];
    };

    this.str2Buffer = function str2Buffer(e) {
        let u = new Uint8Array(e.length);
        for (let i = 0; i < e.length; i++) {
            u[i] = e.charCodeAt(i)
        }
        this.blocks = new Uint32Array(u.buffer);
    }

    this.str2bol = function str2bol(e) {
        this.str2Buffer(e);
        let arr = [];
        for (let i = 0; i < 4; i++) {
            if (i === 0) {
                arr[0] = this.blocks[0] - 1;
                arr[0] = (arr[0] << 3) | (arr[0] >>> 29);
                arr[3] = (((arr[0] & 4028484897) ^ (~arr[0] & 2565165562)) + this.blocks[1]) + 215635148;
                arr[3] = (arr[3] << 7) | (arr[3] >>> 25);
                arr[2] = (((arr[3] & arr[0]) ^ (~arr[3] & 4045465167)) + this.blocks[2]) - 1731421541;
                arr[2] = (arr[2] << 11) | (arr[2] >>> 21);
                arr[1] = (((arr[2] & arr[3]) ^ (~arr[2] & arr[0])) + this.blocks[3]) - 271715141;
                arr[1] = (arr[1] << 19) | (arr[1] >>> 13);
            } else {
                arr[0] = arr[0] + ((((arr[1] & arr[2]) ^ (~arr[1] & arr[3])) + this.blocks[i * 4]));
                arr[0] = (arr[0] << 3) | (arr[0] >>> 29);
                arr[3] = arr[3] + ((((arr[0] & arr[1]) ^ (~arr[0] & arr[2])) + this.blocks[(i * 4) + 1]));
                arr[3] = (arr[3] << 7) | (arr[3] >>> 25);
                arr[2] = arr[2] + ((((arr[3] & arr[0]) ^ (~arr[3] & arr[1])) + this.blocks[(i * 4) + 2]));
                arr[2] = (arr[2] << 11) | (arr[2] >>> 21);
                arr[1] = arr[1] + ((((arr[2] & arr[3]) ^ (~arr[2] & arr[0])) + this.blocks[(i * 4) + 3]));
                arr[1] = (arr[1] << 19) | (arr[1] >>> 13);
            }
        }
        return this.getArray(arr, this.blocks)
    }

    this.update = function update(e) {
        let aa = this.str2bol(e);
        this.h0 = (aa[0] + 1562153154) >> 0;
        this.h1 = (aa[1] - 854463479) >> 0;
        this.h2 = (aa[2] - 1548648642) >> 0;
        this.h3 = (aa[3] + 245451588) >> 0;
        return this;
    };
    this.hex = function hex() {
        this.sign1 = [this.h0,this.h1,this.h2,this.h3]
        this.signed(this.sign1);

        let array = [];
        for (let i = 0; i < this.sign2.length; i++) {
            array.push((this.sign1[i] + this.sign2[i]) >> 0)
        }
        let str = "";
        for (const i of array) {
            for (const number of [4, 0, 12, 8, 20, 16, 28, 24]) {
                str += ((i >> number) & 15).toString(16)
            }
        }
        return str
    };
}

function getEncrypted(ts) {
    return (new _$a).update(_$td(ts, 104)).hex()
}


console.openDebug = true;

// let u = (new _$a).update("66d4f95fe7e5568c66ee0240d7c94e2512dec65dbedc4839632c5800c75e6dfc");
// let u = (new _$a).update("5420edabb2d4a5e7682078ee2f5d1d2866e25908ab1e9650bfc39baca52d6ea4");
// let u = (new _$a).update("0a1e7025c14863949c73df18f61ff9c374a596727eb805d16356b1ea80745bf8");
// console.log(u.hex());



console.log(_$td(1687165281200, 104));
