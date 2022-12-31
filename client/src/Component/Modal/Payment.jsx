import React, { useEffect, useState } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import '../../Style/Payment.css'
import { useNavigate } from 'react-router-dom';
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
const Payment = ({ auth, setModal }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const paymentData = {
        amount: Math.round(orderInfo.price * 100)
    }
    useEffect(() => {
        const getItem =async()=>{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('/payment/process', paymentData, config)
            setClientSecret(data.client_secret)
        }
        getItem();
        
    }, []);
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod(
            {
            type: 'card',
            card
        });
        console.log(paymentMethod);
        // confirm payment 
        const result = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                    name: auth.name,
                    email: auth.email,
                    phone: auth.phone,
                    address: auth.address
                },
                
              },
            },
          );
        
        if(result.paymentIntent.status === "succeeded"){
            const productInfo = {
                name: orderInfo.name,
                price: orderInfo.price,
                quantity: orderInfo.quantity,
                image: orderInfo.image
            }
            const shippingInfo ={
                name: auth.firstName + auth.lastName,
                email: auth.email,
                phone: auth.phone,
                address: auth.address
            }
            const paymentInfo = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status
            }

        
        fetch("/order", {
            method: 'POST',
            body: JSON.stringify({productInfo, shippingInfo, paymentInfo}),
            headers: {
                'content-type': 'application/json'
                
            }
        })
            .then(res => res.json())
            .then(data => {
                event.target.reset();
                setModal(false)
                localStorage.setItem('transactionId', JSON.stringify(result.paymentIntent.id));
                localStorage.setItem('orderNumber', JSON.stringify(data.result.orderNumber));
                navigate('/confirmPayment')
                console.log(data);
            })
        }
    };
    return (
        <div>
              <form onSubmit={handleSubmit}>
                <CardElement options={options}/>
                
                <button className='bg-zinc-500 mt-5 px-5 text-white rounded-lg' type="submit" disabled={!stripe || !clientSecret}>Pay</button>
            </form>
        </div>
    )
}

export default Payment