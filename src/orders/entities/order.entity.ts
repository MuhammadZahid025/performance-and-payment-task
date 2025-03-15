import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "quantity", type: 'int', nullable: false })
    quantity: number;

    @Column({ name: "ordered_at", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderedAt: Date;

    // Many orders belong to one product
    @ManyToOne(() => Product, (product) => product.orders, { onDelete: 'CASCADE' })
    product: Product;
}