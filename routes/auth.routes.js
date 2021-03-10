const controllers = require('../controllers/auth.controller.js');
const {
    verifySignup
} = require('../middlewares')

module.exports = (app) => {
    app.post('/signup', [verifySignup.checkDuplicateUsers], controllers.signup);
}