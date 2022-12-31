import React from 'react';
import '../Style/Footer.css';
import { MdCall } from 'react-icons/md';
import { MdLocationOn } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';

const Footer =()=>{
    return (
      <div className=' footerContainer'>
        <div className='max-w-7xl mx-auto px-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10'>
                <div className='footerCard'>
                    <h1>SUPPORT</h1>
                    <div className='supportCard'>
                        <MdCall className='supportIcon'/>
                        <div className='text-white'>
                            <h3 className='supportHead'>9AM - 8PM</h3>
                            <h3 className='supportH'>09678002003</h3>
                        </div>
                    </div>
                    <div className=' supportCard'>
                        <MdLocationOn className='supportIcon'/>
                        <div className='text-white'>
                            <h3 className='supportHead'>Store Locator</h3>
                            <h3 className='supportH'>Find Our Stores</h3>
                        </div>
                        
                    </div>
                </div>
                <div className='footerCard'>
                    <h1>ABOUT US</h1>
                    <div className='flex items-center justify-between gap-4'>
                        <div>
                            <ul>
                                <li>EMI Terms</li>
                                <li>Online Delivery</li>
                                <li>Term and Conditions</li>
                                <li>Star Point Policy</li>
                                <li>Contact Us</li>
                                <li className='activeColor'>Online Service Support</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>About Us</li>
                                <li>Privacy Policy</li>
                                <li>Refund / Return Policy</li>
                                <li>Blog</li>
                                <li>Brands</li>
                                <li className='activeColor'>Complain / Advice</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='footerCard'>
                    <h1 >STAY CONNECTED</h1>
                    <p className='text-white text-[14px] mb-[12px]'>Star Tech & Engineering Ltd</p>
                    <p className='address'>6th floor, 28 Kazi Nazrul Islam Ave, Navana Zohura Square, Dhaka 1000</p>
                    <p className='address'>Email:</p>
                    <div className='flex socialIconContainer'>
                        <FaFacebookF className='socialIcon'/>
                        <AiFillYoutube className='socialIcon'/>
                        <AiOutlineInstagram className='socialIcon'/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}
export default Footer;