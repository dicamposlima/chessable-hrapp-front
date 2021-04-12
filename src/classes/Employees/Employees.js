import axios from 'axios'
import '../../axiosConfig'

class Employees {

    static page_limt = 10;
    
    static async list(page, search_value, order) {
        let url = `employees?offset=${page ? page : "" }&filter=${search_value ? search_value : "" }`;
        if(order){
            url = `${url}&order_field=${order.field != null ? order.field : ""}&order_dir=${order.dir != null ? order.dir : ""}`;
        }
        return await axios.get(url)
    }
    
    static async add(data) {
        return await axios.post(`employees/add`, data)
    }
    
    static async details(id) {
        return await axios.get(`employees/details/${id}`)
    }
    
    static async update(id, data) {
        return await axios.put(`employees/edit/${id}`, data)
    }
    
    static async delete(id) {
        return await axios.delete(`employees/remove/${id}`)
    }
}

export default Employees