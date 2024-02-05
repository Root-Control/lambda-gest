const { SocketClosedUnexpectedlyError, createClient } = require("redis");

let redisClient = null;

async function createRedisClient() {
  const client = createClient({
    url: `redis://0.tcp.ngrok.io:15628`,
  });

  client.on('error', (err) => console.error(err));
  await client.connect();

  return client;
}

async function getRedisClient(nthTry = 1) {
  try {
    if (!redisClient) {
      redisClient = await createRedisClient();
    }
    await redisClient.ping();
    return redisClient;
  } catch (error) {
    if (error instanceof SocketClosedUnexpectedlyError && nthTry > 0) {
      redisClient = null;
      return getRedisClient(nthTry - 1);
    }
    throw error;
  }
}
module.exports = {
  getRedisClient
};