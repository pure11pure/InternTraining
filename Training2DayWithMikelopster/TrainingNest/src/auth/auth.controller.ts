import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }

  // @Get('me')
  // getProfile(@Req() req: any) {
  //   return this.authService.checkToken(req.headers.authorization.split(' ')[1]);
  // }

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile2(@Req() req: any) {
    return {email : req.user.email};
  }
}
