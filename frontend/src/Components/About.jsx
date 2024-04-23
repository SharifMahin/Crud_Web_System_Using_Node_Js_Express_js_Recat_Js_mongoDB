import React from "react";
import { Navbar } from "./Navbar/Navbar";
import "./about.css";

export const About = () => {
  return (
    <div>
      <Navbar />
      <h1 className="aboutTitle">About the System</h1>
      <div className="container">
        <h6 className="aboutDetail">
          Tsis is the Simple Crud Api, where user can register their
          Information,Update the Information and also can delete the user Data.
        </h6>
      </div>
    </div>
  );
};
