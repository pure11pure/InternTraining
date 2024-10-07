import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blogs } from './blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blogs)
    private readonly blogsRepository: Repository<Blogs>,
  ) {}

  // สร้างบล็อกใหม่
  async createBlog(blogData: Partial<Blogs>): Promise<Blogs> {
    const blog = this.blogsRepository.create(blogData);
    return this.blogsRepository.save(blog);
  }

  // รับรายการบล็อกทั้งหมด
  async getAllBlogs(): Promise<Blogs[]> {
    return this.blogsRepository.find();
  }

  // รับบล็อกตาม ID
  async getBlogById(id: number): Promise<Blogs> {
    const blog = await this.blogsRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  // อัปเดตบล็อก
  async updateBlog(id: number, blogData: Partial<Blogs>): Promise<Blogs> {
    const blog = await this.getBlogById(id); // ตรวจสอบว่ามีบล็อกนี้อยู่หรือไม่
    this.blogsRepository.merge(blog, blogData); // อัปเดตข้อมูลบล็อก
    return this.blogsRepository.save(blog);
  }

  // ลบบล็อก
  async deleteBlog(id: number): Promise<any> {
    const result = await this.blogsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return "Delete success"
  }
}
