const platformModel = require('../models/t-platform-config');
// const dao = require('./Dao');
const dao = require('./dao');
const { DataTypes } = require('sequelize');

class platformDao extends dao{
    constructor(sequelize){
        const model = platformModel(sequelize, DataTypes);
        super(model);
    }
}

module.exports = {platformDao};