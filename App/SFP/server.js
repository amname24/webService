var path = require('path');
const https = require("https"),
  fs = require("fs");

const options = {
  key: fs.readFileSync("research.com.key", 'utf8'),
  cert: fs.readFileSync("research.com.crt", 'utf8'),
};

var express = require('express');
var bodyParser = require('body-parser');
const request = require("request")
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));



app.post('/search', (req, res)=>{
  console.log(req.body.input);
  var input = req.body.input
  console.log(input);
  
  request.get("https://api.archives-ouvertes.fr/search/?q="+input+"&wt=json",
  function (err, response, body) {
    if (response.statusCode == 200) {
      isOk = true
      var items = JSON.parse(response.body).response.docs
     
      console.log(items);
      res.send({
        data: items,
        success: isOk
      })
    }
  })
})
app.post('/search/filter', (req, res)=>{
  console.log(req.body.input);
  var input = req.body.input
  var filter = req.body.filter
  console.log(input);
  
  request.get("https://api.archives-ouvertes.fr/search/?q="+input+"&fq=structType_s:"+filter+'&wt=json',
  function (err, response, body) {
    if (response.statusCode == 200) {
      isOk = true
      var items = JSON.parse(response.body).response.docs
     
      console.log(items);
      res.send({
        data: items,
        success: isOk
      })
    }
})
})
var port = 8090;
https.createServer(options, app).listen(port, function () {
  console.log("Port : " + port);
});