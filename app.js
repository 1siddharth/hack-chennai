//const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const app=express();
var bodyParser = require("body-parser");
var LocalStrategy  = require('passport-local');
//const db = require("./setup/myurl").mongoURL

mongoose.connect(db).then(() => console.log("connected"))
.catch((err)=> console.log(err))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '../../page1.html'));

});
//routing
app.get('/page1',(req,res)=>{
    res.send("");

});
app.get('/page2',(req,res)=>{
    res.send("");

});

app.get("/profile",(req, res)=>{
	User.find({},(err, result)=>{
	if (err) {
      res.json({
        status:400,
        success:false,
        message:err
      })
    }
    else{
          res.json(result);
    }
	});
});


//database connection
//mongoose.connect("mongodb://localhost/portaldata",{ useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://admindb:admindatabase@cluster0-vlwic.mongodb.net/xyz", { useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use(bodyParser.json());
module.exports = mongoose.model("Schema");
app.listen(5900);