export type T_user = {
  isLogin: boolean;
  userData: {
    id: number | null;
    firstName: string;
    logo: string;
  };
}

export type T_UserStatus = {
  email: boolean,
  password: boolean,
  loadStatus: boolean
}

export type T_userState = {
  status: T_UserStatus
  user: T_user
}

export interface IUserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  email: string;
}

export interface IUserResponse {
  firstName: string
  id: number
  userLogo: string
}