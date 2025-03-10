import { Controller, Get, UseGuards, Request, Inject, Post, Body, Logger, Put } from '@nestjs/common';
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
  @Put()
  async editProfile(@Request() req, @Body() data: {firstName: string}){
    const account: AccountValidateDTO = req.user.account;
    return await this.userService.updateProfile(account.id, data.firstName);
  }
}
