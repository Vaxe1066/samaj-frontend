import React, {useState, useRef, useEffect} from "react";
import Form from "react-validation/build/form";
import FileBase64 from 'react-file-base64';
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import UserDirectory from "./user-directory";
import ImageUploader from "./ImageUploader";

const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();

  const [file, setFile] = useState("");
  const [curUserId, setCurUserId] = useState(undefined);
  const [curUser, setCurUser] = useState(undefined);
  const [curUserImage, setCurUserImage] = useState(undefined);
  const [editImageActive, setEditImageActive] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);


  useEffect(()=>{
    const currentUser = AuthService.getCurrentUser();
    setCurUser(currentUser)
  }, [])


  useEffect(()=>{
    let user = AuthService.getCurrentUser();
    //setCurUserId(user.id);
    console.log(user.id)
      UserService.getUserImage(user.id).then(
        //AuthService.register(formData).then(
          (response) => {
            setCurUserImage(response.data.profileImg)
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage+"hello");
            setSuccessful(false);
          }
        )

  },[editImageActive])


  const onEditImage  =  () => {
    setEditImageActive(!editImageActive)
  };



  return (
    <div className="container">
      <header className="jumbotron">
        <div className="edit-pic-container">
      {curUser ?   curUserImage ?    
          <img className="profile-pic"
            src={curUserImage}
            alt="profile user pic"
          />
        :        
         <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-pic"
        />: ""}
          <input
            type="image"
            src="/editicon.svg"
            alt="edit profile pic"
            className="edit-profile-pic"
            onClick={onEditImage}
          />

        </div>
        {editImageActive ? <ImageUploader onUpload={onEditImage} editImageActive={editImageActive}/>
          : ""}
        <h3>
          <br/>
          <strong>{currentUser.lastname+", "+ currentUser.firstname}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Role:</strong> {currentUser.role}
      <h3>
        <strong>Directory:</strong> 
      </h3>
      {currentUser.role==="NONE" ? 
        <p className="alert alert-danger">You need to be a member to access the directory</p>
      :
      <UserDirectory />}
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

export default Profile;