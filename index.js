const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
let Port = process.env.PORT || 3000;
require('dotenv').config();

// For express
let app = express();

// For bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// For passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

app.listen(Port, console.log(`Server is running on port ${Port}`));