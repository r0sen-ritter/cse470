const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const bodyParser = require("body-parser");

mongoose.connect("mongodb:localhost:3000/ratingDB,{userNewUrlParser: true");

const librarySchema{
    name: String
}

const albumName = mongoose.model();


app.get("/albums", function(req,res){
    result = albums.find({name:"."+search+"."})
res.send(result);
})

app.listen(3000,function(){
    console.log("server running, port is 3000");
});