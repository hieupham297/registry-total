import React from "react";
import "./modalBox.css";
import { X } from "@phosphor-icons/react";

export const Modalbox = (props) => {
  return props.trigger ? (
    <div className="modal-main">
      <div className="modal-car-info">
        <div className="modalbox-container">
          <div className="modalbox-title">{props.value}</div>
          <div className="modalbox-info">
            {props.children}
          </div>
          <div className="close_modal_wrap">
            <X size={16} weight="bold" onClick={() => props.setOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
