const { PlatformService } = require('./service/global-platform-service');
const { Sequelize } = require('sequelize');
const { platorformSequelize } = require('./utils/db-connection');
const {
    SequelizeInitializationError,
    ServiceInitializationError
  } = require('./utils/error');

async function connect(sequelizeConfig) {
    try {
        const sequelize = await platorformSequelize(sequelizeConfig);

        if (!sequelize) {
            throw new SequelizeInitializationError('Sequelize instance is undefined or failed to initialize');
        }

        const service = new PlatformService(sequelize);

        if (!service || typeof service.getAllConfigs !== 'function') {
            throw new ServiceInitializationError('PlatformService initialization failed: getAllConfigs method not found');
        }

        return {
            getAllConfigs: service.getAllConfigs.bind(service),
        };

    } catch (error) {
        console.error('Database connection or service initialization failed:', error);
        throw error;
    }
}

module.exports = { connect };
