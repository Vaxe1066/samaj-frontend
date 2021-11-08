import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import Profile from "./components/profile";
import Events from "./components/events";
import EventsNew from "./components/EventsNew";
import EventsDetail from "./components/EventsDetail";
//import Posts from "./components/Posts";
//import CreateBlog from "./components/Createblog";




const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Bhakta Samaj UK
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/events"} className="nav-link">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile/"+currentUser.id} className="nav-link">
                {currentUser.firstname.substring(0,1)+currentUser.lastname.substring(0,1)}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/events" component={Events}/>
          <Route exact path="/events/new" component={EventsNew}/>
          <Route exact path="/events/:id" component={EventsDetail} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/:id" component={Profile} />

        </Switch>
      </div>
    </div>
  );
};

export default App;