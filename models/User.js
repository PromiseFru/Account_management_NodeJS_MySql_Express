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
    email: Sequelize.STRING,
    userbane: Sequelize.STRING,
    passward: Sequelize.STRING
})

class User {
    newUser(name, email, passwordHash) {
        return new Promise((resolve, reject) => {
            try {
                await user.sync();
                let newUser = await user.create({
                    name: name,
                    email: email,
                    passward: passwordHash
                })
                resolve({
                    id: newUser.id
                })
            } catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = User;