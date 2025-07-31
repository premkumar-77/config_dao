const CommonService = require('../service/common-service');
const { DataTypes } = require('sequelize');

const platformModel = require('../models/t-platform-config');


function registerModels(sequelize) {
  const PlatformConfig = platformModel(sequelize, DataTypes);
  return {
    PlatformConfig
  };
}

module.exports = registerModels;