'use strict'
const { platformDao } = require('../dao-manager/global-platform-dao');

class PlatformService {
    constructor(sequelize) {
        this.dao = new platformDao(sequelize);
        this.sequelize = sequelize;
    }
    async getAllConfigs() {

        try {
            const result = await this.dao.findAll();
            return result;
        } finally {
            await this.sequelize.close(); 
        }
    }
}

module.exports = {
    PlatformService
};
