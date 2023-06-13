export type T_user = {
  isLogin: boolean
  userData: {
    id: number | null
    firstName: string
    logo: string
    role: string
    userOrgId: number | null
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
  first_name: string
  id: number
  user_logo: string
  role: string
}