import React from "react";
import "./Button.css";

function Button(props) {
  return (
    <button
      className={`btn ${props.type} `}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
