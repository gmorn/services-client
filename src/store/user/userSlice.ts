import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserData, IUserResponse, T_userState } from "./userSlice.types";
import UserService from "@/services/api/userServices";
import { IUserLogin } from "@/pages/authorize/authorize.types";

const initialState: T_userState = {
    status: {
        email: false,
        password: false,
        loadStatus: false
    },
    user: {
        isLogin: false,
        userData: {
            id: null,
            firstName: '',
            logo: '',
        }
    }
}

export const fetchUserLogin = createAsyncThunk(
    'user/fetchUserLogin',
    async (user: IUserLogin, { dispatch }) => {
        try {
            const response = await UserService.loginUser(user)
            dispatch(login(response.data))
        } catch (error) {
            const statusCode = error.response.status
            if (statusCode === 400) {
                dispatch(EmailStatus())
            } else if (statusCode === 404) {
                dispatch(PasswordStatus())
            } else {
                console.error(error);
            }
        }
    }
)

export const fetchUserReg = createAsyncThunk(
    'user/fetchUserReg',
    async (user: IUserData, { dispatch }) => {
        try {
            const { data } = await UserService.regUser(user)
            dispatch(login(data))
            return true
        } catch (error) {
            dispatch(EmailStatus())
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUserResponse>){
            const userLocal: string = JSON.stringify(action.payload)
            localStorage.setItem('user', userLocal)

            state.user.isLogin = true
            state.user.userData.firstName = action.payload.firstName
            state.user.userData.logo = action.payload.userLogo
            state.user.userData.id = action.payload.id

        },
        reloadUser(state){

        },
        resetEmailStatus(state){
            state.status.email = false
        },
        resetPasswordStatus(state){
            state.status.password = false
        },
        EmailStatus(state){
            
            state.status.email = true
        },
        PasswordStatus(state){
            state.status.password = true
        },
        out(state){
            localStorage.clear()
            state.user.isLogin = false
            state.user.userData.id = null
            state.user.userData.firstName= ''
            state.user.userData.logo= ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserLogin.pending, (state) => {
          state.status.loadStatus = true;
        //   state.error = null;
        });
        builder.addCase(fetchUserLogin.fulfilled, (state) => {

            // state.status.email = false
            state.status.loadStatus = false;
        });
        builder.addCase(fetchUserLogin.rejected, (state, action) => {
            state.status.email = true
            state.status.loadStatus = false;
         
            
        
        });
        builder.addCase(fetchUserReg.pending, (state) => {
            state.status.loadStatus = true;
          //   state.error = null;
        });
      },
})


export const { login, resetEmailStatus, PasswordStatus, EmailStatus, resetPasswordStatus, reloadUser, out } = userSlice.actions

export default userSlice.reducer