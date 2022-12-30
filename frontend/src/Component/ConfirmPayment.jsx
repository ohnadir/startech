import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const transactionId = JSON.parse(localStorage.getItem('transactionId'));
const orderNumber = JSON.parse(localStorage.getItem('orderNumber'));
const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
// const navigate = useNavigate();
const ConfirmPayment = () => (
  <Result
    status="success"
    title={`Successfully Payment for ${orderInfo.name}`}
    subTitle={`Order number: ${orderNumber} and TransactionId: ${transactionId} . Delivery takes 1-2 days, please wait. Thank you`}
    extra={
      <Link to='/home'>
          <button className='border px-5 py-[2px] rounded-[6px]'>Buy Again</button>
      </Link>
      }
  />
);

export default ConfirmPayment