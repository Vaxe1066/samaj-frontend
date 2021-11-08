import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const EventsNew = (props) => {

  const form = useRef();
  const checkBtn = useRef();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [date, setDate] = useState(undefined);
  const [links, setLinks] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

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

  

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.postEvent( title, desc, venue, address, postcode, date).then(
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

export default EventsNew;