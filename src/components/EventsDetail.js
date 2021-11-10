import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";


import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const EventsDetail= (props) => {

  let { id } = useParams();
  const history = useHistory();

  const [curEvent, setCurEvent] = useState(undefined);
  const [curUser, setCurUser] = useState(undefined);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false)

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


useEffect( () => {
  const user = AuthService.getCurrentUser()
  setCurUser(user);
}, []);




const onEdit = (id) => {
  //console.log(id)
    history.push(`/events/${curEvent._id}/edit`);
    window.location.reload();
}

const onDelete = () => {
  let prmpt = window.confirm("Are you sure you want to delete the event? This will be a permenant change!")
  if(prmpt){
    UserService.deleteEvent(curEvent._id).then(
      (response) => {
        setMessage(response.data.message +" -You will be redirected in 3 seconds");
        setSuccessful(true);
        setTimeout(function () {
          props.history.push("/events");
          window.location.reload();
        }, 3000);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  }
}


  return (
    <div className="col-md-12">
        {curEvent ?
          <div className="card card-container">
            <h3>{curEvent.title.toUpperCase()}</h3>
            <strong>Description:</strong> {curEvent.desc}
            <strong>Date:</strong> {curEvent.date}
            <strong>Location:</strong> 
            {curEvent.venue}<br/>
            {curEvent.address}<br/>
            {curEvent.postcode}<br/><br/>
            {curEvent.links ? Object.keys(curEvent.links).map( (key)=>{
              return(
                <p key={key}>Link: {curEvent.links[key]}</p>
              )
            }): ""}
            <br/>
          {curUser ? (curUser.role==="ADMIN" ?
          <div className="form-group event-edit">
            <input type="button" className="btn btn-primary btn-block" value="Edit" onClick={onEdit}/>
            <input type="button" className="btn btn-danger btn-block" value="Delete" onClick={onDelete}/>
          </div> : "" ) : ""
          }
        </div> : ""
        }

        {message && (
          <div className="form-group">
            <div
              className={ successful ? "alert alert-success" : "alert alert-danger" }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}

    </div>
  );
};

export default EventsDetail;