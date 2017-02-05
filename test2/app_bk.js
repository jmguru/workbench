
var fs = require("fs");

var contents = fs.readFileSync("config/registry.json");
var jsonContent = JSON.parse(contents);
var userobj = {
                  username: "",
                  password: ""
                }

//getUsernamePassword(jsonContent,"Terri","Paypal",userobj);

//create an app server
var express = require('express');
var app = express();
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');
app.use(logger);

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index', { title: 'Tits' })
})

//listen on localhost:3000
app.listen(3000);


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
