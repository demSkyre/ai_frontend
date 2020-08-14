import axios from "axios";

export class PacienteService {

    baseUrl = "http://localhost:8080/api/pacientes/";
    // baseUrl = "https://hg-rest-api.herokuapp.com/api/products/";

    create(paciente){
        return axios.post(this.baseUrl+"paciente/", paciente).then(res => res.data);
    }

    readAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }

    update(paciente){
        return axios.put(this.baseUrl+"paciente/"+paciente._id, paciente).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl+"paciente/"+id).then(res => res.data);
    }
}