const db = require("../models");
let User = db.user;

profile = async (req, res, next) => {
    // get user info
    let user = await User.findByPk(req.session.userId).catch(error => {
        error.httpStatusCode = 500;
        return next(error);
    });

    let roles = user.getRoles().catch(error => {
        error.httpStatusCode = 500;
        return next(error);
    });

    res.status(200).json({
        username: user.username,
        roles: roles
    })
}

module.exports = {
    profile
}