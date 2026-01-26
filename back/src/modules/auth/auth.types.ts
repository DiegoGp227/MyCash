import { UserRole, UserStatus } from "@prisma/client";

export interface IloginUser {
  email: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  username?: string;
  cutoffDay: number;
  currency: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  username: string | null;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  currency: string;
  cutoffDay: number;
}
