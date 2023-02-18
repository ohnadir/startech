import React from 'react';
import '../Style/Profile.css';
import { CgShoppingBag } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa';
import { MdLock, MdOutlineDashboardCustomize } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import SEO from '../Component/SEO';
import { useSelector } from 'react-redux'


const Home =()=>{
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    return (
      <div className='max-w-7xl mx-auto px-10'>
        <SEO title={'Profile'} />
        <div className='flex items-center gap-3 text-[13px] pt-4 '>
          <HiHome onClick={()=>navigate('/register')} className='text-[#666] cursor-pointer'/> <span>/</span> <span onClick={()=>navigate('/profile')}>Account</span> <span>/</span> <span onClick={()=>navigate('/profile')}>Profile</span>
          </div>
        <div>
            <div className='coinContainer flex flex-col gap-10 sm:gap-0 sm:flex-row justify-between items-center'>
                <div className='flex  items-center gap-3 '>
                    <img className='w-[50px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU" alt="" />
                    <div>
                        <p className='m-0'>Hello,</p>
                        <h2 className='m-0'>{user?.firstName} {user?.lastName}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <div onClick={()=>navigate('/orders')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <CgShoppingBag className='profileIcon'/>
                <p>Orders</p>
            </div>
            <div onClick={()=>navigate('/editProfile')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <FaUser className='profileIcon'/>
                <p>Edit Profile</p>
            </div>
            <div onClick={()=>navigate('/changePassword')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <MdLock className='profileIcon'/>
                <p>Change Password</p>
            </div>
            
            <div onClick={()=>navigate('/dashboard')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <MdOutlineDashboardCustomize className='profileIcon'/>
                <p>Dashboard</p>
            </div>
        </div>
      </div>
    )
}

export default Home;