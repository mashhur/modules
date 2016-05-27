var AESCrypt = {};

AESCrypt.decrypt = function(cryptkey, iv, encryptdata) {
    encryptdata = new Buffer(encryptdata, 'base64').toString('binary');

    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
        decoded = decipher.update(encryptdata, 'binary', 'utf8');

    decoded += decipher.final('utf8');
    return decoded;
}

AESCrypt.encrypt = function(cryptkey, iv, cleardata) {
    var encipher = crypto.createCipheriv('aes-128-cbc', cryptkey, iv),
        encryptdata = encipher.update(cleardata, 'utf8', 'binary');

    encryptdata += encipher.final('binary');
    encode_encryptdata = new Buffer(encryptdata, 'binary').toString('base64');
    return encode_encryptdata;
}

var cryptkey   = crypto.createHash('sha256').update('Nixnogen').digest(),
    iv         = 'mykey',	// key
    buf        = "mashhur", // 32 chars, text
    enc        = AESCrypt.encrypt(cryptkey, iv, buf);
var dec        = AESCrypt.decrypt(cryptkey, iv, enc);

console.warn("encrypt length: ", enc.length);
console.warn("encrypt in Base64:", enc);
console.warn("decrypt all: " + dec);