import { Module } from "@nestjs/common";
import { RedisClient } from "./redis.provider";
import { RedisService } from "./redis.service";

@Module({
    providers: [RedisClient, RedisService],
    exports: [RedisClient, RedisService]
})
export class RedisModule { }
