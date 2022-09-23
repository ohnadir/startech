import React from 'react'
import '../Style/Address.css'
import { HiHome, HiPencil } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Address=()=> {
    const navigate = useNavigate()
  return (
    <div className='max-w-7xl mx-auto px-2'>
        <div className='flex items-center gap-3 text-[13px] pt-4 pb-[50px]'>
            <HiHome onClick={()=>navigate('/home')} className='text-[#666] cursor-pointer'/> <span>/</span> <span onClick={()=>navigate('/profile')}>Profile</span> <span>/</span> <span>Address</span>
          </div>
        <div className='grid grid-cols-1 gap-6 max-w-[700px] mx-auto'>
            <div className='addressContainer'>
                <h1>Address</h1>
                <div className='addressCard flex items-center'>
                    <p>Address</p>
                    <div className='flex gap-3 items-center '>
                        <HiPencil className='icon'/>
                        <IoMdTrash className='icon'/>
                    </div>
                </div>
            </div>
            <button className='createBtn'><HiPlus/> New Address</button>
        </div>
    </div>
  )
}
export default  Address;