const MovieController = require('../controllers/movie.controller.js');
module.exports = function(app) {
    app.get('/api', MovieController.getAll);
    app.post('/api', MovieController.create);
    app.get('/api/:id', MovieController.getOne);
    app.put('/api/:id', MovieController.update);
    app.delete('/api/:id', MovieController.delete);
}
