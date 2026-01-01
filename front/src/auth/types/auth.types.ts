export interface ICredentials {
  email: string;
  password: string;
}

export interface IUserInfo {
  userId: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string; 
}

export interface IAuthResponse {
  message: string;
  token: string;
  userInfo: IUserInfo;
}
