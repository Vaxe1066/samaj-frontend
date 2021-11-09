import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useParams } from "react-router-dom";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

//import SearchBar from "./SearchBar"

const Directory = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [curDirectory, setCurDirectory] = useState(undefined);
    const [curName, setCurName] = useState("");

    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    }, []);

    const onSearchChange = (e) => {
        const search = e.target.value;
        setSearch(search);
    }


    const handleSearch = (e) => {
        e.preventDefault();
        setCurDirectory("");
        setCurName("");

    
        setMessage("");
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
            UserService.getUserSearch(search).then(
            (response) => {
              if(response.data){
                setSearchData(response.data);
                setLoading(false);
                setMessage("");
              }else{
                setLoading(false);
                setMessage("No Results Found")}
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
        } else {
          setLoading(false);
        }
      };

      const onDirectorySelect = (e) =>{
        const idSel = e.target.id;
        setCurName(e.target.value);
        UserService.getUserDirectory(idSel).then(
            (response) => {
              if (response.data.length>0){
                setCurDirectory(response.data);
              } else {setCurDirectory(undefined)}
            
            },
            (error) => {
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
        
                  setCurDirectory(_content);
              }  
        );
    

      }

  return (
    <div className="col-md-12">
    <div className="test-container">
        {currentUser ? (currentUser.role!=="NONE" ? 
            <Form onSubmit={handleSearch} ref={form}>
                <div className="form-group search-btn">
                <label htmlFor="search"></label>
                <Input
                    type="text"
                    placeholder="Search by name"
                    className="form-control"
                    name="search"
                    value={search}
                    onChange={onSearchChange}
                />
                </div>
    
                <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Search</span>
                </button>
                </div>
    
                {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {message}
                    </div>
                </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            : <p className="alert alert-danger">You need to be a verified member</p>) 
        :<p className="alert alert-danger">You need to be logged in</p> }
    </div>

        <div className="col">
                {searchData ? (searchData.length>0 ? 
                    searchData.map((item) => {
                        return(
                            <div className="" key={item._id}>
                                <br/>
                                <button type="submit" id={item._id} onClick={onDirectorySelect} value={item.lastName+", "+item.firstName} >{item.lastName+", "+item.firstName}</button>
                            </div> 
                            )
                    })
                    :"")
                    :""}
        </div>


        <div class="row align-items-end">
                {curDirectory ? 
                    <div class="col">
                        <p>Selected: {curName}</p>
                        <p>House No: {curDirectory[0].houseNo}</p> 
                        <p>Address Line 1: {curDirectory[0].adLine1}</p>
                        <p>Address Line 2: {curDirectory[0].adLine2}</p>
                    </div>
                    : ""}
        </div>

</div>
  );
};

export default Directory;