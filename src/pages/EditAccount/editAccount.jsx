/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./editAccount.css";

export const EditAccount = (props) => {
  const [userName, setUserName] = useState(props.data.userName);
  const [displayName, setDisplayName] = useState(props.data.displayName);
  const [code, setCode] = useState(props.data.code);
  const [phoneNumber, setPhoneNumber] = useState(props.data.phoneNumber);
  const [email, setEmail] = useState(props.data.email);
  const [address, setAddress] = useState(props.data.address);
  const [password, setPassword] = useState(props.data.password);
  const [region, setRegion] = useState(props.data.region);
  const [position, setPosition] = useState(props.data.position);
  const [represent, setRepresent] = useState(props.data.represent);
  const [status, setStatus] = useState(props.data.status);

  const onHandleSubmit = () => {
    const item = {
      userName,
      displayName,
      code,
      phoneNumber,
      email,
      address,
      password,
      region,
      position,
      represent,
      status,
    };
    console.log(item);
    fetch(`http://localhost:5000/cdk/updateCenter/${email}`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Successful") {
          window.location.reload();
        }
      })
      .then((data) => {
        if (data.status === "Successful") {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return props.trigger ? (
    <div className="modal-main">
      <div className="addAccount-container edit-container">
        <h2>CHỈNH SỬA TÀI KHOẢN</h2>
        <form className="formAdd" action="">
          <h3>Thông tin trung tâm</h3>
          <div className="form-block">
            <div>
              <div>
                <label className="label-text" htmlFor="">
                  Tên trung tâm:
                </label>
                <input
                  className="box-type"
                  type="text"
                  name=""
                  id=""
                  defaultValue={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="label-text" htmlFor="">
                  Tên hiển thị:
                </label>
                <input
                  className="box-type"
                  type="text"
                  name=""
                  id=""
                  defaultValue={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className="label-text" htmlFor="">
                  Số điện thoại:
                </label>
                <input
                  className="box-type"
                  type="text"
                  name=""
                  id=""
                  defaultValue={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <div>
                <label className="label-text" htmlFor="">
                  Mã trung tâm:
                </label>
                <input
                  className="box-type"
                  type="text"
                  name=""
                  id=""
                  defaultValue={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="label-text" htmlFor="">
                  Địa chỉ:
                </label>
                <input
                  className="box-type"
                  type="text"
                  name=""
                  id=""
                  defaultValue={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="label-text" htmlFor="">
                  Khu vực:
                </label>
                <input
                  className="box-type"
                  type="text"
                  name=""
                  id=""
                  defaultValue={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <h3>Người đại diện</h3>
          <div className="form-block">
            <div>
              <label className="label-text" htmlFor="">
                Họ và tên:
              </label>
              <input
                className="box-type"
                type="text"
                name=""
                id=""
                defaultValue={represent}
                onChange={(e) => {
                  setRepresent(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="label-text" htmlFor="">
                Chức danh:
              </label>
              <input
                className="box-type"
                type="text"
                name=""
                id=""
                defaultValue={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
            </div>
          </div>

          <h3>Tài khoản</h3>
          <div className="form-block">
            <div>
              <div>
                <label className="label-text" htmlFor="">
                  Email:
                </label>
                <input
                  className="box-type"
                  type="email"
                  name=""
                  id=""
                  defaultValue={props.data.email}
                  disabled
                />
              </div>
              <div>
                <label className="label-text" htmlFor="">
                  Mật khẩu:
                </label>
                <input
                  className="box-type"
                  type="password"
                  name=""
                  id=""
                  defaultValue={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <label className="label-text" htmlFor="">
                Trạng thái
              </label>
              <input
                className="box-type"
                type="text"
                name=""
                id=""
                defaultValue={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="account-submit">
            <input
              type="submit"
              value="Lưu chỉnh sửa"
              onClick={() => {
                onHandleSubmit();
                props.setTrigger(false);
              }}
            />
            <input
              type="button"
              value="Hủy bỏ"
              onClick={() => {
                props.setTrigger(false);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};
