import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}

  async login(email: string, password: string) {
    const serviceResponse = await firstValueFrom(this.authService.send({ cmd: 'login' }, {email,password}));

    return serviceResponse;
  }
  async register(email: string, password: string){
    const serviceResponse = await firstValueFrom(this.authService.send({ cmd: 'register' },  {email,password}));

    return serviceResponse;
  }
  async 
}
