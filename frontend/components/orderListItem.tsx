import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item";
import { Button } from "./ui/button";
import { IOrderItem } from "@/app/order/page";

interface IOrderListItem extends IOrderItem {
  orderItemsCount: number;
  orderId: number;
  editCount: (
    id: number,
    count: number,
    orderItemsCount: number,
    orderId: number
  ) => void;
}

const OrderListItem: React.FC<IOrderListItem> = ({
  id,
  name,
  count,
  productId,
  orderId,
  orderItemsCount,
  description,
  editCount,
}) => {
  return (
    <Item className="w-100" variant="outline">
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <p>{count}</p>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editCount(id, count + 1, orderItemsCount, orderId)}
        >
          +
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editCount(id, count - 1, orderItemsCount, orderId)}
        >
          -
        </Button>
      </ItemActions>
    </Item>
  );
};

export default OrderListItem;
