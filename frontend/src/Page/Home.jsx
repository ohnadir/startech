import React from 'react'
import Category from '../Component/Category';
import Header from '../Component/Header';
import Marquee from '../Component/Marquee';

const Home =()=>{
    return (
      <div className='bg-[#f2f4f8]'>
        <Header/>
        <Marquee/>
        <Category/>
        
      </div>
    )
}

export default Home;