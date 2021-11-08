import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Home = () => {

  return (
    <div className="container">
      <header className="jumbotron">

        This is Home Page
      </header>
    </div>
  );
};

export default Home;