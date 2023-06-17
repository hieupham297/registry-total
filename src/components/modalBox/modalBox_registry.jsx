import React from "react";
import "./modalBox.css";
import {X} from "@phosphor-icons/react";
import "./modalBox.css";

export const Modalbox_registry = (props) => {
  return props.triggerRegistry ? (
    <div className="modal-main">
      <div className="modal-car-info">
        <div className="modalbox-container">
          <div className="modalbox-title">{props.value}</div>
          <div className="modalbox-info">
            <div className="modalbox-block">
              <table>
                <tr>
                  <th>Biển số xe</th>
                  <td>{props.carData.licensePlate}</td>
                </tr>
                <tr>
                  <th>Ngày đăng kiểm</th>
                  <td>
                    {new Date(props.carData.regisDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Ngày hết hạn</th>
                  <td>
                    {new Date(props.carData.expirationDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Số tem GCN</th>
                  <td>{props.carData.GCN}</td>
                </tr>
                <tr>
                  <th>Trung tâm đăng kiểm</th>
                  <td>{props.carData.regisCenter}</td>
                </tr>
                <tr>
                  <th>Tình trạng kiểm duyệt</th>
                  <td>
                    {props.carData.isCensored
                      ? "Đã phê duyệt"
                      : "Chưa phê duyệt"}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="close_modal_wrap">
          <X size={16} weight="bold" onClick={() => props.setTriggerRegistry(false)} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
