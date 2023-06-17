/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./login.css";
import {
  EnvelopeSimple,
  LockSimple,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import { validatePassword, validateEmail } from "../../Script/checkValid";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const handleLoginSuccess = (user) => {
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    console.log(emailError);
    const passwordError = validatePassword(password);
    console.log(passwordError);

    if (emailError || passwordError) {
      setemailError(emailError);
      setPasswordError(passwordError);
    }

    fetch("http://localhost:5000/user/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          fetch(`http://localhost:5000/user/getInfo/${email}`, {
            method: "GET",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((res) => res.json())
            .then((userData) => {
              const user = {
                ...data.data,
                ttdk: userData,
              };
              handleLoginSuccess(user.ttdk.data);
              if (user.role === "ttdk") {
                window.location.href = "ttdk/homepage";
              } else if (user.role === "cdk") {
                window.location.href = "cdk";
              }
            })
            .catch((err) => {
              console.log("Lỗi lấy thông tin user", err);
            });
        }
      })
      .catch((err) => {
        console.log("Lỗi đăng nhập", err);
      });
    
  };



  return (
    <div className="login-main">
      <div className="login-cover">
        <h1>ĐĂNG NHẬP</h1>
        <form>
          <label htmlFor="">Email</label>
          <div className="type-line">
            <EnvelopeSimple weight="bold" />
            <input
              type="email"
              placeholder="Nhập email..."
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="error">
            {emailError ? emailError : ""}
          </div>
          <label htmlFor="">Password</label>
          <div className="type-line">
            <LockSimple weight="bold" size="29" />
            <input
              type={visible ? "text" : "password"}
              required
              placeholder="Nhập mật khẩu..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="hidepass" onClick={() => setVisible(!visible)}>
              {visible ? <EyeSlash /> : <Eye />}
            </div>
          </div>
          {passwordError && <div className="error">{passwordError}</div>}
        </form>
        <div className="remember-password">
          <input type="checkbox" name="" id="" />
          <label>Ghi nhớ tài khoản</label>
        </div>
        <button id="login" onClick={handleLogin}>
          Đăng nhập
        </button>
        <div className="forgot-password">
          <a href="">Quên mật khẩu?</a>
        </div>
      </div>
      <div className="login-deco">Quản lí đăng kiểm thật dễ dàng!</div>
    </div>
  );
};
