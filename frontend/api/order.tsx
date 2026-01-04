import { api as axios } from ".";

export interface ICreateOrder {
  productId: number;
  count: number;
}

export interface IaddOrderItem {
  productId: number;
  count: number;
  orderId: number;
}

export interface IUpdateOrder {
  id: number;
  count: number;
}

export interface IDelete {
  id: number;
}

export const createOrder = async (payload: ICreateOrder) => {
  try {
    const response = await axios.post("/order", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addOrderItem = async (payload: IaddOrderItem) => {
  try {
    const response = await axios.put("/order", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get("/order");
    return response.data.orders || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateOrder = async (payload: IUpdateOrder) => {
  try {
    const response = await axios.patch("/order", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteOrder = async (payload: IDelete) => {
  try {
    const response = await axios.delete(`/order/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteOrderItem = async (payload: IDelete) => {
  try {
    const response = await axios.delete(`/order/order-item/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
