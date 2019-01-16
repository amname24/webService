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
var app = express();
var axios = require("axios")
var DocRepository = require("./doc.db")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/search/hal',(req, res) => {
  axios.post('http://localhost:8091/hal/search', {
    input: req.body.input
  }).then(function (response) {
    var items = response.data.data
    items.forEach(item => {
      DocRepository.add(item, (response) => {
        // console.log(response);
        
      })
    });
    res.send(response.data)
  }).catch(function (error) {
    res.send(false)
  });
  

});
app.post('/search/arxiv',(req, res) => {
  axios.post('http://localhost:8092/arxiv/search', {
    input: req.body.input
  }).then(function (response) {
    var items = response.data.data
    items.forEach(item => {
      DocRepository.add(item, (response) => {
        // console.log(response);
        
      })
    });

    res.send(response.data)
  }).catch(function (error) {
    res.send(false)
  });
  

});

var port = 8090;
https.createServer(options, app).listen(port, function () {
  console.log("Port : " + port);
});