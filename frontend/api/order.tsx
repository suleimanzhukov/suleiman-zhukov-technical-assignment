import { api as axios } from ".";

export const createOrder = async (payload) => {
  try {
    const response = await axios.post("/order", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addOrderItem = async (payload) => {
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

export const updateOrder = async (payload) => {
  try {
    const response = await axios.patch("/order", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteOrder = async (payload) => {
  try {
    const response = await axios.delete(`/order/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteOrderItem = async (payload) => {
  try {
    const response = await axios.delete(`/order/order-item/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
