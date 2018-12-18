var path = require('path');
const https = require("https"),
  fs = require("fs");

const options = {
  key: fs.readFileSync("research.com.key", 'utf8'),
  cert: fs.readFileSync("research.com.crt", 'utf8'),
};
var uuid = require("uuid")
var express = require('express');
var bodyParser = require('body-parser');
const request = require("request")
var app = express();
var DocRepository = require("./doc.db")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));



app.post('/search', (req, res) => {
  console.log(req.body);
  var input = req.body.input
  var filter = req.body.filter
  var items = []
  var docs = []
  console.log(input);
  if (filter) {
    request.get("https://api.archives-ouvertes.fr/search/?q=" + input + "&fq=structType_s:" + filter + "&wt=json&fl=authFullName_s+docid+label_s+uri_s+title_s",
      function (err, response, body) {
        if (response.statusCode == 200) {
          isOk = true
          items = JSON.parse(response.body).response.docs
          items.forEach(item => {

            var doc = {
              _id: uuid(),
              label: item.label_s,
              uri: item.uri_s,
              docid: item.docid,
              title: item.title_s.toString(),
              authors: item.authFullName_s.toString()
            }
            docs.push(doc)
            DocRepository.add(doc, (res) => {

            })
          });

        }
        res.send({
          data: docs,
          success: isOk
        })
      })

  } else {
    request.get("https://api.archives-ouvertes.fr/search/?q=" + input + "&wt=json&fl=authFullName_s+docid+label_s+uri_s+title_s",
      function (err, response, body) {
        if (response.statusCode == 200) {
          isOk = true
          items = JSON.parse(response.body).response.docs
          items.forEach(item => {

            var doc = {
              _id: uuid(),
              label: item.label_s,
              uri: item.uri_s,
              docid: item.docid,
              title: item.title_s.toString(),
              authors: item.authFullName_s.toString()
            }
            docs.push(doc)

            DocRepository.add(doc, (res) => {
              // console.log(docs);
            })
          });

          res.send({
            data: docs,
            success: isOk
          })
        }

      })

  }
})
var port = 8090;
https.createServer(options, app).listen(port, function () {
  console.log("Port : " + port);
});