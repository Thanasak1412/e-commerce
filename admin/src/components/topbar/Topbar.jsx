import React from "react";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./topbar.css";
import { logout } from "../../redux/userRedux";

const StyledLink = styled(Link)`
  color: #0011ff;
  text-decoration: none;
`;

const Signout = styled.button`
  font-size: 16px;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignout = () => {
    dispatch(logout);
    history.push("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <StyledLink to="/">
          <div className="topLeft">
            <span className="logo">Test.</span>
          </div>
        </StyledLink>
        <div className="topRight">
          <img
            src="https://www.pngitem.com/pimgs/m/524-5246388_anonymous-user-hd-png-download.png"
            alt=""
            className="topAvatar"
          />
          <Signout onClick={handleSignout}>Sign Out</Signout>
        </div>
      </div>
    </div>
  );
}
