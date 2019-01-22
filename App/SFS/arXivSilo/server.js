var express = require('express');
var bodyParser = require('body-parser');
var uuid = require("uuid") 
var app = express();
var request = require("request")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var convert = require("xml-js")
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methodes", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentiels", true);
  next();
});
app.post('/arxiv/search', function (req, res) {
    var input = req.body.input
    var isOk
    var docs = []
    request.get("http://export.arxiv.org/api/query?search_query="+input,
    function (err, response, body) {
      if (response.statusCode == 200) {
          var xmlRes = response.body
          var jsonRes = convert.xml2json(xmlRes, {compact: true, spaces: 4})
          var items = JSON.parse(jsonRes).feed.entry
          // console.log(items);
          
          items.forEach(item => {
              var authors = item.author
              var auths = []
              
              if(authors != undefined){
                  if(Array.isArray(authors))
                  authors.forEach(auth=>{
                      auths.push(auth.name._text);
                      
                  })
                  else auths.push(authors.name._text)
              }
              
            var doc = {
              uri: item.id._text,
              title: item.title._text,
              authors: auths.toString(),
              description: item.summary._text,
              source: "Arxiv"
            }
            docs.push(doc)
            
          });
               
        isOk = true
        
        res.send({
          data: docs,
          success: isOk
        })
      }

    })
  })
var port = 8092;

app.listen(port, function () {
  console.log("Port : " + port);
});
