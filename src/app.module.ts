import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { CustomerModule } from './app/customer/customer.module';
import { BillingModule } from './app/billing/billing.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, CustomerModule, BillingModule], //carrega minhas variaveis de ambiente
  controllers: [],
  providers: [],
})
export class AppModule {}
