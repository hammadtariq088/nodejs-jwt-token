var redis = require("redis");
var JWTR = require("jwt-redis").default;
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

const destroyHandler = async (req, res, next) => {
  await jwtr.destroy(req.headers.token);
  next();
};

module.exports = destroyHandler;
