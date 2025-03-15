import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT } from './redis.provider';

@Injectable()
export class RedisService {
    constructor(@Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType) { }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        try {
            await this.redisClient.set(key, value);
            if (ttl) {
                await this.redisClient.expire(key, ttl);
            }
        } catch (error) {
            console.error(`Redis SET error: ${error.message}`);
            throw new Error('Failed to set value in Redis');
        }
    }

    async get(key: string): Promise<string | null> {
        try {
            return await this.redisClient.get(key);
        } catch (error) {
            console.error(`Redis GET error: ${error.message}`);
            throw new Error('Failed to get value from Redis');
        }
    }
}