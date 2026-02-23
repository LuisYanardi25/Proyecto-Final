import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await registerUser(req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await loginUser(req.body);
    if (!result) return res.status(401).json({ message: "Invalid credentials" });
    return res.json(result);
  } catch (err) {
    next(err);
  }
}