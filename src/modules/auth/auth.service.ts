import { UserModel } from "./user.model";
import { hashPassword, comparePassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";

export async function registerUser(input: { name: string; email: string; password: string }) {
  const passwordHash = await hashPassword(input.password);

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    passwordHash
  });

  return {
    id: String(user._id),
    name: user.name,
    email: user.email
  };
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) return null;

  const ok = await comparePassword(input.password, user.passwordHash);
  if (!ok) return null;

  const token = signToken({ sub: String(user._id), email: user.email });
  return { token };
}