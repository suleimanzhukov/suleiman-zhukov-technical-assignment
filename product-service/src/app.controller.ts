import { Controller } from '@nestjs/common';
import { productService } from './app.service.js';
import { CreateProductDto, UpdateProductDto } from './dto.js';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class productController {
  constructor(private readonly productService: productService) {}

  @GrpcMethod('ProductService', 'createProduct')
  async createProduct(dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @GrpcMethod('ProductService', 'updateProduct')
  updateProduct(product: UpdateProductDto) {
    return this.productService.updateProduct(product);
  }

  @GrpcMethod('ProductService', 'getProducts')
  getProducts() {
    return this.productService.getProducts();
  }

  @GrpcMethod('ProductService', 'deleteProduct')
  deleteProducts(id) {
    return this.productService.deleteProduct(id);
  }

  @GrpcMethod('ProductService', 'getProductsByIds')
  getProductsByIds(data) {
    return this.productService.getProductsByIds(data);
  }
}
