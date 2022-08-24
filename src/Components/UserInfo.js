import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./UserInfo.scss";

const UserInfo = ({ className }) => {
  const user = useSelector(selectUser);

  return (
    <div className={className}>
      <img src="../img/default_bg_ui.jpg" alt="" />
      <div className="userInfo__card">
        <img
          className="avatar"
          src={user.avatar ? user.avatar : "../img/default_avatar.jpg"}
          alt=""
        />
        <p className="userInfo__displayName">{user.displayName} </p>
        <p>{user.title} </p>
        <div className="separator"></div>
        <div className="userInfo__statistic">
          <span>Kontakty:</span>
          <span className="accent">{user.contacts ? user.contacts : "0"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
