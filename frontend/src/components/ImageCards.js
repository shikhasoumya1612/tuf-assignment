import React from "react";
import { DSASheet, SystemDesign, TechnicalBlogs } from "./Icons";
const cardData = [
  {
    icon: <DSASheet />,
    heading: "Striver DSA Sheet",
    subHeading: "Boost your DSA skills with our handy cheat sheets.",
  },
  {
    icon: <SystemDesign />,
    heading: "System Design",
    subHeading: "Design better systems with our simplified approach.",
  },
  {
    icon: <TechnicalBlogs />,
    heading: "Technical Blogs",
    subHeading: "Dive Deep into Tech Innovation with Our Engaging Blogs.",
  },
];

const ImageCards = () => {
  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          <div
            className={
              index === 0 ? "card-icon-wrapper-blue" : "card-icon-wrapper"
            }
          >
            <div className="card-icon">{card.icon}</div>
          </div>
          <h2 className="card-heading">{card.heading}</h2>
          <p className="card-subheading">{card.subHeading}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageCards;
