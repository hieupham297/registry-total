import React from 'react'
import "./news_item.css"
import img1 from "../../assets/News1.png"
import img2 from "../../assets/News2.png"
import img3 from "../../assets/News3.png"
import { Link } from 'react-router-dom'


export const News_item = () => {
  return (
    <div className="news-main">
      <div className="news-cover">
        <Link to="./details"><img src={img1} alt="" /></Link>
        <hr />
        <Link className="item-title">Sẽ có gần 1,4 triệu xe giãn chu kỳ kiểm định xe trực tuyến</Link>
        <div className="item-date">Ngày 16/05/2023</div>
      </div>

      <div className="news-cover">
        <Link><img src={img2} alt="" /></Link>
        <hr />
        <Link className="item-title">Sẽ có gần 1,4 triệu xe giãn chu kỳ kiểm định xe trực tuyến</Link>
        <div className="item-date">Ngày 16/05/2023</div>
      </div>

      <div className="news-cover">
        <Link><img src={img3} alt="" /></Link>
        <hr />
        <Link className="item-title">Sẽ có gần 1,4 triệu xe giãn chu kỳ kiểm định xe trực tuyến</Link>
        <div className="item-date">Ngày 16/05/2023</div>
      </div>

      <div className="news-cover">
        <Link><img src={img2} alt="" /></Link>
        <hr />
        <Link className="item-title">Sẽ có gần 1,4 triệu xe giãn chu kỳ kiểm định xe trực tuyến</Link>
        <div className="item-date">Ngày 16/05/2023</div>
      </div>

      <div className="news-cover">
        <Link><img src={img3} alt="" /></Link>  
        <hr />
        <Link className="item-title">Sẽ có gần 1,4 triệu xe giãn chu kỳ kiểm định xe trực tuyến</Link>
        <div className="item-date">Ngày 16/05/2023</div>
      </div>

      <div className="news-cover">
        <Link><img src={img1} alt="" /></Link>
        <hr />
        <Link className="item-title">Sẽ có gần 1,4 triệu xe giãn chu kỳ kiểm định xe trực tuyến</Link>
        <div className="item-date">Ngày 16/05/2023</div>
      </div>
    </div>
  )
}
