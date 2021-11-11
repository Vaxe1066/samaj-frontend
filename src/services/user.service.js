import axios from "axios";
import authHeader from "./auth-header";

const API_URL_PROFILE = "http://localhost:5000/api/profile/";
const API_URL_EVENTS = "http://localhost:5000/api/events/";
const API_URL_USER = "http://localhost:5000/api/user/";

/*const getUserInfo = (id) => {
    return axios.get(API_URL_PROFILE + id);
};*/


//get user directory 
const getUserDirectory = (id) => {
    return axios.get(API_URL_PROFILE + id, { headers: authHeader() });
}

const getUserSearch = (search) => {
    return axios.get(API_URL_PROFILE+"search/"+search
    //, { headers: authHeader() }
    );
}


//let user create new directory
const postUserDirectory = (id, houseNo, adLine1, adLine2, postcode, city, country, mobile, landline) => {
    return axios.post(API_URL_PROFILE+id, {
        houseNo,
        adLine1,
        adLine2,
        postcode,
        city,
        country,
        mobile,
        landline
    }, { headers: authHeader() })
}

//let user update their directory
const putUserDirectory = (id, houseNo, adLine1, adLine2, postcode, city, country, mobile, landline) => {
    return axios.put(API_URL_PROFILE+id, {
        houseNo,
        adLine1,
        adLine2,
        postcode,
        city,
        country,
        mobile,
        landline
    }, { headers: authHeader() })
}

//create event

const postEvent = (title, desc, venue, address, postcode, date, links) => {
    return axios.post(API_URL_EVENTS, {
        title,
        desc,
        venue,
        address,
        postcode,
        //image: {type: Buffer},
        date,
        links
    })
}

// get all events 
const getEvents = () => {
    return axios.get(API_URL_EVENTS);
}

const getEventsDetail = (id) => {
    return axios.get(API_URL_EVENTS+id);
}

//update event 

const postEventEdit = (id, title, desc, venue, address, postcode, date, links) => {
    return axios.post(API_URL_EVENTS+id, {
        title,
        desc,
        venue,
        address,
        postcode,
        //image: {type: Buffer},
        date,
        links
    }, { headers: authHeader() });
}

//delete event 
const deleteEvent = (id) => {
    return axios.delete(API_URL_EVENTS+id);
}


//user images 

const postImage = (imageName, imageData) => {
    return axios.post("http://localhost:5000/api/uploadbase", {
        imageName,
        imageData

    })
}

const updateImage = (id, imageData) => {
    return axios.put(API_URL_USER,{
        id,
        imageData
    }, { headers: authHeader() })
}

// get user image 

const getUserImage = (id) => {
    return axios.get(API_URL_USER+"image/"+id)
}

//get all users
const getAllUsers = () => {
    return axios.get(API_URL_USER)
}



export default {
    //getUserInfo,
    getUserDirectory,
    getUserSearch,
    postUserDirectory,
    putUserDirectory,
    postEvent,
    getEvents,
    getEventsDetail,
    postEventEdit,
    deleteEvent,
    postImage,
    updateImage,
    getUserImage,
    getAllUsers

  };