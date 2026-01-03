import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class OrderService implements OnModuleInit {
  private orderService;

  constructor(@Inject('order') private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService = this.client.getService('OrderService');
  }

  createOrder(order) {
    return this.orderService.createOrder(order);
  }

  getOrders() {
    const orders = this.orderService.getOrders({});
    return orders;
  }

  updateOrder(order) {
    return this.orderService.updateOrder({
      id: order.id,
      count: order.count,
    });
  }

  deleteOrderItem(id) {
    return this.orderService.deleteOrderItem({ id });
  }

  deleteOrder(id) {
    return this.orderService.deleteOrder({ id });
  }

  addOrderItem(order) {
    return this.orderService.addOrderItem({
      orderId: order.orderId,
      count: order.count,
      productId: order.productId,
    });
  }
}
