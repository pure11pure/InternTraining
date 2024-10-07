// import { PartialType } from '@nestjs/mapped-types';
// import { CreateProductDto } from './create-product.dto';

// export class UpdateProductDto extends PartialType(CreateProductDto) {}


export class UpdateProductDto {
    readonly name: string;
    readonly description?: string;
    readonly price: number;
  }