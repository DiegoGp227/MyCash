// src/services/auth/authService.ts
import { postFetcher } from "@/utils/utils";
import { SignUpURL } from "@/shared/constants/urls";
import { IAuthResponse, ICreateUserRequest } from "../types/auth.types";

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

//   async login(email: string, password: string): Promise<IResposeAuth> {
//     const url = LoginURL.toString();
//     const response = await postFetcher<IResposeAuth>(
//       url,
//       { email, password },
//       "application/json"
//     );
//     return response;
//   },

//   async logout() {
//     // Lógica de logout si la necesitas
//   },
};
