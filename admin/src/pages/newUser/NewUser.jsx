import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";

import styled from "styled-components";
import { Alert, Stack } from "@mui/material";

import "./newUser.css";

const StyledAlert = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export default function NewUser() {
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);

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

    addUser(dispatch, userInput);
    setPopup(true);

    setTimeout(() => {
      closePopup();
    }, 5000);
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>First Name</label>
          <input
            type="text"
            placeholder="test"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="test"
            name="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="test@test.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <button className="newUserButton">Create</button>
        {popup && (
          <StyledAlert>
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">
                Product has been added successfully!
              </Alert>
            </Stack>
          </StyledAlert>
        )}
      </form>
    </div>
  );
}
