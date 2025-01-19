const Sequelize = require('sequelize');
const sequelize = require('../utils/db_orm');

const User = require('./User');
const Note = require('./Note');
const Truck = require('./Truck');

const models = {
    User,
    Note,
    Truck,
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate)
        models[modelName].associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;