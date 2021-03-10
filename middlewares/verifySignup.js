const db = require("../models");
let User = db.user;
let Role = db.role;

checkDuplicateUsers = (req, res, next) => {
    let user = await User.findOne({
        where: {
            username: req.body.username
        }
    }).catch(error => {
        res.status(500).send({
            error: error.message
        })
    });

    if (user) {
        return res.status(400).send({
            error: "Username already in use"
        })
    };

    let email = await User.findOne({
        where: {
            email: req.body.email
        }
    }).catch(error => {
        res.status(500).send({
            error: error.message
        })
    });

    if (email) {
        return res.status(400).send({
            error: "Email already in use"
        })
    };

};

checkRoleExists = (req, res, next) => {

}

module.exports = {
    checkDuplicateUsers
}