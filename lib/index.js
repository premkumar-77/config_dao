'use strict';
const { Sequelize } = require('sequelize');
const { connectRedis, getRedisClient } = require('./utils/redis-connection');
const { serviceSequelize } = require('./utils/db-connection');
const CommonService = require('./service/common-service');
const initServiceRegistry = require('./registry/service-registry').initServiceRegistry;
const {
    SequelizeInitializationError
  } = require('./utils/error');
const { init } = require('../../../toruney_panel/ms_tourneypannel/common/rabbitmqUtil');

async function connectDBAndRedis(sequelizeConfig , redisConfig) {
    try {
        const sequelize = await serviceSequelize(sequelizeConfig);

        if (!sequelize) {
            throw new SequelizeInitializationError('Sequelize instance is undefined or failed to initialize');
        }

        await connectRedis(redisConfig);
        const redis = getRedisClient();
        if (!redis) {
            throw new Error("Redis failed to connect");
        }
        return new CommonService(sequelize, redis);
        

    } catch (error) {
        console.error('Database connection or service initialization failed:', error);
        throw error;
    }
}

module.exports = { connect };
