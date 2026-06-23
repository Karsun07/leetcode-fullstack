const { createClient } = require("redis");

const redisClient = createClient({
    username: "default",
    password: "udwDUsrD6fEBuRUmkw62UJQikQd1lNzD",
    socket: {
        host: "megastrong-hyperneat-affectionate-13540.db.redis.io",
        port: 11128
    }
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error: " + err);
});

module.exports = redisClient;