import axios from "axios";
import authHeader from "./auth-header";

const API_URL_PROFILE = "http://localhost:5000/api/profile/";
const API_URL_EVENTS = "http://localhost:5000/api/events/"

/*const getUserInfo = (id) => {
    return axios.get(API_URL_PROFILE + id);
};*/


//get user directory 
const getUserDirectory = (id) => {
    return axios.get(API_URL_PROFILE + id);
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
    })
}


//create event

const postEvent = (title, desc, venue, address, postcode, date) => {
    return axios.post(API_URL_EVENTS, {
        title,
        desc,
        venue,
        address,
        postcode,
        //image: {type: Buffer},
        date,
        //links
    })
}

// get all events 
const getEvents = () => {
    return axios.get(API_URL_EVENTS);
}

const getEventsDetail = (id) => {
    return axios.get(API_URL_EVENTS+id);
}


export default {
    //getUserInfo,
    getUserDirectory,
    postUserDirectory,
    postEvent,
    getEvents,
    getEventsDetail

  };