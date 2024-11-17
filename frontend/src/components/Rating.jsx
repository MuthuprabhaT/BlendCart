import React from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <IoStar />
        ) : value >= 0.5 ? (
          <IoStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <IoStar />
        ) : value >= 1.5 ? (
          <IoStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <IoStar />
        ) : value >= 2.5 ? (
          <IoStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <IoStar />
        ) : value >= 3.5 ? (
          <IoStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <IoStar />
        ) : value >= 4.5 ? (
          <IoStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
