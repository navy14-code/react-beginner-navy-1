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
const updateAvatarUserAPI = (avatar, _id, fullName, phone) => {
    const url_backend = '/api/v1/user';
    const data = {
        avatar: avatar,
        _id: _id,
        fullName: fullName,
        phone: phone

    }
    return axios.put(url_backend, data);
}
const fetchAllUserAPI = (current, pageSize) => {
    const url_backend = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(url_backend);
}
const handleUploadFile = (file, folder) => {
    const url_backend = '/api/v1/file/upload';
    let config = {
        headers: {
            'upload-type': folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', file)
    return axios.post(url_backend, bodyFormData, config);

}
const registerUserAPI = (fullName, email, password, phone) => {
    const url_backend = '/api/v1/user/register';
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(url_backend, data);
}
const loginAPI = (email, password) => {
    const url_backend = 'api/v1/auth/login';
    const data = {
        username: email,
        password: password,
        delay: 1
    }
    return axios.post(url_backend, data);
}
const getAccountAPI = () => {
    const url_backend = 'api/v1/auth/account';
    return axios.get(url_backend);
}
const logoutAPI = () => {
    const url_backend = 'api/v1/auth/logout';
    return axios.post(url_backend);
}
const fetchAllBookAPI = (current, pageSize) => {
    const url_backend = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(url_backend);
}
const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const url_backend = '/api/v1/book';
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(url_backend, data);

}
// const updateBookAPI = (id, Thumbnail, mainText, author, price, quantity, category) => {
//     const url_backend = '/api/v1/book';
//     const data = {
//         id: id,
//         Thumbnail: Thumbnail,
//         mainText: mainText,
//         author: author,
//         price: price,
//         quantity: quantity,
//         category: category

//     }
//     return axios.post(url_backend, data);
// }


export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI,
    handleUploadFile, updateAvatarUserAPI, registerUserAPI,
    loginAPI, getAccountAPI, logoutAPI,
    fetchAllBookAPI, createBookAPI
}