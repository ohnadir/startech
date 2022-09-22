import React from 'react'
import Category from '../Component/Category';
import Header from '../Component/Header';
import Marquee from '../Component/Marquee';
import SeoContent from '../Component/SeoContent';
import StockTimer from '../Component/StockTimer';

const Home =()=>{
    return (
      <div className='bg-[#f2f4f8]'>
        <Header/>
        <Marquee/>
        <Category/>
        <StockTimer/>
        <SeoContent/>
        
      </div>
    )
}

export default Home;