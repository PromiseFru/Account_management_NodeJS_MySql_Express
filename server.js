require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
let db = require('./models');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

db.sequelize.sync();

app.listen(port, console.log(`Server started on port ${port}`));