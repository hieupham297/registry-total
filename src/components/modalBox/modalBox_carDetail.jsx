import React from "react";
import "./modalBox.css";
import { X } from "@phosphor-icons/react";

export const Modalbox_carDetail = (props) => {
  return props.triggerCar ? (
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
                  <th>Nhãn hiệu</th>
                  <td>{props.carData.mark}</td>
                </tr>
                <tr>
                  <th>Số loại</th>
                  <td>{props.carData.modelCode}</td>
                </tr>
                <tr>
                  <th>Màu sơn</th>
                  <td>{props.carData.color}</td>
                </tr>
                <tr>
                  <th>Năm sản xuất</th>
                  <td>{props.carData.year}</td>
                </tr>
                <tr>
                  <th>Dung tích</th>
                  <td>{props.carData.volume}</td>
                </tr>
                <tr>
                  <th>Số máy</th>
                  <td>{props.carData.engineNumber}</td>
                </tr>
                <tr>
                  <th>Số khung</th>
                  <td>{props.carData.chassisNumber}</td>
                </tr>
                <tr>
                  <th>Số người cho phép chở</th>
                  <td>{props.carData.seat}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="close_modal_wrap">
          <X size={16} weight="bold" onClick={() => props.setTriggerCar(false)} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
