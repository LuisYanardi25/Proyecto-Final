import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import {
  createProductSchema,
  updateProductSchema,
  productIdParamsSchema,
  listProductsQuerySchema
} from "./product.schemas";
import * as controller from "./product.controller";

export const productRoutes = Router();

// listado + filtros (público)
productRoutes.get("/", validate(listProductsQuerySchema, "query"), controller.list);
productRoutes.get("/:id", validate(productIdParamsSchema, "params"), controller.getById);

// protegidos con JWT
productRoutes.post("/", requireAuth, validate(createProductSchema, "body"), controller.create);
productRoutes.patch("/:id", requireAuth, validate(productIdParamsSchema, "params"), validate(updateProductSchema, "body"), controller.update);
productRoutes.delete("/:id", requireAuth, validate(productIdParamsSchema, "params"), controller.remove);