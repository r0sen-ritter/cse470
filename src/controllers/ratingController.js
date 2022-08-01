const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const rating = 0;

mongoose.connect("mongodb:localhost:3000/ratingDB,{userNewUrlParser: true");

const albumSchema{
    rating: Number
}

const ratingN = mongoose.model();

app.post("/rating", function(req,res){
    
});

app.get("rating", function(req,res){

res.send();
})

app.listen(3000,function(){
    console.log("server running, port is 3000");
});