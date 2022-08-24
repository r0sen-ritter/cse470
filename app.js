require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.use(session({
    secret: "abcd",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/musicDB");


const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const albumSchema = new mongoose.Schema({
    category: String,
    album: String,
    artist: String,
    rating: Number,
    year: String,
    genre: String,
},
{
    collation: { locale: 'en', strength: 2 }
 });

const Album = mongoose.model("Album", albumSchema);


const trackSchema = new mongoose.Schema({
    albumid: String,
    track: String,
    duration: Number
});

const Track = mongoose.model("Track", trackSchema);

const reviewSchema = new mongoose.Schema({
    albumid: String,
    userid: String,
    points: Number,
    review: String
});

const Review = mongoose.model("Review", reviewSchema);

const RatingSchema = new mongoose.Schema({
    albumid: String,
    userid: String,
    rating: Number,
    combinedid: String
});

const Rating = mongoose.model("Rating",RatingSchema);


const chartSchema = new mongoose.Schema({
    userid: String,
    albumname: String,
    score: Number
});

const Chart = mongoose.model("Chart",chartSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/genrelist",function(req,res){
    Album.find({genre:req.body.genre},function(err,result){
        res.render("listAlbums",{foundAlbums:result});
    });
});
app.get("/showchart",function(req,resp){
    Chart.find({userid:req.user._id},function(req,res){
        console.log(res);
        resp.render("showchart",{data:res});
    });


});

app.get("/addchart",function(req,res){
    res.render("addchart");
});

app.post("/addchart",function(req,res){
    const newChart = new Chart({
        albumname:req.body.album,
        score: req.body.score,
        userid: req.user._id
    });
    newChart.save();
    res.redirect("/home");
});

app.get("/reviewspage/:id",function(req,res){
    Review.find({albumid:req.params.id},function(err,result){
        res.render("reviewspage",{reviews:result});
    });

});

app.get("/tracklist/:id",function(req,res){
    Track.find({albumid:req.params.id},function(err,result){
        console.log(result);
        res.render("tracklist",{tracklist:result});
    });

});

app.get("/addtrack",function(req,res){
    res.render("addtrack");
});

app.post("/addtrack",function(req,res){
    const newTrack = new Track({
        albumid:req.body.album,
        track: req.body.name,
        duration: req.body.duration
    });
    newTrack.save();
    res.redirect("/adminPanel");
});



app.get("/addalbum",function(req,res){
    res.render("addAlbum");
});



app.post("/addentry",function(req,res){

    const newAlbum = new Album({
        category: req.body.category,
        album: req.body.album,
        artist: req.body.artist,
        rating: req.body.rating,
        year: req.body.year,
        genre: req.body.genre
    });

    newAlbum.save();
    res.redirect("/addalbum");
});





app.get("/albumpage/:albumid",function(req,res){

    Rating.find({combinedid:req.params.albumid+req.user._id},function(err,found){
        if(found.length == 0){
            Album.find({_id: req.params.albumid},function(errpr,result){
                const store = [];
                store.push(result);
                res.render("albumPage",{res:store,urate:0});
            });

        }

        else{

            Album.find({_id: req.params.albumid},function(error,result){
                const store = [];
                store.push(result);
                res.render("albumPage",{res:store,urate:found[0].rating});
            });


        }
        


});
});


app.get("/search",function(req,res){
    res.render("searchResult",{albums:albums});

});

var albums = [];
app.post("/search",function(req,res){
    albums.length = 0;
    Album.find({album: req.body.search},function(err, foundAlbums){
        for(let i=0; i<foundAlbums.length; i++){
        albums.push(foundAlbums[i]);
        }
        res.redirect("/search")
    });
});


var sum = 0;
app.post("/rate/:albumid",function(req,res){
    Rating.find({userid:req.user.id},function(err,result){
        
        for(let i=0; i<result.length; i++){
            if(result[i].albumid == req.params.albumid){
                sum = sum+1;
            }
        }
    });

    if(sum === 0){
        
        var userrating = Number(req.body.rating);
        const newRating = new Rating({
        albumid: req.params.albumid,
        userid: req.user._id,
        rating: userrating,
        combinedid: req.params.albumid+req.user._id
    });
    newRating.save();

    Rating.find({albumid:req.params.albumid},function(err,res1){
        len = res1.length;
        newsum = 0;
        for(let i=0;i<len;i++){
            newsum = newsum+Number(res1[i].rating);
        }
        finrating = newsum/len;
        Album.updateOne({_id:req.params.albumid},{rating:finrating},function(err,docs){
            if(err){console.log("error")}else{console.log(docs);}
        });
    });

    sum = sum+1;

    Album.find({_id: req.params.albumid},function(err,result){
        const store = [];
        store.push(result);
        res.render("albumPage",{res:store,urate:Number(req.body.rating)});
    });

    }

    else{
        var res_id = String;

        Rating.find({userid:req.user.id},function(err,result){
        
                if(result[0].albumid == req.params.albumid){
                    res_id = result[0]._id;
                }
            
        });

        Rating.updateOne({res_id},{
            rating: Number(req.body.rating)
        },function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("success");
            };
        });


        Rating.find({albumid:req.params.albumid},function(err,res1){
            len = res1.length;
            newsum = 0;
            for(let i=0;i<len;i++){
                newsum = newsum+Number(res1[i].rating);
            }
            finrating = newsum/len;
            Album.updateOne({_id:req.params.albumid},{rating:finrating},function(err,docs){
                if(err){console.log("error")}else{console.log(docs);}
            });
        });

    Album.find({_id: req.params.albumid},function(err,result){
    const store = [];
    store.push(result);
    res.render("albumPage",{res:store,urate:Number(req.body.rating)});
});
        

    }

    
    
});


