import { configureStore } from "@reduxjs/toolkit";
import userSlise from "./user/userSlice";

const store = configureStore({
    reducer: {
        user: userSlise
    },
})

export default store

export type T_rootState = ReturnType<typeof store.getState>
export type T_appDispatch = typeof store.dispatch