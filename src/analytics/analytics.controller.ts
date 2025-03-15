import { Controller, Get } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";


@Controller("analytics")
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get("hello")
    sayHello() {
        return "Hello analytics"
    }

    @Get("/top-products")
    getTopSellingProducts() {
        return this.analyticsService.getTopSellingProducts()
    }

    @Get("/top-products-optimized")
    getTopSellingProductsOptimized() {
        return this.analyticsService.getTopSellingProductsOptimized()
    }
}