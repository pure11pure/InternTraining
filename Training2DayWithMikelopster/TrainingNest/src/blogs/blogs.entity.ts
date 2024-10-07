import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('blogs')
  export class Blogs {
    @PrimaryGeneratedColumn()
    id: number;  // Unique identifier for each blog
  
    @Column({ type: 'varchar', length: 255 })
    title: string;  // Blog title
  
    @Column({ type: 'text' })
    body: string;  // Blog content
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    thumbnail?: string;  // Thumbnail image
  
    @Column({ type: 'varchar', length: 255 })
    author: string;  // Author name
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;  // Date of creation
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;  // Date of last update
  
    @Column({
      type: 'varchar',
      length: 50,
      default: 'draft',
      enum: ['draft', 'published', 'unpublished'],
    })
    status: 'draft' | 'published' | 'unpublished';  // Blog status
  
    @Column('text', { array: true, nullable: true })
    tags?: string[];  // Array of tags
  }
  