const db = require('../models');
const bcrypt = require('bcrypt');
const {
    Op
} = require('sequelize');
const User = db.user;
const Role = db.role;

try {
    signup = async (req, res, next) => {
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }).catch(error => {
            error.httpStatusCode = 500;
            return next(error)
        })

        if (req.body.roles) {
            let role = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).catch(error => {
                error.httpStatusCode = 500;
                return next(error)
            })

            await user.setRoles(role).catch(error => {
                error.httpStatusCode = 500;
                return next(error)
            })

            return res.status(200).send({
                message: "Acccount successfully created"
            });
        }

        await user.setRoles([2]).catch(error => {
            error.httpStatusCode = 500;
            return next(error)
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