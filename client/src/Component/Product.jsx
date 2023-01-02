import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/Product.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);
    
    useEffect(() => {
        fetch(`https://startech-server.vercel.app/api/v1/products?page=${page}&size=${size}`)
        .then((response) => response.json())
        .then((data) => {
            setCount(data.count);
            setProducts(data.products)
        });
    }, [page, size]);
    const pages = Math.ceil(count / size);

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
        <section className="pagination mt-10 flex items-center justify-center" >
            {
                [...Array(pages).keys()].map(number => <button
                    key={number}
                    className={page === number ? 'selected' : ''}
                    onClick={() => setPage(number)}>
                    {number + 1}
                </button>)
            }
            <select className='sizeContainer' onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
        </section>
    </div>
  )
}

export default Product