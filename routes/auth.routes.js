const controllers = require('../controllers/auth.controller.js');

module.exports = (app) => {
    app.post('/signup', controllers.signup);
}