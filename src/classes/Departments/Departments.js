import axios from 'axios'
import '../../axiosConfig'

class Departments {

    static page_limt = 10;

    static async list(page, search_value, order) {
        let url = `departments`;
        if(page){
            url = `?offset=${page}`;     
            if(search_value){
                url = url + `&filter=${search_value}`
            }
            if(order.field && order.dir){
                url = url + `&order_field=${order.field}&order_dir=${order.dir}`
            }
        }  else {
            if(order.field && order.dir){
                url = url + `?order_field=${order.field}&order_dir=${order.dir}`
            }
        }
        return await axios.get(url)
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