import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { Seeder } from 'typeorm-extension';


export class ProductOrderSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('🚀 Running the ProductOrderSeeder...');

        const productRepository = dataSource.getRepository(Product);
        const orderRepository = dataSource.getRepository(Order);

        // Seed products
        console.log('🌱 Seeding products...');
        const products = Array.from({ length: 100 }, (_, i) => {
            return productRepository.create({
                name: `Product ${i + 1}`,
                price: parseFloat((Math.random() * 100).toFixed(2)),
            });
        });
        await productRepository.save(products);
        console.log(` Created ${products.length} products`);


        // Seed orders
        const orders = Array.from({ length: 10_000 }, () => {
            return orderRepository.create({
                product: { id: Math.floor(Math.random() * 100) + 1 }, // Random product ID
                quantity: Math.floor(Math.random() * 10) + 1, // 1-10 items
            });
        });
        console.log(` Created ${orders.length} orders`);
        await orderRepository.save(orders);
        console.log('Seeding completed successfully');
    }
}
