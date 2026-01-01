import { IAuthResponse } from "@/src/auth/types/auth.types";
import { Action, action } from "easy-peasy";

export interface AuthModel {
  user: IAuthResponse | null;
  isAuthenticated: boolean;
  setAuth: Action<AuthModel, IAuthResponse>;
  clearAuth: Action<AuthModel>;
}

const authModel: AuthModel = {
  user: null,
  isAuthenticated: false,

  setAuth: action((state, payload) => {
    state.user = payload;
    state.isAuthenticated = true;
  }),

  clearAuth: action((state) => {
    state.user = null;
    state.isAuthenticated = false;
  }),
};

export default authModel;
