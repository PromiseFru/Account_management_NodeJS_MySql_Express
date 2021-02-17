const express = require('express');
const router = express.Router();
var Users = require('../models/users.js');

let users = new Users();

router.post('/user/auth/', async (req, res) => {
    
})