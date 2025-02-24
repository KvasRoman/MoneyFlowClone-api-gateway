import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';
@Module({
  imports: [AuthModule, UserModule, TransactionModule],
  controllers: [AppController, TransactionController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
