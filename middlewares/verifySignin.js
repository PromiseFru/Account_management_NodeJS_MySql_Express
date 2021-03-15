checkSignin = (req, res, next) => {
    if (req.session.userId) {
        return next();
    };

    const error = new Error("Please Login!");
    error.httpStatusCode = 401;
    next(error);
}

module.exports = {
    checkSignin
}