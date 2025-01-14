const {Sequelize} = require('sequelize');

const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER || process.env.DB_LOCAL_USER;
const DB_PASSWORD = process.env.DB_PASS || process.env.DB_LOCAL_PASS;
const DB_HOST = process.env.DB_HOST || process.env.DB_LOCAL_HOST;

const sequelize = new Sequelize(
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    {
        dialect: 'mysql',
        host: DB_HOST
    }
);

module.exports = sequelize;