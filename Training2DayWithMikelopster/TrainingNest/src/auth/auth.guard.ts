import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('ไม่พบ token การเข้าถึง');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'your_jwt_secret', // ควรใช้ค่าจาก environment variable
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('token ไม่ถูกต้องหรือหมดอายุ');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}