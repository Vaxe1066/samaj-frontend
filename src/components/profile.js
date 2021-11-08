import React, { useState, useRef } from "react";

import AuthService from "../services/auth.service";

import UserDirectory from "./user-directory"

const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
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
    </div>
  );
};

export default Profile;