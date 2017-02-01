
var fs = require("fs");

var contents = fs.readFileSync("config/registry.json");
var jsonContent = JSON.parse(contents);
var userobj = {
                  username: "",
                  password: ""
                }

getUsernamePassword(jsonContent,"Terri","Paypal",userobj);

console.log(userobj.username);
console.log(userobj.password);

function getUsernamePassword(json,client,servicename,payload) {
  var num = Object.keys(json.Person).length;

  for ( var i = 0; i < num; i++)
  {
      if (client == json.Person[i].firstname) {
          var obj = json.Person[i].services;
          var num2 = Object.keys(obj).length;
          for (var j = 0; j < num2; j++) {
            if(servicename == obj[j].name) {
              payload.username = obj[j].username;
              payload.password = obj[j].password;
            }
          }
      }
  }
}
