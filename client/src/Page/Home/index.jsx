import React from 'react'
import Category from '../../Component/Category';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import Marquee from '../../Component/Marquee';
import SEO from '../../Component/SEO';
import Product from '../../Component/Products';
import SeoContent from '../../Component/SeoContent';
import StockTimer from '../../Component/StockTimer';
import './Home.scss'

const Home =()=>{
    return (
      <div className='home'>
        <div className='home-container'>
          <SEO title={'Buy Your Fantasy product'} />
          <Header/>
          <Marquee/>
          <Category/>
          <StockTimer/>
          <Product/>
          <SeoContent/>
        </div>
          <Footer/>
      </div>
    )
}

export default Home;