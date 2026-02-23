import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "./auth.schemas";
import { login, register } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema, "body"), register);
authRoutes.post("/login", validate(loginSchema, "body"), login);