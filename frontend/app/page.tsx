"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import ListItem from "@/components/listItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getProducts } from "@/api/product";
import { addOrderItem, createOrder, getOrders, updateOrder } from "@/api/order";
import { IOrder, IOrderItem } from "./order/page";
import { toast } from "sonner";

export interface IProduct {
  id: number;
  name: string;
  description: string;
}

export default function Product() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [newProduct, setNewProduct] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addProduct.mutate();
    setNewProduct(!newProduct);
  };

  const addProduct = useMutation({
    mutationFn: async () => {
      createProduct({ name, description });
    },
    onSuccess: () => {
      queryClient.setQueryData(["products"], (oldData: IProduct[]) => {
        return oldData
          ? [...oldData, { name, description }]
          : [{ name, description }];
      });
    },
  });

  const handleDeleteItem = async (id: number) => {
    const orders = await getOrders();
    const isProductPresent = orders.some((order: IOrder) =>
      order.orderItems.some((item: IOrderItem) => item.productId === id)
    );
    if (!isProductPresent) deleteMutation.mutate(id);
    else toast.error("You can't delete it, because you have it ordered.");
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      deleteProduct(id);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(["products"], (oldData: IProduct[]) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
  });

  const handleAddItem = async (id: number) => {
    const orders = await getOrders();
    if (!!!orders.length) return createOrder({ productId: id, count: 1 });

    const orderItems = orders.flatMap((order: IOrder) =>
      (order.orderItems || []).map((item) => ({ ...item, orderId: order.id }))
    );
    const orderItem = orderItems.find(
      (item: IOrderItem) => item.productId === id
    );
    if (orderItem)
      updateOrder({ id: orderItem.id, count: orderItem.count + 1 });
    else
      addOrderItem({
        productId: id,
        count: 1,
        orderId: orders[0].id,
      });
  };

  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-100 pt-4 pb-4">
        Loading products...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-100 pt-4 pb-4">
      <Button
        className="mb-4"
        onClick={() => {
          if (!newProduct) router.push("/order");
          else setNewProduct(!newProduct);
        }}
      >
        {!newProduct ? "Orders" : "Back"}
      </Button>
      {!newProduct ? (
        <div className="flex flex-col items-center justify-center w-75 gap-4">
          {products.length ? (
            products.map((item: IProduct) => (
              <ListItem
                key={`product-${item.id}`}
                id={item.id}
                name={item.name}
                description={item.description}
                handleAddItem={handleAddItem}
                removeItem={handleDeleteItem}
              />
            ))
          ) : (
            <p className="mt-4 mb-4">No products</p>
          )}
        </div>
      ) : (
        <form
          className="flex flex-col items-center justify-center w-100 gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Product name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Input
            placeholder="Product description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </form>
      )}
      <Button
        className="mt-4"
        onClick={(e) => {
          if (!newProduct) setNewProduct(!newProduct);
          else handleSubmit(e);
        }}
      >
        {newProduct ? "Create" : "Add New Product"}
      </Button>
    </div>
  );
}
