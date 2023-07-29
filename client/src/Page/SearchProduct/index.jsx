import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SearchProduct.scss'
import { HiHome } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { getFilterProducts } from "../../redux/actions/products"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../../Component/Loader';
import SEO from '../../Component/SEO';

const SearchProduct = () => {
    const { keyword } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products, loading } = useSelector(state=> state.searchProduct);
    useEffect(() => {
        dispatch(getFilterProducts(keyword))
    }, [ dispatch, keyword ]);
    return (
        <>
            {
                loading
                ?
                <Loader/>
                :
                    <div className='max-w-7xl mx-auto  SearchProduct'>
                        <SEO title={"Search Product"} />
                        <div className='p-5'>
                            <div className='navigate'>
                                <HiHome onClick={()=>navigate('/')} className='text-[#666] cursor-pointer'/> <span>/</span> 
                                <span className="cursor-pointer">Search</span> 
                            </div>
                            <h1 className='p-4 font-semibold searchHeader m-0 my-5'>Search - {keyword}</h1>
                            <div className='grid grid-flow-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                                {
                                    products?.map(product =>
                                        <Link to={`/productDetail/${product._id}`}>
                                            <div key={product._id} className="searchProduct">
                                                <div className='p-4'>
                                                    <img className='w-[150px] mx-auto' src={product?.productPictures[0].img} alt="" />
                                                    <h1 className='text-black font-semibold text-[13px] pt-5'>{product?.name}</h1>
                                                    <p className='text-[14px] m-0 pb-2 text-[#666]'>{product?.desc}</p>
                                                    <h1 className='text-[#ef4a23] text-[16px] font-semibold'>{product?.price}৳</h1>
                                                </div>
                                            </div>
                                        </Link> 
                                    )
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
        
    );
};

export default SearchProduct;