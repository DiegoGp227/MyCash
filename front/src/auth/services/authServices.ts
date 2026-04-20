// src/services/auth/authService.ts
import { patchFetcher, postFetcher } from "@/utils/utils";
import { LoginURL, SignUpURL, UsersURL } from "@/shared/constants/urls";
import {
  IAuthResponse,
  ICreateUserRequest,
  ICredentials,
  IUpdateUserRequest,
  IUserInfo,
} from "../types/auth.types";

export const authService = {
  async signUp(credentials: ICreateUserRequest): Promise<IAuthResponse> {
    const url = SignUpURL.toString();
    const response = await postFetcher<IAuthResponse>(
      url,
      {
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
        cutoffDay: credentials.cutoffDay,
        currency: credentials.currency,
        name: credentials.name,
      },
      "application/json"
    );
    return response;
  },

  async login(credentials: ICredentials): Promise<IAuthResponse> {
    const url = LoginURL.toString();
    const response = await postFetcher<IAuthResponse>(
      url,
      { email: credentials.email, password: credentials.password },
      "application/json"
    );
    return response;
  },

  async updateUser(data: IUpdateUserRequest): Promise<{ message: string; userInfo: IUserInfo }> {
    return patchFetcher<{ message: string; userInfo: IUserInfo }>(
      UsersURL.toString(),
      data,
    );
  },
};
