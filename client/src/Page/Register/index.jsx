import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Register.scss';
import { HiHome } from 'react-icons/hi';
import SEO from '../../Component/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../redux/actions/users';
import {  message } from 'antd';

const Register = () => {
  const [messageApi, contextHolder ] = message.useMessage();
  const [auth, setAuth] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let from = location.state?.from?.pathname || "/";
  const { isAuthenticated, error } = useSelector(state => state.auth);
  const handleChange = (e) => {
    setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
    if (error) {
      messageApi.error(error);
      dispatch(clearErrors());
  }
  }, [dispatch, isAuthenticated, error, navigate, from, messageApi]);
  
  const OnSubmit = (e) => {
    e.preventDefault()
    if(!auth?.firstName || !auth?.lastName || !auth?.email || !auth?.password || !auth?.phone){
      messageApi.error("Invalid Input")
    }else{
      dispatch(register(auth))
    }
  }
  return (
    <>
      {contextHolder}
        <div className='register'>
          <SEO title={'Register'} />
          <div className='register-header'>
          <HiHome onClick={()=>navigate('/register')} className='home-icon'/> <span>/</span> <span>Account</span> <span>/</span> <span>Register</span>
          </div>
            <div className='register-container'>
                <div className='register-body'>
                    <div>
                        <h1 className='register-heading'>Register Account</h1>
                        <div className='input-container'>
                              <div className='flex flex-col md:flex-row gap-5'>
                                <div className='input-item'>
                                  <label htmlFor="firstName">First Name <span className='star'>*</span></label>
                                  <input onChange={handleChange} name='firstName'  type="text" placeholder='First Name' />
                                </div>
                                <div className='input-item'>
                                  <label htmlFor="lastName">Last Name <span className='star'>*</span></label>
                                  <input onChange={handleChange} name='lastName'  type="text" placeholder='Last Name' />
                                </div>
                              </div>
                              <div className='input-item'>
                                <label htmlFor="Email">E-Mail <span className='star'>*</span></label>
                                <input onChange={handleChange} name='email'  type="text" placeholder='Email Address' />
                              </div>
                              <div className='input-item'>
                                <label htmlFor="password">Password <span className='star'>*</span></label>
                                <input onChange={handleChange} name='password' type="password" placeholder='Password' />
                              </div>
                              <div className='input-item'>
                                <label htmlFor="Phone">Phone Number<span className='star'>*</span></label>
                                <input onChange={handleChange} type="number" name='phone'  placeholder='Phone Number' />
                              </div>
                              <div className=''>
                                  <button onClick={OnSubmit}  type="submit" className='register-btn'>Continue</button>
                              </div>
                        </div>
                    </div>
                    <div className='register-footer'>
                      <div className=' flex items-center gap-3'>
                        <div className='hr'></div>
                        <p>Already have an account ?</p>
                        <div className='hr'></div>
                      </div>
                      <p>If you already have an account with us, please login at the</p>
                      <button className='login-btn' onClick={()=>navigate('/login')}>Login page.</button>
                    </div>
                </div>
            </div> 
        </div>
    </>
  );
};

export default Register;