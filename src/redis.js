const redis = require('redis');

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.log('Redis Client Error', err));

client
  .connect()
  .then(() => {
    console.log('redis ok');
  })
  .catch(() => {
    console.log('redis is not working');
  });

const setCache = async (key, json) =>
  client.set(key, JSON.stringify(json), {
    EX: process.env.REDIS_CACHE_EXPIRATION,
  });

const getCache = async (key) => {
  const cache = await client.get(key);

  if (cache) {
    return JSON.parse(cache);
  }

  return cache;
};

module.exports = {
  client,
  getCache,
  setCache,
};
