import { Controller, Get, UseGuards, Request, Inject, Post, Body, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Public } from 'src/common/decorators/public.decorator';
@Controller('user')
export class UserController {
  constructor(@Inject("USER_SERVICE") private readonly userService: ClientProxy) {}

  @Get('profile')
  async getProfile(@Request() req) {
    Logger.log(req.user);
    return await firstValueFrom(this.userService.send({cmd: "get_user"}, {accountId: req.user.accountId}));
  }
  @Post('register')
  async registerUser(@Body() data: {firstName: string, lastName?: string},@Request() req){
    await firstValueFrom(this.userService.send({cmd: "create_user"}, {
      accountId: req.user.accountId, 
      firstName: data.firstName,
      lastName: data.lastName
    }));
  }
}
