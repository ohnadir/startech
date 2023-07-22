import React, {  useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import {  CgProfile } from 'react-icons/cg';
import { BsCartCheckFill} from 'react-icons/bs';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Navbar.scss'
import logo from '../../assets/logo.png';
import { Drawer } from 'antd';
import { MdOutlineClose } from 'react-icons/md';
import { MdAssignment } from 'react-icons/md';
import { getStoredCart, RemoveFromCart } from '../../utils/cart';
const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [keyword, setKeyword] = useState('');
    const handleSearch=()=>{
        if(keyword){
            navigate(`/search/${keyword}`)
        }
    }
    const storedCart = getStoredCart();
    const HandleRemove= (item)=>{
        RemoveFromCart(item);
    }
    const handleCheckout=()=>{
        setCartOpen(false)
        navigate('/checkout')
    }
    const total = storedCart?.reduce((n, {price, quantity}) => n + parseInt(price) * parseInt(quantity), 0)
    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <div className='brand'>
                    <img onClick={()=>navigate('/')} src={logo} alt="" />
                </div>
                <div className='search-container'>
                    <input onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='KHUJ, THE SEARCH' />
                    <button onClick={handleSearch}><BiSearchAlt2/></button>
                </div>
                <div className='option-container'>
                    <BiSearchAlt2 onClick={()=>setOpen(!open)} size={26} className='mobile-search-btn mt-[5px] cursor-pointer text-white'/>
                    <div className="cart-container">
                        <BsCartCheckFill onClick={()=>setCartOpen(true)} className='cursor-pointer text-2xl text-white' />
                        <div className="cart-counter">
                            <p> { storedCart ? storedCart?.length : 0 } </p>
                        </div>
                    </div>
                    <CgProfile onClick={()=>navigate('/profile')} size={28} className='cursor-pointer text-white' />
                </div>
            </div>
            {
                open 
                && 
                <div className='mobile-search'>
                    <div className='mobile-search-container'>
                        <input  onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='KHUJ, THE SEARCH' />
                        <button onClick={handleSearch}><BiSearchAlt2/></button>
                    </div>
                </div> 
            }
            {
                cartOpen && 
                <Drawer 
                bodyStyle={{"padding": "0px"}}
                headerStyle={{"borderBottom": "0px ", "display": "none"}} 
                placement="right" 
                onClose={()=>setCartOpen(false)}  open={cartOpen}>
                    <div className='drawer-header'>
                        <h1 className=' text-white'>YOUR CART</h1>
                        <div className='cartCloseBtn'>
                            <MdOutlineClose  onClick={()=>setCartOpen(false)} />
                        </div>
                    </div>
                    <div className='drawer-body'>
                        {
                            storedCart?.length === 0
                            ?
                            <div className='empty-cart-container'>
                                <div>
                                    <div className='empty-cart-icon'>
                                        <MdAssignment size={48} />
                                    </div>
                                    <p className='m-0 pt-2'>No items added in your cart!</p>                                
                                </div>
                            </div>
                            :
                            <div className='cart-products'>
                                <div className='cart-products-container'>
                                    {
                                        storedCart?.map((item)=> 
                                            <div key={item.id}>
                                                <div className='cart-product'>
                                                    <img src={item.image.img} alt="" />
                                                    <div className='product-info'>
                                                        <h1>{item?.name}</h1>
                                                        <div className='flex items-center justify-between w-full mt-2'>
                                                            <div className='flex'>
                                                                <h1>৳ {item?.price} X {item?.quantity}</h1>
                                                            </div>
                                                            <div className="btn-container flex">
                                                                <button>-</button>
                                                                <button>{item?.quantity}</button>
                                                                <button>+</button>
                                                            </div>
                                                            <button className='close-icon' onClick={()=>HandleRemove(item)}><MdOutlineClose /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="bottom-bar">
                                    <div className='promo-code'>
                                        <input type="text" placeholder='Promo Code' />
                                        <button>Apply</button>
                                    </div>
                                    <div className='total-price'>
                                        <p className='price-name'>Total:-</p>
                                        <p className='price'>{total} ৳</p>
                                    </div>
                                    <button className='checkout-btn' onClick={handleCheckout}>
                                        <div className='overlay'>
                                            <p>Checkout</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </Drawer>
            }
        </div>
    );
};

export default Navbar;