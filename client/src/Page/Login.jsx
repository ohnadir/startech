import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Style/Login.css';
import { HiHome } from 'react-icons/hi';
import SEO from '../Component/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../actions/userActions';
const initialAuth = {
  email: '',
  password: ''
}
const initialAuthErrors = {
  email: '',
  phone:''
}
const Login = () => {
    const [auth, setAuth] = useState(initialAuth);
    const [errors, setErrors] = useState(initialAuthErrors);
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();
    
    let from = location.state?.from?.pathname || "/";
    const handleChange = (e) => {
      setAuth(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    const { isAuthenticated, error, loading, user } = useSelector(state => state.auth);
    if(user?._id){
      localStorage.setItem("id", JSON.stringify(user?._id));
    }
    useEffect(() => {
      if (isAuthenticated) {
        navigate(from, { replace: true });
      }
      if (error) {
        dispatch(clearErrors());
      }
    },[dispatch, error, from, isAuthenticated])
    const onSubmit = async(e) => {
      e.preventDefault()
      
      let tempErrors = {};
      if(!auth?.email){
          setErrors((prev)=> ({...prev, email: 'Email is Required'}))
          tempErrors= {...tempErrors, email: 'Email is Required'}
      }else{
          setErrors((prev)=> ({...prev, email: ''}))
          tempErrors= {...tempErrors, email: ''}
      }
      if(!auth?.password){
        setErrors((prev)=> ({...prev, password: 'Password is Required'}))
        tempErrors= {...tempErrors, password: 'Password is Required'}
      }else{
        setErrors((prev)=> ({...prev, password: ''}))
        tempErrors= {...tempErrors, password: ''}
      }
  
      if(!tempErrors.email && !tempErrors.password){
        dispatch(login(auth))
      }
    }
    return (
        <div className='max-w-7xl mx-auto px-2'>
          <SEO title={'Login'} />
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
                              {errors?.email ? <p className='text-red-600 m-0'>{errors.email}</p> : null }
                            </div>
                            <div className='inputContainer'>
                              <label htmlFor="password">Password <span className='text-red-600 text-[12px]'>*</span></label>
                              <input onChange={handleChange} name='password' type="text" placeholder='Password' />
                              {errors?.password ? <p className='text-red-600 m-0'>{errors.password}</p> : null }
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

export default Login;