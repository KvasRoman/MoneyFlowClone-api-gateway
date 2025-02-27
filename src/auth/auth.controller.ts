import { Controller, Post, Body, Inject, Res, Req, UnauthorizedException, Logger, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Response, Request, response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { json } from 'node:stream/consumers';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() data: { email: string; password: string },@Res() res: Response) {
    const authServiceResult = await this.authService.login(data.email,data.password);
    
    
    const user = await this.userService.getProfile(authServiceResult.accountId);
    user.email = data.email;

    //Refresh token
    res.cookie('refreshToken', authServiceResult.refreshToken, {
      httpOnly: true, // Prevents access from JavaScript
      secure: true,   // Ensures cookie is sent only over HTTPS (for production)
      sameSite: 'strict', // CSRF protection
    });

    // Send access token in response
    return res.json({ accessToken: authServiceResult.accessToken, user });
  }
  @Public()
  @Post('register')
  async register(@Body() data: { email: string; password: string },@Res() res: Response) {
    //Register Account
    const authServiceResult = await this.authService.register(data.email,data.password);

    const user = await this.userService.createProfile(authServiceResult.account.id);
    user.email = data.email;
    //Refresh token
    res.cookie('refreshToken', authServiceResult.refreshToken, {
      httpOnly: true, // Prevents access from JavaScript
      secure: true,   // Ensures cookie is sent only over HTTPS (for production)
      sameSite: 'strict', // CSRF protection
    });
    
    // Send access token in response
    return res.json({ accessToken: authServiceResult.accessToken,user});
  }
}
