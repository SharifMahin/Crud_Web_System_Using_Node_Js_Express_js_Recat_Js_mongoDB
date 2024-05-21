import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./navbar.css";
import logo from "./octocat-1713322084876.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/"); // Redirect to login page
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="NavbarDetail">
      <nav class="navbar navbar-expand-lg navbar-light bg-custom">
        <div class="container-fluid">
          <a
            className="navbar-brand"
            href="https://github.com/SharifMahin/Crud_Web_System_Using_Node_Js_Express_js_Recat_Js_mongoDB"
            target="_blank"
            rel="noreferrer"
          >
            <img className="imageCustom" src={logo} alt="Icon" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink class="nav-link actives" to="/home">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link actives" to="/add">
                  Create
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link actives" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item-logout">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
            {/* <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
