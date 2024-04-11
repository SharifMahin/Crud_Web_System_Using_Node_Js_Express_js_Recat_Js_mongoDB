import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export const Home = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const respose = await axios.get("http://localhost:5000/api/findAll");
      setUser(respose.data);
    };
    fetchAllUsers();
  }, []);

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
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {user.fName} {user.lName}
                  </td>
                  <td>{user.email}</td>
                  <td className="actionButton">
                    <button>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={"/edit"}>
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
