import { Body, Controller } from '@nestjs/common';
import { OrderService } from './app.service.js';
import { OrderItem, UpdateOrderDto } from './dto.js';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @GrpcMethod('OrderService', 'createOrder')
  async createOrder(@Body() order: OrderItem) {
    return this.orderService.createOrder(order);
  }

  @GrpcMethod('OrderService', 'updateOrder')
  async updateOrder(order: UpdateOrderDto) {
    return this.orderService.updateOrder(order);
  }

  @GrpcMethod('OrderService', 'getOrders')
  getOrders() {
    return this.orderService.getOrders();
  }

  @GrpcMethod('OrderService', 'deleteOrderItem')
  deleteOrderItem(order) {
    return this.orderService.deleteOrderItem(order);
  }

  @GrpcMethod('OrderService', 'deleteOrder')
  deleteOrder(order) {
    return this.orderService.deleteOrder(order);
  }

  @GrpcMethod('OrderService', 'addOrderItem')
  async addOrderItem(order) {
    return this.orderService.addOrderItem(order);
  }
}
