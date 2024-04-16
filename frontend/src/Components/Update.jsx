import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./add.css";
import "./update.css";

export const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ fName: "", lName: "", email: "" });
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/findOne/${id}`
        );
        setUser(response.data);
      } catch (error) {
        toast.warn("There is no data", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
        });
      }
    })();
  }, [id]); // api render with id

  const upDateForm = async (event) => {
    try {
      event.preventDefault();
      const respone = await axios.put(
        `http://localhost:5000/api/update/${id}`,
        user
      );
      toast.success(respone.data.message, {
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
    <div className="updateUser">
      <Link to={"/"} className="backButton">
        <i class="fa-solid fa-backward"></i>
      </Link>
      <h3 className="updateUserTittle">Edit user</h3>
      <form action="" className="updateUserForm" onSubmit={upDateForm}>
        <div className="updateInput">
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fName"
            name="fName"
            value={user.fName}
            autoComplete="off"
            placeholder="Enter the first name"
            required
          />
        </div>
        <div className="updateInput">
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lName"
            name="lName"
            value={user.lName}
            autoComplete="off"
            placeholder="Enter the last name"
            required
          />
        </div>
        <div className="updateInput">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Enter the email"
            required
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
