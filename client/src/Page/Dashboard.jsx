import React from 'react';
import "../Style/Dashboard.css";
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='max-w-7xl mx-auto px-10'>
            <div className='flex'>
                <div className='sideBar w-[20%]'>
                    <div className='dashboard'>
                        <ul className='m-0 pt-5'>
                            <li>Index</li>
                            <li>Orders</li>
                            <li>Users</li>
                            <li>Products</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[80%] mainBar bg-cyan-200'>
                    <h1>this is nadir</h1>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard