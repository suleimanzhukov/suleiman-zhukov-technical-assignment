import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto.js';
import { prisma } from '../lib/prisma.js';

@Injectable()
export class productService {
  async createProduct(dto: CreateProductDto) {
    const { name, description } = dto;

    return await prisma.product.create({
      data: {
        name: name,
        description: description,
      },
    });
  }

  async updateProduct(product: UpdateProductDto) {
    const { id, name, description } = product;

    return await prisma.product.update({
      where: { id: id },
      data: { name, description },
    });
  }

  async getProducts() {
    const products = await prisma.product.findMany();
    return { products: products };
  }

  async deleteProduct(id) {
    return await prisma.product.delete({ where: { id: id.id } });
  }

  async getProductsByIds(data: { ids: number[] }) {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: data.ids,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return { products };
  }
}
