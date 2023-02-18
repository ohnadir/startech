import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi';
import { FiFilter } from 'react-icons/fi';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "../Style/CategoryProduct.css";
import { Drawer } from 'antd';
import { Slider } from 'antd';

const BrandProduct = () => {
    const { keyword } = useParams();
    const [searchProduct, setSearchProduct] = useState([]);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState(false);
    const [sortCard, setSortCard] = useState(false)
    const [value, setValue] = useState([0, 100]);
    const [collapse, setCollapse] = useState(true)
    const navigate = useNavigate();

    const onAfterChange = (value) => {
        setValue(value);
    };

    useEffect(() => {
        axios.get(`https://startech-server.vercel.app/api/v1/products/search?brand=${keyword}`)
            .then(function (response) {
                setSearchProduct(response.data.products)
            })
    }, [keyword]);
    return (
        <div className='max-w-7xl mx-auto categoryProductContainer'>
            <header className='py-5'>
                <div className='navigate'>
                    <HiHome onClick={()=>navigate('/')} className='text-[#666] cursor-pointer'/> <span>/</span><span>{ keyword }</span>
                </div>
            </header>
            <section className="filter lg:hidden">
                <div className='flex items-center justify-between'>
                    <div className='filterContainer' onClick={()=> setOpen(true)}>
                        <FiFilter className='text-[18px] font-bold' />
                        <p className='m-0'>Filter</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='m-0'>Sort By:</p>
                        <div className='relative'>
                            <div className='sortContainer' onClick={()=>setSortCard(!sortCard)}>
                                <p className='m-0 text-[13px] font-semibold'>Default</p>
                                <MdOutlineKeyboardArrowDown className='text-[20px] ml-5'/>
                            </div>
                            {
                               sortCard &&
                                <div className='sortCard'>
                                    <ul className='m-0'>
                                        <li>Default</li>
                                        <li>Price (Low > High)</li>
                                        <li>Price (Hight > Low)</li>
                                    </ul>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </section>
            <section className='product flex gap-5'>
                <div className='w-[20%] m-0 p-0 hidden lg:block'>
                    <div className='drawer p-[10px] lg:p-0'>
                        <div className="rangeContainer">
                            <h1 className='m-0 px-[15px] pt-[15px] text-lg font-semibold'>Price Range</h1>
                            <div className='filterDivider'></div>
                            <div className='p-5'>
                                <Slider
                                    range
                                    step={1}
                                    tooltip="false"
                                    defaultValue={[0, 100]}
                                    onAfterChange={onAfterChange}
                                />
                                <div className='flex justify-between items-center pt-5'>
                                    <p className='m-0 border px-5'>{value[0]}</p>
                                    <p className='m-0 border px-5'>{value[1]}</p>
                                </div>
                            </div>
                        </div>
                        <div className='availability mt-3'>
                            <div className='flex justify-between items-center pt-[15px] px-[15px]'>
                                <h1 className='m-0    font-semibold'>Availability</h1>
                                {
                                        collapse ?
                                            <MdOutlineKeyboardArrowUp onClick={()=>setCollapse(!collapse)} className='text-[23px] cursor-pointer' /> 
                                        :
                                        <MdOutlineKeyboardArrowDown onClick={()=>setCollapse(!collapse)} className='text-[23px] cursor-pointer' />

                                    }
                            </div>
                            <div className='filterDivider'></div>
                            {
                                collapse &&
                                <div className='p-[15px] grid grid-cols-1 gap-2'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" name="stock" id="" />
                                        <label className='text-black' htmlFor="">In Stock</label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" name="preOrder" id="" />
                                        <label className='text-black' htmlFor="">Pre Order</label>
                                    </div>
                                    <div  className='flex items-center gap-2'>
                                        <input type="checkbox" name="upComing" id="" />
                                        <label className='text-black' htmlFor="">Up Coming</label>
                                    </div>
                                </div>
                            }
                        </div>
                        </div>
                    </div>
                <div className='grid grid-cols-1 w-full lg:w-[80%] sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
                    {
                        searchProduct?.map((product)=>
                            <Link to={`/productDetail/${product._id}` }>
                                <div key={product._id}  className='w-[300px] md:w-fit mx-auto singleProduct'>
                                    <div className='px-5 pt-5'>
                                        <img src={product?.productPictures[0].img} alt="" />
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
            
            <section className='drawer'>
                <Drawer
                    className='lg:hidden' 
                    bodyStyle={{"padding": "0px"}}
                    headerStyle={{"borderBottom": "0px ", "display": "none"}}
                    placement="right" closeIcon={false} 
                    onClose={()=> setOpen(false)}
                    open={open}>
                        <div className='drawer'>
                            <div className="rangeContainer">
                                <h1 className='m-0 px-[15px] pt-[15px] text-lg font-semibold'>Price Range</h1>
                                <div className='filterDivider'></div>
                                <div className='p-5'>
                                    <Slider
                                        range
                                        step={1}
                                        tooltip="false"
                                        defaultValue={[0, 100]}
                                        onAfterChange={onAfterChange}
                                    />
                                    <div className='flex justify-between items-center pt-5'>
                                        <p className='m-0 border px-5'>{value[0]}</p>
                                        <p className='m-0 border px-5'>{value[1]}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='availability mt-3'>
                                <div className='flex justify-between items-center pt-[15px] px-[15px]'>
                                    <h1 className='m-0    font-semibold'>Availability</h1>
                                    {
                                        collapse ?
                                            <MdOutlineKeyboardArrowUp onClick={()=>setCollapse(!collapse)} className='text-[23px] cursor-pointer' /> 
                                        :
                                        <MdOutlineKeyboardArrowDown onClick={()=>setCollapse(!collapse)} className='text-[23px] cursor-pointer' />

                                    }
                                </div>
                                <div className='filterDivider'></div>
                                {
                                    collapse &&
                                    <div className='p-[15px] grid grid-cols-1 gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <input type="checkbox" name="stock" id="" />
                                            <label className='text-black' htmlFor="">In Stock</label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <input type="checkbox" name="preOrder" id="" />
                                            <label className='text-black' htmlFor="">Pre Order</label>
                                        </div>
                                        <div  className='flex items-center gap-2'>
                                            <input type="checkbox" name="upComing" id="" />
                                            <label className='text-black' htmlFor="">Up Coming</label>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                            
                        </div>
                </Drawer>
            </section>
        </div>
    )
}

export default BrandProduct;