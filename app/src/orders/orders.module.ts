import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'order',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5002',
          package: 'order',
          protoPath: join(__dirname, 'order.proto'),
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
