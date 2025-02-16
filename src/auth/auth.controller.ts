import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return firstValueFrom(this.authService.send({ cmd: 'login' }, data));
  }
}
