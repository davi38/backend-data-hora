// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`);
})

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/data-hora", function(req, res){
  res.sendFile(__dirname + '/views/data-hora.html');
})

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello APIi'});
});


app.get("/api", function(req,res){
  let now = new Date()
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  })
})

app.get("/api/:date_string", function(req, res){
  let dateString = req.params.date_string
  let stringPassed = new Date(dateString)

  if(parseInt(dateString) > 10000){
    let unixTime = new Date(parseInt(dateString))
    res.json({
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    })
  }


  if(stringPassed == 'Invalid Date'){
    res.json({ error : "Invalid Date" })
  } else {
    res.json({
      "unix": stringPassed.getTime(),
      "utc": stringPassed.toUTCString()
    })
  }


  console.log(dateString)



})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
