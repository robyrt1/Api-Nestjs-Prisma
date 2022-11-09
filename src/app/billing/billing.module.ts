import { PrismaService } from './../../database/prisma.service';
import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  controllers: [BillingController],
  providers: [BillingService, PrismaService],
})
export class BillingModule {}
