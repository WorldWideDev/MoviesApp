const Movie = require('../models/movie.model.js');
module.exports = {
    getAll: (req, res) => {
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
    },
    getOne: (req, res) => {
        console.log("GET:/{id}")
        Movie.findById(req.params.id)
            .then((movie) => {
                console.log("found one movie!");
                console.log(movie);
                res.json(movie);
            })
            .catch((err) => {
                console.log("error found in getting movies");
                res.sendStatus(404);
            });
    },
    update: (req, res) => {
        const { title, releaseDate, rating, genre } = req.body;
        Movie.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new:true, runValidators: true }
        )
            .then(movie => res.json(movie))
            .catch(err => res.json(err));
    },
    delete: (req, res) => {
        Movie.deleteOne({ _id: req.params.id })
            .then(confirmation => res.json({...confirmation, id:req.params.id}))
            .catch(err => res.json(err));
    }
}    
