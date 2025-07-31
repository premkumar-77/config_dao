const { createClient } = require('redis');

let redisClient;

async function connectRedis(config) {
    if (!config.host || !config.port) {
        throw new Error('Missing Redis config: host or port');
    }

    redisClient = createClient({
        socket: {
            host: config.host,
            port: config.port
        },
        password: config.password
    });

    redisClient.on('error', (err) => {
        console.error('REDIS: Connection Error:', err);
    });

    await redisClient.connect();
    console.log('REDIS: Connected successfully');

    return redisClient;
}

function getRedisClient() {
    if (!redisClient) throw new Error('Redis client not initialized');
    return redisClient;
}

async function disconnectRedis() {
    if (redisClient) {
        await redisClient.quit();
        console.log('REDIS: Connection closed');
    }
}

module.exports = {
    connectRedis,
    getRedisClient,
    disconnectRedis
};