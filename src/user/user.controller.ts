import { Controller, Get, UseGuards, Request, Inject, Post, Body, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Public } from 'src/common/decorators/public.decorator';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AccountValidateDTO } from 'src/dto/account-validate';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const account: AccountValidateDTO = req.user.account;
    const user = await this.userService.getProfile(account.id);
    return {email: account.email,...user};
  }
  // @Post('register')
  // async registerUser(@Body() data: {firstName: string, lastName?: string},@Request() req){
  //   //return await this.userService.createProfile(req.)
  // }
}
