import React from "react";
import { FaX } from "react-icons/fa6";
import Timer from "./Timer";
import "../styles/Banner.css";

const Banner = ({ isVisible, setIsVisible, bannerSettings }) => {
  if (!isVisible || !bannerSettings) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <div className="banner">
      <div className="timer">
        <Timer
          endTime={bannerSettings.bannerEndTime}
          setIsVisible={setIsVisible}
        />
      </div>
      <a
        href={bannerSettings.bannerLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="offer"
      >
        <h2>{bannerSettings.bannerHeading}</h2>
        <p>{bannerSettings.bannerSubHeading}</p>
      </a>
      <div className="close">
        <FaX className="cursor-pointer" onClick={handleClose} />
      </div>
    </div>
  );
};

export default Banner;
