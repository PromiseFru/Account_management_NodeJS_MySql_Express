const express = require('express');
const session = require('express-session');
const passport = require('passport');
port = 3000;

let app = express();

app.get('/', (req, res) => {
    res.send('hello world working')
});

app.listen(port, console.log(`Server listening on port ${port}`));