import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class OrderItem {
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  count: number;
}

export class UpdateOrderDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  count: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
}
