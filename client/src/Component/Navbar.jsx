import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgLayoutGrid, CgProfile } from 'react-icons/cg';
import { BsCartCheckFill} from 'react-icons/bs';
import { BiSearchAlt2 } from 'react-icons/bi';
import '../Style/Navbar.css'
import logo from '../assets/logo.png';
import { Drawer } from 'antd';
import { MdOutlineClose } from 'react-icons/md';
import CartDrawer from './CartDrawer';
import { getStoredCart } from '../utils/cart';
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

    // const [navBg, setNavBg] = useState("red");
//   const location = useLocation();
//   useEffect(() => {
//     if (window.location.pathname === "/login") {
//       setNavBg("#081621");
//     } else {
//       setNavBg('#081621')
//     }
// style={{ backgroundColor: navBg }}
//   }, [location]);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [keyword, setKeyword] = useState('');
    const { user, loading } = useSelector(state => state.auth);
    const handleSearch=()=>{
        if(keyword){
            navigate(`/search/${keyword}`)
        }
    }
    const storedCart = getStoredCart();
    useEffect(()=>{
        
    }, [])

    const menuLists = <>
        <button className='text-white block md:hidden' onClick={()=>setOpen(!open)}><BiSearchAlt2 className='text-2xl'/></button>
        <div className="flex relative">
            <span onClick={()=>setCartOpen(true)} >
                <BsCartCheckFill className='cursor-pointer text-2xl text-white' />
            </span>
            <span className="absolute top-[-7px] left-[16px] bg-[#669900]  rounded-full w-[16px] h-[16px] flex items-center justify-center p-[2px]">{ storedCart ? storedCart?.length : 0}</span>
        </div>
        <div>
            <div className="dropdown">
                <CgProfile className='dropBtn text-white' />
                <div className="dropdown-content">
                    <ul className='m-0'>
                        <li onClick={()=>navigate('/profile')}>Profile</li>
                        {/* <li>{ user &&  user?.user?.fullName()}</li> */}
                        <li onClick={()=>navigate('/login')}>Login</li>
                    </ul>
                    
                        {/* {
                            user && <Link to='/dashboard' className='cursor-pointer hover:bg-gray-200 p-2'>
                                <label htmlFor="dashboardDrawer" className=" drawer-button">Dashboard</label>
                            </Link>
                        }
                        {
                            user ?
                            <button onClick={handleSignOut} className='cursor-pointer hover:bg-gray-200 p-2'>Sign out</button>
                            : 
                            <Link to='/login' className='cursor-pointer hover:bg-gray-200 p-2'>Login</Link>
                        } */}
                </div>
            </div>
        </div> 
    </>
    return (
        <div className='bg-[#081621] ' >
            <div className='max-w-7xl mx-auto px-2 '>
                <div className=' flex items-center h-14 justify-between text-black  relative z-50'>
                    <div className=''>
                        <img className='cursor-pointer w-[95px]' onClick={()=>navigate('/')} src={logo} alt="" />
                    </div>
                    <div className='searchContainer'>
                        <div className='hidden md:block'>
                            <div className='flex items-center '>
                                <input className='searchInput' onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='KHUJ, THE SEARCH' />
                                <button className='searchBtn' onClick={handleSearch}><BiSearchAlt2/></button>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        {menuLists}
                    </div>
                </div>
                <div className=' searchBlock'>
                    {
                        open && <div className='bg-white md:hidden'>
                        <div className='flex items-center '>
                            <input className='searchInput' onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='KHUJ, THE SEARCH' />
                            <button className='searchBtn' onClick={handleSearch}><BiSearchAlt2/></button>
                        </div>
                    </div>
                    }
                </div>
            </div>
            {
                cartOpen && 
                <Drawer 
                // className='drawer'
                bodyStyle={{"padding": "0px"}}
                headerStyle={{"borderBottom": "0px ", "display": "none"}} 
                placement="right" 
                onClose={()=>setCartOpen(false)}  open={cartOpen}>
                    <div  className='drawerHeader'>
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