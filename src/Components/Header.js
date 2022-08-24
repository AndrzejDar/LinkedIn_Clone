import React from "react";
import "./Header.scss";
import {
  FaHome,
  FaWarehouse,
  FaUserFriends,
  FaEnvelope,
  FaBell,
  FaTh,
  FaCaretDown,
} from "react-icons/fa";
import OptionModal from "./OptionModal";
import HeaderLink from "./HeaderLink";

const Header = ({ user }) => {
  return (
    <div className="header_container">
      <div className="header_logo">
        <img src="../img/logo.png" alt="ad logo clone" />
        <div className="header_search">
          <input name="search" type="text" placeholder=" Szukaj"></input>
        </div>
      </div>
      <div className="header_menu">
        <ul>
          <li className="header_menu-link" href="./">
          <HeaderLink
              graphic={<FaHome />}
              label={"Główna"}
              target="./"
            />
          </li>
          <li className="header_menu-link soft-disabled" href="./">
          <HeaderLink
              graphic={<FaUserFriends />}
              label={"Sieć"}
              target="./"
            />
          </li>
          <li className="header_menu-link soft-disabled" href="./">
          <HeaderLink
              graphic={<FaWarehouse />}
              label={"Praca"}
              target="./"
            />
          </li>
          <li className="header_menu-link soft-disabled" href="./">
          <HeaderLink
              graphic={<FaEnvelope />}
              label={"Wiadomości"}
              target="./"
            />
          </li>
          <li className="header_menu-link soft-disabled" href="./">
            <HeaderLink
              graphic={<FaBell />}
              label={"Powiadomienia"}
              target="./"
            />

            {/* <FaBell />
                <span>Powiadomienia</span> */}
          </li>
          <li className="header_menu-link" href="./">
            <HeaderLink
              graphic={<img src={user.avatar} />}
              label={"Ja"}
              target="./"
              dropdown={true}
              options={[
                { action: 1, label: "option 1" },
                { action: 2, label: "option 2" },
                { action: 3, label: "option 3" },
              ]}
            />
          </li>
          <li className="header_menu-break"></li>
          <li className="header_menu-link" href="./">
            <HeaderLink
              graphic={<FaTh />}
              label={"Inne"}
              target="./"
              dropdown={true}
              options={[
                { action: 1, label: "option 1" },
                { action: 2, label: "option 2" },
                { action: 3, label: "option 3" },
              ]}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
