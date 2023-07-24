import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import startechMegaSale from '../../assets/star-tech-mega-sale-home-banner-time-extended-982x500.webp';
import tvMega from '../../assets/tv-mega-deal-home-banner-982x500.jpg';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Header.scss';
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
      <div className='header'>
        <div className='header-container'>
            <div className='carousel'>
                <Slider {...settings}>
                    <div>
                        <img src="https://www.startech.com.bd/image/cache/catalog/home/banner/free-delivery-on-app-may-home-banner-982x500.webp" alt="" />
                    </div>
                    <div>
                        <img src="https://www.startech.com.bd/image/cache/catalog/home/banner/express-delivery-home-banner-june-982x500.webp" alt="" />
                    </div>
                    <div>
                        <img src={startechMegaSale} alt="" />
                    </div>
                    <div>
                        <img src={tvMega} alt="" />
                    </div>
                </Slider>
            </div>
            <div className='compare'>
                <div className='compare-container'>
                    <h1 className='heading'>Compare Product</h1>
                    <div className='input-container'>
                        <div className='input-item'>
                            <input type="text" onChange={handleChange} placeholder='Search and Select Product' />
                            <button><BiSearchAlt2/></button>
                            {
                                keyword
                                && 
                                <div className='search-result'>
                                    {
                                        searchProduct?.map((product)=> <p onClick={()=>handleSubmit(product)}>{product.name}</p>)
                                    }
                                </div>
                            }
                            
                        </div>
                        <div className='input-item'>
                            <input type="text" onChange={handleChange} placeholder='Search and Select Product' />
                            <button><BiSearchAlt2/></button>
                            {
                                keyword
                                && 
                                <div className='search-result'>
                                    {
                                        searchProduct?.map((product)=> <p onClick={()=>handleSubmit(product)}>{product.name}</p>)
                                    }
                                </div>
                            }
                        </div>
                        <button onClick={handleOnSubmit} className='compare-btn'>View Comparison</button>
                    </div>
                </div>
                <div className='cash-back-img'>
                    <img src="https://www.startech.com.bd/image/catalog/home/banner/budget-desktop-pc.webp" alt="" />
                </div>
            </div>
        </div>
      </div>
    )
}

export default Header;