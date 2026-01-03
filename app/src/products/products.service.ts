import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ProductService implements OnModuleInit {
  private productService;

  constructor(@Inject('product') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService('ProductService');
  }

  createProduct(dto) {
    return this.productService.createProduct(dto);
  }

  getProducts() {
    return this.productService.getProducts({});
  }

  updateProducts(id: number, dto) {
    return this.productService.updateProduct({
      id,
      name: dto.name,
      description: dto.description,
    });
  }

  deleteProduct(id: number) {
    return this.productService.deleteProduct({ id });
  }
}
