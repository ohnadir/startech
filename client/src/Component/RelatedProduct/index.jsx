import React, { useEffect, useState } from 'react'
import axios from 'axios';

const RelatedProduct = ({category, id}) => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    useEffect(() => {
        axios.get(`https://startech-server.vercel.app/api/v1/products/search?category=${category}`)
            .then(function (response) {
                setCategoryProduct(response.data.products)
            })
    }, [category]);
    const filterData = categoryProduct?.filter((item) => item._id !== id);
    return (
        <div className=''>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 ms:grid-cols-3 lg:grid-cols-4'>
                {
                    filterData?.map((product)=><div key={product?._id}>
                        <div className='border shadow-xl p-5'>
                            <img className='w-[200px] mx-auto' src={product?.productPictures[0].img} alt="" />
                            <p className='m-0 font-semibold py-1'>{product?.name}</p>
                            <p className='m-0 pb-2'>{product?.desc}</p>
                            <p className='m-0 font-semibold'>Price:- {product?.price}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default RelatedProduct