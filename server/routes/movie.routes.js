const MovieController = require('../controllers/movie.controller.js');
module.exports = function(app) {
    app.get('/api', MovieController.index);
    app.post('/api', MovieController.create);
}
