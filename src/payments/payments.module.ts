import { Module } from "@nestjs/common";
import { MockPaymentGatewayService } from "./services/mock-payment-gateway.service";
import { PaymentController } from "./payments.controller";
import { PaymentService } from "./services/payment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentAttempt } from "./entities/payment-attempts.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Payment, PaymentAttempt])],
    providers: [PaymentService, MockPaymentGatewayService],
    controllers: [PaymentController],
})
export class PaymentsModule { }