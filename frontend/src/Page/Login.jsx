import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Login.css';
import { HiHome } from 'react-icons/hi';
import MetaData from '../Component/Meta';


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
          <MetaData title={'Login'} />
          <div className='flex items-center gap-3 text-[13px] pt-4 pb-[50px]'>
            <HiHome onClick={()=>navigate('/register')} className='text-[#666] cursor-pointer'/> <span>/</span> <span>Account</span> <span>/</span> <span>Login</span>
          </div>
            <div className='flex justify-center items-center'>
                <div className='max-w-[400px]'>
                    <div className=''>
                        <h1 className='text-[20px] font-semibold mb-[5px]'>Account Login</h1>
                        <div className='grid grid-cols-1 gap-5'>
                            <div className='inputContainer'>
                              <label htmlFor="Email">E-Mail <span className='text-red-600 text-[12px]'>*</span></label>
                              <input onChange={handleChange} name='email'  type="text" placeholder='Email Address' />
                            </div>
                            <div className='inputContainer'>
                              <label htmlFor="password">Password <span className='text-red-600 text-[12px]'>*</span></label>
                              <input onChange={handleChange} name='password' type="text" placeholder='Password' />
                            </div>
                            <div className=''>
                                <button onClick={onSubmit} className='loginBtn'>Continue</button>
                            </div>
                              <div className=' footerContent flex items-center gap-3'>
                                <p className='hr'></p>
                                <p className='text-[#666] pText'>Don't have an account?</p>
                                <p className='hr'></p>
                              </div>
                            <div>
                              <button className='btn' onClick={()=>navigate('/register')}>Create Your Account</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div> 
        </div>

    );
};

export default Register;