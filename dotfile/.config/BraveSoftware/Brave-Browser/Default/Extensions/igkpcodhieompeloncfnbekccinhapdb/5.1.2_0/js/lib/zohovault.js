var Zohovault = {};
Zohovault.hash = function (s) {
    var chrsz = 8;
    var hexcase = 0;
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function S(X, n) { return (X >>> n) | (X << (32 - n)); }
    function R(X, n) { return (X >>> n); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
    function core_sha256(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
            for (var j = 0; j < 64; j++) {
                if (j < 16) {
                    W[j] = m[j + i];
                }
                else {
                    W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                }
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }
    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
};
Zohovault.Utf8 = {
    encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    decode: function (utftext) {
        var string = "";
        var i = 0;
        var c2 = 0, c1 = 0, c3 = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
Zohovault.Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Zohovault.Utf8.encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Zohovault.Utf8.decode(output);
        return output;
    }
};
Zohovault.AES = {};
Zohovault.AES.cipher = function (input, w) {
    var Nb = 4;
    var Nr = w.length / Nb - 1;
    var state = [[], [], [], []];
    for (var i = 0; i < 4 * Nb; i++) {
        state[i % 4][Math.floor(i / 4)] = input[i];
    }
    state = Zohovault.AES.addRoundKey(state, w, 0, Nb);
    for (var round = 1; round < Nr; round++) {
        state = Zohovault.AES.subBytes(state, Nb);
        state = Zohovault.AES.shiftRows(state, Nb);
        state = Zohovault.AES.mixColumns(state, Nb);
        state = Zohovault.AES.addRoundKey(state, w, round, Nb);
    }
    state = Zohovault.AES.subBytes(state, Nb);
    state = Zohovault.AES.shiftRows(state, Nb);
    state = Zohovault.AES.addRoundKey(state, w, Nr, Nb);
    var output = new Array(4 * Nb);
    for (var i = 0; i < 4 * Nb; i++) {
        output[i] = state[i % 4][Math.floor(i / 4)];
    }
    return output;
};
Zohovault.AES.keyExpansion = function (key) {
    var Nb = 4;
    var Nk = key.length / 4;
    var Nr = Nk + 6;
    var w = new Array(Nb * (Nr + 1));
    var temp = new Array(4);
    for (var i = 0; i < Nk; i++) {
        var r = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
        w[i] = r;
    }
    for (var i = Nk; i < (Nb * (Nr + 1)); i++) {
        w[i] = new Array(4);
        for (var t = 0; t < 4; t++) {
            temp[t] = w[i - 1][t];
        }
        if (i % Nk == 0) {
            temp = Zohovault.AES.subWord(Zohovault.AES.rotWord(temp));
            for (var t = 0; t < 4; t++) {
                temp[t] ^= Zohovault.AES.rCon[i / Nk][t];
            }
        }
        else if (Nk > 6 && i % Nk == 4) {
            temp = Zohovault.AES.subWord(temp);
        }
        for (var t = 0; t < 4; t++) {
            w[i][t] = w[i - Nk][t] ^ temp[t];
        }
    }
    return w;
};
Zohovault.AES.subBytes = function (s, Nb) {
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < Nb; c++) {
            s[r][c] = Zohovault.AES.sBox[s[r][c]];
        }
    }
    return s;
};
Zohovault.AES.shiftRows = function (s, Nb) {
    var t = new Array(4);
    for (var r = 1; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
            t[c] = s[r][(c + r) % Nb];
        }
        for (var c = 0; c < 4; c++) {
            s[r][c] = t[c];
        }
    }
    return s;
};
Zohovault.AES.mixColumns = function (s, Nb) {
    for (var c = 0; c < 4; c++) {
        var a = new Array(4);
        var b = new Array(4);
        for (var i = 0; i < 4; i++) {
            a[i] = s[i][c];
            b[i] = s[i][c] & 0x80 ? s[i][c] << 1 ^ 0x011b : s[i][c] << 1;
        }
        s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
        s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
        s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
        s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
    }
    return s;
};
Zohovault.AES.addRoundKey = function (state, w, rnd, Nb) {
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < Nb; c++) {
            state[r][c] ^= w[rnd * 4 + c][r];
        }
    }
    return state;
};
Zohovault.AES.subWord = function (w) {
    for (var i = 0; i < 4; i++) {
        w[i] = Zohovault.AES.sBox[w[i]];
    }
    return w;
};
Zohovault.AES.rotWord = function (w) {
    var tmp = w[0];
    for (var i = 0; i < 3; i++) {
        w[i] = w[i + 1];
    }
    w[3] = tmp;
    return w;
};
Zohovault.AES.sBox = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
Zohovault.AES.rCon = [[0x00, 0x00, 0x00, 0x00],
    [0x01, 0x00, 0x00, 0x00],
    [0x02, 0x00, 0x00, 0x00],
    [0x04, 0x00, 0x00, 0x00],
    [0x08, 0x00, 0x00, 0x00],
    [0x10, 0x00, 0x00, 0x00],
    [0x20, 0x00, 0x00, 0x00],
    [0x40, 0x00, 0x00, 0x00],
    [0x80, 0x00, 0x00, 0x00],
    [0x1b, 0x00, 0x00, 0x00],
    [0x36, 0x00, 0x00, 0x00]];
