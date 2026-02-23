import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { isZodError } from "./validate";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Zod
  if (isZodError(err)) {
    return res.status(400).json({
      message: "Validation error",
      issues: err.issues
    });
  }

  // Mongoose invalid ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Invalid id" });
  }

  // Mongoose duplicate key
  if (err?.code === 11000) {
    return res.status(409).json({ message: "Duplicate key", detail: err.keyValue });
  }

  const status = typeof err?.statusCode === "number" ? err.statusCode : 500;

  return res.status(status).json({
    message: err?.message ?? "Internal server error"
  });
}