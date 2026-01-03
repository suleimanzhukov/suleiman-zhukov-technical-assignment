import { Module } from '@nestjs/common';
import { OrderController } from './app.controller.js';
import { OrderService } from './app.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'product',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, 'product.proto'),
          url: 'localhost:5005',
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
