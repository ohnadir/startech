import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import gamingChari from '../assets/gaming-chair-deal-webbanner18-982x500.jpg';
import laptopFlash from '../assets/laptop-flash-sale-1992-home-982x500 (1).jpg';
import startechMegaSale from '../assets/star-tech-mega-sale-home-banner-time-extended-982x500.webp';
import tvMega from '../assets/tv-mega-deal-home-banner-982x500.jpg';
import cashOut from '../assets/nagad-cashback.jpg'
import { BiSearchAlt2 } from 'react-icons/bi';
import '../Style/Header.css';
import { useNavigate } from 'react-router-dom';

const Header =()=>{
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const [searchProduct, setSearchProduct] = useState([]);
    const handleChange=(e)=>{
        setKeyword(e.target.value);
    }

    useEffect(() => {
        if(keyword){
            fetch(`https://startech-server.vercel.app/api/v1/products/search?keyword=${keyword}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchProduct(data.products);
            });
        }
    }, [keyword]);

    const handleSubmit=(product)=>{
        if(product){
            let compareCart = [];
            const compare = localStorage.getItem('compareCart');
            if(compare){
                compareCart = JSON.parse(compare);
            }
            compareCart.push(product);
            localStorage.setItem('compareCart', JSON.stringify(compareCart));
            setKeyword('');
        }
    }
    const handleOnSubmit=()=>{
        const compare = JSON.parse(localStorage.getItem('compareCart'));
        if(compare?.length === 2){
            navigate('/compareProduct')
        }
    }
    const settings = {
        arrows:false,
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
                        <div className='inputItem relative'>
                            <input type="text" onChange={handleChange} placeholder='Search and Select Product' />
                            <button><BiSearchAlt2/></button>
                            {
                                keyword && 
                                <div className='bg-white absolute z-10 w-full h-[100px] overflow-x-scroll top-10 left-0'>
                                <div>
                                    {
                                        searchProduct.map((product)=> <p onClick={()=>handleSubmit(product)} className='hover:bg-slate-300 px-2 py-2 m-0'>{product.name}</p>)
                                    }
                                </div>
                            </div>
                            }
                            
                        </div>
                        <div className='inputItem'>
                            <input type="text" onChange={handleChange} placeholder='Search and Select Product' />
                            <button><BiSearchAlt2/></button>
                        </div>
                        <button onClick={handleOnSubmit} className='compareBtn'>View Comparison</button>
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