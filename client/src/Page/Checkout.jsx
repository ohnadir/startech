import React, { useState } from 'react'
import '../Style/Checkout.css'
import { useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import District from "../Districts.json";
import Thana from "../Thana.json";
import MetaData from '../Component/Meta';
import { Alert } from 'antd';
import Payment from '../Component/Modal/Payment';

import { Modal } from 'antd';
import { CgLaptop } from 'react-icons/cg';

const ChangeAddress=()=> {
    const [auth, setAuth] = useState('');
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const total = parseInt(orderInfo?.price) + (auth.delivery === "homeDelivery" ? 60 : 0);
    const onSubmit = () => {
        if(auth.payment === "online" ){
            setModal(true);
        }
    }
  return (
    <div className='bg-[#f2f4f8]'>
        <div className='max-w-7xl mx-auto px-2  checkoutContainer'>
            <MetaData title={'Checkout'} />
            <div className='flex items-center gap-3 text-[13px] pt-4 pb-[30px]'>
                <HiHome onClick={()=>navigate('/')} className='text-[#666] cursor-pointer'/> 
                <span className='text-[#666]'>/</span> 
                <span className='text-[#666] cursor-pointer' onClick={()=>navigate('/profile')}>Shopping Cart</span> <span>/</span> 
                <span className='text-[#666] cursor-pointer' onClick={()=>navigate('/address')}>Checkout</span>
            </div>
            <div className=''>
                <Alert message="ইএমআই এর ক্ষেত্রে অবশ্যই ক্রেতার নির্দিষ্ট ব্যাংক এর ক্রেডিট কার্ড থাকতে হবে।" type="info" closable />
                <h1 className='text-xl py-[10px]'>Checkout</h1>
                <div className='flex flex-col md:flex-row gap-7'>
                    <div className='orderInformation w-full md:w-[40%]'>
                        <div className='flex items-center gap-3 mb-2 paymentCard'>
                            <span className='serial'>1</span>
                            <span className='serialInfo'>Customer Information</span>`
                        </div>
                        <div className='grid grid-cols-1 gap-7'>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className=''>
                                    <label htmlFor="firstName">First Name</label>
                                    <input onChange={handleChange} name='firstName'  type="text" placeholder='First Name' />
                                </div>
                                <div className=''>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input onChange={handleChange} name='lastName'  type="text" placeholder='Last Name' />
                                </div>
                            </div>
                            <div className=''>
                            <label htmlFor="Address">Address</label>
                            <input onChange={handleChange} name='address'  type="text" placeholder='Address' />
                            </div>
                            <div className=''>
                                <label htmlFor="Email">Email</label>
                                <input onChange={handleChange} name='email'  type="text" placeholder='Email' />
                            </div>
                            <div className=''>
                                <label htmlFor="Phone">Phone</label>
                                <input onChange={handleChange} name='phone'  type="text" placeholder='Phone' />
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='w-full'>
                                    <label htmlFor="District">Zone</label>
                                    <select onChange={handleChange} name="zone" id="country">
                                    {
                                        District.map((item)=><option  value={item.name}>{item.name}</option>)
                                    }
                                    </select>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="Thana">Thana</label>
                                    <select onChange={handleChange} name="thana" id="state">
                                    {
                                        Thana.map((item)=><option  value={item.name}>{item.name}</option>)
                                    }
                                    </select>
                                </div>
                            </div>
                            <div >
                                <label htmlFor="comment">Comment</label>
                                <textarea onChange={handleChange} className="mt-[5px] border outline-none w-full px-[15px]" name="comment"  cols="30" rows="5" placeholder='Comment'></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col grid-cols-1 gap-5 w-full md:w-[60%]'>
                        <div className='flex flex-col md:flex-row gap-7 '>
                            <div className='bg-white p-5 w-full'>
                                <div className='flex items-center gap-3 mb-2 paymentCard'>
                                    <span className='serial'>2</span>
                                    <span className='serialInfo'>Payment Method</span>
                                </div>
                                <h4>Select Payment Method</h4>
                                <ul>
                                    <li className='flex items-center gap-3'><input type="radio" onChange={handleChange} name='payment' value="cashOn" /> Cash on Delivery</li>
                                    
                                    <li className='flex items-center gap-3'><input type="radio" onChange={handleChange} name='payment' value="online" /> Online Payment</li>
                                </ul>
                                <div>
                                    <span className='text-[13px] font-semibold text-[#01132d] '>We Accepted :</span>
                                    <img className='mt-[13px]' src="https://www.startech.com.bd/catalog/view/theme/starship/images/card-logo.png" alt="" />
                                </div>
                            </div>
                            <div className='bg-white p-5  w-full'>
                                <div>
                                    <div className='flex items-center gap-3 mb-2 paymentCard'>
                                        <span className='serial'>3</span>
                                        <span className='serialInfo'>Delivery Method</span>
                                    </div>
                                    <h4>Select a delivery method</h4>
                                    <ul>
                                        <li className='flex items-center gap-3'><input onChange={handleChange}  type="radio" name='delivery' value="homeDelivery" /> Home Delivery - 60৳</li>
                                        <li className='flex items-center gap-3'><input onChange={handleChange}  type="radio" name='delivery' value="pickup" /> Store Pickup - 0৳</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='promoContainer bg-white p-5  flex justify-between gap-5'>
                            <div className='flex flex-col w-full lg:flex-row gap-5'>
                                <input type="text" placeholder='Gift Voucher' />
                                <button className='w-full lg:max-w-fit'>Apply Voucher</button>
                            </div>
                            <div className='flex flex-col w-full lg:flex-row gap-5'>
                                <input type="text" placeholder='Promo / Coupon Code' />
                                <button className='w-full lg:max-w-fit'>Apply Coupon</button>
                            </div>
                        </div>
                        <div className='bg-white p-5 orderOverview'>
                            <div className='flex items-center gap-3 mb-2 paymentCard'>
                                <span className='serial'>4</span>
                                <span className='serialInfo'>Order Overview</span>
                            </div>
                            <table>
                                <tr>
                                    <th className='text-left'>Product Name</th>
                                    <th className='text-left '>Price</th>
                                    <th className='text-right'>Total</th>
                                </tr>
                                <tr>
                                    <td>{orderInfo?.name}</td>
                                    <td>{orderInfo?.price} </td>
                                    <td className='amount w-fit'>$ {orderInfo?.price}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className='text-right font-bold'>{auth.delivery === "homeDelivery" ? "Home Delivery" : ""} {auth.delivery === "pickup" ? "Store Pickup" : ""}</td>
                                    <td className='amount'>{auth.delivery === "homeDelivery" ? 60 : ""} {auth.delivery === "pickup" ? 0 : ""}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className='text-right font-bold'>Total</td>
                                    <td className='amount'>{total}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='divider'></div>
            </div>
            <div className='flex flex-col md:flex-row justify-between py-6 gap-5'>
                <div className='flex items-center gap-4'>
                    <input onChange={handleChange} name='checkbox' value="checked" type="checkbox" />
                    <label htmlFor="">I have read and agree to the <span className='text-[#ef4a23]'>Terms and Conditions</span>, Privacy Policy and <span className='text-[#ef4a23]'>Refund and Return Policy</span></label>
                </div>
                <button onClick={onSubmit} disabled={auth?.checkbox==null} className='confirmBtn w-full md:max-w-fit '>Confirm Order</button>
            </div>
        </div>
        <Modal title="Payment options" 
            open={modal}
            footer={null}
            centered 
            onCancel={()=>setModal(false)}>
                <Payment auth={auth} total={total} setModal={setModal} />
      </Modal>
    </div>
  )
}
export default ChangeAddress;