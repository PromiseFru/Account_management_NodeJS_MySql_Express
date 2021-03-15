const authControllers = require('../controllers/auth.controller.js');
const {
    verifySignup
} = require('../middlewares')

module.exports = (app) => {

    app.post('/signup',
        [verifySignup.checkDuplicateUsers, verifySignup.checkRoleExists],
        authControllers.signup);

    app.post("/signin",
        authControllers.signin);
}