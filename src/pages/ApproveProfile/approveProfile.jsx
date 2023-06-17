import { useState } from "react";
import "./approveProfile.css";
import Button from "../../components/Button/Button";
import { X } from "@phosphor-icons/react";

export const ApproveProfile = (props) => {
  const [isCompany, setIsCompany] = useState(true);

  const approve = () => {
    fetch(`http://localhost:5000/ttdk/approve/${props.data.licensePlate}`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Successful") {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return props.trigger ? (
    <div className="modal-main">
      <div className="ap-container">
        <div className="ap-title">Thông tin đăng kiểm</div>

        <div className="ap-main">
          {props.data.object === "Cá nhân" ? (
            <div className="ap-block">
              <h3>1. Thông tin chủ sở hữu</h3>
              <p>
                <span>Tên chủ sở hữu</span> {props.data.ownerInfo.ownerName}
              </p>
              <p>
                <span>Giới tính</span> {props.data.ownerInfo.gender}
              </p>
              <p>
                <span>Ngày sinh</span> {props.data.ownerInfo.birthday}
              </p>
              <p>
                <span>Địa chỉ</span> {props.data.ownerInfo.address}
              </p>
              <p>
                <span>Số CMND</span> {props.data.ownerInfo.CMND}
              </p>
              <p>
                <span>Số điện thoại</span> {props.data.ownerInfo.phone}
              </p>
            </div>
          ) : (
            <div className="ap-block">
              <h3>1. Thông tin chủ sở hữu</h3>
              <p>
                <span>Đối tượng</span> {props.data.ownerInfo.unitName}
              </p>
              <p>
                <span>Tên đơn vị</span> {props.data.ownerInfo.unitCode}
              </p>
              <p>
                <span>Số điện thoại</span> {props.data.ownerInfo.phone}
              </p>
              <p>
                <span>Địa chỉ</span> {props.data.ownerInfo.address}
              </p>
              <p>
                <span>Người đại diện</span> {props.data.ownerInfo.represent}
              </p>
            </div>
          )}
          <div className="ap-block">
            <h3>2. Thông số xe</h3>
            <p>
              <span>Biển số xe</span> {props.data.licensePlate}
            </p>
            <p>
              <span>Nhãn hiệu</span> {props.data.mark}
            </p>
            <p>
              <span>Số loại</span> {props.data.modelCode}
            </p>
            <p>
              <span>Màu sơn</span> {props.data.color}
            </p>
            <p>
              <span>Năm sản xuất</span> {props.data.year}
            </p>
            <p>
              <span>Dung tích</span> {props.data.volume}
            </p>
            <p>
              <span>Số máy</span> {props.data.engineNumber}
            </p>
            <p>
              <span>Số khung</span> {props.data.chassisNumber}
            </p>
            <p>
              <span>Số người cho phép chở</span> {props.data.seat}
            </p>
            <p>
              <span>Ngày đăng kiểm</span> {props.data.regisDate}
            </p>
            <p>
              <span>Số tem GCN</span> {props.data.GCN}
            </p>
          </div>
        </div>

        <div className="ap-footer">
          <button
            onClick={() => {
              approve();
              props.setTrigger(false);
            }}
          >
            Phê duyệt
          </button>
          <button onClick={() => props.setTrigger(false)} id="decline-approve">
            Từ chối
          </button>
        </div>
        <div className="close_modal_wrap">
          <X size={16} weight="bold" onClick={() => props.setTrigger(false)} />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
