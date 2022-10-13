import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis, { RedisOptions } from "ioredis";

export let pubsub: RedisPubSub;

const startRedisServer = async () => {
  const { REDIS_LOCAL_PORT, REDIS_LOCAL_DOMAIN } = process.env;
  const options: RedisOptions = {
    retryStrategy: (times) => Math.min(times * 50, 2000),
  };
  // TODO: Have null checker on local/prod servers
  pubsub = new RedisPubSub({
    publisher: new Redis(
      Number(REDIS_LOCAL_PORT),
      String(REDIS_LOCAL_DOMAIN),
      options
    ),
  });
};

export default startRedisServer;
