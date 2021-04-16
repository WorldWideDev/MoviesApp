const Movie = require('./models/movie.model.js');
const seedData = require('./utils/seedData.json');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;

// configure the app's functionality
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// access to the data
require('./config/mongoose.config.js');

// add in the routes
require('./routes/movie.routes')(app);

// seed data if db is empty
Movie.estimatedDocumentCount((err, count) => {
    console.log(`checking to seed data: ${count} records found`);
    if(err) { console.log(err) }
    else if(count < 1) {
        Movie.insertMany(seedData)
            .then(movies => console.log(movies))
            .catch(err => console.log(err));
    }
})


app.listen(port, () => console.log(`listening on port: ${port}`));
