import { FactoryProvider } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

export const REDIS_CLIENT = 'RedisClient';

export const RedisClient: FactoryProvider<RedisClientType> = {
    provide: REDIS_CLIENT,
    useFactory: async () => {
        const redisHost: string = process.env.REDIS_HOST ?? 'localhost';
        const redisPort: number = Number(process.env.REDIS_PORT) || 6379;

        const client: RedisClientType = createClient({
            socket: {
                host: redisHost,
                port: redisPort,
            },
        });

        client.on('error', (err) => {
            console.error('Redis Connection Error:', err);
            throw new Error(`Redis connection failed: ${err.message}`);
        });

        await client.connect();
        console.log('Connected to Redis');

        return client;
    },
};