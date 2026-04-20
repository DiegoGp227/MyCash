import { IAuthResponse, IUserInfo } from "@/src/auth/types/auth.types";
import { Action, action } from "easy-peasy";

export interface AuthModel {
  user: IAuthResponse | null;
  isAuthenticated: boolean;
  setAuth: Action<AuthModel, IAuthResponse>;
  clearAuth: Action<AuthModel>;
  updateUserInfo: Action<AuthModel, IUserInfo>;
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

  updateUserInfo: action((state, payload) => {
    if (state.user) {
      state.user.userInfo = payload;
    }
  }),
};

export default authModel;
