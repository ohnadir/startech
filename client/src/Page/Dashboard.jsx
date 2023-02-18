import React from 'react';
import "../Style/Dashboard.css";
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { MdProductionQuantityLimits } from 'react-icons/md';

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className='max-w-7xl mx-auto px-10'>
            <div className='flex'>
                <div className='sideBar w-fit md:w-[20%]'>
                    <div className='dashboard'>
                        <ul className='m-0 pt-5'>
                            <li onClick={()=>navigate('/dashboard')}><AiOutlineHome/> <span className='hidden md:block'>Home</span></li>
                            <li onClick={()=>navigate('/dashboard/orders')}><AiOutlineShoppingCart/> <span className='hidden md:block'>Orders</span></li>
                            <li onClick={()=>navigate('/dashboard/users')}><AiOutlineUser/> <span className='hidden md:block'>Users</span></li>
                            <li onClick={()=>navigate('/dashboard/products')}><MdProductionQuantityLimits/>  <span className='hidden md:block'>Products</span></li>
                        </ul>
                    </div>
                </div>
                <div className='w-[80%] mainBar  p-6'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard