import { UserRole, UserStatus } from '@prisma/client';

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
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}