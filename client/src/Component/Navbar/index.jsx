import React, {  useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import {  CgProfile } from 'react-icons/cg';
import { BsCartCheckFill} from 'react-icons/bs';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Navbar.scss'
import logo from '../../assets/logo.png';
import { Drawer } from 'antd';
import { MdOutlineClose } from 'react-icons/md';
import CartDrawer from '../CartDrawer';
import { getStoredCart } from '../../utils/cart';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../actions/userActions" 
const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth);
    const handleSearch=()=>{
        if(keyword){
            navigate(`/search/${keyword}`)
        }
    }
    const storedCart = getStoredCart();
    const handleLogOut=()=>{
        localStorage.removeItem("id");
        dispatch(logout())
    }

    const menuLists = <>
        <button className='text-white block md:hidden' onClick={()=>setOpen(!open)}><BiSearchAlt2 className='text-2xl'/></button>
        <div className="flex relative">
            <span onClick={()=>setCartOpen(true)} >
                <BsCartCheckFill className='cursor-pointer text-2xl text-white' />
            </span>
            <span className="absolute top-[-7px] left-[16px] bg-[#ef4a23] text-white rounded-full w-[16px] h-[16px] flex items-center justify-center p-[2px]">{ storedCart ? storedCart?.length : 0}</span>
        </div>
        <div>
            <div className="dropdown">
                <CgProfile className='dropBtn text-white' />
                <div className="dropdown-content">
                    <ul className='m-0'>
                        <li onClick={()=>navigate('/profile')}>Profile</li>
                        {/* <li>{ user &&  user?.user?.fullName()}</li> */}
                        {
                            isAuthenticated ? <li onClick={handleLogOut}>Logout</li> :

                        <li onClick={()=>navigate('/login')}>Login</li>
                        }
                    </ul>
                </div>
            </div>
        </div> 
    </>
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
                    <BiSearchAlt2 onClick={()=>setOpen(!open)} size={26} className=' mt-[5px] cursor-pointer text-white'/>
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
                // className='drawer'
                bodyStyle={{"padding": "0px"}}
                headerStyle={{"borderBottom": "0px ", "display": "none"}} 
                placement="right" 
                onClose={()=>setCartOpen(false)}  open={cartOpen}>
                    <div className='drawerHeader drawer-header'>
                        <h1 className=' text-white'>YOUR CART</h1>
                        <MdOutlineClose className='cartCloseBtn' onClick={()=>setCartOpen(false)} />
                    </div>
                    <CartDrawer />
                </Drawer>
            }
            
        </div>
    );
};

export default Navbar;