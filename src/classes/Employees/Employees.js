import axios from 'axios'
import '../../axiosConfig'

class Employees {

    static async list() {
        return await axios.get(`employee`)
    }
    
    static async add(data) {
        return await axios.post(`employee/`, data)
    }
    
    static async details(id) {
        return await axios.get(`employee/${id}`)
    }
    
    static async update(id, data) {
        return await axios.put(`employee/${id}`, data)
    }
    
    static async delete(id) {
        return await axios.delete(`employee/${id}`)
    }
}

export default Employees