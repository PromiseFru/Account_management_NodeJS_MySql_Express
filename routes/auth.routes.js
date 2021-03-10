const controllers = require('../controllers/auth.controller.js');
// const {
//     checkDuplicateUsers
// } = require('../middlewares')

module.exports = (app) => {
    app.post('/signup', controllers.signup);
}