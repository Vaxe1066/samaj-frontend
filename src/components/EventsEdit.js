import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";


Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

const EventsEdit = (props) => {

  const form = useRef();
  const checkBtn = useRef();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [date, setDate] = useState("");
  const [curEvent, setCurEvent] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [eventObj, setEventObj] = useState({});
  const [countLinks, setCountLinks] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    if(id){
      UserService.getEventsDetail(id).then(
        (response) => {
          //if (response.data.length>0){
            setCurEvent(response.data)
            setTitle(response.data.title);
            setDesc(response.data.desc);
            setVenue(response.data.venue);
            setPostcode(response.data.postcode);
            setDate(response.data.date);
            setAddress(response.data.address);
            setEventObj(response.data.links);

          //}
        },
        (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
    
              setCurEvent(_content);
          }  
    );
    }



  }, [id, successful]);
  

  useEffect(()=>{
    setCountLinks(Array(Object.size(eventObj)).fill().map((e,i)=>i+1))
    console.log(eventObj);
    console.log(countLinks)
  }, [eventObj])



  const onChangeTitle = (e) => {
      const title = e.target.value;
      setTitle(title)
  };

  const onChangeDesc = (e) => {
    const description = e.target.value;
    setDesc(description)
}

  const onChangeVenue = (e) => {
    const venue = e.target.value;
    setVenue(venue);
  }; 

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangePostcode = (e) => {
    const postcode = e.target.value;
    setPostcode(postcode);
  };

  const onChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  const onAddLink = (e) => {
    e.preventDefault();
    const count = countLinks.length;
    let newLst = [...countLinks, count+1];
    setCountLinks(newLst);
  }
  

  useEffect(()=>{
    if(countLinks>1){
      let newEventObj = eventObj
      newEventObj[countLinks.length] = ""
      setEventObj(newEventObj)
      
    }
    console.log(eventObj);
  },[countLinks])

  const onLinkChange = (e) => {
    let linkId = e.target.id;
    let value = e.target.value;
    let curEventObj = eventObj;
    curEventObj[linkId] = value;
    setEventObj(curEventObj);

  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
    UserService.postEventEdit(id, title, desc, venue, address, postcode, date, eventObj).then(
        (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
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
        console.log("id")
        }
    );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <Textarea
                    type="text"
                    className="form-control"
                    name="desc"
                    value={desc}
                    onChange={onChangeDesc}
                    />
              </div>
              <div className="form-group">
                <label htmlFor="venue">Venue</label>
                <Input
                  type="text"
                  className="form-control"
                  name="venue"
                  value={venue}
                  onChange={onChangeVenue}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postcode">Postcode</label>
                <Input
                  type="text"
                  className="form-control"
                  name="postcode"
                  value={postcode}
                  onChange={onChangePostcode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="data">Event Date</label>
                <Input
                  type="date"
                  className="form-control"
                  name="date"
                  value={date}
                  onChange={onChangeDate}
                />
              </div><br/>
              <div className="form-group">
                <label htmlFor="addLinks">
                  <input
                    type="image" 
                    src="/plusIcon.svg" 
                    alt="click here to add links to event" 
                    value="Add Links" 
                    className="add-links"
                    onClick={onAddLink} >
                    </input>
                  Add Links</label>
              </div> <br/>
              {countLinks ? countLinks.map( (item) => {
                  return (
                  <div className="form-group" key={item}>
                      <label htmlFor="link" >Link {item}</label>
                      <Input
                        id={item}
                        type="text"
                        className="form-control"
                        name="link"
                        value={eventObj[item] || ""}
                        onChange={onLinkChange} />
                    </div>
                  )
              }): ""}
              <br/>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Save</button>
              </div>
            </div>
          )}

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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default EventsEdit;