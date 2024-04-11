import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";

export const Add = () => {
  const userDatas = {
    fName: "",
    lName: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(userDatas);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      const respone = await axios.post(
        "http://localhost:5000/api/create",
        userData
      );
      toast.success(respone.data.message, {
        icon: "👏",
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      toast.error("There is a server Error", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"} className="backButton">
        <i class="fa-solid fa-backward"></i>
      </Link>
      <h3 className="addUserTittle">Add New user</h3>
      <form action="" className="addUserForm" onSubmit={submitForm}>
        <div className="addInput">
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fName"
            name="fName"
            autoComplete="off"
            placeholder="Enter the first name"
            required
          />
        </div>
        <div className="addInput">
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lName"
            name="lName"
            autoComplete="off"
            placeholder="Enter the last name"
            required
          />
        </div>
        <div className="addInput">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter the email"
            required
          />
        </div>
        <div className="addInput">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter the pssword"
            required
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
