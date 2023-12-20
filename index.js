// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp microservice
app.get("/api/:date?",(req, res) =>{
  const {date} = req.params
  if(!date){
    const currentDate = new Date()
    res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    })
    return
  }
  const regex = /\W/
  
  const validDate = regex.test(date) ? new Date(date) : new Date(Number(date))
  if(validDate.toUTCString() == "Invalid Date"){
    res.json({
      error: "Invalid Date"
    })
    return
  }

  res.json({
    unix: validDate.getTime(),
    utc: validDate.toUTCString()
  }) 

})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
