/*
 * Module dependencies
 */
var fs = require("fs");

var contents = fs.readFileSync("config/registry.json");
var jsonContent = JSON.parse(contents);

var userobj = {
                  username: "",
                  password: ""
                }

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')


var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser());

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
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
  res.render('index', {
    title : 'AuthManager' ,
    name: 'AuthManager'
  })
})

app.post('/', function(req, res){
  var firstname = req.body.firstname;
  var servicename = req.body.servicename;
  getUsernamePassword(jsonContent,firstname,servicename,userobj);
  res.render('payback', {
    title : 'AuthManager' ,
    name: 'AuthManager',
    firstname: firstname,
    servicename: servicename,
    uname: userobj.username,
    password: userobj.password
  })
});

app.listen(4000)

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
