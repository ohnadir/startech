import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.scss';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/actions/products'
import Loader from "../Loader"

const Product = () => {
    const [counts, setCounts] = useState();
    const [size, setSize] = useState(8);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { loading, products, count } = useSelector(state => state?.products);
    
    useEffect(() => {
        dispatch(getProducts(page, size));
        setCounts(count);
    }, [ dispatch, page, size]);
    
    const pages = Number(Math.ceil(counts / size)) || 4;
    const arrayPages = [...Array(pages && pages).keys()];
    return (
        <>
            {
                loading
                ?    
                <Loader/>   
                :
                <div className='products'>
                    <div className='products-container'>
                        {
                            products?.map((product)=>
                                <Link to={`/productDetails/${product._id}`}>
                                    <div key={product._id} className='product-card'>
                                        <div className='img-container'>
                                            <img src={product?.productPictures[0]?.img} alt="" />
                                        </div>
                                        <div className='divider'></div>
                                        <div className='product-info'>
                                            <h3>{product?.name?.slice(0, 20) + "..."}</h3>
                                            <p>{product?.price} ৳</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                    <section className="pagination">
                        <div>
                            {
                                arrayPages?.map(number => 
                                    <button
                                        key={number}
                                        className={page === number ? 'selected' : ''} 
                                        onClick={() => setPage(number)}>
                                            {number + 1}
                                    </button>
                                )
                            }
                        </div>
                        <select className='size-btn-container' onChange={event => setSize(event.target.value)}>
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