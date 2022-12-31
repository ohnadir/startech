import React, { useState } from 'react'
import '../Style/ChangeAddress.css';
import { useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import District from "../Districts.json";
import Division from '../Division.json';
import Thana from "../Thana.json";
import MetaData from '../Component/Meta';
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
        <MetaData title={'Change Address'} />
        <div className='flex items-center gap-3 text-[13px] pt-4 pb-[50px]'>
          <HiHome onClick={()=>navigate('/home')} className='text-[#666] cursor-pointer'/> 
          <span className='text-[#666]'>/</span> 
          <span className='text-[#666] cursor-pointer' nClick={()=>navigate('/profile')}>Profile</span> <span>/</span> 
          <span className='text-[#666] cursor-pointer' onClick={()=>navigate('/address')}>Address</span> 
          <span className='text-[#666] '>/</span>
          <span className='text-[#666] cursor-pointer'>Edit Address</span>
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
                                        <option  value="Bangladesh">Bangladesh</option>
                                    </select>
                                </div>
                                <div className='InputContainer'>
                                    <label htmlFor="state">Division<span className='text-red-600 text-[12px]'>*</span></label>
                                    <select onChange={handleChange} name="division" id="state">
                                    {
                                        Division.map((item)=><option  value={item.name}>{item.name}</option>)
                                    }
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='InputContainer'>
                                    <label htmlFor="District">District<span className='text-red-600 text-[12px]'>*</span></label>
                                    <select onChange={handleChange} name="country" id="country">
                                    {
                                        District.map((item)=><option  value={item.name}>{item.name}</option>)
                                    }
                                    </select>
                                </div>
                                <div className='InputContainer'>
                                    <label htmlFor="Thana">Thana<span className='text-red-600 text-[12px]'>*</span></label>
                                    <select onChange={handleChange} name="thana" id="state">
                                    {
                                        Thana.map((item)=><option  value={item.name}>{item.name}</option>)
                                    }
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