import React from "react";
import { Navbar } from "./Navbar/Navbar";
import "./about.css";

export const About = () => {
  return (
    <div>
      <Navbar />
      <h1 className="aboutTitle">About the System</h1>
      <div className="container">
        <div className="aboutDetail">
          <h6>
            This is the Simple Crud Api, where user can register their
            Information,Update the Information and also can delete the user
            Data.In this Project, I used JWT authorization for Login function.
          </h6>
          <p className="paraDetail">
            To see my other project{" "}
            <a
              href="https://weatherapp000913.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Click
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
