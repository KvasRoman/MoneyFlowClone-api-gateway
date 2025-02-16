import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Connect to Auth Microservice
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: { host: '127.0.0.1', port: 3001 }, // Auth Microservice
  // });

  // Connect to Users Microservice
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: { host: '127.0.0.1', port: 3002 }, // Users Microservice
  // });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('API Gateway is running on port 3000');
}
bootstrap();
