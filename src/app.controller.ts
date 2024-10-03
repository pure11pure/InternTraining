import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// รับ request
// ในวงเล็บไม่ระบุ แสดงว่า '/'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
