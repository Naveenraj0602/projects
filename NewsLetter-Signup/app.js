const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const request =require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname+ "/signup.html")
})

app.post("/", function (req, res) {
 const firstName = req.body.FirstName
 const lastName = req.body.LastName
 const email = req.body.email


const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_feilds: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/f6fbcd22d5";

const opitions = {
  method: "POST",
  auth: "naveen1:cbd12dc3b7e30587ce6ccdd63353c3b8-us21"
}

 const request = https.request(url, opitions, function(response){

if (response.statusCode === 200) {
  res.sendFile(__dirname + "/success.html")
}else {
  res.sendFile(__dirname + "/failure.html")
}
   response.on("data", function (data) {
     console.log(JSON.parse(data));
   })
 })
request.write(jsonData);
request.end();
});


app.post("/failure", function (req, res) {
  res.redirect("/")

})



app.listen(process.env.PORT || 3000, function () {
  console.log("hii");
});


//
// apikey
// cbd12dc3b7e30587ce6ccdd63353c3b8-us21

 // IDEA: f6fbcd22d5
