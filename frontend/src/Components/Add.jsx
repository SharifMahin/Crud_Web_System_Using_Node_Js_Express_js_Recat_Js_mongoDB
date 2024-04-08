import React from "react";
import { Link } from "react-router-dom";
import "./add.css";

export const Add = () => {
  return (
    <div className="addUser">
      <Link to={"/"} className="backButton">
        <i class="fa-solid fa-backward"></i>
      </Link>
      <h3 className="addUserTittle">Add New user</h3>
      <form action="" className="addUserForm">
        <div className="addInput">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="Enter the first name"
          />
        </div>
        <div className="addInput">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Enter the last name"
          />
        </div>
        <div className="addInput">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter the email"
          />
        </div>
        <div className="addInput">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter the pssword"
          />
        </div>
        <div className="addInput">
          <button type="submit" className="addSubmitbtn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
