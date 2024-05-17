import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";

export const Login = () => {
  const loginInfos = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(loginInfos);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log(loginData);
  };
  const submitForm = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/login",
        loginData
      );
      if (response.data.message === "Login Succesfully") {
        // Store the token in localStorage
        localStorage.setItem("access_token", response.data.access_token);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
        });
        navigate("/Home");
      } else if (response.data.message === "Invalid Email") {
        toast.error("Invalid Email", {
          position: "top-right",
          autoClose: 1000,
        });
      } else if (response.data.message === "Password not match") {
        toast.error("Invalid Password", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Authentication Failed", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };
  return (
    <div>
      <h1 className="addTittle">Login</h1>
      <div className="loginUser">
        <h3 className="addLoginTittle">Login</h3>
        <form action="" className="addUserForm" onSubmit={submitForm}>
          <div className="addInput">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={inputHandler}
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter the Email"
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
              placeholder="Pssword"
              required
            />
          </div>
          <div className="addInput">
            <button type="submit" className="addLoginbtn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
