import axios from 'axios'
import '../../axiosConfig'

class Departments {

    static async list() {
        return await axios.get(`department`)
    }
    
    static async add(data) {
        return await axios.post(`department/`, data)
    }
    
    static async details(id) {
        return await axios.get(`department/${id}`)
    }
    
    static async update(id, data) {
        return await axios.put(`department/${id}`, data)
    }
    
    static async delete(id) {
        return await axios.delete(`department/${id}`)
    }
}

export default Departments