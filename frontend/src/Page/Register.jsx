import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Register.css';
import { HiHome } from 'react-icons/hi';

const Register = () => {
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
          <HiHome onClick={()=>navigate('/register')} className='text-[#666] cursor-pointer'/> <span>/</span> <span>Account</span> <span>/</span> <span>Register</span>
          </div>
            <div className='flex justify-center items-center'>
                <div className='max-w-[400px]'>
                    <div className=''>
                        <h1 className='text-[20px] font-semibold mb-[5px]'>Register Account</h1>
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
                              <label htmlFor="Email">E-Mail <span className='text-red-600 text-[12px]'>*</span></label>
                              <input onChange={handleChange} name='email'  type="text" placeholder='Email Address' />
                            </div>
                            <div className='InputContainer'>
                              <label htmlFor="password">Password <span className='text-red-600 text-[12px]'>*</span></label>
                              <input onChange={handleChange} name='password' type="text" placeholder='Password' />
                            </div>
                            <div className='InputContainer'>
                              <label htmlFor="Phone">Phone Number<span className='text-red-600 text-[12px]'>*</span></label>
                              <input onChange={handleChange} type="number" name='phone'  placeholder='Phone Number' />
                            </div>
                            <div className=''>
                                <button onClick={onSubmit} className='registerBtn'>Continue</button>
                            </div>
                        </div>
                    </div>
                    <div className=' pt-[30px] footer'>
                      <div className=' footerContent flex items-center gap-3'>
                        <p className='hr'></p>
                        <p className='text-[#666]'>Already have an account ?</p>
                        <p className='hr'></p>
                      </div>
                      <p className=''>If you already have an account with us, please login at the</p>
                      <Link className='text-[#ef4a23]' to='/login'>Login page.</Link>
                    </div>
                </div>
            </div> 
        </div>

    );
};

export default Register;