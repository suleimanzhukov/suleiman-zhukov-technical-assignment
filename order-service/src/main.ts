import { NestFactory } from '@nestjs/core';
import { OrderModule } from './app.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5002',
        package: 'order',
        protoPath: join(__dirname, 'order.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap();
