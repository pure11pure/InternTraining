import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    { id: 1, name: 'product 1', description: 'description 1' },
    { id: 2, name: 'product 2', description: 'description 2' },
  ];

  findAll() {
    return this.products;
  }

  create(product) {
    this.products.push(product);
    return product;
  }
}
