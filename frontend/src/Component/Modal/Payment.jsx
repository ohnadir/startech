import React, { useEffect, useState } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import '../../Style/Payment.css'
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
const Payment = ({ auth }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const paymentData = {
        amount: Math.round(100 * 100)
    }
    
    useEffect(() => {
        const getItem =async()=>{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('http://localhost:5001/api/v1/payment/process', paymentData, config)
            setClientSecret(data.client_secret)
        }
        getItem();
        
    }, []);
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
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
        
        if (error) {
            setCardError(error.message);
        } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        setCardError(error?.message || '')
        setSuccess('')
        setProcessing(true)
        // confirm payment 
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                    name: auth.name,
                    email: auth.email,
                    phone: auth.phone,
                    zipCode : 1219
                },
              },
            },
          );
        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setSuccess('Your Payment is Completed');
            setTransactionId(paymentIntent.id);

             // store on data base
            const order = {
                productInfo : {
                    name: orderInfo.name,
                    price: orderInfo.price,
                    quantity: orderInfo.quantity,
                    image: orderInfo.image
                },
                user :{
                    name: auth.name,
                    email: auth.email,
                    phone: auth.phone,
                    address: auth.address
                },
                paymentInfo : {
                    id: paymentIntent.id,
                    status: paymentIntent.status
                }

            }
            fetch("http://localhost:5001/api/v1/order", {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'content-type': 'application/json'
                    
                }
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false)
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