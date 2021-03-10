const db = require('../models');
const bcrypt = require('bcrypt');
const {
    Op
} = require('sequelize');
const User = db.user;
const Role = db.role;

try {
    signup = (req, res, next) => {
        let user = User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        if (req.body.role) {
            let role = Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            })

            console.log(role);
        }
    }
} catch (err) {
    console.error(err);
}