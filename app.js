import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import express from 'express';
import ejs from 'ejs';

import env from 'dotenv';
env.config();


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



app.get("/", function(req, res) {
    res.render('index');
});


app.get("/title/:title", function(req, res){
    let title = req.params.title;
    let url = `https://imdb-api.com/en/API/SearchMovie/${process.env.IMDB_API}/${title}`;
    fetch(url)
    .then(result => result.json())
    .then(json => res.send(json));
});

app.get("/movie", function(req, res) {
    let id = req.query.id;
    let  url = `https://imdb-api.com/en/API/Title/${process.env.IMDB_API}/${id}/FullActor,Trailer,Ratings,`;
    fetch(url)
    .then(result => result.json())
    .then(json => {
        if(json.title) 
            res.render("movie", {movie: json});
        else 
            res.render("notfound");
    });
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server running at port 3000");
});