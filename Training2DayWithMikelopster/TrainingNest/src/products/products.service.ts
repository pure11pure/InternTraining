import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Products> {
    return this.productsRepository.findOne({ where: { id } });
  }

  create(product: Omit<Products, 'id'>): Promise<Products> {
    return this.productsRepository.save(product);
  }

  async update(
    id: number,
    updateProduct: Partial<Products>,
  ): Promise<Products> {
    await this.productsRepository.update(id, updateProduct);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

// import { Injectable } from '@nestjs/common';

// export interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// @Injectable()
// export class ProductsService {
//   private products: Product[] = [
//     { id: 1, name: 'product1', price: 100 },
//     { id: 2, name: 'product2', price: 200 },
//     { id: 3, name: 'product3', price: 300 },
//   ];

//   findAll() {
//     return this.products;
//   }

//   findOne(id: number) {
//     return this.products.find((product) => product.id === id);
//   }

//   findSearch(search?: string) {
//     console.log(search);
//     if (search) {
//       return this.products.filter((product) => {
//         console.log(product, search);
//         product.name.toLowerCase().includes(search.toLowerCase());
//       });
//     }
//     return this.products;
//   }

//   create(product: Omit<Product, 'id'>) {
//     const newProduct = { id: this.products.length + 1, ...product };
//     this.products.push(newProduct);
//     return newProduct;
//   }

//   update(id: number, updateProduct: Partial<Product>) {
//     const product = this.findOne(id);
//     if (product) {
//       Object.assign(product, updateProduct);
//       return product;
//     }
//     return null;
//   }

//   remove(id: number) {
//     const index = this.products.findIndex((product) => product.id === id);
//     if (index !== -1) {
//       return this.products.splice(index, 1)[0];
//     }
//     return null;
//   }
// }
