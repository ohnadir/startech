import React from 'react';
import './Footer.scss';
import { MdCall } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';

const Footer =()=>{
    
    return (
      <div className=' footerContainer footer'>
        <div className='footer-container'>
            <div className='footer-item'>
                <h1>SUPPORT</h1>
                <div className='support-time'>
                    <MdCall className='icon'/>
                    <div className='open-time'>
                        <h3 className='time-property'>9AM - 8PM</h3>
                        <h3 className='phone'>09678002003</h3>
                    </div>
                </div>
                <div className='support-time'>
                    <MdLocationOn className='icon'/>
                    <div className='find-shop'>
                        <h3 className='shop'>Store Locator</h3>
                        <h3 className='shop-location'>Find Our Stores</h3>
                    </div>
                    
                </div>
            </div>
            <div className='footer-item'>
                <h1>ABOUT US</h1>
                <ul>
                    <li>EMI Terms</li>
                    <li>Online Delivery</li>
                    <li>Term and Conditions</li>
                    <li>Star Point Policy</li>
                    <li>Contact Us</li>
                    <li className='active-color'>Online Service Support</li>
                </ul>
            </div>
            <div className='footer-item'>
                <h1 className='invisible'>STAY CONNECTED</h1>
                <ul>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Refund / Return Policy</li>
                    <li>Blog</li>
                    <li>Brands</li>
                    <li className='active-color'>Complain / Advice</li>
                </ul>
            </div>
            <div className='footer-item'>
                <h1 >STAY CONNECTED</h1>
                <p className='company-name'>Star Tech & Engineering Ltd</p>
                <p className='address'>6th floor, 28 Kazi Nazrul Islam Ave, Navana Zohura Square, Dhaka 1000</p>
                <p className='address'>Email:</p>
                <div className='social-icon-container'>
                    <FaFacebookF className='social-icon'/>
                    <AiFillYoutube className='social-icon'/>
                    <AiOutlineInstagram className='social-icon'/>
                </div>
            </div>
        </div>
      </div>
    )
}
export default Footer;