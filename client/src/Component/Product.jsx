import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('/products')
        .then((response) => response.json())
        .then((data) => setProducts(data.products));
    }, []);

  return (
    <div className='max-w-7xl mx-auto px-5 py-[40px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {
                products?.map((product)=>
                    <Link to={`/productDetail/${product._id}`}>
                        <div key={product.id} className='bg-white shadow-lg w-[300px] md:w-fit mx-auto rounded-[6px]'>
                            <div className='px-5 pt-5'>
                                <img src={product?.productPictures[0]} alt="" />
                            </div>
                            <div className='divider'></div>
                            <div className='p-5 flex flex-col justify-between'>
                                <h3 className='text-[15px] font-[400]'>{product.name}</h3>
                                <p className='text-[#ef4a23] text-[17px] font-[600]'>{product?.price} ৳</p>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
            
    </div>
  )
}

export default Product