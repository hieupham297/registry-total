import React, { useState } from "react";
import "./AddAccount.css";

export const AddAccount = () => {
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");
  const [region, setRegion] = useState("");
  const [represent, setRepresent] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitSuccess = () => {
    setUserName("");
    setDisplayName("");
    setPhoneNumber("");
    setAddress("");
    setCode("");
    setRegion("");
    setRepresent("");
    setPosition("");
    setEmail("");
    setPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch("http://localhost:5000/cdk/createAcc", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userName,
          displayName,
          phoneNumber,
          address,
          code,
          region,
          represent,
          position,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "Oke") {
            window.alert("Tạo thành công");
            window.location.reload();
            handleSubmitSuccess();
          } else {
            console.log("Tạo không thành công");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addAccount-container">
      <h2>THÊM TÀI KHOẢN</h2>
      <form className="formAdd" action="">
        <h3>Thông tin trung tâm</h3>
        <div className="form-block">
          <div>
            <div>
              <label className="label-text" htmlFor="">
                Tên trung tâm:{" "}
              </label>
              <input
                className="box-type"
                type="text"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="label-text" htmlFor="">
                Tên hiển thị:{" "}
              </label>
              <input
                className="box-type"
                type="text"
                required
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              <label className="label-text" htmlFor="">
                Số điện thoại:{" "}
              </label>
              <input
                className="box-type"
                type="text"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div>
              <label className="label-text" htmlFor="">
                Mã trung tâm:{" "}
              </label>
              <input
                className="box-type"
                type="text"
                required
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label className="label-text" htmlFor="">
                Địa chỉ:{" "}
              </label>
              <input
                className="box-type"
                type="text"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="label-text" htmlFor="">
                Khu vực:{" "}
              </label>
              <input
                className="box-type"
                type="text"
                required
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
          </div>
        </div>

        <h3>Người đại diện</h3>
        <div className="form-block">
          <div>
            <label className="label-text" htmlFor="">
              Họ và tên:{" "}
            </label>
            <input
              className="box-type"
              type="text"
              required
              onChange={(e) => setRepresent(e.target.value)}
            />
          </div>
          <div>
            <label className="label-text" htmlFor="">
              Chức danh:{" "}
            </label>
            <input
              className="box-type"
              type="text"
              required
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>

        <h3>Tài khoản</h3>
        <div className="form-block">
          <div>
            <label className="label-text" htmlFor="">
              Email:{" "}
            </label>
            <input
              className="box-type"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label-text" htmlFor="">
              Mật khẩu:{" "}
            </label>
            <input
              className="box-type"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="account-submit">
          <input type="submit" value="Tạo tài khoản" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};
