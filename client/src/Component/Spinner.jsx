import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Spin/>
        </div>
    )
}

export default Spinner