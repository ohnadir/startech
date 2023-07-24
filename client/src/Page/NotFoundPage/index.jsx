import React from 'react'
import { useNavigate } from 'react-router-dom';
import photo from "../../assets/004.jpg"

const NotFoundPage = () => {
  const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate('/');
    }
    return (
      <div className='flex justify-center items-center h-[75.6vh]'>
            <div className='flex flex-col sm:flex-row gap-8 items-center justify-center'>
                <div className='text-center mb-5'>
                    <p className='text-2xl mb-2'>SomeThing went wrong</p>
                    <button onClick={handleGoToHome} className='bg-cyan-600 rounded-full px-4 py-[4px] text-white'>Back to Home</button>
                </div>
                <img className='w-[70%]' src={photo} alt="" />
            </div>
        </div>
    )
}

export default NotFoundPage