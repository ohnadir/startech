import React, { useEffect, useRef } from 'react'
import "./Invoice.scss"
import ReactToPrint from "react-to-print";
import { useNavigate, useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { orderDetails } from "../../redux/actions/orders";
import { Table } from 'antd';
import Loader from "../../Component/Loader"
import SEO from '../../Component/SEO';


const columns = [
    {
        title: 'PRODUCT NAME',
        dataIndex: 'name',
        key: 'product name'
    },
    {
        title: 'QUANTITY',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'ITEM PRICE',
        dataIndex: 'price',
        key: 'item price',
    },
    {
        title: 'AMOUNT',
        dataIndex: 'total',
        key: 'amount',
    }
  ];
const Invoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { order, loading } = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(orderDetails(id));
    }, [id ,dispatch]);
    const componentRef = useRef(null);
    return (
        <>
            {
            loading
            ?
            <Loader/>
            :
            <div className='bg-gray-50 h-full'>
                <SEO title={'Invoice'} />
                <div className='invoice-container'>
                    <div className='invoice-title'>
                        <h1>Thank you <span className="font-bold text-[#3749bbT]">{order?.userName}</span>, Your order have been received !</h1>
                    </div>
                    <div className='invoice-body' ref={componentRef}>
                        <div className=' bg-[#3749bb0d] p-[30px]'>
                            <div className='flex flex-col md:flex-row gap-5 md:gap-0 md:items-center justify-between border-b-[1px] border-white pb-[15px]'>
                                <div>
                                    <h1 className='text-[20px] font-[700] m-0'>INVOICE</h1>
                                    <p className='m-0 text-[15px]'>Status : <span className='text-orange-500'>{order?.deliveryStatus}</span></p>
                                </div>
                                <div className='brand-logo'>
                                    <img className='w-[100px] mb-[7px]' src="https://www.startech.com.bd/image/catalog/logo.png" alt="" />
                                    <p>Dhaka, Bangladesh</p>
                                </div>
                            </div>
                            <div className=' pt-[15px] flex flex-col md:flex-row gap-4 md:gap-0 justify-between'>
                                <div>
                                    <h1 className='m-0 font-[700]'>DATE</h1>
                                    <p className='m-0 text-[14px] font-[600]'>{order?.paidAt}</p>
                                </div>
                                <div>
                                    <h1 className='m-0 font-[700]'>INVOICE NO.</h1>
                                    <p className='m-0 text-[14px] font-[600]'>#{order?.orderNumber}</p>
                                </div>
                                <div>
                                    <h1 className='m-0 font-[700]'>INVOICE NO.</h1>
                                    <p className='m-0 text-[14px] font-[600]'>{order?.shippingInfo?.firstName + "  " + order?.shippingInfo?.lastName}</p>
                                    <p className='m-0 text-[14px] font-[600]'>{order?.shippingInfo?.email}</p>
                                    <p className='m-0 text-[14px] font-[600]'>{order?.shippingInfo?.phone}</p>
                                    <p className='m-0 text-[14px] font-[600]'>{order?.shippingAddress?.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className=' bg-white p-[30px]' style={{ overflowX: 'auto' }}>
                            <Table columns={columns} pagination={false} dataSource={order?.products} />
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center gap-4 md:gap-4 justify-between p-[30px] bg-[rgba(239,74,35,0.1)]'>
                            <div>
                                <h1 className='m-0 font-[700]'>PAYMENT METHOD</h1>
                                <p className='font-[600] m-0 text-[14px]'>{order?.paymentMethod}</p>
                            </div>
                            <div>
                                <h1 className='m-0 font-[700]'>SHIPPING COST</h1>
                                <p className='font-[600] m-0 text-[14px]'>৳ {order?.shippingCost}</p>
                            </div>
                            <div>
                                <h1 className='m-0 font-[700]'>DISCOUNT</h1>
                                <p className='font-[600] m-0 text-[14px]'>৳ {order?.discount}</p>
                            </div>
                            <div>
                                <h1 className='m-0 font-[700]'>TOTAL AMOUNT</h1>
                                <p className='text-red-500 text-[18px] font-[700] m-0'>৳ {order?.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between bg-white'>
                        <div className="continue-btn">
                            <button onClick={()=>navigate('/')}>Continue Order</button>
                        </div>
                        <div className="print-btn">
                            <ReactToPrint trigger={() => (<button >Print / Download</button>)}content={() => componentRef.current}/>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Invoice