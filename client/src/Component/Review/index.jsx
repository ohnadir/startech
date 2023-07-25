import React, { useEffect, useState } from 'react';


const Review = ({id, product}) => {
    const [createReview, setCreateReview] = useState(false);
    
    const [ option, setOption] = useState('')
    const handleChange = (e) => {
        setOption(prev=>({...prev, [e.target.name]:e.target.value}));
    }
    
    return (
        <div className=''>
            <div className=' flex flex-col md:flex-row gap-2 md:justify-between md:items-center'>
                <div>
                    <h1 className='text-black text-xl'>Review ({product?.reviews?.length})</h1>
                    <p>Get specific details about this product from customers who own it.</p>
                </div>
                <div>
                    <button onClick={()=> setCreateReview(!createReview)} className='reviewBtn'>Write a Review</button>
                </div>
            </div>
            { createReview && <div className='pt-3'>
                    <div>
                        <div className='review grid grid-cols-1 gap-3'>
                            <div>
                                <label htmlFor="review">Write Review</label>
                                <input name='review' onChange={handleChange} type="text" placeholder='Write Review' />
                            </div>
                            <div>
                                <label htmlFor="review">Rating</label>  
                                <input name='rating' onChange={handleChange} disabled={option.rating <=0}  type="number" placeholder='Write Rating' />
                            </div>
                            <button  className='max-w-fit px-5 py-2  bg-[#3749bb] text-white'>Continue</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Review