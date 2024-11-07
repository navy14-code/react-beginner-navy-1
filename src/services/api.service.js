// import axios from "axios";
import axios from "./axios.customize";

const createUserAPI = (fullName,email,password,phone) =>{
    const url_backend = '/api/v1/user';
    const data ={
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(url_backend, data);
    
}
const updateUserAPI = () => {

}
const fetchAllUserAPI = () => {
    const url_backend = '/api/v1/user';
    return axios.get(url_backend);

}

export{
    createUserAPI,updateUserAPI,fetchAllUserAPI
}