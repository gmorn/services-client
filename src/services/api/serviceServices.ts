import axios from "axios";

const host = process.env.SERVER_URL

class ServiceService {
    static async createService ( id: number ) {
        const data = {
            id
        }
        const response = await axios.post(
            `${host}/service`, data )
        return response
        
    }

    static async getServicesByOrgId ( id: number ) {
        const response = await axios.get (
            `${host}/service/org/${id}`)
        return response
    }

    static async getServiceById ( id: number ) {
        const response = await axios.get (
            `${host}/service/${id}`)
        return response
    }

    static async newHeader ( file: File, id: number ) {
        const formData = new FormData()
        formData.append('newHeader', file)

        const response = await axios.put(
            `${host}/service/new-header/${id}`, 
            formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            
        return response
    }

    static async newDescription ( data: any ) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
        };

        const response = await axios.post(
            `${host}/service/description`, data, { headers } )
    }

    static async deleteService ( id: number ) {
        await axios.delete(
            `${host}/service/${id}`
        )
    }

    static async newCartLogo ( file: File, id: number ) {
        const formData = new FormData()
        formData.append('newHeader', file)

        const response = await axios.put(
            `${host}/service/new-cart-logo/${id}`, 
            formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            
        return response
    }
}

export default ServiceService;