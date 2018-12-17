var path = require('path');
const axios = require("axios");
var jwt = require('jsonwebtoken');
const yml = require("js-yaml");
const https = require("https"),
  fs = require("fs");

const options = {
  key: fs.readFileSync("research.com.key", 'utf8'),
  cert: fs.readFileSync("research.com.crt", 'utf8'),
};

var express = require('express');
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');
const request = require("request")
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// const silosConfigPath = "silos.config.yml";
// try {
// 	silosConfigTry = yml.safeLoad(fs.readFileSync(path.join(__dirname, silosConfigPath), "utf8"));
// 	console.log("Silos config file loaded.");
// } catch (e) {
// 	console.log("Could not load the silos config file");
// 	process.exit(1);
// }
// var silosConfig = silosConfigTry.silo;

app.post(`/user/register`, (req, res) => {
  axios.post('http://localhost:8091/register', {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.send(false);
  });
});

// const RSA_PRIVATE_KEY = fs.readFileSync('./config/private.pem');

app.post(`/user/login`, (req, res) => {
  axios.post('http://localhost:8091/login', {
    email: req.body.email,
    password: req.body.password
  }).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.send(false);
  });
});

app.post(`/user/verify`, (req, res) => {
  axios.post('http://localhost:8091/verify', {
    token: req.body.token
  }).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    res.send(false);
  });
});
app.post('/user/adminVerify', function (req, res) {
  axios.post('http://localhost:8091/adminVerify').then(function (res) {
    res.json(response.data)
  }).catch(function (err) {
    res.send(false)
  })
})

app.post('/videos/search', (req, res) => {
  var site = req.body.site
  console.log(site);

  if (site.toLowerCase() == "youtube") {
    console.log('true');

    axios.post('http://localhost:8092/videos/youtube/search', {
      input: req.body.input
    }).then(function (response) {
      res.json(response.data);
    }).catch(function (error) {
      res.send(false);
    });
  } else if (site.toLowerCase() == "vimeo") {
    axios.post('http://localhost:8092/videos/vimeo/search', {
      input: req.body.input
    }).then(function (response) {
      res.json(response.data);
    }).catch(function (error) {
      res.send(false);
    });
  }

});


app.get('/video/:site/:videoId', (req, res) => {
  console.log('server', req.params.videoId);
  var site = req.params.site
  var videoId = req.params.videoId;
  if (site == "youtube")
    request.get('http://localhost:8092/video/youtube/' + videoId).pipe(res)
  else if (site == "vimeo")
    request.get('http://localhost:8092/video/vimeo/' + videoId).pipe(res)
});



app.post('/video/getVideoInfo', (req, res) => {
  var site = req.body.site
  if (site == "youtube") {
    axios.post('http://localhost:8092/video/youtube/getVideoInfo', {
      videoId: req.body.videoId
    }).then(function (response) {
      console.log(response.data);

      res.send(response.data);
    }).catch(function (error) {
      res.send(false);
    });
  } else if (site == "vimeo") {
    axios.post('http://localhost:8092/video/vimeo/getVideoInfo', {
      videoId: req.body.videoId
    }).then(function (response) {
      console.log(response.data);

      res.send(response.data);
    }).catch(function (error) {
      res.send(false);
    });
  }
});
app.post(`/video/add`, (req, res) => {
  axios.post('http://localhost:8092/video/add', {
    name : req.body.name,
    video_id : req.body.video_id,
    thumbnailUrl: req.body.thumbnailUrl,
    description: req.body.description,
    site :req.body.site
}).then(function (response) {
    console.log("add video");
    res.send(response.data);
  }).catch(function (error) {
    res.send(false);
  });
});
app.post(`/video/history`, (req, res) => {
  axios.post('http://localhost:8092/video/history', {
    user_id:req.body.user_id,
    video_id : req.body.video_id,
}).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.send(false);
  });
});

app.get(`/history/:user_id`, (req, res) => {
  var user_id = req.params.user_id 
  axios.get('http://localhost:8092/history/'+user_id).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.send(false);
  });
});


app.post('/search', (req, res)=>{
  console.log(req.body.input);
  var input = req.body.input
  console.log(input);
  
  request.get("https://api.archives-ouvertes.fr/search/?q="+input+"&wt=json",
  function (err, response, body) {
    if (response.statusCode == 200) {
      isOk = true
      var items = JSON.parse(response.body).response.docs
      // for (var i in items) {
      //   videos.push({
      //     videoId: items[i].id.videoId,
      //     site: 'youtube',
      //     name: items[i].snippet.title,
      //     embedUrl: "https://www.youtube.com/embed/",
      //     watchUrl: "https://www.youtube.com//watch?v=",
      //     thumbnailUrl: items[i].snippet.thumbnails.default.url,
      //     description: items[i].snippet.description
      //   })
      // }
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