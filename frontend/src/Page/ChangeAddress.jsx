import React, { useState } from 'react'
import '../Style/ChangeAddress.css';
import { useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

const ChangeAddress=()=> {
    const [auth, setAuth] = useState('');
    const navigate = useNavigate()
    const handleChange = (e) => {
        setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    const onSubmit = () => {
    }
  return (
    <div className='max-w-7xl mx-auto px-2'>
        <div className='flex items-center gap-3 text-[13px] pt-4 pb-[50px]'>
          <HiHome onClick={()=>navigate('/home')} className='text-[#666] cursor-pointer'/> <span>/</span> <span onClick={()=>navigate('/home')}>Address</span> <span>/</span> <span>Edit Address</span>
        </div>
        <div className='flex justify-center items-center'>
            <div className='max-w-[400px]'>
            <div className=''>
                        <h1 className='text-[20px] font-semibold mb-[5px]'>Add New Address</h1>
                        <p className='text-[14px] pb-[25px]'>Please enter the required details to add a new address.</p>
                        <div className='grid grid-cols-1 gap-5'>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='InputContainer'>
                                    <label htmlFor="firstName">First Name <span className='text-red-600 text-[12px]'>*</span></label>
                                    <input onChange={handleChange} name='firstName'  type="text" placeholder='First Name' />
                                </div>
                                <div className='InputContainer'>
                                    <label htmlFor="lastName">Last Name <span className='text-red-600 text-[12px]'>*</span></label>
                                    <input onChange={handleChange} name='lastName'  type="text" placeholder='Last Name' />
                                </div>
                            </div>
                            <div className='InputContainer'>
                              <label htmlFor="Address">Address <span className='text-red-600 text-[12px]'>*</span></label>
                              <input onChange={handleChange} name='address'  type="text" placeholder='Address' />
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='InputContainer'>
                                    <label htmlFor="firstName">City<span className='text-red-600 text-[12px]'>*</span></label>
                                    <input onChange={handleChange} name='city'  type="text" placeholder='City' />
                                </div>
                                <div className='InputContainer'>
                                    <label htmlFor="Post Code">Post Code<span className='text-red-600 text-[12px]'>*</span></label>
                                    <input onChange={handleChange} name='postCode'  type="text" placeholder='Post Code' />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='InputContainer'>
                                    <label htmlFor="Country">Country<span className='text-red-600 text-[12px]'>*</span></label>
                                    <select onChange={handleChange} name="country" id="country">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                    </select>
                                </div>
                                <div className='InputContainer'>
                                    <label htmlFor="state">Region / State<span className='text-red-600 text-[12px]'>*</span></label>
                                    <select onChange={handleChange} name="state" id="state">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                    </select>
                                </div>
                            </div>
                            <div className=''>
                                <button onClick={onSubmit} className='registerBtn'>Continue</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}
export default ChangeAddress;