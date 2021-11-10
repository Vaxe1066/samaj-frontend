import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";
/*
const register = (firstname, lastname, email, password, profileImg) => {
    return axios.post(API_URL + "signup", {
        firstname,
        lastname,
        email,
        password,
        profileImg
    });
};
*/

const register = (formData) => {
    return axios.post(API_URL + "signup", formData);
};

const login = (email, password) => {
    return axios.post(API_URL+"signin", {
        email,
        password,
    })
    .then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    });
};


const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default{
    register,
    login,
    logout,
    getCurrentUser,
};
