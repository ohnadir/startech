import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi';
import { FiFilter } from 'react-icons/fi';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import "./BrandProduct.scss";
import { Drawer, Slider } from 'antd';
import SEO from '../../Component/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterProducts } from "../../redux/actions/products"

const BrandProduct = () => {
    const { brand } = useParams();
    const [searchProduct, setSearchProduct] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortCard, setSortCard] = useState(false)
    const [value, setValue] = useState([0, 100]);
    const [collapse, setCollapse] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products, loading } = useSelector(state=> state.searchProduct);
    const keyword = ''
    const category = ''
    useEffect(() => {
        dispatch(getFilterProducts(keyword, category, brand))
    }, [ dispatch, brand ]);

    const onAfterChange = (value) => {
        setValue(value);
    };
    return (
        <div className='brand-product'>
            <SEO title={"Brand Product"} />
            <header className='brand-product-header'>
                <Link style={{color: "black"}}  to='/'>
                    <HiHome className='home-icon'/>
                </Link>
                <span>/</span>
                <span>Brand Product</span>
                <span>/</span>
                <span className='capitalize'>{ brand }</span>
            </header>
            <section className="filter-container">
                <div className='filter' onClick={()=> setOpen(true)}>
                    <FiFilter className='text-[18px] font-bold' />
                    <p className='m-0'>Filter</p>
                </div>
                <div className='sort'>
                    <p className='sort-title'>Sort By:</p>
                    <div className='sort-container' onClick={()=>setSortCard(!sortCard)}>
                        <p>Default</p>
                        {
                            sortCard
                            ?
                            <MdOutlineKeyboardArrowDown className='icon'/>
                            :
                            <MdOutlineKeyboardArrowUp className='icon'/>
                        }
                    </div>
                    {
                        sortCard
                        &&
                        <div className='price-sort'>
                            <ul>
                                <li>Default</li>
                                <li>Price (Low &gt; High)</li>
                                <li>Price (Hight &gt; Low)</li>
                            </ul>
                        </div>
                    }
                </div>
            </section>

            <section className='products'>
                <aside className='border'>
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
                </aside>
                <div className='products-container'>
                    {
                        products?.map((product)=>
                            <Link key={product._id} to={`/productDetails/${product._id}` }>
                                <div className='single-product'>
                                    <div className='img-container'>
                                        <img src={product?.productPictures[0].img} alt="" />
                                    </div>
                                    <div className='divider'></div>
                                    <div className='mt-4 flex px-3 flex-col justify-between'>
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