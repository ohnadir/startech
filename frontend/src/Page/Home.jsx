import React from 'react'
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import Marquee from '../Component/Marquee';
import MetaData from '../Component/Meta';
import Product from '../Component/Product';
import SeoContent from '../Component/SeoContent';
import StockTimer from '../Component/StockTimer';

const Home =()=>{
    return (
      <div className='bg-[#f2f4f8]'>
        <MetaData title={'StarTech'} />
        <Header/>
        <Marquee/>
        <Category/>
        <Product/>
        <StockTimer/>
        <SeoContent/>
        <Footer/>
        
      </div>
    )
}

export default Home;