import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../entities/payment.entity";
import { EntityManager, Repository } from "typeorm";
import { PaymentAttempt } from "../entities/payment-attempts.entity";
import { MockPaymentGatewayService } from "./mock-payment-gateway.service";

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
        private readonly mockPaymentGateway: MockPaymentGatewayService,
    ) { }


    async processPayment(orderId: string, amount: number): Promise<Payment> {
        return this.paymentRepository.manager.transaction(async (entityManager: EntityManager) => {
            // Check if payment already exists (idempotency check)
            let payment = await entityManager.findOne(Payment, { where: { orderId } });

            if (payment) {
                console.log(`Payment for order ${orderId} already exists.`);
                return payment;
            }

            // Create and save a new payment
            const newPayment = entityManager.create(Payment, { orderId, amount, status: 'pending' });
            payment = await entityManager.save(newPayment);
            // Process payment with up to 3 attempts
            for (let attempt = 1; attempt <= 3; attempt++) {
                console.log(`Payment attempt ${attempt} for order ${orderId}`);

                const attemptResponse = await this.mockPaymentGateway.processPayment(orderId, amount);

                // Save the payment attempt
                await entityManager.save(PaymentAttempt, {
                    payment,
                    attemptNumber: attempt,
                    status: attemptResponse.status,
                    response: JSON.stringify(attemptResponse),
                });

                // If payment is successful, update status and return
                if (attemptResponse.status === 'success') {
                    payment.status = 'completed';
                    payment.paymentGatewayResponse = attemptResponse;
                    await entityManager.save(payment);
                    console.log(`Payment for order ${orderId} completed.`);
                    return payment;
                }

                // Wait before retrying (exponential backoff)
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
            }

            // If all attempts fail, mark payment as failed
            payment.status = 'failed';
            await entityManager.save(payment);
            console.log(`Payment for order ${orderId} failed after 3 attempts.`);

            return payment;
        });
    }
}