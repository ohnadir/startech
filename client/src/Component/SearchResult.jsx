import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Style/SearchResult.css'
import { HiHome } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

const SearchResult = () => {
    const { keyword } = useParams();
    const navigate = useNavigate()
    const [searchProduct, setSearchProduct] = useState([]);
    useEffect(() => {
        axios.get(`https://startech-server.vercel.app/api/v1/products/products/search?q=${keyword}`)
            .then(function (response) {
                // setSearchProduct(response.data.data?.products)
                console.log(response)
    
            })
    }, [keyword]);

    useEffect(() => {
        fetch(`https://startech-server.vercel.app/api/v1/products/search?q=${keyword}`)
        .then((response) => response.json())
        .then((data) => {
            setSearchProduct(data?.products)
        });
    }, [keyword]);
    return (
        <div className='max-w-7xl mx-auto  searchResult'>
            
            <div className='p-5'>
                <div className='navigate'>
                    <HiHome onClick={()=>navigate('/home')} className='text-[#666] cursor-pointer'/> <span>/</span> 
                    <span className="cursor-pointer">Search</span> 
                </div>
                <h1 className='p-4 font-semibold searchHeader m-0 my-5'>Search - {keyword}</h1>
                <div className='grid grid-flow-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        searchProduct.map(product =>
                            <Link to={`/productDetail/${product._id}`}>
                                <div key={product._id} className="searchProduct">
                                    <div className='p-4'>
                                        <img className='w-[150px] mx-auto' src={product?.productPictures[0]} alt="" />
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
    );
};

export default SearchResult;