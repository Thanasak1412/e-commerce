import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import "./user.css";
import { updateUser } from "../../redux/apiCalls";

export default function User() {
  const user = useSelector((state) => state.user.currentUser.data);
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInput((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { _id: id } = user;
    const { firstName, lastName, email, username, role } = userInput;

    updateUser(dispatch, id, { firstName, lastName, email, username, role });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      {user && (
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://www.pngitem.com/pimgs/m/524-5246388_anonymous-user-hd-png-download.png"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Role:{" "}
                  {user.role.charAt(0).toUpperCase() +
                    user.role.slice(1).toLowerCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    name="username"
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder={user.firstName}
                    className="userUpdateInput"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder={user.lastName}
                    className="userUpdateInput"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    placeholder={`${user.email}`}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Role</label>
                  <input
                    name="role"
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://www.pngitem.com/pimgs/m/524-5246388_anonymous-user-hd-png-download.png"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
