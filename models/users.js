const {
    UUIDV4,
    Sequelize
} = require('sequelize');
require('../config/connection.js')();

let sequelize = new Sequelize(process.env.DATABASE, process.env.OWNER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

let user = sequelize.define('User', {
    id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    lastname: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    username: Sequelize.TEXT,
    email: {
        type: Sequelize.TEXT,
        validate: {
            isEmail: true
        }
    },
    passward: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_login: Sequelize.DATE,
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
})

class User {
    constructor() {
        return new Promise(async (resolve, reject) => {
            try {
                await user.sync();
                resolve(user)
            } catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = User;