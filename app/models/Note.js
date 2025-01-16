const Sequelize = require('sequelize');
const sequelize = require('../utils/db_orm');

const Note = sequelize.define('Note', {
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    isImportant: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

Note.associate = (models) => {
    Note.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User',
    });
};

module.exports = Note;