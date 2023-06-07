import axios from "axios";
import { IUserData } from "@/store/user/userSlice.types";
import { IUserLogin } from "@/pages/authorize/authorize.types";

const host = process.env.SERVER_URL

export default  class UserService {
    static async regUser ( user: IUserData ) {
        const response = await axios.post(
            `${host}/user/registration`, user)
        return response
    }

    static async loginUser ( user: IUserLogin ) {
        const response = await axios.post(
            `${host}/user/login`, user)


        return response

    }
}