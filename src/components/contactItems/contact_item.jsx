import React from 'react'
import "./contact_item.css"
import { ArrowRight, Phone } from '@phosphor-icons/react'
import GmailIcon from '../../assets/gmail_icon.png'
import PhoneIcon from '../../assets/phone-icon.png'
import LocaionIcon from '../../assets/location_icon.png'

export const Contact_item = () => {
  return (
    <div className="contact-main">
        <div className="contact-cover">
            <div className="top-img">
                <div className='gmail_background'></div>
            </div>
            <div className="contact-icon">
                <img src={GmailIcon} alt="" />
            </div>
            <div className="contact-content">
                <h3>Email</h3><br />
                <p>Địa chỉ email: cdk-vn@vr.org.vn</p>
                {/* <p>Liên hệ tại đây <ArrowRight /></p> */}
            </div>
        </div>

        <div className="contact-cover">
            <div className="top-img">
                <div className='call_background'></div>
            </div>
            <div className="contact-icon">
                <img src={PhoneIcon} alt="" />
            </div>
            <div className="contact-content">
                <h3>Điện thoại</h3><br />
                <p>Số điện thoại: +84.24.37684714</p>
                {/* <p>Liên hệ tại đây <ArrowRight /></p> */}
            </div>
        </div>

        <div className="contact-cover">
            <div className="top-img">
                <div className='location_background'></div>
            </div>
            <div className="contact-icon">
                <img src={LocaionIcon} alt="" />
            </div>
            <div className="contact-content">
                <h3>Địa chỉ</h3><br />
                <p>Trụ sở chính: 18 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội</p>
                {/* <p>Liên hệ tại đây <ArrowRight /></p> */}
            </div>
        </div>
    </div>
    
  )
}
