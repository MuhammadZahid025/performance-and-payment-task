import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";



@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>
    ) { }

    async getAllProducts(): Promise<Product[]> {
        try {
            return this.productsRepository.find()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }


    async getTopSellingProducts() {
        try {
            console.time('getTopSellingProducts-optimized');
            const topSellingProducts = await this.productsRepository
                .createQueryBuilder('product')
                .leftJoin('product.orders', 'order')
                .select('product.id', 'productId')
                .addSelect('product.name', 'name')
                .addSelect('IFNULL(SUM(order.quantity), 0)', 'totalSales')
                .groupBy('product.id')
                .orderBy('totalSales', 'DESC')
                .limit(10)
                .getRawMany();

            console.timeEnd('getTopSellingProducts-optimized'); // 40ms execution time, Huge difference between 300ms and 40ms execution time
            return topSellingProducts;
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}