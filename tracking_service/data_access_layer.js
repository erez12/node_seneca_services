"use strict"

const REDIS_CONFIG = {
    redisPort: process.env.REDIS_PORT || 6379,
    redisHost: process.env.REDIS_HOST || "127.0.0.1",
    redisDB: process.env.REDIS_DB || 1
};
const ONE_MILION = 1000000;
const logger = require('../common/logging/create_logger.js')('service', 'tracking_service');
const redis = require('redis');
let redisClient = redis.createClient(REDIS_CONFIG);

redisClient.on('error', function(err) {
    logger.error(err.message);
});

// Using these function so not to deal with precision issues
let to1MValue = (x) => x * ONE_MILION;
let toRealValue = (x) => x / ONE_MILION;

function updateTracking(bagId, data) {
    return new Promise((resolve, reject) => {
        redisClient.hmset(bagId, {
            lon: to1MValue(data.lon),
            lat: to1MValue(data.lat)
        }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function getTracking(bagId, callback) {
    return new Promise((resolve, reject) => {
        redisClient.hgetall(bagId, function(err, data) {
            if (err) {
                logger.error(error.message);
                return reject(err);
            }

            resolve({
                lon: toRealValue(parseInt(data.lon)),
                lat: toRealValue(parseInt(data.lat))
            });
        });
    });
}

module.exports = {
    updateTracking: updateTracking
};