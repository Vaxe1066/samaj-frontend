import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const UserDirectory = (props) => {
  const currentUser = AuthService.getCurrentUser();
  const form = useRef();
  const checkBtn = useRef();

  const [houseNo, setHouseNo] = useState("");
  const [adLine1, setAdLine1] = useState("");
  const [adLine2, setAdLine2] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [editActive, setEditActive] = useState(false);

  const [curUserDirectory, setCurUserDirectory] = useState("");

  let { id } = useParams();

  useEffect(() => {
    UserService.getUserDirectory(id).then(
        (response) => {
          if (response.data.length>0){
            setCurUserDirectory(response.data);
            setHouseNo(response.data[0].houseNo);
            setAdLine1(response.data[0].adLine1);
            setAdLine2(response.data[0].adLine2);
            setPostcode(response.data[0].postcode);
            setCity(response.data[0].city);
            setCountry(response.data[0].country);
            setMobile(response.data[0].mobile);
            setLandline(response.data[0].landline);
          }

        
        },
        (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
    
              setCurUserDirectory(_content);
          }  
    );


  }, [id, successful]);

  const onEdit = () => {
    setEditActive(!editActive);
  }

  const onChangeHouseNo = (e) => {
      const houseNumber = e.target.value;
      setHouseNo(houseNumber)
  };

  const onChangeAdLine1 = (e) => {
    const address1 = e.target.value;
    setAdLine1(address1)
}

const onChangeAdLine2 = (e) => {
  const address2 = e.target.value;
  setAdLine2(address2)
}

  const onChangePostcode = (e) => {
    const pc = e.target.value;
    setPostcode(pc);
  }; 

  const onChangeCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const onChangeCountry = (e) => {
    const country = e.target.value;
    setCountry(country);
  };

  const onChangeMobile = (e) => {
    const mob = e.target.value;
    setMobile(mob);
  };

  const onChangeLandline = (e) => {
    const land = e.target.value;
    setLandline(land);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.postUserDirectory(id, houseNo, adLine1, adLine2, postcode, city, country, mobile, landline).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
         //props.history.push("/");
          window.location.reload();
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
    <div className="container">
      {currentUser.role==="NONE" ? 
        <p className="alert alert-danger">You need to be a member to access the directory</p>
      :
        <div className="col-md-4">
        <div className="card card-container">

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="houseNo">Flat/House No.</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="houseNo"
                    value={houseNo}
                    onChange={onChangeHouseNo}
                    disabled ={!editActive ? "disabled" : "" }
                  />
                </div>
                <div className="form-group">
                    <label htmlFor="adLine1">Address Line 1</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="adLine1"
                    value={adLine1}
                    onChange={onChangeAdLine1}
                    disabled ={!editActive ? "disabled" : "" }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="adLine2">Address Line 2</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="adLine2"
                    value={adLine2}
                    onChange={onChangeAdLine2}
                    disabled ={!editActive ? "disabled" : "" }
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
                    disabled ={!editActive ? "disabled" : "" }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={onChangeCity}
                    disabled ={!editActive ? "disabled" : "" }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="country"
                    value={country}
                    onChange={onChangeCountry}
                    disabled ={!editActive ? "disabled" : "" }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={mobile}
                    onChange={onChangeMobile}
                    disabled ={!editActive ? "disabled" : "" }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="landline">Landline</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="landline"
                    value={landline}
                    onChange={onChangeLandline}
                    disabled = {!editActive ? "disabled" : "" }
                  />
                </div>

                
                    {editActive ? 
                    (<div className="form-group">
                        <button className="btn btn-primary btn-block" >Submit</button>
                        <input type="button" className="btn btn-primary btn-block" value="Cancel" onClick={onEdit}/>
                    </div>)
                    
                     :
                    (<div className="form-group">
                        <input type="button" className="btn btn-primary btn-block" value="Edit" onClick={onEdit}/>
                    </div>)
                    }

              </div>
            )}

            {/*message && (
              <div className="form-group">
                <div
                  className={ successful ? "alert alert-success" : "alert alert-danger" }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )*/}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>}
    </div>
  );
};

export default UserDirectory;