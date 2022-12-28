import React from 'react'
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import { useStripe, 
    useElements, CardNumberElement, 
    CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios';
import '../../Style/Payment.css'
import { FaLock } from 'react-icons/fa';
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
const Payment = ({ totalPrice, auth }) => {
    console.log(auth);
    console.log(totalPrice)
    const stripe = useStripe();
    const elements = useElements();
    const paymentData = {
        // amount: Math.round(orderInfo.totalPrice * 100)
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            console.log(clientSecret);

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        // name: user.name,
                        // email: user.email
                    }
                }
            });

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {

                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    // order.paymentInfo = {
                    //     id: result.paymentIntent.id,
                    //     status: result.paymentIntent.status
                    // }

                    // dispatch(createOrder(order))

                    // history.push('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }


        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }
    }
    return (
        <ElementsConsumer>
            {({elements, stripe}) => (
                <section className=""> 
                    <section className="stripe">
                    {/* <Elements stripe={stripePromise} elements > */}
                        <div className="" style={{border:"1px solid #B0B0B0", borderRadius:"8px"}}>
                            <div className="cardBox" style={{borderBottom:"1px solid #B0B0B0"}}>
                                <CardNumberElement
                                    type="text"
                                    className="cardInput"
                                    options={options}
                                />
                                <label htmlFor="card_num_field" className="cardLabel">Card number <FaLock/></label>
                            </div>
                            <div className="flex">
                                <div className="cardBox">
                                    <CardExpiryElement
                                        type="text"
                                        className="cardInput"
                                        options={options }
                                    />
                                    <label htmlFor="card_exp_field" className="cardLabel">Expiration</label>
                                </div>
                                <div className="cardBox" style={{borderLeft:"1px solid #B0B0B0"}}>
                                    <CardCvcElement
                                        type="text"
                                        className="cardInput"
                                        options={options}
                                    />
                                    <label htmlFor="card_cvc_field" className="cardLabel">cvc</label>
                                </div>
                            </div>
                        </div>
                    {/* </Elements> */}
                    </section>   
                    <div className='flex justify-end mt-8'>
                        <button onClick={submitHandler} className="confirmBtn">Confirm and pay</button>
                    </div>  
                </section>
            )}
        </ElementsConsumer>
      )
}

export default Payment