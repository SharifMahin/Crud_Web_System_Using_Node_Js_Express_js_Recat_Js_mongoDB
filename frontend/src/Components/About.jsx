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
          <p1>
            This is a simple Crud API, where user can register their
            information, update the information, and can delete the user
            Information.I also included a search Option in this project where
            users can search by multiple keywords such as name, email, gender,
            and Country with case insensitivity.
            <br />
            In this Project, I used JWT authorization for Login function. For
            more details{" "}
            <a
              href="https://jwt.io/introduction"
              target="_blank"
              rel="noreferrer"
            >
              Click here.
            </a>
          </p1>
          <h4 className="projectDetail">
            Check my other project below.
            <br />
            <a
              href="https://weatherapp000913.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Weather App
            </a>
            <br />
            <a href="" target="_blank" rel="noreferrer">
              Crud API
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
};
