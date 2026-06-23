const { createClient } = require("redis");

const redisClient = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: "megastrong-hyperneat-affectionate-13540.db.redis.io",
        port: 11128
    }
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error: " + err);
});

module.exports = redisClient;