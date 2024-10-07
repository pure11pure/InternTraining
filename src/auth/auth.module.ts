import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'your_jwt_secret', // ควรเก็บไว้ใน environment variable
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
