const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/",function(req,res){

    Album.find({},function(err,foundAlbums){

        if(foundAlbums.length === 0){
            Album.insertMany(defaultAlbums,function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("successful");
                }
            });
            res.redirect("/");
        }else{
            res.render("list",{newAlbums: foundAlbums});
        }
    })
});

app.post("/",function(req,res){
    const albumName = req.body.newItem;
    const album = new Album({
        name: albumName,
        artist: albumArtist,
        date: albumDate,
        genre: albumGenre
    });

    album.save
});

app.post("/delete",function(req,res){
    const checkedAlbumID = req.body.checkbox;

    Album.findByIdAndRemove(checkedAlbumID,function(err){
        if(!err){
            console.log("successfully deleted");
            res.redirect("/");
        }
    })
})