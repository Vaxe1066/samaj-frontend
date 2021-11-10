import React from "react";

const Contact = () => {

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Contact Page</h3>
      </header>
      <section>
        If you have any queries or question please contact <a href="mailto:samajuk.admn@gmail.com"> samajuk.admn@gmail.com</a>
      </section>
      <header>
        <h5>External Links</h5>
      </header>
      <div className="contact">
            <a href="https://www.youtube.com/watch?v=Xx7sxWI9FNI" target="_blank"  rel="noreferrer"><img src={"/insta.svg"} alt="insta" title="Instagram" /></a>
            <a href="https://www.youtube.com/watch?v=Xx7sxWI9FNI" target="_blank"  rel="noreferrer"><img src={"/twitter.svg"} alt="twitter" title="Twitter" /></a>
            <a href="https://www.youtube.com/watch?v=Xx7sxWI9FNI" target="_blank"  rel="noreferrer"><img src={"/facebook.svg"} alt="facebook" title="Facebook" /></a>
            <a href="https://www.youtube.com/watch?v=Xx7sxWI9FNI" target="_blank"  rel="noreferrer"><img src={"/linkedin.svg"} alt="linkedin" title="LinkedIn" /></a>
        </div>
    </div>
  );
};

export default Contact;