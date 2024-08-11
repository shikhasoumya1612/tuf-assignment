import React from "react";
import "../styles/Header.css";
import { IoMoon } from "react-icons/io5";
import { BsSunFill } from "react-icons/bs";
import { Logo } from "./Icons";

const Header = (props) => {
  return (
    <div className="header">
      <Logo />

      <div className="action-btns">
        <div
          className="cursor-pointer"
          onClick={() => props.setIsDarkMode((prev) => !prev)}
        >
          {props.isDarkMode ? (
            <IoMoon color="white" size="30px" />
          ) : (
            <BsSunFill color="black" size="30px" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
