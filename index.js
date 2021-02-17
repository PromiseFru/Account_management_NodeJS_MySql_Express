const express = require('express');
const Sequelize = require('sequelize');
require('./config/connection.js')();
port = 3000;

let app = express();
let sequelize = new Sequelize(process.env.DATABASE, process.env.OWNER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

app.get('/', (req, res) => {
    res.send('hello world working')
});

app.listen(port, console.log(`Server listening on port ${port}`));