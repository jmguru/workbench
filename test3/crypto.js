// Nodejs encryption with CTR
var crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'b00ft3nd3rs';
var fs = require("fs");

var program = require('commander');

program
  .version('0.0.1')
  .option('-d, --decrypt','Decrypt registry.json')
  .option('-e, --encrypt','Encrypt registry.json')
  .parse(process.argv);


var filename = "config/registry.json"
var contents = fs.readFileSync(filename);
var json = JSON.parse(contents);

if(program.decrypt==null && program.encrypt==null) {
  console.error("Usage: node crypto.js -d | -e ");
  process.exit(1);
}

if(program.decrypt) {
  console.log ("Decrypting config/registry.json.")
  decryptAllPasswords()
} else if(program.encrypt) {
  console.log ("Encrypting config/registry.json.")
  encryptAllPasswords()
}

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
