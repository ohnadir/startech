import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi';
import { BsFilter } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../Style/CategoryProduct.css";


const CategoryProduct = () => {
    const { keyword } = useParams();
    const [searchProduct, setSearchProduct] = useState([]);
    
    const navigate = useNavigate();
    useEffect(() => {
        // axios.get(`https://startech-server.vercel.app/search?q=${keyword}`)
        // axios.get(`/products/search?q=${keyword}`)
        axios.get("https://startech-server.vercel.app/api/v1/products")
            .then(function (response) {
                setSearchProduct(response.data.products)
            })
    }, [keyword]);
    return (
        <div className='max-w-7xl mx-auto categoryProductContainer'>
            <header>
                <div className='navigate'>
                    <HiHome onClick={()=>navigate('/home')} className='text-[#666] cursor-pointer'/> <span>/</span><span>Monitor { keyword }</span>
                </div>
            </header>
            <section className='brandName mb-5'>
                <ul className='flex items-center gap-5 w-fit flex-wrap m-0'>
                    <li>Dell</li>
                    <li>Hp</li>
                    <li>LG</li>
                    <li>Acer</li>
                    <li>GIGABYTE</li>
                </ul>
            </section>
            <section className="filter lg:hidden">
                <div className='flex items-center justify-between'>
                    <div className='filterContainer' onClick={()=> setOpen(true)}>
                        <FiFilter className='text-[18px] font-bold' />
                        <p className='m-0'>Filter</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='m-0'>Sort By:</p>
                        <div>
                            <div className='sortContainer'>
                                <p className='m-0 text-[13px] font-semibold'>Default</p>
                                <MdOutlineKeyboardArrowDown className='text-[20px] ml-5'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='product'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
                    {
                        searchProduct?.map((product)=>
                            <Link to={`/productDetail/${product._id}` }>
                                <div key={product._id}  className='w-[300px] md:w-fit mx-auto singleProduct'>
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
            </section>
            
            
    </div>
    )
}

export default CategoryProduct