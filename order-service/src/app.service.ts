import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';
import { OrderItem, UpdateOrderDto } from './dto.js';
import { type ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface Product {
  id: number;
  name: string;
  description: string;
}

interface ProductListResponse {
  products: Product[];
}

@Injectable()
export class OrderService implements OnModuleInit {
  private productOrderService;

  constructor(@Inject('product') private client: ClientGrpc) {}

  onModuleInit() {
    this.productOrderService = this.client.getService('ProductService');
  }

  async createOrder(order: OrderItem) {
    return await prisma.order.create({
      data: {
        orderItems: {
          create: order,
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async updateOrder(orderItem: UpdateOrderDto) {
    return await prisma.orderItem.update({
      where: { id: orderItem.id },
      data: {
        count: orderItem.count,
      },
    });
  }

  async getOrders() {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });

    const productIds = [
      ...new Set(
        orders.flatMap((order) =>
          order.orderItems.map((item) => item.productId),
        ),
      ),
    ];

    const { products } = await firstValueFrom<ProductListResponse>(
      this.productOrderService.getProductsByIds({ ids: productIds }),
    );

    const productMap = new Map<number, Omit<Product, 'id'>>(
      products.map((p: Product) => [
        p.id,
        { name: p.name, description: p.description },
      ]),
    );
    const detailedOrders = orders.map((order) => ({
      ...order,
      orderItems: order.orderItems.map((item) => ({
        ...item,
        name: productMap.get(item.productId)?.name || '',
        description: productMap.get(item.productId)?.description || '',
      })),
    }));

    return { orders: detailedOrders };
  }

  async deleteOrderItem(order) {
    return await prisma.orderItem.delete({ where: { id: order.id } });
  }

  async deleteOrder(order) {
    return await prisma.order.delete({ where: { id: order.id } });
  }

  async addOrderItem(order) {
    return await prisma.orderItem.create({
      data: order,
    });
  }
}
