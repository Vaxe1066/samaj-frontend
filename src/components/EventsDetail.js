import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const EventsNew = (props) => {

  let { id } = useParams();
  const [curEvent, setCurEvent] = useState(undefined);;

  useEffect(() => {
    UserService.getEventsDetail(id).then(
        (response) => {
          setCurEvent(response.data)
        },
        (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
    
              setCurEvent(_content);
          }
    );

}, []);


  return (
    <div className="col-md-12">
        {curEvent ?
          <div className="card">
            <h3>{curEvent.title.toUpperCase()}</h3>
            <strong>Description:</strong> {curEvent.desc}
            <strong>Date:</strong> {curEvent.date}
            <strong>Location:</strong> 
            {curEvent.venue}<br/>
            {curEvent.address}<br/>
            {curEvent.postcode}<br/>
            
          </div> : ""
        }
    </div>
  );
};

export default EventsNew;