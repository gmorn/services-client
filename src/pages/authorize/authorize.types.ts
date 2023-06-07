export interface IFormField {
    value: string;
    isValid: boolean | null;
}

export interface IUser {
    firstName: IFormField;
    lastName: IFormField;
    password: IFormField;
    passwordRepeat: IFormField;
    phoneNumber: IFormField;
    email: IFormField;
}

export interface IUserLogin {
    password: string;
    email: string;
}