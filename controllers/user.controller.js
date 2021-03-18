const db = require("../models");
let User = db.user;

profile = async (req, res, next) => {
    // get user info
    let user = await User.findByPk(req.session.userId).catch(error => {
        error.httpStatusCode = 500;
        return next(error);
    });

    let roles = await user.getRoles().catch(error => {
        error.httpStatusCode = 500;
        return next(error);
    });

    let authorities = [];
    roles.forEach(ele => {
        authorities.push(ele.name.toUpperCase());
    })
    return res.status(200).json({
        username: user.username,
        roles: authorities
    })
}

module.exports = {
    profile
}