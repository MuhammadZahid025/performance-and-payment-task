import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AnalyticsService {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly productsService: ProductsService,
        private readonly redisService: RedisService
    ) { }

    async getTopSellingProducts() {
        try {
            console.time('getTopSellingProducts');
            const result: any = [];
            // Potential N+1 Query Issue: Fetching all products first, then making separate DB calls for each product's sales.
            const products = await this.productsService.getAllProducts();

            // Unbatched DB Calls: Calling `getTotalSales` inside the loop results in multiple queries, slowing performance.
            for (const product of products) {
                const totalSales = await this.ordersService.getTotalSales(product);

                result.push({
                    productId: product.id,
                    name: product.name,
                    totalSales: totalSales || 0,
                });
            }
            console.timeEnd('getTopSellingProducts'); // Average execution time 300ms before optimmization
            //In-Memory Sorting: Sorting and slicing are done in memory, which may be slow for large datasets.
            return result.sort((a, b) => b.totalSales - a.totalSales).slice(0, 10);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getTopSellingProductsOptimized() {
        try {
            const cacheKey = 'top_selling_products';
            const cachedData = await this.redisService.get(cacheKey);

            if (cachedData) {
                console.log('Returning Cached Data from Redis', cachedData);
                return JSON.parse(cachedData);
            }
            const topSellingProduct = await this.productsService.getTopSellingProducts()
            console.log('Fetched from DB:', topSellingProduct);
            await this.redisService.set(cacheKey, JSON.stringify(topSellingProduct), 300);

            return topSellingProduct
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
