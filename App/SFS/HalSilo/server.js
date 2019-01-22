var express = require('express');
var bodyParser = require('body-parser');
var uuid = require("uuid")
var app = express();
var request = require("request")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methodes", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentiels", true);
  next();
});
app.post('/hal/search', function (req, res) {
    var input = req.body.input
    var isOk
    var docs = []
    request.get("https://api.archives-ouvertes.fr/search/?q=" + input + "&wt=json&fl=authFullName_s+uri_s+title_s+abstract_s",
    function (err, response, body) {
      if (response.statusCode == 200) {
        isOk = true
        items = JSON.parse(response.body).response.docs
        items.forEach(item => {

          var doc = {
            uri: item.uri_s,
            title: String(item.title_s),
            authors: String(item.authFullName_s),
            description: String(item.abstract_s),
            source: "Hal"
          }
          docs.push(doc)
        });

        res.send({
          data: docs,
          success: isOk
        })
      }

    })
  })
var port = 8091;

app.listen(port, function () {
  console.log("Port : " + port);
});
