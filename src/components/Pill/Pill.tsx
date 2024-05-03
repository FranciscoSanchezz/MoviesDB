import React from "react";
import { IPill } from "./types";
import "./Pill.css";
import classNames from "classnames";

const Pill: React.FC<IPill> = ({ 
    title,
    color,

}) => {
  const pillClass = classNames({"text-white p-2 text-xs font-semibold mt-0 mr-0 mb-2 ml-0 transition-all duration-300 rounded-lg table":
  true,
  "bg-red-500": color === "red",
  "bg-yellow-500": color === "yellow",
  "bg-green-500": color === "green",

});
  return (
    <div className={pillClass}>
      {title}
    </div>
  );
};

export default Pill;