// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

//First User story
app.get("/api/timestamp/:date_string?", (req,res)=>{
  
  const dateString = req.params.date_string;
  const reg = new RegExp(/[^0-9\-]/)
 
  if(dateString){
    
  
    if(reg.test(dateString)){
      res.json({"error":"Invalid Date"})
    }else{

      if(!new RegExp(/[^0-9]/).test(dateString) && dateString.length===13){
        var date = new Date(Number(dateString)*1000)

        var jsonObject = {"unix":date.getTime(),"utc":date.toUTCString()}
        console.log(jsonObject)
        res.json(jsonObject)
      }else{
        var date = new Date(dateString)
      
        var jsonObject = {"unix":date.getTime(),"utc":date.toUTCString()}
        console.log(jsonObject)
        res.json(jsonObject)
      }
      
    }
    
    
  }else{
    var date = new Date()
   var jsonObject = {"unix":date.getTime(),"utc":date.toUTCString()}
    console.log(jsonObject)
    res.json(jsonObject)
  }
  
  
  
})



// listen for requests :)
var listener = app.listen(3000||process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});