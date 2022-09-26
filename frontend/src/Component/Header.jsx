import React from 'react';
import Slider from "react-slick";
import gamingChari from '../assets/gaming-chair-deal-webbanner18-982x500.jpg';
import laptopFlash from '../assets/laptop-flash-sale-1992-home-982x500 (1).jpg';
import startechMegaSale from '../assets/star-tech-mega-sale-home-banner-time-extended-982x500.webp';
import tvMega from '../assets/tv-mega-deal-home-banner-982x500.jpg';
import cashOut from '../assets/nagad-cashback.jpg'
import { BiSearchAlt2 } from 'react-icons/bi';
import '../Style/Header.css'

const Header =()=>{

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
      <div className='max-w-7xl mx-auto px-2 container'>
        <div className='contentContainer gap-6 flex flex-col lg:flex-row'>
            <div className='w-full lg:w-[75%] carousel'>
                <Slider {...settings}>
                    <div>
                        <img src={gamingChari} alt="" />
                    </div>
                    <div>
                        <img src={laptopFlash} alt="" />
                    </div>
                    <div>
                        <img src={startechMegaSale} alt="" />
                    </div>
                    <div>
                        <img src={tvMega} alt="" />
                    </div>
                </Slider>
            </div>
            <div className=' grid grid-cols-1 gap-6'>
                <div className='bg-[#ffe8a1] p-4 '>
                    <h1 className='text-center mb-5'>Compare Product</h1>
                    <div className='grid grid-cols-1 gap-5'>
                        <div className='inputItem'>
                            <input type="text" placeholder='Search and Select Product' />
                            <button><BiSearchAlt2/></button>
                        </div>
                        <div className='inputItem'>
                            <input type="text" placeholder='Search and Select Product' />
                            <button><BiSearchAlt2/></button>
                        </div>
                        <button className='compareBtn'>View Comparison</button>
                    </div>
                </div>
                <div className='hidden lg:block'>
                    <img src={cashOut} className="h-full" alt="" />
                </div>
            </div>
        </div>
      </div>
    )
}

export default Header;