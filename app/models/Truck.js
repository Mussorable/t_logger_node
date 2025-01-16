const Sequelize = require('sequelize');
const sequelize = require('../utils/db_orm');

const Truck = sequelize.define('Truck', {
    number: {
        type: Sequelize.STRING(12),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});