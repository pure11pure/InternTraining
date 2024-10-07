import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.signUp(email, password);
    return { message: 'ลงทะเบียนสำเร็จ', userId: user.id };
  }
}