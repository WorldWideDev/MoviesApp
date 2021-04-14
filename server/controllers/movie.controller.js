const Movie = require('../models/movie.model.js');
module.exports = {
    index: (req, res) => {
        console.log("GET:/")
        Movie.find({})
            .then((movies) => {
                console.log("found some movies!");
                console.log(movies);
                res.json(movies);
            })
            .catch((err) => {
                console.log("error found in getting movies");
                res.json(err);
            })
    },
    create: (req, res) => {
        const { title, releaseDate, rating, genre } = req.body;
        Movie.create({
            title, releaseDate, rating, genre
        })
            .then(movie => res.json(movie))
            .catch(err => res.json(err));
    }
}    
