import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './product.entity';
// import Guard เข้ามา
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
@UseGuards(AuthGuard) // เรียกใช้ Auth Guard
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() createProduct: Omit<Products, 'id'>) {
    return this.productsService.create(createProduct);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProduct: { name?: string; price?: number },
  ) {
    return this.productsService.update(+id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   Query,
// } from '@nestjs/common';
// import { Product, ProductsService } from './products.service';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Get()
//   findAll() {
//     return this.productsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.productsService.findOne(+id);
//   }

//   @Get('search')
//   findSearch(@Query() search?: string) {
//     return this.productsService.findSearch(search);
//   }

//   @Post()
//   create(@Body() createProduct: Omit<Product, 'id'>) {
//     return this.productsService.create(createProduct);
//   }

//   @Put(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateProduct: { name?: string; price?: number },
//   ) {
//     return this.productsService.update(+id, updateProduct);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.productsService.remove(+id);
//   }
// }
