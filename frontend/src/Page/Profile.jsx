import React from 'react';
import '../Style/Profile.css';
import { CgShoppingBag } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa';
import { FaAddressCard } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { MdPayments } from 'react-icons/md';
import { MdOutlineImportantDevices } from 'react-icons/md';
import { BiHeart } from 'react-icons/bi';
import { BiStar } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


const Home =()=>{
    const navigate = useNavigate()
    return (
      <div className='max-w-7xl mx-auto px-2'>
        <div className='flex items-center gap-3 text-[13px] pt-4 '>
          <HiHome onClick={()=>navigate('/register')} className='text-[#666] cursor-pointer'/> <span>/</span> <span onClick={()=>navigate('/profile')}>Account</span> <span>/</span> <span onClick={()=>navigate('/profile')}>Profile</span>
          </div>
        <div>
            <div className='coinContainer flex flex-col gap-10 sm:gap-0 sm:flex-row justify-between items-center'>
                <div className='flex  items-center gap-3 '>
                    <img className='w-[50px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU" alt="" />
                    <div>
                        <p>Hello,</p>
                        <h2>Nadir Ahmed</h2>
                    </div>
                </div>
                <div className='flex gap-6 coinContent'>
                    <p className='hrBorder hidden sm:block'></p>
                    <div>
                        <p>Star Credit</p>
                        <h1>0</h1>
                    </div>
                    <p className='hrBorder'></p>
                    <div className=''>
                        <p>Store Credit</p>
                        <h1>0</h1>
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
            <div onClick={()=>navigate('/address')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <FaAddressCard className='profileIcon'/>
                <p>Address</p>
            </div>
            <div onClick={()=>navigate('/wish')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <BiHeart className='profileIcon'/>
                <p>Wish List</p>
            </div>
            <div onClick={()=>navigate('/saved')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <MdOutlineImportantDevices className='profileIcon'/>
                <p>Saved PC</p>
            </div>
            <div onClick={()=>navigate('/point')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <BiStar className='profileIcon'/>
                <p>Start Points</p>
            </div>
            <div onClick={()=>navigate('/transaction')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <MdPayments className='profileIcon'/>
                <p>Your Transactions</p>
            </div>
            <div onClick={()=>navigate('/logout')} className='profileCard w-[250px] mx-auto sm:w-full'>
                <FiLogOut className='profileIcon'/>
                <p>Logout</p>
            </div>
        </div>
      </div>
    )
}

export default Home;