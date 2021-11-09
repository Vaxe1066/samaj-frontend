import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Events = (props) => {
    const [user, setUser] = useState(undefined);
    const [allEvents, setAllEvents] = useState([]);
  
    let { id } = useParams();
  
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if(currentUser){
            setUser(currentUser)
        }
  
  
    }, []);

    useEffect(() => {
        UserService.getEvents().then(
            (response) => {
                setAllEvents(response.data)
            },
            (error) => {
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
        
                  setAllEvents(_content);
              }
        );
  
    }, []);

    const onAddEvent = () => {
        props.history.push("/events/new");
        window.location.reload();
    }


  return (
    <div className="container">
      <header className="jumbotron">

        {user ? (user.role==="ADMIN" ?
        <div>
            <input className="add-event-btn" 
            type="image" 
            alt="icon to add new event" 
            src="/plusIcon.svg" 
            title="Add a new event"
            onClick={onAddEvent}>
            </input>
            <p>{user.role}</p>
        </div>
        : "") : ""}

        {user && user.role!=="NONE" && allEvents.length>0 ?
           allEvents.map((item)=> {
               return (
                <div className="card" key={item._id}>
                    <a href={"events/"+item._id}>{item.title}</a>
                </div> )
            })    
            : ((user && user.role!=="NONE" && allEvents.length===0) ? 
                <p className="alert alert-success">There are no upcoming events to display!</p> :
            <p className="alert alert-danger">Events can only be viewed by verified members</p> )
        }
      </header>
    </div>
  );
};

export default Events;