import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './orders.service.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create an Order' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        productId: 1,
        count: 1,
      },
    },
  })
  @Post()
  createOrder(@Body() order) {
    return this.orderService.createOrder(order);
  }

  @ApiOperation({ summary: 'Get all Orders' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {},
    },
  })
  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @ApiOperation({ summary: 'Update Order' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        count: 1,
      },
    },
  })
  @Patch()
  updateOrder(@Body() order) {
    return this.orderService.updateOrder(order);
  }

  @ApiOperation({ summary: 'Delete Order Item' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
      },
    },
  })
  @Delete('order-item/:id')
  deleteOrderItem(@Param('id') id: number) {
    return this.orderService.deleteOrderItem(id);
  }

  @ApiOperation({ summary: 'Delete Order' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
      },
    },
  })
  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }

  @ApiOperation({ summary: 'Add Order Item' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        orderId: 1,
        productId: 1,
        count: 1,
      },
    },
  })
  @Put()
  addOrderItem(@Body() order) {
    return this.orderService.addOrderItem(order);
  }
}
