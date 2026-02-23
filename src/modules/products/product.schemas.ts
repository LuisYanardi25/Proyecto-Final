import { z } from "zod";

const toNumber = (v: unknown) => {
  if (typeof v !== "string") return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : v;
};

const toInt = (v: unknown) => {
  const n = toNumber(v);
  return typeof n === "number" ? Math.trunc(n) : n;
};

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional().default(""),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  category: z.string().min(1)
});

export const updateProductSchema = createProductSchema.partial();

export const productIdParamsSchema = z.object({
  id: z.string().min(1)
});

/**
 * ✅ FILTROS por query params (requisito de evaluación)
 * Ejemplos:
 * /api/products?minPrice=1000&category=Ropa&q=medias&sortBy=price&sortDir=asc&page=1&limit=10
 */
export const listProductsQuerySchema = z.object({
  minPrice: z.preprocess(toNumber, z.number().nonnegative()).optional(),
  maxPrice: z.preprocess(toNumber, z.number().nonnegative()).optional(),
  minStock: z.preprocess(toNumber, z.number().int().nonnegative()).optional(),
  maxStock: z.preprocess(toNumber, z.number().int().nonnegative()).optional(),
  category: z.string().min(1).optional(),
  q: z.string().min(1).optional(),
  sortBy: z.enum(["price", "createdAt", "name"]).optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
  page: z.preprocess(toInt, z.number().int().min(1)).optional(),
  limit: z.preprocess(toInt, z.number().int().min(1).max(100)).optional()
});