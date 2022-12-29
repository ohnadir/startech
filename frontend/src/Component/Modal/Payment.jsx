import React, { useEffect, useState } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import '../../Style/Payment.css'
import { FaLock } from 'react-icons/fa';
import {  toast } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
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
const stripePromise = loadStripe('pk_test_51MJynOHzN4rqAg27o1nDk5hQeHaX8cuaBkInxAzGMEnEqee4QMyeztVLqyeuAhzgK9ZRdwPAF8uWFrRX2Qj8iuQ9005XC9m0sA');
const Payment = ({ totalPrice, auth }) => {
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
            return data.client_secret
        }
        getItem();
        
    }, [paymentData]);
    // console.log(clientSecret);
        
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
            // clientSecret,
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
                    name: "Nadir",
                    email: "nadirhossain336@gmail.com"
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

            /* // store on data base
            const payment = {
                purchase: _id,
                transactionId : paymentIntent.id
            }
            fetch(`https://sleepy-hollows-57490.herokuapp.com/purchase/${_id}`, {
                method: 'PATCH',
                body: JSON.stringify(payment),
                headers: {
                    'content-type': 'application/json',
                    'authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                    
                }
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false)
                    console.log(data);
                }) */
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