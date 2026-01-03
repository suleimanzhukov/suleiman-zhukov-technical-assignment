import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './products.service.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        name: 'Table',
        description: 'Wide dining table',
      },
    },
  })
  @Post()
  createProduct(@Body() product) {
    return this.productService.createProduct(product);
  }

  @ApiOperation({ summary: 'Get all Products' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {},
    },
  })
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @ApiOperation({ summary: 'Update a Product' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        name: 'Table',
        description: 'Wide dining table',
      },
    },
  })
  @Patch(':id')
  updateProducts(@Param('id') id: number, @Body() dto) {
    return this.productService.updateProducts(id, dto);
  }

  @ApiOperation({ summary: 'Delete a Product' })
  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
