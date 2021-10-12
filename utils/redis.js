import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.clientGetAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.error(error);
    });

    this.client.on('connect', () => {
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const res = await this.clientGetAsync(key);

    return res;
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
