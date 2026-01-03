import { Module } from '@nestjs/common';
import { ProductModule } from './products/products.module.js';
import { OrderModule } from './orders/orders.module.js';

@Module({
  imports: [ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
