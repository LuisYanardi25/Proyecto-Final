import { Request, Response, NextFunction } from "express";
import * as service from "./product.service";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const owner = req.user!.id;
    const created = await service.createProduct({ ...req.body, owner });
    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await service.getProductById(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });
    return res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updated = await service.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Product not found" });
    return res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await service.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await service.listProducts(req.query as any);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}