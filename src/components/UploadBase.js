import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";


import FileBase64 from 'react-file-base64';

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";




const UploadBase = (props) => {

  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


    useEffect(()=>{
        console.log(file.base64);
    }, [file]);


    const onFileDone = (e) =>{
        let fileUp = e;
        setFile(fileUp);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    
        setMessage("");
        setLoading(true);
    
        if(file){
            UserService.postImage("testNameNew", file.base64).then(
                (response) => {
                  console.log(response);
                  setLoading(false);
                  //setMessage(response.data);
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
        
                  setLoading(false);
                  setMessage(resMessage);
                }
              );
        }

      };

  return (
    <div className="col-md-12">
            <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Profile Pic</label>
            <FileBase64
                multiple={ false }
                onDone={ onFileDone} />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>

    {file ? <img src={`${file.base64}`} alt="testtest"/> : ""}
    </div>


  );
};

export default UploadBase;