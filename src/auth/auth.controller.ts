import { Controller, Post, Body, Inject, Res, Req, UnauthorizedException, Logger, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Response, Request, response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { json } from 'node:stream/consumers';
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}
  private readonly logger = new Logger(AuthController.name);
  @Public()
  @Post('login')
  async login(@Body() data: { email: string; password: string },@Res() res: Response) {
    const serviceResponse = await firstValueFrom(this.authService.send({ cmd: 'login' }, data));
    // Set refresh token as an HttpOnly cookie
    res.cookie('refreshToken', serviceResponse.refreshToken, {
      httpOnly: true, // Prevents access from JavaScript
      secure: true,   // Ensures cookie is sent only over HTTPS (for production)
      sameSite: 'strict', // CSRF protection
    });

    // Send access token in response
    return res.json({ accessToken: serviceResponse.accessToken });
  }
  @Public()
  @Post('register')
  async register(@Body() data: { email: string; password: string },@Res() res: Response) {
    Logger.log("Starting register process");
    const serviceResponse = await firstValueFrom(this.authService.send({ cmd: 'register' }, data));
    Logger.log(serviceResponse);
    res.cookie('refreshToken', serviceResponse.refreshToken, {
      httpOnly: true, // Prevents access from JavaScript
      secure: true,   // Ensures cookie is sent only over HTTPS (for production)
      sameSite: 'strict', // CSRF protection
    });
    Logger.log("adding cookies");
    // Send access token in response
    return res.json({ accessToken: serviceResponse.accessToken });
  }
  @Get('hello')
  async Hello(@Body() data: {}, @Req() request: Request, @Res() response: Response){
    Logger.log(request['user'].status,"Status")
    return response.status(request['user'].status).json({message: "invalid Token"});
  }
}
