import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BsCartCheckFill } from 'react-icons/bs';
import { BiSearchAlt2 } from 'react-icons/bi';
import '../Style/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('')
    const menuLists = <>
        <div className="flex relative">
            <span onClick={()=>navigate('/cart')} ><BsCartCheckFill className='cursor-pointer text-2xl' /></span>
            <span className="absolute top-[-11px] left-[13px] bg-[#669900]  rounded-full w-[20px] h-[20px] flex items-center justify-center p-[3px]">1</span>
        </div>
        <div>
            <div className="dropdown">
                <CgProfile className='dropBtn' />
                <div className="dropdown-content">
                    <ul>
                        <li>Profile</li>
                        <li>Profile</li>
                        <li>Profile</li>
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
            <div className='bg-white border'>
                <div className='max-w-7xl mx-auto px-2 '>
                    <div className=' flex items-center h-14 justify-between text-black  relative z-50'>
                        <div className=''>
                            <span className='cursor-pointer' onClick={()=>navigate('/home')}>StarTech</span>
                        </div>
                        <div className='searchContainer'>
                            <div className='flex items-center '>
                                <input className='searchInput' onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='KHUJ, THE SEARCH' />
                                <button className='searchBtn' onClick={()=>navigate(`/search/${keyword}`)}><BiSearchAlt2/></button>
                            </div>
                        </div>
                        <div className='flex gap-5 items-center'>
                            {menuLists}
                        </div>
                        
                    </div>
                </div>
            </div>
    );
};

export default Navbar;