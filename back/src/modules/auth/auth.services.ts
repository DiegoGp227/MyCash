import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { ICreateUser, IloginUser, IUserResponse } from "./auth.types";
import prisma from "../../db/prisma.js";
import {
  EmailAlreadyInUseError,
  InvalidCredentialsError,
} from "../../errors/businessErrors";

export const createUser = async (
  userData: ICreateUser,
): Promise<{ user: IUserResponse; token: string }> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new EmailAlreadyInUseError(userData.email);
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: passwordHash,
      name: userData.name,
      username: userData.username,
      cutoffDay: userData.cutoffDay,
      currency: userData.currency,
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      currency: true,
      cutoffDay: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "default_secret",
    {
      expiresIn: (process.env.TOKEN_EXPIRATION || "1h") as string,
    } as SignOptions,
  );

  return { user, token };
};

export const validateUser = async (
  userData: IloginUser,
): Promise<{ user: IUserResponse; token: string }> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (!existingUser) {
    throw new InvalidCredentialsError(userData.email);
  }

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    existingUser.password,
  );

  if (!isPasswordValid) {
    throw new InvalidCredentialsError(userData.email);
  }

  const user = {
    id: existingUser.id,
    name: existingUser.name,
    userName: existingUser.username,
    email: existingUser.email,
    role: existingUser.role,
    status: existingUser.status,
    createdAt: existingUser.createdAt,
    currency: existingUser.currency,
    updatedAt: existingUser.updatedAt,
    cutoffDay: existingUser.cutoffDay,
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "default_secret",
    {
      expiresIn: (process.env.TOKEN_EXPIRATION || "1h") as string,
    } as SignOptions,
  );

  return { user, token };
};
