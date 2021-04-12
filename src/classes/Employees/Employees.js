import axios from 'axios'
import '../../axiosConfig'

class Employees {

    static page_limt = 10;
    
    static async list(page, search_value, order) {
        return await axios.get(
            `employees?offset=${page ? page : "" }&filter=${search_value ? search_value : "" }&order_field=${order.field ? order.field : "" }&order_dir=${order.dir ? order.dir : "" }`
        )
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