Zohovault.AES.encrypt = function (plaintext, password, nBits) {
    var blockSize = 16;
    if (!(nBits == 128 || nBits == 192 || nBits == 256)) {
        return '';
    }
    plaintext = Utf8.encode(plaintext);
    password = Utf8.encode(password);
    var nBytes = nBits / 8;
    var pwBytes = new Array(nBytes);
    for (var i = 0; i < nBytes; i++) {
        pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
    }
    var key = Zohovault.AES.cipher(pwBytes, Zohovault.AES.keyExpansion(pwBytes));
    key = key.concat(key.slice(0, nBytes - 16));
    var counterBlock = new Array(blockSize);
    var nonce = (new Date()).getTime();
    var nonceMs = nonce % 1000;
    var nonceSec = Math.floor(nonce / 1000);
    var nonceRnd = Math.floor(Math.random() * 0xffff);
    for (var i = 0; i < 2; i++) {
        counterBlock[i] = (nonceMs >>> i * 8) & 0xff;
    }
    for (var i = 0; i < 2; i++) {
        counterBlock[i + 2] = (nonceRnd >>> i * 8) & 0xff;
    }
    for (var i = 0; i < 4; i++) {
        counterBlock[i + 4] = (nonceSec >>> i * 8) & 0xff;
    }
    var ctrTxt = '';
    for (var i = 0; i < 8; i++) {
        ctrTxt += String.fromCharCode(counterBlock[i]);
    }
    var keySchedule = Zohovault.AES.keyExpansion(key);
    var blockCount = Math.ceil(plaintext.length / blockSize);
    var ciphertxt = new Array(blockCount);
    for (var b = 0; b < blockCount; b++) {
        for (var c = 0; c < 4; c++) {
            counterBlock[15 - c] = (b >>> c * 8) & 0xff;
        }
        for (var c = 0; c < 4; c++) {
            counterBlock[15 - c - 4] = (b / 0x100000000 >>> c * 8);
        }
        var cipherCntr = Zohovault.AES.cipher(counterBlock, keySchedule);
        var blockLength = b < blockCount - 1 ? blockSize : (plaintext.length - 1) % blockSize + 1;
        var cipherChar = new Array(blockLength);
        for (var i = 0; i < blockLength; i++) {
            cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b * blockSize + i);
            cipherChar[i] = String.fromCharCode(cipherChar[i]);
        }
        ciphertxt[b] = cipherChar.join('');
    }
    var ciphertext = ctrTxt + ciphertxt.join('');
    ciphertext = Base64.encode(ciphertext);
    return ciphertext;
};
Zohovault.AES.decrypt = function (ciphertext, password, nBits) {
    var blockSize = 16;
    if (!(nBits == 128 || nBits == 192 || nBits == 256)) {
        return '';
    }
    ciphertext = Base64.decode(ciphertext);
    password = Utf8.encode(password);
    var nBytes = nBits / 8;
    var pwBytes = new Array(nBytes);
    for (var i = 0; i < nBytes; i++) {
        pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
    }
    var key = Zohovault.AES.cipher(pwBytes, Zohovault.AES.keyExpansion(pwBytes));
    key = key.concat(key.slice(0, nBytes - 16));
    var counterBlock = new Array(8);
    ctrTxt = ciphertext.slice(0, 8);
    for (var i = 0; i < 8; i++) {
        counterBlock[i] = ctrTxt.charCodeAt(i);
    }
    var keySchedule = Zohovault.AES.keyExpansion(key);
    var nBlocks = Math.ceil((ciphertext.length - 8) / blockSize);
    var ct = new Array(nBlocks);
    for (var b = 0; b < nBlocks; b++) {
        ct[b] = ciphertext.slice(8 + b * blockSize, 8 + b * blockSize + blockSize);
    }
    ciphertext = ct;
    var plaintxt = new Array(ciphertext.length);
    for (var b = 0; b < nBlocks; b++) {
        for (var c = 0; c < 4; c++) {
            counterBlock[15 - c] = ((b) >>> c * 8) & 0xff;
        }
        for (var c = 0; c < 4; c++) {
            counterBlock[15 - c - 4] = (((b + 1) / 0x100000000 - 1) >>> c * 8) & 0xff;
        }
        var cipherCntr = Zohovault.AES.cipher(counterBlock, keySchedule);
        var plaintxtByte = new Array(ciphertext[b].length);
        for (var i = 0; i < ciphertext[b].length; i++) {
            plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
            plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
        }
        plaintxt[b] = plaintxtByte.join('');
    }
    var plaintext = plaintxt.join('');
    plaintext = Utf8.decode(plaintext);
    return plaintext;
};
var Base64 = {};
globalThis.Base64 = Base64;
Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
Base64.encode = function (str, utf8encode) {
    utf8encode = (typeof utf8encode == 'undefined') ? false : utf8encode;
    var o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c, plain, coded;
    var b64 = Base64.code;
    plain = utf8encode ? str.encodeUTF8() : str;
    c = plain.length % 3;
    if (c > 0) {
        while (c++ < 3) {
            pad += '=';
            plain += '\0';
        }
    }
    for (c = 0; c < plain.length; c += 3) {
        o1 = plain.charCodeAt(c);
        o2 = plain.charCodeAt(c + 1);
        o3 = plain.charCodeAt(c + 2);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    }
    coded = e.join('');
    coded = coded.slice(0, coded.length - pad.length) + pad;
    return coded;
};
Base64.decode = function (str, utf8decode) {
    utf8decode = (typeof utf8decode == 'undefined') ? false : utf8decode;
    var o1, o2, o3, h1, h2, h3, h4, bits, d = [], plain, coded;
    var b64 = Base64.code;
    coded = utf8decode ? str.decodeUTF8() : str;
    for (var c = 0; c < coded.length; c += 4) {
        h1 = b64.indexOf(coded.charAt(c));
        h2 = b64.indexOf(coded.charAt(c + 1));
        h3 = b64.indexOf(coded.charAt(c + 2));
        h4 = b64.indexOf(coded.charAt(c + 3));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >>> 16 & 0xff;
        o2 = bits >>> 8 & 0xff;
        o3 = bits & 0xff;
        d[c / 4] = String.fromCharCode(o1, o2, o3);
        if (h4 == 0x40) {
            d[c / 4] = String.fromCharCode(o1, o2);
        }
        if (h3 == 0x40) {
            d[c / 4] = String.fromCharCode(o1);
        }
    }
    plain = d.join('');
    return utf8decode ? plain.decodeUTF8() : plain;
};
var Utf8 = {};
globalThis.Utf8 = Utf8;
Utf8.encode = function (strUni) {
    var strUtf = strUni.replace(/[\u0080-\u07ff]/g, function (c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
    });
    strUtf = strUtf.replace(/[\u0800-\uffff]/g, function (c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
    });
    return strUtf;
};
Utf8.decode = function (strUtf) {
    var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
        var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
        return String.fromCharCode(cc);
    });
    strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
        var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
        return String.fromCharCode(cc);
    });
    return strUni;
};
var ctrTxt;
globalThis.Zohovault = Zohovault;
