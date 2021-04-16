const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [ true, "Title is required" ],
    },
    releaseDate: { 
        type: Date,
        min: [ '1930-01-01', "Mininum date for a movie is 1930" ],
        max: [ new Date(), "You cannot enter a release date in the future" ]
    },
    rating: {
        type: String,
        required: [ true, "Rating is required" ],
        enum: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated']
    },
    genre: {
        type: String,
        required: [ true, "Genre is required" ],
    },
    plot: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);
