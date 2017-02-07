// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'b00ft3nd3rs';
var fs = require("fs");

var filename = "config/registry.json"
var contents = fs.readFileSync(filename);
var json = JSON.parse(contents);


encryptAllPasswords()
//decryptAllPasswords()

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function decryptAllPasswords() {
  var num = Object.keys(json.Person).length;
  for ( var i = 0; i < num; i++)
  {
    var obj = json.Person[i].services;
    var num2 = Object.keys(obj).length;
    for (var j = 0; j < num2; j++) {
        json.Person[i].services[j].password = decrypt(json.Person[i].services[j].password)
    }
  }
  fs.writeFileSync(filename, JSON.stringify(json,null,4));
}

function encryptAllPasswords() {
  var num = Object.keys(json.Person).length;
  for ( var i = 0; i < num; i++)
  {
    var obj = json.Person[i].services;
    var num2 = Object.keys(obj).length;
    for (var j = 0; j < num2; j++) {
        json.Person[i].services[j].password = encrypt(json.Person[i].services[j].password)
    }
  }
  fs.writeFileSync(filename, JSON.stringify(json,null,4));
}
