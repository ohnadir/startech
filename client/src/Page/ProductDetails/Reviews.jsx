import React, { useState } from 'react'
import  './Specification.scss'
import { MdAssignment } from 'react-icons/md'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Reviews = ( { product } ) => {
    const [ option, setOption] = useState('');
    const [review, setReview] = useState(false)
    const { isAuthenticated } = useSelector(state=> state.auth)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setOption(prev=>({...prev, [e.target.name]:e.target.value}));
    }
    const handleSubmit=()=>{
        if(isAuthenticated === true){
            console.log('authenticated')
        }else{
            navigate("/login");
        }
    }
    console.log(product?.reviews)
    return (
        <div className="reviews">
            <div className="reviews-header">
                <h1>Reviews ({product?.reviews ? product?.reviews?.length : 0})</h1>
                <p>Get specific details about this product from customers who own it.</p>
            </div>
            <div className="add-reviews">
                <button onClick={()=>setReview(!review)} className='add-review'>Write a Review</button>
                {
                    review 
                    &&
                    <div className='input-container'>
                        <div className='input-item'>
                            <label htmlFor="review">Write Review</label>
                            <input name='review' onChange={handleChange} type="text" placeholder='Write Review' />
                        </div>
                        <div className='input-item'>
                            <label htmlFor="review">Rating</label>  
                            <input name='rating' onChange={handleChange} min={0} max={5} type="number" placeholder='Write Rating' />
                        </div>
                        <button onClick={handleSubmit}>Continue</button>
                    </div>
                }
            </div>
            <div>
                {
                    product?.reviews === undefined
                    ?
                    <div className='empty-review'>
                        <div>
                            <MdAssignment className='review-icon'/>
                            <p>This product has no reviews yet. Be the first one to write a review.</p>
                        </div>
                    </div>
                    : 
                    <div className='review-container'>
                        {
                            product?.reviews?.map((item, index)=>
                                <div className='review' key={index}>
                                    <p>* * * * *</p>
                                    <p>For Gaming and Movie, this Monitor is amazing, but for Graphics design, it's not recommended, and if you are not used to curved displays, you will not feel comfortable with the display surface.</p>
                                    <h3>By  <span className='user-name'>Shuvo Rahman</span> on 20 Mar 2023</h3>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Reviews