const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user;

try {
    signup = (req, res, next) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
    }
} catch (err) {
    console.error(err);
}