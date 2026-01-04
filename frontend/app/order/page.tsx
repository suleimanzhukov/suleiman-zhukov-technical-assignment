"use client";

import OrderListItem from "@/components/orderListItem";
import { useMemo } from "react";
import "../globals.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteOrder,
  deleteOrderItem,
  getOrders,
  updateOrder,
} from "@/api/order";

export interface IOrder {
  id: number;
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  id: number;
  productId: number;
  name: string;
  orderId: number;
  description: string;
  count: number;
}

export default function Order() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const mutation = useMutation({
    mutationFn: async (variables: { id: number; count: number }) => {
      updateOrder({ id: variables.id, count: variables.count });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["orders"], (oldData: IOrder[]) => {
        if (!oldData) return oldData;

        return oldData.map((order: IOrder) => {
          // Find the order containing the updated orderItem
          if (
            order.orderItems.some(
              (item: IOrderItem) => item.id === variables.id
            )
          ) {
            return {
              ...order,
              orderItems: order.orderItems.map((item: IOrderItem) =>
                item.id === variables.id
                  ? { ...item, count: variables.count }
                  : item
              ),
            };
          }
          return order;
        });
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (variables: { id: number }) => {
      deleteOrderItem({ id: variables.id });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["orders"], (oldOrders: IOrder[]) => {
        if (!oldOrders) return [];

        return oldOrders.map((order: IOrder) => {
          return {
            ...order,
            orderItems: order.orderItems.filter(
              (item: IOrderItem) => item.id !== variables.id
            ),
          };
        });
      });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: async (variables: { id: number }) => {
      deleteOrder({ id: variables.id });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["orders"], (oldOrders: IOrder[]) => {
        if (!oldOrders) return [];
        return oldOrders.filter((order) => order.id !== variables.id);
      });
    },
  });

  const editCount = (
    id: number,
    count: number,
    orderItemsCount: number,
    orderId: number
  ) => {
    console.log("AAAAAAA#######————#########AAAAAAAAA", count, orderItemsCount);
    if (!count) return deleteItemMutation.mutate({ id });
    if (!count && orderItemsCount === 1) {
      console.log("HERE");
      deleteItemMutation.mutate({ id });
      deleteOrderMutation.mutate({ id: orderId });
      return;
    }
    mutation.mutate({ id, count });
  };

  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-100 pt-4 pb-4">
        Loading orders...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-100 pt-4 pb-4">
      {orders?.length ? (
        orders?.map((order) => {
          const total =
            order.orderItems?.reduce((sum, item) => sum + item.count, 0) || 0;

          return (
            <div
              key={`order-${order.id}`}
              className="flex flex-col items-center justify-center w-full gap-4"
            >
              {!!order.orderItems?.length && (
                <p className="mb-4">Total items: {total}</p>
              )}
              {order.orderItems?.map((item: IOrderItem) => (
                <OrderListItem
                  key={`order-item-${item.id}`}
                  id={item.id}
                  orderItemsCount={order?.orderItems?.length}
                  orderId={item.orderId}
                  name={item.name}
                  description={item.description}
                  productId={item.productId}
                  count={item.count}
                  editCount={editCount}
                />
              ))}
            </div>
          );
        })
      ) : (
        <p>No orders </p>
      )}
    </div>
  );
}
