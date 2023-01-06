import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
// import logo from '../assets/hr1.png';
import { Link } from 'react-router-dom'
import { getStoredCart, RemoveFromCart } from '../utils/cart';


const CartDrawer = () => {
    const storedCart = getStoredCart();
    const HandleRemove=(item)=>{
        RemoveFromCart(item);
    }

    return (
        <div className='p-4'>
            <div className='flex flex-col'>
                {
                    storedCart?.map((item)=> 
                        <div key={item.id}>
                            <div className='flex justify-between items-center border-b-[1px]'>
                                <img className='w-[50px]' src={item.img} alt="" />
                                <div>
                                    <h1 className='text-[16px]'>{item?.name}</h1>
                                    <h1>৳ {item?.price} X {item?.quantity}</h1>
                                </div>
                                <button onClick={()=>HandleRemove(item)}><AiOutlineClose className='text-[18px]' /></button>
                            </div>
                            
                        </div>

                    )
                }
            </div>
            <div className='mt-5 font-bold text-xl text-[#679509] flex justify-between'>
                                <span className=''>Total:-</span> <span>$500</span>
                            </div>
            <div className="bottom-0 absolute left-0 w-full px-4">
                <div>
                    <div className='flex gap-5 items-center bg-[#ebecf8] p-[8px] '>
                        <input type="text" className='w-full h-[33px] px-2' placeholder='Promo Code' />
                        <button className='bg-[#3749bb] h-[33px] px-4 text-white'>Apply</button>
                    </div>
                    <div className='py-10'>
                        <div className='flex justify-end gap-16'>
                            <h2>Sub-Total</h2>
                            <h2>12220</h2>
                        </div>
                        <div className='flex justify-end gap-16'>
                            <h2>Total</h2>
                            <h2>42220</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;