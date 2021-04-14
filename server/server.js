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


app.listen(port, () => console.log(`listening on port: ${port}`));
