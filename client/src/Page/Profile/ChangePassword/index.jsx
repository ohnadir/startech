import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changePassword, clearErrors } from "../../../redux/actions/users"
import SEO from '../../../Component/SEO';
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import "./ChangePassword.scss";
import { BsEyeSlash } from 'react-icons/bs';

const ChangePassword = () => {
    const [messageApi, contextHolder ] = message.useMessage();
    const { messages, error } = useSelector( state=> state.update);
    const [ password, setPassword] = useState()
    const [ oldPassword, setOldPassword] = useState("")
    const [ newPassword, setNewPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(messages === "Change Password successfully"){
            window.location.reload();
            messageApi.success("Change Password successfully")
        }
        if(error){
            dispatch(clearErrors())
        }
    },[ dispatch, messages, messageApi, error]);

    const handleSubmit = ()=>{
        const data = {
            newPassword : newPassword,
            oldPassword : oldPassword
        }
        if(data){
            dispatch(changePassword(data))
        }
    }
    return (
        <>
            {contextHolder}
            <div className='change-password'>
                <SEO title={"Password Change"} />
                <div className='change-password-header'>
                    <HiHome onClick={()=>navigate('/')} className='home-icon'/> 
                    <span>/</span> 
                    <span className='cursor-pointer' onClick={()=>navigate('/profile')}>Profile</span> 
                    <span>/</span>
                    <span>Change Password</span>
                </div>
                <div className="change-password-container">
                    <div className="change-password-item">
                        <label htmlFor="">Old Password</label>
                        <div className='input-container'>
                            <input onChange={(e)=>setOldPassword(e.target.value)} type={password ? "text" :  "password"} name='oldPassword' placeholder='Enter your Old Password'  />
                            {
                                oldPassword
                                ? 
                                <span onClick={()=>setPassword(!password)} className='show-password-btn'>
                                    <BsEyeSlash style={{color : "#808080"}} size={20} />
                                </span> 
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className="change-password-item">
                        <label htmlFor="">New Password</label>
                        <div className='input-container'>
                            <input onChange={(e)=>setNewPassword(e.target.value)} type={password ? "text" :  "password"} name='newPassword' placeholder='Enter your New Password'  />
                            {
                                newPassword
                                ? 
                                <span onClick={()=>setPassword(!password)} className='show-password-btn'>
                                    <BsEyeSlash style={{color : "#808080"}} size={20} />
                                </span> 
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                <div className='update-btn'>
                    <button onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword