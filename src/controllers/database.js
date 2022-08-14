const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/musicDB",{useNewUrlParser:true});

const albumSchema = new mongoose.Schema({
    name: String,
    artist: String,
    rating: Number,
    date: String,
    genre: String,
    tracklist: [trackSchema]
});

const Album = mongoose.model("Album", albumSchema);

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

const ratingSchema = new mongoose.Schema({
    albumKey: String,
    totalRatings: Number,
    totalRated: Number
});

const Rating = mongoose.model("Rating", ratingSchema);

const reviewSchema = new mongoose.Schema({
    albumKey: String,
    userKey: String,
    content: String,
});

const Review = mongoose.model("Review", reviewSchema);

const trackSchema = new mongoose.Schema({
    albumKey: String,
    track: String,
    order: Number,
    duration: Number
})

const Track = mongoose.model("Track", trackSchema)