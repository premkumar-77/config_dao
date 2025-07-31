'use strict';
const sequelize = require('../dao-manager/sequelize');
const getRedisClient = require('../config/redis-connection').getRedisClient;


module.exports = class RedisManager{
    static set(redisKey, data, validity) {
        if (!redisKey || !data) return;

        const redis = getRedisClient();
        redis.set(redisKey, JSON.stringify(data));
        if (validity) redis.expire(redisKey, validity);
    }

    static async getHash(redisKey, key) {
        const redis = getRedisClient();
        return redis.hgetAsync(redisKey, key)
    }

    static async get(redisKey) {
        const redis = getRedisClient();
      return redis.getAsync(redisKey)
    }


    static async delete(redisKey) {
        const redis = getRedisClient();
        return redis.delAsync(redisKey);
    }

    static setHash(redisKey, data) {
        const redis = getRedisClient();
        redis.hmset(redisKey, data);
        if (validity) redis.expire(redisKey, validity);
    }
    
};

