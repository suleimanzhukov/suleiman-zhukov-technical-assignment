import { Module } from '@nestjs/common';
import { productController } from './app.controller.js';
import { productService } from './app.service.js';

@Module({
  imports: [],
  controllers: [productController],
  providers: [productService],
})
export class AppModule {}
