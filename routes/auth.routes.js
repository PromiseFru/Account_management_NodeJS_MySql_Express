const controllers = require('../controllers/auth.controller.js');
const {
    verifySignup
} = require('../middlewares')

module.exports = (app) => {

    app.post('/signup',
        [verifySignup.checkDuplicateUsers, verifySignup.checkRoleExists],
        controllers.signup);

    app.post("/signin",
        controllers.signin);
}