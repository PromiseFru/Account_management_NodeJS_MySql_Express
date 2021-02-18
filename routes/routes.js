const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
var Users = require('../models/users.js');

let users = new Users();

router.post('/signup', async (req, res) => {
    try {
        let body = req.body;
        console.log(body);
        let passwordHash = await bcrypt.hashSync(body.password, saltRounds);

        await users.register(
            body.firstname,
            body.lastname,
            body.username,
            body.email,
            passwordHash
        )

        res.json({
            message: "Successfully created Account"
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;