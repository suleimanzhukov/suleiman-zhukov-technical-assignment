import { Module } from '@nestjs/common';
import { ProductController } from './products.controller.js';
import { ProductService } from './products.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'product',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5005',
          package: 'product',
          protoPath: join(__dirname, 'product.proto'),
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
