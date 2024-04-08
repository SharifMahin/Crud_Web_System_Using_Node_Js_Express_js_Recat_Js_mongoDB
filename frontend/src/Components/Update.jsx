import React from "react";
import { Link } from "react-router-dom";
import "./update.css";

export const Update = () => {
  return (
    <div className="updateUser">
      <Link to={"/"} className="backButton">
        <i class="fa-solid fa-backward"></i>
      </Link>
      <h3 className="updateUserTittle">Edit user</h3>
      <form action="" className="updateUserForm">
        <div className="updateInput">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="Enter the first name"
          />
        </div>
        <div className="updateInput">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Enter the last name"
          />
        </div>
        <div className="updateInput">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter the email"
          />
        </div>
        <div className="updateInput">
          <button type="submit" className="updatebtn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
