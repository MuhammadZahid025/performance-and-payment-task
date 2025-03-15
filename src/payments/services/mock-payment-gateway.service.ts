import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPaymentGatewayService {
    async processPayment(orderId: string, amount: number): Promise<any> {
        const isSuccess = Math.random() > 0.5;

        return {
            status: isSuccess ? 'success' : 'failure',
            response: isSuccess
                ? `Transaction successful: txn-${Math.floor(Math.random() * 100000)}`
                : 'Payment failed due to insufficient funds',
        };
    }
}