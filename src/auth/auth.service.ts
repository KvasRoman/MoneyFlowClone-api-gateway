import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  async login(email: string, password: string) {
    return firstValueFrom(this.authClient.send({ cmd: 'login' }, { email, password }));
  }
}
