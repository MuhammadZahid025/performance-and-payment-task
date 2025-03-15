import { Module } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { OrdersModule } from "src/orders/order.module";
import { ProductModule } from "src/products/product.module";
import { AnalyticsController } from "./analytics.controller";
import { RedisModule } from "src/redis/redis.module";


@Module({
    imports: [OrdersModule, ProductModule, RedisModule],
    providers: [AnalyticsService],
    controllers: [AnalyticsController]
})
export class AnalyticsModule { }