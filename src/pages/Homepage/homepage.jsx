import React from 'react'
import img1 from "../../assets/Homepage1.png"
import img2 from "../../assets/Homepage2.png"
import "./homepage.css"

export const Homepage = () => {
  return (
    <div className="homepage-main">
      <div className="homepage-cover">
        <h1>Dễ dàng quản lý với hệ thống đăng kiểm online</h1>
        <div className="homepage-item">
          <img src={img1} alt="" />
          <p><h2>Automated reports</h2> Pharetra scelerisque egestas risus varius non lorem egestas tortor massa id mauris tortor.</p>
        </div>
        <div className="homepage-item">
          <p><h2>Automated reports</h2> Pharetra scelerisque egestas risus varius non lorem egestas tortor massa id mauris tortor.</p>
          <img src={img2} alt="" />
        </div>
      </div>
    </div>
  )
}
