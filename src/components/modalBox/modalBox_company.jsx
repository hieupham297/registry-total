import React from "react";
import "./modalBox.css";
import {X} from "@phosphor-icons/react";
import "./modalBox.css"

export const Modalbox_company = (props) => {
  return props.triggerCompany ? (
    <div className="modal-main">
      <div className="modal-car-info">
        <div className="modalbox-container">
          <div className="modalbox-title">{props.value}</div>
          <div className="modalbox-info">
            <div className="modalbox-block">
                <table>
                    <tr>
                        <th>Đối tượng</th>
                        <td>Cơ quan</td>
                    </tr>
                    <tr>
                        <th>Tên đơn vị</th>
                        <td>{props.userData.unitName}</td>
                    </tr>
                    <tr>
                        <th>Số điện thoại</th>
                        <td>{props.userData.phone}</td>
                    </tr>
                    <tr>
                        <th>Địa chỉ</th>
                        <td>{props.userData.address}</td>
                    </tr>
                    <tr>
                        <th>Người đại diện</th>
                        <td>{props.userData.represent}</td>
                    </tr>
                </table>
            </div>
          </div>
          <div className="close_modal_wrap">
          <X size={16} weight="bold" onClick={() => props.setTriggerCompany(false)} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
