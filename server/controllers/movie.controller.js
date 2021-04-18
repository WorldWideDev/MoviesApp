const Movie = require('../models/movie.model.js');
module.exports = {
    getAll: (req, res) => {
        console.log("GET:/")
        Movie.find({})
            .then((movies) => {
                res.json(movies);
            })
            .catch((err) => {
                console.log("error found in getting movies");
                res.json(err);
            })
    },
    create: (req, res) => {
        const { title, releaseDate, rating, genre, plot } = req.body;
        Movie.create({
            title, releaseDate, rating, genre, plot
        })
            .then(movie => res.json(movie))
            .catch(err => res.status(400).json(err));
    },
    getOne: (req, res) => {
        console.log("GET:/{id}")
        Movie.findById(req.params.id)
            .then((movie) => {
                res.json(movie);
            })
            .catch((err) => {
                console.log("error found in getting movies");
                res.status(404).json(err);
            });
    },
    update: (req, res) => {
        console.log("PUT:/{id}");
        const { title, releaseDate, rating, genre, plot } = req.body;
        Movie.findByIdAndUpdate(req.params.id, req.body, { 
            new:true, runValidators: true 
        })
            .then(movie => res.json(movie))
            .catch(err => res.status(400).json(err));
    },
    delete: (req, res) => {
        Movie.findByIdAndDelete(req.params.id)
            .then(movie => res.json({id:movie._id}))
            .catch(err => res.json(err));
    }
}    
