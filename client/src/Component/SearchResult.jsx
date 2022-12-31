import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
    const { keyword } = useParams()

    const [searchProduct, setSearchProduct] = useState([]);
    useEffect(() => {
        axios.get(`/products/search?q=${keyword}`)
            .then(function (response) {
                setSearchProduct(response.data.data?.products)
    
            })
    }, [keyword]);
    return (
        <div className='max-w-7xl mx-auto px-4'>
            
            <div>
                <h1 className='p-10'>Nadir {searchProduct?.length}</h1>
                <div className='grid grid-flow-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        searchProduct.map(product => <div key={product._id} className="">
                            <div className='border'>
                                <img className='w-[150px]' src={product?.productPictures[0]} alt="" />
                                <h1>{product?.name}</h1>
                                <h1>{product?.desc}</h1>
                                <h1>{product?.price}</h1>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchResult;