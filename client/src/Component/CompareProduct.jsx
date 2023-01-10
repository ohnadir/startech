import React from 'react'

const CompareProduct = () => {
    const compare = JSON.parse(localStorage.getItem('compareCart'));
    
    return (
        <div className='bg-[#f2f4f8] h-[93.6vh]'>
            <div className='max-w-7xl mx-auto px-2 pt-10'>
                <div className='flex justify-between items-center gap-5'>
                    <div className='bg-white p-10'>
                        <img className='mx-auto' src={compare[0].productPictures[0].img} alt="" />
                        <p className='m-0'>{compare[0].name}</p>
                        <p className='m-0 py-[6px]'>Brand:- {compare[0].brand}</p>
                        <p className='m-0'>{compare[0].desc}</p>
                        <p className='m-0 py-[6px]'>{compare[0].price} ৳</p>
                    </div>
                    <div className='bg-white p-10'>
                        <img className='mx-auto' src={compare[1].productPictures[0].img} alt="" />
                        <p className='m-0'>{compare[1].name}</p>
                        <p className='m-0 py-[6px]'>Brand:-  {compare[1].brand}</p>
                        <p className='m-0'>{compare[1].desc}</p>
                        <p className='m-0 py-[6px]'>{compare[1].price} ৳</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompareProduct