const db = require("../models");
let User = db.user;
let ROLE = db.ROLES

checkDuplicateUsers = async (req, res, next) => {
    let user = await User.findOne({
        where: {
            username: req.body.username
        }
    }).catch(error => {
        error.httpStatusCode = 500;
        return next(error);
    });

    if (user) {
        const error = new Error("Username already in use");
        error.httpStatusCode = 400;
        return next(error)
    };

    let email = await User.findOne({
        where: {
            email: req.body.email
        }
    }).catch(error => {
        error.httpStatusCode = 500;
        return next(error);
    });

    if (email) {
        const error = new Error("Email already in use");
        error.httpStatusCode = 400;
        return next(error)
    };

    next();
};

checkRoleExists = (req, res, next) => {
    if (req.body.roles) {
        req.body.roles.forEach(ele => {
            if (!ROLE.includes(ele)) {
                const error = new Error(`${ele} doesn't exist`);
                error.httpStatusCode = 400;
                return next(error);
            }
        })
    }

    next();
}

module.exports = {
    checkDuplicateUsers,
    checkRoleExists
}