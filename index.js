const express = require('express');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes/routes.js');
port = 3000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.use(passport.initialize());

let app = express();

app.use('/', routes);

app.listen(port, console.log(`Server listening on port ${port}`));