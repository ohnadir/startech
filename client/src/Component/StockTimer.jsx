import React from 'react';
import { useTimer } from 'react-timer-hook';
import '../Style/StockTimer.css';

function Timer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      hours,
      days
    } = useTimer({ expiryTimestamp});
  
  
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <span className='timerItem'>{days}</span> <span className='timeDivider'>:</span>
          <span className='timerItem'>{hours}</span><span className='timeDivider'>:</span>
          <span className='timerItem'>{minutes}</span><span className='timeDivider'>:</span>
          <span className='timerItem'>{seconds}</span>
        </div>
      </div>
    );
  }
const StockTimer =()=>{
    const time = new Date();
    time.setSeconds(time.getSeconds() + 6000); // 10 minutes timer
    return (
        <div className='pb-[30px]'>
            <h1 className='text-center text-[25px]'>All product gets <span>10%</span> off</h1>
            <p className='text-center text-[18px] pb-6'>Offer will end very soom</p>
            <Timer expiryTimestamp={time} />
        </div>
    );
}
export default StockTimer;