require('dotenv').config();
const express = require('express');
const auth = require('./auth.js');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
let Port = process.env.PORT || 3000;
var Users = require('./models/users.js');

let users = new Users();

// For express
let app = express();

// For bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// routes
routes(app, users);

app.use((req, res, next) => {
    res.status(404)
        .type('text')
        .send('Not Found')
});

// call auth
auth(app, users);

// serve static files
app.use(express.static(__dirname + "/public"));

app.listen(Port, console.log(`Server is running on port ${Port}`));