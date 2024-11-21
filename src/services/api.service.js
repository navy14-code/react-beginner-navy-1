// import axios from "axios";
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const url_backend = '/api/v1/user';
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(url_backend, data);

}
const deleteUserAPI = (id) => {
    const url_backend = `/api/v1/user/${id}`;
    return axios.delete(url_backend);

}
const updateUserAPI = (_id, fullName, phone) => {
    const url_backend = '/api/v1/user';
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(url_backend, data);
}
const fetchAllUserAPI = () => {
    const url_backend = '/api/v1/user';
    return axios.get(url_backend);

}

export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI
}