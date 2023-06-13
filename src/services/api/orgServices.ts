import axios from "axios";

const host = process.env.SERVER_URL

export type T_NewOrgdata = {
    name: string
    user_id: number | null
}

export default class OrgService {
    static async createOrg ( data: T_NewOrgdata ) {
        const response = await axios.post(
            `${host}/organization`, data )
        return response
    }

    static async getOrgByUserId ( id: number ) {
        const response = await axios.get(
            `${host}/organization/user/${id}`)
        return response
    }

    static async getOrgById ( id: number ) {
        const response = await axios.get(
            `${host}/organization/${id}`)
        return response
    }

    static async newHeader ( file: File, id: number ) {
        const formData = new FormData()
        formData.append('newHeader', file)

        const response = await axios.put(
            `${host}/organization/new-header/${id}`, 
            formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            
        return response
    }
    static async newDescription ( data: any) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
        };

        const response = await axios.post(
            `${host}/organization/description`, data, { headers } )
    }
}