app.get("/listAlbums",function(req,res){
    albums.length = 0;
    Album.find(function(err, foundAlbums){
        for(let i=0; i<foundAlbums.length; i++){
        albums.push(foundAlbums[i]);
        }
        res.render("listAlbums",{foundAlbums:albums});
    });
});

app.post("/sort",function(req,res){
    albums.length = 0;

    Album.find(function(err, foundAlbums){
        for(let i=0; i<foundAlbums.length; i++){
        albums.push(foundAlbums[i]);
        }

        temp = albums;
        if(Number(req.body.sort) == 1){
            temp.sort((a,b) => {return a.rating-b.rating})
            temp.reverse();
            
            res.render("listAlbums",{foundAlbums:temp});
        }
        else if(Number(req.body.sort) == 2){
            temp.sort((a, b) => {
                let fa = a.album.toLowerCase(),
                    fb = b.album.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            res.render("listAlbums",{foundAlbums:temp});
        }
        else if(Number(req.body.sort) == 3){
            temp.sort((a,b) => {return a.year-b.year})
            temp.reverse();
            
            res.render("listAlbums",{foundAlbums:temp});
        }

    });



});

app.post("/deletereview",function(req,res){
    Review.deleteMany({userid:req.user._id},function(err){});
    res.redirect("/home");
});


app.get("/searchid",function(req,res){
    res.render("searchID");
});

app.post("/albumid",function(req,res){
    albums.length = 0;
    Album.find({album: req.body.search},function(err, foundAlbums){
        for(let i=0; i<foundAlbums.length; i++){
        albums.push(foundAlbums[i]);
        }
        res.redirect("/idsearchresult");
    });
});

app.get("/idsearchresult",function(req,res){
    res.render("idSearchResult",{albums:albums});
});

app.get("/updatealbum",function(req,res){
    res.render("editAlbum");
});

app.post("/editalbum",function(req,res){
    Album.updateOne({_id:req.body.id},
        {category:req.body.category,
            album: req.body.album,
            artist: req.body.artist,
            rating: req.body.rating,
            year: req.body.year,
            genre:req.body.genre
    },function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("success");
        }
    });
    res.redirect("/adminPanel");
    
});

app.post("/addreview/:albumid",function(req,res){
    newReview = new Review({
        albumid: req.params.albumid,
        userid: req.user._id,
        review: req.body.review
    });

    newReview.save();
    res.redirect("/home");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/", function(req,res){
    
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    req.login(user, function(err){
        if(err){
            res.redirect("/");
        } else {
            passport.authenticate("local")(req,res,function(){
                if(req.user._id == "630389d943affbd570c111a7"){
                    res.redirect("/adminPanel");
                }
                else{
                res.redirect("/home");
                }
            });
        }
    });
});


app.get("/register", function(req,res){
    res.render("register");
});


app.get("/", function(req,res){
    res.render("login");
});

app.post("/register", function(req,res){
    User.register(new User({username: req.body.username, age: req.body.age, email: req.body.email}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/home");
            });
        }
    });
});

var albumCount; 
Album.estimatedDocumentCount(function(err,result){
            
            albumCount = result;
});

var artistCount;
Album.find().distinct("artist",function(err, result){
    artistCount = result.length;
});

app.get("/home", function(req,res){
    if(req.isAuthenticated()){

        albums.length = 0;

    Album.find(function(err, foundAlbums){
        for(let i=0; i<foundAlbums.length; i++){
        albums.push(foundAlbums[i]);
        }

        temp = albums;
        
        
        temp.sort((a,b) => {return a.year-b.year})
        temp.reverse();
        
        res.render("home",{totalAlbum: albumCount, totalArtist: artistCount, album:temp});
        
        
            
        

    });
        
        
        
    } else{
        res.redirect("/");
    }
});

app.get("/adminPanel",function(req,res){
    if(req.isAuthenticated()){
        res.render("adminPanel");
    } else{
        res.redirect("/");
    }
});

app.get("/logout",function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
      });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000,function(){
    console.log("server started on port 3000");
});