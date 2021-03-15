const {
    verifySignin
} = require("../middlewares");
const userController = require('../controllers/user.controller.js');

module.exports = (app) => {
    app.get('/profile', [verifySignin], userController.profile);
}