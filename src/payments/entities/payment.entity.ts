import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PaymentAttempt } from './payment-attempts.entity';

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'order_id', type: 'varchar', length: 255, unique: true })
    orderId: string;

    @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ name: 'status', type: 'enum', enum: ['pending', 'completed', 'failed'], default: 'pending' })
    status: 'pending' | 'completed' | 'failed';

    @Column({ name: 'payment_gateway_response', type: 'json', nullable: true })
    paymentGatewayResponse?: { status: string; response: string };

    @OneToMany(() => PaymentAttempt, (attempt) => attempt.payment, { cascade: true })
    attempts: PaymentAttempt[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}