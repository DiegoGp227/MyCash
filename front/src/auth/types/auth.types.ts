export interface ICredentials {
  email: string;
  password: string;
}

export interface ICreateUserRequest {
  email: string;
  password: string;
  username: string;
  cutoffDay: number;
  currency: string;
  name: string;
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
