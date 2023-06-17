import React from "react";
import "./modalBox.css";
import { X } from "@phosphor-icons/react";

export const Modalbox_userDetail = (props) => {
  return props.triggerUser ? (
    <div className="modal-main">
      <div className="modal-car-info">
        <div className="modalbox-container">
          <div className="modalbox-title">{props.value}</div>
          <div className="modalbox-info">
            <div className="modalbox-block">
              <table>
                <tr>
                  <th>Tên chủ sở hữu</th>
                  <td>{props.userData.ownerName}</td>
                </tr>
                <tr>
                  <th>Giới tính</th>
                  <td>{props.userData.gender}</td>
                </tr>
                <tr>
                  <th>Ngày sinh</th>
                  <td>{new Date(props.userData.birthday).toLocaleDateString("en-GB")}</td>
                </tr>
                <tr>
                  <th>Địa chỉ</th>
                  <td>{props.userData.address}</td>
                </tr>
                <tr>
                  <th>Số CMND</th>
                  <td>{props.userData.CMND}</td>
                </tr>
                <tr>
                  <th>Số điện thoại</th>
                  <td>{props.userData.phone}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="close_modal_wrap">
            <X size={16} weight="bold" onClick={() => props.setTriggerUser(false)} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
