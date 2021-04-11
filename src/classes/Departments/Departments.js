import axios from 'axios'
import '../../axiosConfig'

class Departments {

    static async list() {
        return await axios.get(`departments`)
    }

    static async listHighestSalary() {
        return await axios.get(`departments/highestSalary`)
    }

    static async listWithFilter(data) {
        return await axios.post(`departments/withFilter`, data)
    }
    
    static async add(data) {
        return await axios.post(`departments/add`, data)
    }
    
    static async details(id) {
        return await axios.get(`departments/details/${id}`)
    }
    
    static async update(id, data) {
        return await axios.put(`departments/edit/${id}`, data)
    }
    
    static async delete(id) {
        return await axios.delete(`departments/remove/${id}`)
    }
}

export default Departments