import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Payment } from './payment.entity';

@Entity({ name: 'payment_attempts' })
export class PaymentAttempt {
    @PrimaryGeneratedColumn({ name: 'id', })
    id: number;

    @Column({ name: 'attemp_number' })
    attemptNumber: number;

    @Column({ name: 'status', type: 'enum', enum: ['success', 'failure'] })
    status: 'success' | 'failure';

    @Column({ name: 'response', type: 'text', nullable: true })
    response?: string;

    @ManyToOne(() => Payment, (payment) => payment.attempts, { onDelete: 'CASCADE' })
    payment: Payment;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}