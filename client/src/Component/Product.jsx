import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Product.css';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Pagination from 'react-js-pagination'
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const Product = () => {
    // const [products, setProducts] = useState([]);
    const [counts, setCounts] = useState();
    const [size, setSize] = useState(8);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { loading, products, error, count } = useSelector(state => state?.products);
    // console.log(count)
    
    useEffect(() => {
        dispatch(getProducts(page, size));
        setCounts(count);
    }, [ page, size, error]);
    
    const pages = Number(Math.ceil(counts / size)) || 4;
    const arrayPages = [...Array(pages && pages).keys()];
    return (
        <>
        {
            loading ?    
                <div className='w-full h-screen flex items-center justify-center'><Spin/></div> 
                :
                <div className='max-w-7xl mx-auto px-5 py-[40px]'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
                        {
                            products?.map((product)=>
                                <Link to={`/productDetail/${product._id}`}>
                                    <div key={product._id} className='bg-white shadow-lg w-[300px] md:w-fit mx-auto rounded-[6px]'>
                                        <div className='px-5 pt-5'>
                                            <img src={product?.productPictures[0]?.img} alt="" />
                                        </div>
                                        <div className='divider'></div>
                                        <div className='p-5 flex flex-col justify-between'>
                                            <h3 className='text-[15px] font-[400]'>{product?.name}</h3>
                                            <p className='text-[#ef4a23] text-[17px] font-[600]'>{product?.price} ৳</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                    <section className="pagination mt-10 flex items-center justify-center" >
                        <div>

                            {
                                arrayPages?.map(number => <button
                                    key={number}
                                    className={page === number ? 'selected' : ''}
                                    onClick={() => setPage(number)}
                                    >
                                {number + 1}
                            </button>)
                            }
                        </div>
                        <select className='sizeContainer' onChange={event => setSize(event.target.value)}>
                                <option value="">Please choose an option</option>
                                <option value= "8">8</option>
                                <option value= "10">10</option>
                                <option value= "15">15</option>
                                <option value= "20">20</option>
                        </select>
                    </section>
                </div>
        }
        </>
        
    )
}

export default Product