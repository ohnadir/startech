import React, { useState } from 'react'
import '../Style/ProductDetails.css';
import { HiHome } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import MetaData from '../Component/Meta';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { CgBookmark } from 'react-icons/cg';
import { DiGitCompare } from 'react-icons/di';
import { AiFillStar } from 'react-icons/ai';
import { MdAssignment } from 'react-icons/md';
import Rating from 'react-rating';
import { Modal } from 'antd';
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";



const photos = [
    "https://i.ibb.co/jJgD3CF/1.webp",
    "https://i.ibb.co/TTcdMvP/2-2.webp",
    "https://i.ibb.co/B32Btjx/3.webp",
    "https://i.ibb.co/dksqrfX/4.webp"
]
const ProductDetails=()=> {
    const navigate = useNavigate();
    const [selectedImg, setSelectedImg] = useState(photos[0]);
    const [count, setCount] = useState(1);
    const [review, setReview] = useState([]);
    const [createReview, setCreateReview] = useState(false);
    const [auth, setAuth] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
    }
  return (
    <div className='max-w-7xl mx-auto px-2'>
        <MetaData title={'Product Details'} />
        <div className='headerContainer'>
          <HiHome onClick={()=>navigate('/home')} className='headerLocation'/> 
          <span>/</span> 
          <span className='headerLocation'>Product Details</span> 
          <span>/</span>
          <span className='headerLocation'>Product Brand Name</span>
          <span>/</span>
          <span className='headerLocation'>Product Name</span>
        </div>
        <div className='shareContainer'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='hidden sm:block'>Share:</span>
                    <FaFacebookF className='shareBtn text-[16px]'/>
                    <FaPinterestP className='shareBtn text-[16px]'/>
                </div>
                <div className='compareContainer'>
                    <button className='comBtn'><CgBookmark className='text-[20px] '/><span className='hidden sm:block'>Save</span></button>
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
                            photos.map((img, index) => <div
                                style={{border :selectedImg === img ? "1px solid #679509" : "1px solid transparent" }}
                                className='mx-auto'>
                                <img
                                    className=' w-[106px]'
                                    key={index}
                                    src={img}
                                    alt="fruits"
                                    onClick={()=>setSelectedImg(img)}
                                />    
                            </div>)
                        }
                    </div>
                </div>
                <div className='w-full md:w-[60%] p-2'>
                    {/* <Rating
                        initialRating={3.5}
                        emptySymbol={<AiFillStar/>}
                        fullSymbol={<AiFillStar style={{color: 'goldenrod'}}  />}
                        readonly
                    ></Rating> */}
                    <h1 className='text-lg font-bold'>Apple MacBook Air (2022) Apple M2 Chip 13.6-Inch Liquid Retina Display 8GB RAM 256GB SSD Space Gray #MLXW3LL/A / MLXW3ZP/A </h1>
                    <div className='pt-[15px]  flex gap-3'>
                        <div className='priceContainer'>
                            <span className='criteria'>Price: </span>
                            <span className='value'>165,000৳</span>
                        </div>
                        <div className='priceContainer'>
                            <span className='criteria'>Regular Price: </span>
                            <span className='value'>165,000৳</span>
                        </div>
                        <div className='priceContainer'>
                            <span className='criteria'>Status: </span>
                            <span className='value'>165,000৳</span>
                        </div>
                        <div className='priceContainer'>
                            <span className='criteria'>Product Code</span>
                            <span className='value'>165,000৳</span>
                        </div>
                        <div className='priceContainer'>
                            <span className='criteria'>Brand: </span>
                            <span className='value'>Apple</span>
                        </div>
                        
                    </div>
                    <div className='details'>
                        <h3 className='text-black text-[16px]'>Key Features</h3>
                        <ul>
                            <li>MPN: </li>
                            <li>Model: </li>
                            <li>Processor: </li>
                            <li>RAM: </li>
                            <li>Display: </li>
                            <li>Features: </li>
                        </ul>
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
                    <h3 className='text-[18px] text-black'>Payment Options</h3>
                        <div className='grid grid-cols-1 gap-5'>
                            
                            <div className='paymentItem'>
                                <div className='input'>
                                    <input type="radio" name="" id="" />
                                </div>
                                <div className='flex flex-col py-[8px]'>
                                    <span className='text-[20px] font-semibold'>10, 500৳</span>
                                    <span className='text-black '>Cash Discount PRice</span>
                                    <span> Online / Cash Payment</span>
                                </div>
                            </div>
                            <div className='paymentItem'>
                                <div className='input'>
                                    <input type="radio" name="" id="" />
                                </div>
                                <div className='flex flex-col py-[8px]'>
                                    <span className='text-[20px] font-semibold'>10, 500৳</span>
                                    <span className='text-black '>Cash Discount PRice</span>
                                    <span> Online / Cash Payment</span>
                                </div>
                            </div>
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
        </div>
        <div className='mt-[30px]'>
            <div className=' flex flex-col md:flex-row gap-2 md:justify-between md:items-center'>
                <div>
                    <h1 className='text-black text-xl'>Review (0)</h1>
                    <p>Get specific details about this product from customers who own it.</p>
                </div>
                <div>
                    <button onClick={()=> setCreateReview(!createReview)} className='reviewBtn'>Write a Review</button>
                </div>
            </div>
            { createReview && <div className='pt-3'>
                <div>
                    <div className='review grid grid-cols-1 gap-3'>
                        <div>
                            <label htmlFor="review">Write Review</label>
                            <input name='review' onChange={handleChange} type="text" placeholder='Write Review' />
                        </div>
                        <div>
                            <label htmlFor="review">Rating</label>  
                            <input name='rating' onChange={handleChange} disabled={auth.rating <=0}  type="number" placeholder='Write Rating' />
                        </div>
                        <button  className='max-w-fit px-5 py-2  bg-[#3749bb] text-white'>Continue</button>
                    </div>
                </div>
            </div>
            }
            {
                (review.length=0) ? <div>
                    
                </div>
                 : 
                <div className='flex justify-center items-center py-16'>
                    <div>
                    
                        <MdAssignment className='reviewIcon mx-auto '/>
                        <p className='pt-4'>This product has no reviews yet. Be the first one to write a review.</p>
                    </div>
                </div>
            }
            {
                modalOpen && <Modal
                centered
                visible={modalOpen}
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
                                <span className='cartValue'>0</span>
                            </div>
                        </div>
                    </div>
                    <div className=' '>
                        <button className='cartBtn'>View Cart</button>
                        <button onClick={()=>navigate('/checkout')} className='orderBtn'>Confirm Order</button>
                    </div>
                </div>
              </Modal>
            
            }
        </div>
    </div>
  )
}

export default ProductDetails