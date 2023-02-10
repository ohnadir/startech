import React from 'react';
import "../Style/Dashboard.css";
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <div className='max-w-7xl mx-auto px-10'>
            <div className='flex'>
                <div className='sideBar w-[20%]'>
                    <div className='dashboard'>
                        <ul className='m-0 pt-5'>
                            <li onClick={()=>navigate('/dashboard')}>Index</li>
                            <li onClick={()=>navigate('/dashboard/orders')}>Orders</li>
                            <li onClick={()=>navigate('/dashboard/users')}>Users</li>
                            <li onClick={()=>navigate('/dashboard/products')}>Products</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[80%] mainBar bg-cyan-200 p-6'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard