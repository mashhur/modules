// method 1
var crypto = require('crypto');

// AES128
var AESCrypt = {};
 
AESCrypt.decrypt = function(cryptkey, iv, encryptdata) {
    encryptdata = new Buffer(encryptdata, 'base64').toString('binary');
 
 	// var decipher = crypto.createDecipheriv('aes-256-ecb', cryptkey, iv),
    //var decipher = crypto.createDecipheriv('aes128', cryptkey, iv),
    var decipher = crypto.createDecipheriv('aes-128-ecb', cryptkey, iv),
    	decoded = decipher.update(encryptdata, 'binary', 'utf8');
 
    decoded += decipher.final('utf8');
    return decoded;
}
 
AESCrypt.encrypt = function(cryptkey, iv, cleardata) {
   
   	//var encipher = crypto.createCipheriv('aes-256-ecb', cryptkey, iv),
   	//var encipher = crypto.createCipheriv('aes128', cryptkey, iv),
   	var encipher = crypto.createCipheriv('aes-128-ecb', cryptkey, iv),
   		encryptdata = encipher.update(cleardata, 'utf8', 'binary');
 
    encryptdata += encipher.final('binary');
    encode_encryptdata = new Buffer(encryptdata, 'binary').toString('base64');
    return encode_encryptdata;
}
 
var message = '마쉬후르';
var key = "Your_secret_key_"; // 16byte = 128bit key for OpenSSL
var iv = crypto.randomBytes(16);
var enc = AESCrypt.encrypt(key, iv, message);
var dec = AESCrypt.decrypt(key, iv, enc);

console.warn("Key: ", key);
console.warn("IV: ", iv);
console.warn("encrypt length: ", enc.length);
console.warn("encrypt in Base64:", enc);
console.warn("decrypt all: " + dec);

// method 2
// npm install mcrypt
var MCrypt = require('mcrypt').MCrypt;
var msg = "마쉬후르";
var key = "Your_secret_key_";
var desEcb = new MCrypt('rijndael-128', 'ecb');
desEcb.open(key);
var cipherText = desEcb.encrypt(msg);
console.warn("cipherText: " + cipherText);

var plaintext = desEcb.decrypt(new Buffer(cipherText, 'base64'));
console.log(plaintext.toString());