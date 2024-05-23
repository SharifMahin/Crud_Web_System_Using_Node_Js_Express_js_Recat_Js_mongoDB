import axios from "axios";
import React, { useEffect, useState } from "react";
//import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar } from "./Navbar/Navbar";
import "./home.css";
import search_icon from "./search.png";
export const Home = () => {
  const [isAuthorized, setisAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/findAll", {
          withCredentials: true,
        });
        if (Array.isArray(response.data)) {
          setUser(response.data);
          setisAuthorized(true); //user authenticated
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        setisAuthorized(false);
        if (error.response && error.response.status === 401) {
          toast.error("Authentication error. Please log in again.", {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/");
        } else {
          toast.warn("There is no data", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            theme: "dark",
          });
        }
      } finally {
        setIsLoading(false);
      }
    })();
    // fetchAllUsers();
  }, [navigate]);

  const deleteUser = async (userId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user Info?"
      );
      if (confirmed) {
        const response = await axios.delete(
          `http://localhost:5000/api/delete/${userId}`,
          { withCredentials: true }
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

  const handleSearch = async () => {
    try {
      // Check if the search query is empty
      if (!searchQuery.trim()) {
        toast.error("Search input is required", {
          position: "top-right",
          autoClose: 2000,
        });
        setUser([]);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/search/${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      if (Array.isArray(response.data.existData)) {
        toast.success("Succesfully find the data", {
          position: "top-right",
          autoClose: 2000,
        });
        setUser(response.data.existData);
      }
    } catch (error) {
      setUser([]);
      if (error.response && error.response.status === 404) {
        toast.error("No data available by your request", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.warn("There was an error fetching the search results", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isAuthorized ? (
        <>
          <Navbar />
          <h1 className="crudTittle">Crud API System</h1>
          <div className="userTable">
            <div className="topPart">
              <Link to={"/add"} className="addButton">
                add user
              </Link>
              <input
                type="text"
                placeholder="Search By country"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="search-icon">
                <button onClick={handleSearch}>
                  <img src={search_icon} alt="search" />
                </button>
              </div>
            </div>
            <table className="table-bordered" cellPadding={10} cellSpacing={0}>
              <thead>
                <tr className="text-center">
                  <th>Serial No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Country</th>
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
                      <td>{user.gender}</td>
                      <td>{user.country}</td>
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
        </>
      ) : (
        <h2 className="errorTitle">Unauthorized Authentication</h2>
      )}
    </div>
  );
};
