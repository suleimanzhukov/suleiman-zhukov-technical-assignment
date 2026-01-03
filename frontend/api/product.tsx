import { IProduct } from "@/app/page";
import { api as axios } from ".";

export const getProducts = async () => {
  try {
    const response = await axios.get("/product");
    return response.data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createProduct = async (payload: Omit<IProduct, "id">) => {
  try {
    const response = await axios.post("/product", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
