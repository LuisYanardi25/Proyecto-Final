import { FilterQuery } from "mongoose";
import { ProductModel, ProductDoc } from "./product.model";

export async function createProduct(input: {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  owner: string;
}) {
  return ProductModel.create(input);
}

export async function getProductById(id: string) {
  return ProductModel.findById(id);
}

export async function updateProduct(id: string, input: Partial<Omit<ProductDoc, "owner">>) {
  return ProductModel.findByIdAndUpdate(id, input, { new: true });
}

export async function deleteProduct(id: string) {
  return ProductModel.findByIdAndDelete(id);
}

export async function listProducts(query: {
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  category?: string;
  q?: string;
  sortBy?: "price" | "createdAt" | "name";
  sortDir?: "asc" | "desc";
  page?: number;
  limit?: number;
}) {
  const filter: FilterQuery<ProductDoc> = {};

  if (query.category) filter.category = query.category;

  if (query.minPrice != null || query.maxPrice != null) {
    filter.price = {};
    if (query.minPrice != null) filter.price.$gte = query.minPrice;
    if (query.maxPrice != null) filter.price.$lte = query.maxPrice;
  }

  if (query.minStock != null || query.maxStock != null) {
    filter.stock = {};
    if (query.minStock != null) filter.stock.$gte = query.minStock;
    if (query.maxStock != null) filter.stock.$lte = query.maxStock;
  }

  if (query.q) {
    const rx = new RegExp(query.q, "i");
    filter.$or = [{ name: rx }, { description: rx }];
  }

  const page = query.page ?? 1;
  const limit = query.limit ?? 20;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy ?? "createdAt";
  const sortDir = query.sortDir === "asc" ? 1 : -1;

  const [items, total] = await Promise.all([
    ProductModel.find(filter).sort({ [sortBy]: sortDir }).skip(skip).limit(limit),
    ProductModel.countDocuments(filter)
  ]);

  return {
    items,
    meta: { total, page, limit, pages: Math.ceil(total / limit) }
  };
}