(async () => {
    require("dotenv").config();
    const express = require('express');
    const session = require("express-session");
    const port = process.env.PORT || 3000;
    let db = require('./models');

    let app = express();

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }))

    await db.sequelize.sync();

    // routes
    require('./routes/auth.routes.js')(app);
    require('./routes/user.routes.js')(app);

    let errorHandler = (err, req, res, next) => {
        if (err.httpStatusCode === 500) {
            console.error(err.httpStatusCode, err.stack);
            return res.status(err.httpStatusCode).json({
                error: "Something Broke!"
            })
        }

        res.status(err.httpStatusCode).json({
            error: err.message
        });
    }

    app.use(errorHandler);

    app.listen(port, console.log(`Server started on port ${port}`));

})().catch(err => {
    console.error(err);
});