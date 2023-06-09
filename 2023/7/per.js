// hsha_ff(1888437479, -1564276879, -2446685777, 3443827714, 878269645, 7, -834672873)


function core_hsha2(arr) {
    let newArray = [878269645, 2018077262, 843147853, 2034844750, 826698318, 1817341282, 1970040154, 5330778];
    newArray.length = 14;
    newArray.push(undefined);
    let keys = [1888437479, -1564276879, -2446685777, 3443827714];
    let ciphers = [].concat(keys).concat([0]).concat(keys);
    let bitss = [[7, 12, 17, 22], [5, 9, 14, 20], [4, 11, 16, 23], [6, 10, 15, 21]];
    let bit, cipher;
    let newArrayIndexs = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,  // 1 等差数列
        1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12,  // 5 等差数列
        5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2,  // 3 等差数列
        0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9   // 7 等差数列
    ];
    let bb = [-834672873, -757264886, -751132486, 73175179, -84457825, -841667502, 772097767, 1247212256, -21495573, -538088001, 614928512, -124439147, -203928014, -858519982, 153637471, -40341101, -890647817, 797098390, -334588759, -1069501632, 67027649, -672397138, -701558691, 748927709, -660478335, -212254394, 154687418, -1019803690, -433925248, 1163531501, -1444681467, -482752928, 477534986, -1926607734, -378558, -780378235, 656768880, -35309556, -1530992060, 284289595, -155497632, -1094730640, 681279174, -758763037, -124193971, 219141156, -687603159, -421815835, 530742520, -995338651, -198630844, 1126891415, -1416354905, -57434055, 1700485571, -1894986606, -1051523, -864262567, 616373459, -782024841, -665719564, 200189745, -881493683, -22019736, 553941102, -455351945];
    for (let i = 0; i < bitss.length; i++) {
        let bits = bitss[i];
        for (let x = 0; x < bits.length; x++) {
            switch (x) {
                case 0:
                    cipher = [ciphers[0], ciphers[1], ciphers[2], ciphers[3], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                    ciphers[5 - 5] = hsha_ff.apply(window, cipher);
                    break
                case 8:
                    cipher = [ciphers[3], ciphers[0], ciphers[1], ciphers[2], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                    ciphers[8 - 5] = hsha_ff.apply(window, cipher);
                    if (i * ii === 0) {
                        cipher = [ciphers[3], ciphers[0], ciphers[1], ciphers[2], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                        ciphers[8] = hsha_ff.apply(window, cipher);
                    }
                    break;
                case 7:
                    cipher = [ciphers[2], ciphers[3], ciphers[0], ciphers[1], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                    ciphers[7 - 5] = hsha_ff.apply(window, cipher);
                    break
                case 6:
                    cipher = [ciphers[1], ciphers[2], ciphers[3], ciphers[0], newArray[newArrayIndexs.shift()], bits[x], bb.shift(), 7];
                    ciphers[6 - 5] = hsha_ff.apply(window, cipher);
                    break;
            }
        }
    }
    return ciphers
}

core_hsha2([878269517, 2018077262, 843147853, 2034844750, 826698318, 1817341282, 1970040154, 5330778])