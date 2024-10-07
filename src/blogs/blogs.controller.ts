import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blogs } from './blogs.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // สร้างบล็อกใหม่
  @Post()
  async createBlog(@Body() blogData: Partial<Blogs>): Promise<Blogs> {
    return this.blogsService.createBlog(blogData);
  }

  // รับรายการบล็อกทั้งหมด
  @Get()
  async getAllBlogs(): Promise<Blogs[]> {
    return this.blogsService.getAllBlogs();
  }

  // รับบล็อกตาม ID
  @Get(':id')
  async getBlogById(@Param('id') id: number): Promise<Blogs> {
    return this.blogsService.getBlogById(id);
  }

  // อัปเดตบล็อก
  @Put(':id')
  async updateBlog(
    @Param('id') id: number,
    @Body() blogData: Partial<Blogs>,
  ): Promise<Blogs> {
    return this.blogsService.updateBlog(id, blogData);
  }

  // ลบบล็อก
  @Delete(':id')
  async deleteBlog(@Param('id') id: number): Promise<void> {
    return this.blogsService.deleteBlog(id);
  }
}
