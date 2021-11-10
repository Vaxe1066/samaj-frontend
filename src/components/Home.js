import React, {useState, useEffect} from "react";
import axios from "axios";

const Home = () => {
/*
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/public/1636567356872-fileuploadtest.jpg").then(
      (result) => {
        setImgUrl(result)
      }
    );
  })*/

  return (
    <div className="container">
      <header className="jumbotron">

        This is Home Page
        {/*<img 
          src="http://localhost:5000/1636569308324fileuploadtest.jpg"
          alt="new"
        />*/}
      </header>
    </div>
  );
};

export default Home;