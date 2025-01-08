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
          </h4>
          <h4 className="projectDetail">
            Check my recent qualifiation certificate below.
            <br />
            <a
              href="https://learn.microsoft.com/api/credentials/share/en-us/SharifMahin-3987/5139B004BBACF0B8?sharingId=7494EF6C2B8B04EA"
              target="_blank"
              rel="noreferrer"
            >
              Azure Administrator Associate
            </a>
            <br />
            <a
              href="https://learn.microsoft.com/api/credentials/share/en-us/SharifMahin-3987/FFCEA150D88B906E?sharingId=7494EF6C2B8B04EA"
              target="_blank"
              rel="noreferrer"
            >
              Azure Fundamentals
            </a>
            <br />
            <a
              href="https://www.credly.com/badges/1e687075-199b-4073-93ef-d704c03ba665/print"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Foundations
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
};
