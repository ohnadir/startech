import React, { useEffect, useState } from 'react'
import '../Style/ProductDetails.css';
import { HiHome } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import SEO from '../Component/SEO';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { DiGitCompare } from 'react-icons/di';
import { MdAssignment } from 'react-icons/md';
import { Modal, Spin } from 'antd';
import { AiFillCheckCircle } from "react-icons/ai"
import { BsCart, BsCheckLg } from "react-icons/bs"
import { useParams  } from 'react-router-dom';
import { addToCart } from '../utils/cart';
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../actions/productActions'
import image from "../assets/images.png"
import Review from '../Component/Review';
import RelatedProduct from '../Component/RelatedProduct';
import { message } from 'antd';

const ProductDetails=()=> {
    const [messageApi, contextHolder ] = message.useMessage();
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productDetails);
    const [selectedImg, setSelectedImg] = useState(image);
    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            dispatch(clearErrors())
        }
    }, [dispatch, id, error]);

    const handleCart=()=>{
        const data = {
            id:product?._id,
            name: product?.name,
            image : product?.productPictures[0],
            price: product?.price,
            quantity : count,
            total: Number(product?.price) * Number(count)
        }
        if(data){
            messageApi.success("Product added cart");
            addToCart(data)
        }
    }
    return (
        <>
            {contextHolder}
            {
                loading
                ? 
                <div className='w-full h-screen flex items-center justify-center'>
                    <Spin/>
                </div>
                :
                <div className='max-w-7xl mx-auto px-10'>
                    <SEO title={'Product Details'} />
                    <div className='headerContainer'>
                        <HiHome onClick={()=>navigate('/')} className='headerLocation'/> 
                        <span>/</span> 
                        <span className='headerLocation'>Product Details</span> 
                        <span>/</span>
                        <span className='headerLocation'>{product?.brand}</span>
                        <span>/</span>
                        <span className='headerLocation'>{product?.name}</span>
                    </div>
                    <div className='shareContainer'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='hidden sm:block'>Share:</span>
                                <FaFacebookF className='shareBtn text-[16px]'/>
                                <FaPinterestP className='shareBtn text-[16px]'/>
                            </div>
                            <div className='compareContainer'>
                                <button onClick={handleCart} className='comBtn'><BsCart className='text-[18px] '/><span className='hidden sm:block'>Add to Cart</span></button>
                                <button className='comBtn'><DiGitCompare className='text-[20px]'/><span className='hidden sm:block'>Add To Compare</span></button>
                            </div>
                        </div>
                    </div>
                    <div className='productContainer pt-4'>
                        <div className='flex flex-col md:flex-row'>
                            <div className=' w-full md:w-[40%] p-2'>
                                <img className='mx-auto w-[450px]' src={selectedImg} alt="" />
                                <div className='flex '>
                                    {
                                        product?.productPictures?.map((item) => <div
                                            key={item.id}
                                            style={{border :selectedImg === item.img ? "1px solid #ef4a23" : "1px solid transparent" }}
                                            className='mx-auto'>
                                            <img
                                                className=' w-[106px]'
                                                key={item.id}
                                                src={item.img}
                                                alt="fruits"
                                                onClick={()=>setSelectedImg(item?.img)}
                                            />    
                                        </div>)
                                    }
                                </div>
                            </div>
                            <div className='w-full md:w-[60%] p-2'>
                                
                                <h1 className='text-lg font-bold'>{product?.name}</h1>
                                <div className='pt-[15px]  flex gap-3 flex-wrap'>
                                    <div className='priceContainer'>
                                        <span className='criteria'>Price: </span>
                                        <span className='value'>{product?.price}৳</span>
                                    </div>
                                    <div className='priceContainer'>
                                        <span className='criteria'>Regular Price: </span>
                                        <span className='value'>{parseInt(product?.price) + 200 }৳</span>
                                    </div>
                                    <div className='priceContainer'>
                                        <span className='criteria'>Status: </span>
                                        <span className='value'>In Stock</span>
                                    </div>
                                    <div className='priceContainer'>
                                        <span className='criteria'>Product Code: </span>
                                        <span className='value'>252525</span>
                                    </div>
                                    <div className='priceContainer'>
                                        <span className='criteria'>Brand: </span>
                                        <span className='value'>Logitech</span>
                                    </div>
                                    
                                </div>
                                <div className='details'>
                                    <h3 className='text-black text-[16px]'>Key Features</h3>
                                    <p>{product?.desc}</p>
                                </div>
                                <div>
                                    <div className='pointContainer'>
                                        <div ><FaStar className='icon'/></div>
                                        <div className='flex items-center gap-1'>
                                            <span className='price'>120</span>
                                            <span className='point'>Star Point</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='paymentOption '>
                                    <div className='flex gap-5 '>
                                        <div className='countContainer flex'>
                                            <button className='minusBtn' disabled={count <= 1} onClick={()=>setCount(count - 1)}  >-</button>
                                            <input className='outline-0 w-20 px-8' type="text" value={count} />
                                            <button className='plusBtn' onClick={()=>setCount(count + 1)} >+</button>
                                        </div>
                                        <button onClick={() => setModalOpen(true)} className='buyBtn'>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-[30px]'>
                        <Review id={product?._id} product={product} />
                        {
                            product?.reviews?.length===0 ? <div>
                                <div className='flex justify-center items-center py-16'>
                                <div>
                                
                                    <MdAssignment className='reviewIcon mx-auto '/>
                                    <p className='pt-4'>This product has no reviews yet. Be the first one to write a review.</p>
                                </div>
                            </div>
                            </div>
                            : 
                            <div className='mt-10'>
                                {
                                    product?.reviews?.map((item)=><div className='border'>
                                        <p className='m-0'>{item.userName}</p>
                                        <p className='m-0'>{item.rating}</p>
                                        <p className='m-0'>{item.comment}</p>
                                    </div>)
                                }
                            </div>

                            
                        }
                        {
                            modalOpen && <Modal
                            centered
                            open={modalOpen}
                            onCancel={() => setModalOpen(false)}
                            bodyStyle={{padding:"0", margin:"0", border:"none" }}
                            width={1000}
                            footer={null}
                        >
                            <div className='p-4 '>
                                <div className='flex flex-col md:flex-row justify-between mt-8 gap-6'>
                                    <div className=''>
                                        <div className='flex items-center gap-3 p-0 m-0'>
                                            <AiFillCheckCircle className='text-[#15b579] text-3xl'/>
                                            <span>You have added <span className='dynamicValue text-[#ef4a23]'>Razer DeathAdder Essential Gaming Mouse</span> to your shopping cart!</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col border p-2 w-[200px]'>
                                        <div className='flex justify-between'>
                                            <span className='cartCriteria'>Cart Quantity: </span>
                                            <span className='cartValue'>{count}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='cartCriteria'>Cart Total:</span>
                                            <span className='cartValue'>{count}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className='cartBtn'>View Cart</button>
                                    <button onClick={()=>navigate('/checkout')} className='orderBtn'>Confirm Order</button>
                                </div>
                            </div>
                        </Modal>
                        
                        }
                    </div>
                    <div className='pb-12'>
                        <h1 className='text-center font-bold text-2xl'>Related Product</h1>
                        <RelatedProduct id={product?._id} category={product?.category}/>
                    </div>
                </div>
            }
        </>
    
  )
}

export default ProductDetails