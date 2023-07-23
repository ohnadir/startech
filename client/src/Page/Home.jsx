import React from 'react'
import Category from '../Component/Category';
import Footer from '../Component/Footer';
import Header from '../Component/Header';
import Marquee from '../Component/Marquee';
import SEO from '../Component/SEO';
import Product from '../Component/Products';
import SeoContent from '../Component/SeoContent';
import StockTimer from '../Component/StockTimer';

const Home =()=>{
    return (
      <div className='bg-[#f2f4f8]'>
        <SEO title={'Buy Your Fantasy product'} />
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