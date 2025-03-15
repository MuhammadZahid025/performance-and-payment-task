import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './services/payment.service';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('process')
    async processPayment(@Body() body: { orderId: string; amount: number }) {
        const { orderId, amount } = body
        return this.paymentService.processPayment(orderId, amount);
    }
}