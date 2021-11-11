import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import Profile from "./components/profile";
import Events from "./components/events";
import EventsNew from "./components/EventsNew";
import EventsEdit from "./components/EventsEdit";
import EventsDetail from "./components/EventsDetail";
import Directory from "./components/Directory";
import Contact from "./components/Contact";
import Verify from "./components/Verify";
//import UploadBase from "./components/UploadBase";
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
      <div className="nav-wrapper">
        <nav className="navbar">
          <Link to={"/"} className="navbar-logo">
            <img className="nav-logo" src="/prayer-samaj.svg" alt="prayer hands - bhakta samaj logo"/>
            Bhakta Samaj UK
          </Link>
          {/*<div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
    </div>*/}

          {currentUser ? (
            <div className="navbar-items">
              <li className="nav-item events">
                <Link to={"/events"} className="nav-link">
                  Events
                </Link>
              </li>
              <li className="nav-item directory">
                <Link to={"/directory"} className="nav-link">
                  Directory
                </Link>
              </li>
              <li className="nav-item contact">
                <Link to={"/contact"} className="nav-link">
                  Contact
                </Link>
              </li>
              <li className="nav-item directory">
                <Link to={"/profile/"+currentUser.id} className="nav-link">
                  {currentUser.firstname.substring(0,1)+currentUser.lastname.substring(0,1)}
                </Link>
              </li>
              <li className="nav-item logout">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
              {/*<li className="nav-item firebase">
                <a href="/uploadbase" className="nav-link" onClick={logOut}>
                  FirebaseImage
                </a>
          </li>*/}
            </div>
          ) : (
            <div className="navbar-items login">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item signup">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/events" component={Events}/>
          <Route exact path="/events/new" component={EventsNew}/>
          <Route exact path="/events/:id/edit" component={EventsEdit} />
          <Route exact path="/events/:id" component={EventsDetail} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/directory" component={Directory} />
          <Route exact path="/verify" component={Verify} />
          {/*<Route exact path="/uploadbase" component={UploadBase} />*/}
        </Switch>
      </div>
    </div>
  );
};

export default App;