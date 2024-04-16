import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./home.css";

export const Home = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const respose = await axios.get("http://localhost:5000/api/findAll");
        setUser(respose.data);
      } catch (error) {
        toast.warn("There is no data", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          theme: "dark",
        });
      }
    })();
    // fetchAllUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user Info?"
      );
      if (confirmed) {
        const response = await axios.delete(
          `http://localhost:5000/api/delete/${userId}`
        );
        // filter out and set update the deleted user from the list of users displayed
        setUser((prevUser) =>
          prevUser.filter((PrevExistuser) => PrevExistuser._id !== userId)
        );
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("There is a server Error", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <h1 className="crudTittle">Crud API System</h1>
      <div className="userTable">
        <Link to={"/add"} className="addButton">
          add user
        </Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.fName} {user.lName}
                  </td>
                  <td>{user.email}</td>
                  <td className="actionButton">
                    <button
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/edit/${user._id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
