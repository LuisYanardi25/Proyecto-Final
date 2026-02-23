import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

type Target = "body" | "query" | "params";

export function validate(schema: AnyZodObject, target: Target = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);
      (req as any)[target] = parsed; // simplifica: el controller ya recibe tipado
      next();
    } catch (err) {
      next(err);
    }
  };
}

export function isZodError(err: unknown): err is ZodError {
  return err instanceof ZodError;
}