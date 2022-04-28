const redis = require('redis');

const redisClient = redis.createClient({ socket: { port: 6379, host: 'redisdb' } });

(async()=>{
    await redisClient.connect();
})();

redisClient.on('connect', ()=>{
    console.log('redis connected');
});

redisClient.on('error', ()=>{
    console.log('error occur in redis');
})

module.exports = redisClient;