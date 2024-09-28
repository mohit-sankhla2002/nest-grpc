import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: path.join(__dirname, 'proto/auth.proto'),
      package: 'auth',
    },
  });
  await app.listen();
}
bootstrap();
