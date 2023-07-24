import React, { useEffect, useState } from 'react'
import './Checkout.scss'
import { useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import District from "../../JSON/Districts.json";
import Thana from "../../JSON/Thana.json";
import SEO from '../../Component/SEO';
import { Alert, message } from 'antd';
import Payment from './Payment';
import { getStoredCart } from "../../utils/cart"
import { Modal } from 'antd';
import { BsTrash } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { newOrder } from "../../redux/actions/orders"

const Checkout=()=> {
    const [messageApi, contextHolder ] = message.useMessage();
    const [auth, setAuth] = useState('');
    const [payment, setPayment] = useState()
    const { user } = useSelector(state => state.auth);
    const { order } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    useEffect(()=>{
        if(auth.payment === "online" ){
            setModal(true);
        }
    }, [auth.payment])
    
    const orders = getStoredCart()
    const total = orders?.reduce((n, {price, quantity}) => n + parseInt(price) * parseInt(quantity), 0)
    const handleSubmit = () => {
        const order = {
            productInfo: orders,
            shippingInfo : {
                firstName: auth.firstName,
                lastName: auth.lastName,
                email : auth.email,
                phone: auth.phone,
                address : auth.address,
                country: auth.country,
                zone : auth.zone,
                thana: auth.thana,
                comment: auth.comment
            },
            paymentStatus : {
                id : payment?.id,
                status : payment?.status 
    
            },
            deliveryMethod : auth.deliveryMethod,
            paymentMethod : auth?.payment,
            discount : 0,
            total : total + Number(auth?.delivery === "homeDelivery" ? 60 : 0),
            userEmail : user.email,
            userName : auth.firstName + auth.lastName
        }
        dispatch(newOrder(order))
    }
    useEffect(()=>{
        if(order?._id){
            messageApi.success("Order is successful")
            setTimeout(() => {
                localStorage.removeItem("shopping-cart");
                navigate(`/invoice/${order?._id}`)
            }, 1000);
        }
    },[order]);
    return (
        <>
            {contextHolder}
            <div className='bg-[#f2f4f8]'>
                <div className='max-w-7xl mx-auto px-2  checkoutContainer'>
                    <SEO title={'Checkout'} />
                    <div className='flex items-center gap-3 text-[13px] pt-4 pb-[30px]'>
                        <HiHome onClick={()=>navigate('/')} className='text-[#666] cursor-pointer'/> 
                        <span className='text-[#666]'>/</span> 
                        <span className='text-[#666] cursor-pointer' onClick={()=>navigate('/profile')}>Shopping Cart</span> <span>/</span> 
                        <span className='text-[#666] cursor-pointer' onClick={()=>navigate('/address')}>Checkout</span>
                    </div>
                    <div className=''>
                        <Alert message="This card number for online payment:- 4242424242424242 and year will be up to 23 and cvc & zip will be any 3 & 4 digits number" type="info" closable />
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
                                                <li className='flex items-center gap-3'><input onChange={handleChange}  type="radio" name='delivery'  value="pickup" /> Store Pickup - 0৳</li>
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
                                            <th className='text-left '>Quantity</th>
                                            <th className='text-right'>Total</th>
                                            <th className='text-right'>Action</th>
                                        </tr>
                                        {
                                            orders?.map((order, index)=>
                                                <tr key={index}>
                                                    <td>{order?.name}</td>
                                                    <td>{order?.price}</td>
                                                    <td>
                                                        <div className="btn-container">
                                                            <button>-</button>
                                                            <button>{order?.quantity}</button>
                                                            <button>+</button>
                                                        </div>
                                                    </td>
                                                    <td>{order?.total}</td>
                                                    <td>
                                                        <div className='delete-btn'>
                                                            <BsTrash/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </table>
                                    <div className='price-container'>
                                        <div className='price-item'>
                                            <p className='text-center'>Sub-total:-</p>
                                            <p className='price-count'>{total} ৳</p>
                                        </div>
                                        <div className='price-item'>
                                            <p className='delivery'>{auth?.delivery ==="homeDelivery" ? "Home Delivery" : "Store Pickup"}:-</p>
                                            <p className='price-count'>{auth?.delivery ==="homeDelivery" ? 60 : 0} ৳</p>
                                        </div>
                                        <div className='price-item'>
                                            <p className='text-right'>Total:-</p>
                                            <p className='price-count'>{total + (auth?.delivery ==="homeDelivery" ? 60 : 0)} ৳</p>
                                        </div>
                                    </div>
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
                        <button onClick={handleSubmit} disabled={auth?.checkbox==null} className='confirmBtn w-full md:max-w-fit '>Confirm Order</button>
                    </div>
                </div>
                {
                    modal
                    &&
                    <Modal title="Payment options" open={modal} footer={null} centered onCancel={()=>setModal(false)}>
                        <Payment setModal={setModal} total={total + (auth?.delivery ==="homeDelivery" ? 60 : 0)} setPayment={setPayment} />
                    </Modal>
                }
            </div>
        </>
    )
}
export default Checkout;