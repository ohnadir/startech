import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../Style/Register.css';
import { HiHome } from 'react-icons/hi';
import SEO from '../Component/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../redux/actions/users';


const initialAuth = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone:''
}
const initialAuthErrors = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone:'',
  message: ''
}
const Register = () => {
  const [auth, setAuth] = useState(initialAuth);
  const [errors, setErrors] = useState(initialAuthErrors);
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
      dispatch(clearErrors());
  }
  }, [dispatch, isAuthenticated, error, navigate, from])
  const OnSubmit = async(e) => {
      e.preventDefault()
      
      let tempErrors = {};
      if(!auth?.firstName){
        setErrors((prev)=> ({...prev, firstName: 'First Name is Required'}))
        tempErrors= {...tempErrors, firstName: 'First Name is Required'}
      }else{
        setErrors((prev)=> ({...prev, firstName: ''}))
        tempErrors= {...tempErrors, firstName: ''}
      }
      if(!auth?.lastName){
        setErrors((prev)=> ({...prev, lastName: 'Last Name is Required'}))
        tempErrors= {...tempErrors, lastName: 'Last Name is Required'}
      }else{
        setErrors((prev)=> ({...prev, lastName: ''}))
        tempErrors= {...tempErrors, lastName: ''}
      }
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
      if(!auth?.phone){
        setErrors((prev)=> ({...prev, phone: 'Phone is Required'}))
        tempErrors= {...tempErrors, phone: 'Phone is Required'}
      }else{
        setErrors((prev)=> ({...prev, phone: ''}))
        tempErrors= {...tempErrors, phone: ''}
      }
      
      if(!tempErrors.firstName && !tempErrors.lastName && !tempErrors.email && !tempErrors.password && !tempErrors.phone){
        dispatch(register(auth))
      }
  }
    return (
        <div className='max-w-7xl mx-auto px-2'>
          <SEO title={'Register'} />
          <div className='flex items-center gap-3 text-[13px] pt-4 pb-[50px]'>
          <HiHome onClick={()=>navigate('/register')} className='text-[#666] cursor-pointer'/> <span>/</span> <span>Account</span> <span>/</span> <span>Register</span>
          </div>
            <div className='flex justify-center items-center h-screen'>
                <div className='max-w-[400px]'>
                    <div className=''>
                        <h1 className='text-[20px] font-semibold mb-[5px]'>Register Account</h1>
                        <form action="" >
                          <div className='grid grid-cols-1 gap-5'>
                              <div className='flex flex-col md:flex-row gap-5'>
                                <div className='InputContainer'>
                                  <label htmlFor="firstName">First Name <span className='text-red-600 text-[12px]'>*</span></label>
                                  <input onChange={handleChange} name='firstName'  type="text" placeholder='First Name' />
                                  {errors?.firstName ? <p className='text-red-600 m-0'>{errors.firstName}</p> : null }
                                </div>
                                <div className='InputContainer'>
                                  <label htmlFor="lastName">Last Name <span className='text-red-600 text-[12px]'>*</span></label>
                                  <input onChange={handleChange} name='lastName'  type="text" placeholder='Last Name' />
                                  {errors?.lastName ? <p className='text-red-600 m-0'>{errors.lastName}</p> : null }
                                </div>
                              </div>
                              <div className='InputContainer'>
                                <label htmlFor="Email">E-Mail <span className='text-red-600 text-[12px]'>*</span></label>
                                <input onChange={handleChange} name='email'  type="text" placeholder='Email Address' />
                                {errors?.email ? <p className='text-red-600 m-0'>{errors.email}</p> : null }
                              </div>
                              <div className='InputContainer'>
                                <label htmlFor="password">Password <span className='text-red-600 text-[12px]'>*</span></label>
                                <input onChange={handleChange} name='password' type="text" placeholder='Password' />
                                {errors?.password ? <p className='text-red-600 m-0'>{errors.password}</p> : null }
                              </div>
                              <div className='InputContainer'>
                                <label htmlFor="Phone">Phone Number<span className='text-red-600 text-[12px]'>*</span></label>
                                <input onChange={handleChange} type="number" name='phone'  placeholder='Phone Number' />
                                {errors?.phone ? <p className='text-red-600 m-0'>{errors.phone}</p> : null }
                              </div>
                              <div className=''>
                                  <button onClick={OnSubmit}  type="submit" className='registerBtn'>Continue</button>
                              </div>
                          </div>
                        </form>
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