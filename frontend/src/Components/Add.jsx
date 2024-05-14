import axios from "axios";
import React, { useState } from "react";
//import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "./Navbar/Navbar";
import "./add.css";

export const Add = () => {
  const userDatas = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    country: "",
    gender: "",
  };
  const [userData, setUserData] = useState(userDatas);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    //setUserData({ ...userData, [e.target.name]: e.target.value }); //same work like below code
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/create",
        userData
      );
      if (response.data.message === "This email already exist") {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else if (response.data.message === "Fill the Input field") {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/Home");
      }
    } catch (error) {
      toast.error("There is a server Error", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="addTittle">Create New User</h1>
      <div className="addNewUser">
        <Link to={"/Home"} className="backButton">
          <i class="fa-solid fa-backward"></i>
        </Link>
        <h3 className="addUserTittle">Add New User</h3>
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
          <div className="radioBtn">
            <label className="radioLabel" htmlFor="gender">
              Gender
            </label>
            <div className="spaceRadio">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={userData.gender === "Male"}
                onChange={inputHandler}
                required
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={userData.gender === "Female"}
                onChange={inputHandler}
              />
              <label htmlFor="Female"> Female</label>
            </div>
          </div>
          <div className="addInput">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={userData.country}
              onChange={inputHandler}
              required
            >
              <option value="">Choose Country Name</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Canada">Canada</option>
              <option value="Finland">Finland</option>
              <option value="Japan">Japan</option>
              <option value="New Zealand">New Zealand</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className="addInput">
            <button type="submit" className="addSubmitbtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
