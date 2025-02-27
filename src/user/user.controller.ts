import { Controller, Get, UseGuards, Request, Inject, Post, Body, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Public } from 'src/common/decorators/public.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return await this.userService.getProfile(req.user.accountId);
  }
  // @Post('register')
  // async registerUser(@Body() data: {firstName: string, lastName?: string},@Request() req){
  //   //return await this.userService.createProfile(req.)
  // }
}
