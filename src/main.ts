import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // ✅ Enable all log levels
  });
  app.enableCors();
  app.use(cookieParser());
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('API Gateway is running on port 3000');
}
bootstrap();
