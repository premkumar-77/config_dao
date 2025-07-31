'use strict';
const PlatformConfig = sequelize.models.PlatformConfig;
const redisUtil = require('../utils/redis-manager');
const { REDIS_CONFIG } = require('../utils/constants');
const initPlatformConfigDao = require('../dao/platformConfigDao');
const dao = require('../dao-manager/dao');

class PlatformService {
  constructor(platformModel, redis) {
    this.daoManager = new dao(platformModel);
    this.platformModel = platformModel;
    this.redis = redis;
  }

  async getPlatformConfig(fieldKey) {
    const cached = await redisUtil.getRedisValue(REDIS_CONFIG, fieldKey);

    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {
        console.error('Error parsing cached JSON:', err);
      }
    }

    try {
      const [, productId] = fieldKey.split(':');
      const dbConfigs = await this.daoManager.findByField(productId);

      const dtoList = dbConfigs.map(config => ({
        key: config.key,
        value: config.value || '_NULL_'
      }));

      if (dtoList.length > 0) {
        await redisUtil.setRedisValue(REDIS_CONFIG, fieldKey, JSON.stringify(dtoList));
      }

      return dtoList;
    } catch (err) {
      console.error('Error fetching platform configs:', err);
      throw err;
    }
  }

  async  updatePlatformConfig(fieldKey, updateList) {
    const createdOrUpdated = [];
    try {
      const [, productId] = fieldKey.split(':');

      for (const [key, value] of Object.entries(updateList)) {
        const config = await dao.findOrCreateByProductIdAndKey(productId, key, value);
        createdOrUpdated.push({ key: config.key, value: config.value });
      }

      await mergeIntoRedis(fieldKey, createdOrUpdated);
      return createdOrUpdated;
    } catch (err) {
      console.error('Error updating platform config:', err);
      throw err;
    }
  }

  async  mergeIntoRedis(fieldKey, updatedList) {
    try {
      const existingJson = await redisUtil.getRedisValue(REDIS_CONFIG, fieldKey);
      const mergedMap = new Map();

      if (existingJson) {
        const existingArray = JSON.parse(existingJson);
        existingArray.forEach(item => mergedMap.set(item.key, item));
      }

      updatedList.forEach(item => mergedMap.set(item.key, item));

      const updatedJson = JSON.stringify(Array.from(mergedMap.values()));
      await redisUtil.setRedisValue(REDIS_CONFIG, fieldKey, updatedJson);
    } catch (err) {
      console.error('Error merging and updating Redis:', err);
      throw err;
    }
  }

 
}

module.exports = PlatformService;
