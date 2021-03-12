const db = require('../models');
const bcrypt = require('bcrypt');
const {
    Op
} = require('sequelize');
const User = db.user;
const Role = db.role;

try {
    signup = async (req, res) => {
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        if (req.body.roles) {
            let role = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).catch(error => {
                res.status(500).send({
                    error: error.message
                })
            })

            await user.setRoles(role).catch(error => {
                res.status(500).send({
                    error: error.message
                })
            })

            return res.status(200).send({
                message: "Acccount successfully created"
            });
        }

        await user.setRoles([2]).catch(error => {
            res.status(500).send({
                error: error.message
            })
        })

        return res.status(200).send({
            message: "Account successfully created"
        });
    }
} catch (err) {
    console.error(err);
}

module.exports = {
    signup
}