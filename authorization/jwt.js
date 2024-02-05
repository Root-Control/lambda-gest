'use strict';

const { verify } = require('jsonwebtoken');
const { getRedisClient } = require('../cache/redis2');

async function parseUserFromToken(token) {
  const redis = await getRedisClient();

  const { userId } = verify(token, process.env.JWT_PRIVATE_KEY);

  const details = await redis.get(`user_${userId}`);

  if (!details) return null;

  const user = JSON.parse(details);

  const {
    id,
    name,
    lastname,
    id_number,
    currentTeam,
    background,
    shift,
    subcompany,
  } = user;

  return user;;
}

module.exports = {
  parseUserFromToken,
}