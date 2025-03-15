import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { Product } from "src/products/entities/product.entity";



@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly ordersRepository: Repository<Order>
    ) { }

    async getTotalSales(product: Product) {
        const totalSales = await this.ordersRepository.sum('quantity', { product: { id: product.id } });
        return totalSales || 0;
    }
}