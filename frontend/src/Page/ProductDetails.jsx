import React from 'react'
import '../Style/ProductDetails.css';
import { HiHome } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import MetaData from '../Component/Meta';


const ProductDetails=()=> {
    const navigate = useNavigate()
  return (
    <div className='max-w-7xl mx-auto px-2'>
        <MetaData title={'Product Details'} />
        <div className='headerContainer'>
          <HiHome onClick={()=>navigate('/home')} className='headerLocation'/> 
          <span>/</span> 
          <span>Product Details</span> 
          <span>/</span>
          <span>Product Brand Name</span>
          <span>/</span>
          <span>Product Name</span>
        </div>
    </div>
  )
}

export default ProductDetails