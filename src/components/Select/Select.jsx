import React from "react";
import "./Select.css";
function Select(props) {
  return (
    <>
      <div className="select-label">{props.label}</div>
      <select
        className="select-main"
        onChange={(e) => props.setValue(e.target.value)}
      >
        {props.children}
      </select>
    </>
  );
}

function Option(props) {
  return (
    <option className="option" value={props.value}>
      {props.value}{" "}
    </option>
  );
}

export { Select, Option };
