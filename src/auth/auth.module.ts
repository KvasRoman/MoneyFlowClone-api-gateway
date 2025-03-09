import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3001 }, // Connect to auth-service
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard],
  exports: [AuthService, ClientsModule],
})
export class AuthModule {}
