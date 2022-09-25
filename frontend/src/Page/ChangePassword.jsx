import React, { useState } from 'react';
import '../Style/ChangePassword.css'
import { Link, useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import MetaData from '../Component/Meta';

const ChangePassword=()=> {
    const [auth, setAuth] = useState('');
    const navigate = useNavigate()
    const handleChange = (e) => {
        setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    const onSubmit = () => {
    }
  return (
    <div className='max-w-7xl mx-auto px-2'>
      <MetaData title={'Change Password'} />
          <div className='navigate'>
            <HiHome onClick={()=>navigate('/home')} className='text-[#666] cursor-pointer'/> <span>/</span> <span onClick={()=>navigate('/profile')} className="cursor-pointer">Account</span> <span>/</span> <span>Change Password</span>
          </div>
            <div className='flex justify-center items-center'>
                <div className='max-w-[430px]'>
                    <div className='passwordContainer'>
                        <h1>Change Password</h1>
                        <p>Please type and confirm to change your current password.</p>
                        <div className='grid grid-cols-1 gap-5'>
                            <div className='inputContainer'>
                              <label htmlFor="password">Password<span className='star'>*</span></label>
                              <input onChange={handleChange} name='password'  type="text" placeholder='Password' />
                            </div>
                            <div className='inputContainer'>
                              <label htmlFor="password">Password Confirm<span className='star'>*</span></label>
                              <input onChange={handleChange} name='confirmPassword' type="text" placeholder='Password Confirm' />
                            </div>
                            <div className=''>
                                <button onClick={onSubmit} className='passwordBtn'>Continue</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div> 
        </div>
  )
}
export default  ChangePassword;