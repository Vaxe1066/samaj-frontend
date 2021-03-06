import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import FileBase64 from 'react-file-base64';

import AuthService from "../services/auth.service";
import { useEffect } from "react/cjs/react.development";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


/*
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};*/
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};





const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(undefined);
  //const [fileState, setFileState] = useState({profileImg: ''});
  const [file, setFile] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeFirstname = (e) => {
      const firstname = e.target.value;
      setFirstname(firstname)
  };

  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname)
}

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  }; 

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordConf = (e) => {
    const password = e.target.value;
    setPasswordConf(password);
  };

  const checkPasswordMatch = () => {
    if(passwordConf!==password){
      setPasswordMatch(false);
    }else{
      setPasswordMatch(true);
    }
  }

  const onFileDone = (e) =>{
    let fileUp = e;
    setFile(fileUp);
}

  useEffect(()=>{
    checkPasswordMatch();
  }, [passwordConf])



/*  const onFileChange = (e) => {
    setFileState({ profileImg: e.target.files[0] })
}*/




  const handleRegister = (e) => {
    e.preventDefault();

    /*const formData = new FormData();
    formData.append('profileImg', fileState.profileImg)
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);

    console.log(formData);*/
    setMessage("");
    setSuccessful(false);
    //console.log(fileState);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
     AuthService.register( firstname, lastname, email.toLowerCase(), password, file.base64).then(
      //AuthService.register(formData).then(
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
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form} id='myForm'>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeFirstname}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={lastname}
                    onChange={onChangeLastname}
                    validations={[required]}
                    />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordconf">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="passwordconf"
                  value={passwordConf}
                  onChange={onChangePasswordConf}
                  validations={[required, vpassword]}
                />
                {!passwordMatch && password.length>0 ? (
                        <div className="alert alert-danger" role="alert">
                        The password's do no match!
                      </div>
                ) : ""
              }
              </div>
              <br/>
              <div className="form-group">
            <label htmlFor="profile">Profile Pic</label>
              <FileBase64
                  multiple={ false }
                  onDone={onFileDone} />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
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

export default Register;