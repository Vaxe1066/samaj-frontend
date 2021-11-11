import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import FileBase64 from 'react-file-base64';

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { useEffect } from "react/cjs/react.development";





const ImageUploader = ({onUpload}) => {
  const form = useRef();
  const checkBtn = useRef();

  const [file, setFile] = useState("");
  const [curUserId, setCurUserId] = useState(undefined);
  const [curUser, setCurUser] = useState(undefined)
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");




  useEffect(()=>{
    const currentUser = AuthService.getCurrentUser();
    setCurUser(currentUser)
    let user = AuthService.getCurrentUser();
    setCurUserId(user.id);
  }, [])





  const onFileDone = (e) =>{
    let fileUp = e;
    setFile(fileUp);
}

  const handleEditProfile = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    //console.log(fileState);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
     UserService.updateImage(curUserId, file.base64).then(
      //AuthService.register(formData).then(
        (response) => {
          setMessage("Successfully Updated Profile Picture");
          setSuccessful(true);
          setTimeout(function () {
            onUpload();
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
  };

  return (

        <Form onSubmit={handleEditProfile} ref={form} >
              <div className="form-group">
                <label htmlFor="profile">Profile Pic</label>
                <FileBase64
                    type="image"
                    multiple={ false }
                    onDone={onFileDone} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Upload</button>
              </div>
        
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

  );
};

export default ImageUploader;