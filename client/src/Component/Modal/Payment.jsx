import React, { useEffect } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { makePayment } from '../../actions/payment';
import { useDispatch, useSelector } from "react-redux"
import { message } from 'antd';
const options = {
    style: {
        base: {
            fontSize: '14px'
        },
        invalid: {
            color: '#C13515'
        }
    }
}
const Payment = ({ total, setPayment, setModal }) => {
    const [messageApi, contextHolder ] = message.useMessage();
    const { client_secret } = useSelector(state=>state.payment)
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const paymentData = {
        amount: Math.round(total * 100)
    }
    useEffect(() => {
        dispatch(makePayment(paymentData));
    }, [ dispatch]);
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }

        // confirm payment 
        const result = await stripe.confirmCardPayment( client_secret, { payment_method: { card: card }});
        if(result?.paymentIntent){
            setPayment(result?.paymentIntent)
        }
        if(result?.paymentIntent?.id){
            messageApi.success("Payment post successfully")
            setTimeout(() => {
                setModal(false)
            }, 1000);
        }
    };
    return (
        <>
            {contextHolder}
            <div>
                <form onSubmit={handleSubmit}>
                    <CardElement options={options}/>
                    <button className='bg-zinc-500 mt-5 px-5 text-white rounded-[4px]' type="submit" disabled={!stripe || !client_secret}>Pay</button>
                </form>
            </div>
        </>
    )
}

export default Payment