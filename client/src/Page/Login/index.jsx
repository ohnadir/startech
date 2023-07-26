import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.scss';
import { HiHome } from 'react-icons/hi';
import SEO from '../../Component/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../redux/actions/users';
import {  message } from 'antd';

const Login = () => {
  const [messageApi, contextHolder ] = message.useMessage();
  const { isAuthenticated, error } = useSelector(state => state.auth);
  const [auth, setAuth] = useState();
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch();
    
  let from = location.state?.from?.pathname || "/";
  const handleChange = (e) => {
    setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
  }
    
  useEffect(() => {
    if (isAuthenticated) {
      messageApi.success("Login Successful");
      setTimeout( ()=>{
        navigate(from, { replace: true });
      }, 1000)
    }
    if (error === "Incorrect password" || error === "Incorrect credential") {
      messageApi.error(error);
      dispatch(clearErrors());
    }
  },[dispatch, error, from, isAuthenticated, navigate, messageApi])

  const onSubmit = () => {
    if(!auth?.email){
      messageApi.error("Email Require")
    }else if(!auth?.password){
      messageApi.error("Password Require")
    }
    else{
      dispatch(login(auth))
    }
  }
  return (
    <>
      { contextHolder }
      <div className='login'>
        <SEO title={'Login'} />
        <div className='login-header'>
          <HiHome onClick={()=>navigate('/register')} className='home-icon'/> <span>/</span> <span>Account</span> <span>/</span> <span>Login</span>
        </div>
        <div className='login-container'>
          <div className='login-body'>
            <div>
              <h1 className='login-heading'>Account Login</h1>
              <div className='input-container'>
                <div className='input-item'>
                  <label htmlFor="Email">E-Mail <span className='star'>*</span></label>
                  <input onChange={handleChange} name='email'  type="text" placeholder='Email Address' />
                </div>
                <div className='input-item'>
                  <label htmlFor="password">Password <span className='star'>*</span></label>
                  <input onChange={handleChange} name='password' type="password" placeholder='Password' />
                </div>
                <div >
                  <button onClick={onSubmit} className='login-btn'>Continue</button>
                </div>
                <div className='login-footer'>
                  <div className='hr'></div>
                  <p className='text-[#666] pText'>Don't have an account?</p>
                  <div className='hr'></div>
                </div>
                <div>
                  <button className='create-account-btn' onClick={()=>navigate('/register')}>Create Your Account</button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Login;