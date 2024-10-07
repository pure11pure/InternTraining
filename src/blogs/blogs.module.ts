import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blogs } from './blogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
