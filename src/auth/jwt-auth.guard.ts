import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, Logger  } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true; // ✅ Skip authentication if the route is marked as public
    }
    
    const request = context.switchToHttp().getRequest();

    const response = context.switchToHttp().getRequest();
    
    const authHeader = request.headers['authorization'];
    
    const refreshToken = request.cookies?.refreshToken; // ✅ Extract refresh token from cookies
    
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    
    const accessToken = authHeader.split(' ')[1]; // Extract token
    
    try {
      
      // Validate access token
      const result = await this.authClient
        .send({cmd: 'validate_token'}, { token: accessToken, refreshToken: refreshToken })
        .toPromise();
      request.user = result; // Attach user info to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
