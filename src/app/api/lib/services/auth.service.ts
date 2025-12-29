import bcrypt from "bcrypt";
import { prisma } from "@/app/prisma";
import { signToken } from "../utils/signToken";
import { AppError } from "../utils/appError";

export const AuthService = {
  async register(username: string, email: string, password: string) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new AppError("User already exists", 409);

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, hash_password: hash },
    });

    return {
      user: { id: user.id, username: user.username, email: user.email },
      token: signToken(user),
    };
  },

  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new AppError("User not found", 401);

    const ok = await bcrypt.compare(password, user.hash_password);
    if (!ok) throw new AppError("Invalid password", 401);

    return {
      user: { id: user.id, username: user.username, email: user.email },
      token: signToken(user),
    };
  },
};
