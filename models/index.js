require("dotenv").config();
const Sequelize = require("sequelize");

let db = {};

let host = process.env.HOST;
let user = process.env.OWNER;
let databse = process.env.DATABASE;
let password = process.env.PASSWORD;

const sequelize = new Sequelize(databse, user, password, {
    host: host,
    dialect: "mysql",
    define: {
        timestamps: false
    }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "roleId"
});

db.ROLES = ["admin", "user"];

module.exports = db;