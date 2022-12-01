import { useState } from "react";
import ReactStars from "react-rating-stars-component";
export const StarRating = ({ edit, size, rating, a11y, onChange }) => {
  // let rating = props.rating;
  const showRating = {
    size,
    count: 5,
    color: "gray",
    activeColor: "yellow",
    value: rating,
    a11y,
    isHalf: true,
    edit,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange,
  };
  return <ReactStars {...showRating}></ReactStars>;
};
