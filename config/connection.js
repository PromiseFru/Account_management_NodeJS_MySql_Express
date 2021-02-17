const mysql = require('mysql2/promise');
require('dotenv').config();

let host = process.env.HOST
let username = process.env.OWNER
let password = process.env.PASSWORD
let databse = process.env.DATABASE

async function db() {
    try {
        let connection = await mysql.createConnection({
            host: host,
            user: username,
            password: password
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databse}\`;`);
        console.log('Database is Ready');
    } catch (err) {
        throw (err);
    }
}

module.exports = db;