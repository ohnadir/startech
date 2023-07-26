import React, { useEffect } from 'react'
import "./MyOrder.scss"
import { useDispatch, useSelector } from "react-redux"
import { emailOrder } from "../../../redux/actions/orders"
import { HiHome } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
const MyOrder = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { orders } = useSelector(state=> state.emailOrder);
    useEffect(()=>{
        dispatch(emailOrder())
    },[dispatch])
    return (
        <div className='my-orders'>
            <div className='myOrders-header'>
                <HiHome onClick={()=>navigate('/register')} className='home-icon'/> 
                <span>/</span> 
                <span className='cursor-pointer' onClick={()=>navigate('/profile')}>Profile</span> 
                <span>/</span>
                <span>My Orders</span>
            </div>
            <div className='my-orders-container'>
                <table className='my-order-table'>
                    <thead>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Shipping Cost</th>
                    <th>Delivery Status</th>
                    <th>Order Number</th>
                    <th>Payment Method</th>
                    <th>Delivery Method</th>
                    </thead>
                    {
                    orders?.map(order=>
                        <tbody key={order._id}>
                        <td>{order?.products?.map((name)=> {return name.name})}</td>
                        <td>{order?.products?.map((name)=> {return name.price})}</td>
                        <td>{order?.products?.map((name)=> {return name.quantity})}</td>
                        <td className='text-[#ef4a23] font-semibold'>{order?.total}</td>
                        <td>{order?.shippingCost}</td>
                        <td className='text-[#3749bb] font-semibold'>{order?.deliveryStatus}</td>
                        <td>{order?.orderNumber}</td>
                        <td className='capitalize'>{order?.paymentMethod}</td>
                        <td className='capitalize'>{order?.deliveryMethod}</td>
                        </tbody>
                    )
                    }
                </table>
            </div>
        </div>
    )
}

export default MyOrder