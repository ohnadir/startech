import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
import { getStoredCart, RemoveFromCart } from '../utils/cart';


const CartDrawer = () => {
    const storedCart = getStoredCart();
    console.log(storedCart);
    const HandleRemove= (item)=>{
        RemoveFromCart(item);
    }
    const total = storedCart?.reduce((n, {price, quantity}) => n + parseInt(price) * parseInt(quantity), 0)
    return (
        <>
            {
            storedCart === '' ?
            <h1>nadir</h1>
            :
            <div className='p-4'>
                    <div className='flex flex-col'>
                        {
                            storedCart?.map((item)=> 
                                <div key={item.id}>
                                    <div className='flex justify-between items-center border-b-[1px] py-2'>
                                        <img className='w-[50px]' src={item.image.img} alt="" />
                                        <div className='ml-3'>
                                            <h1 className='text-[13px]'>{item?.name}</h1>
                                            <h1 className='text-[13px]'>৳ {item?.price} X {item?.quantity}</h1>
                                        </div>
                                        <button onClick={()=>HandleRemove(item)}><AiOutlineClose className='w-7 h-7 ml-3 text-red-600 rounded-full p-2 bg-red-100' /></button>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                    <div className='mt-5 font-bold text-xl text-[#679509] flex justify-between'>
                        <span className='text-[16px]'>Total:-</span> <span className='text-[16px]'>$ {total}</span>
                    </div>
                    <div className="bottom-0 absolute left-0 w-full px-4">
                        <div className='flex gap-5 items-center bg-[#ebecf8] p-[8px] '>
                            <input type="text" className='w-full h-[33px] px-2' placeholder='Promo Code' />
                            <button className='bg-[#3749bb] h-[33px] px-4 text-white'>Apply</button>
                        </div>
                    </div>
                </div>
                
            }
        </>
        
    );
};

export default CartDrawer;