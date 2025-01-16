const Sequelize = require('sequelize');
const sequelize = require('../utils/db_orm');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    fname: {
        type: Sequelize.STRING(18),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    sname: {
        type: Sequelize.STRING(18),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

User.associate = (models) => {
    User.hasMany(models.Note, {
        foreignKey: 'userId',
        as: 'Notes'
    })
};

module.exports = User;