import React from 'react';
import { useTimer } from 'react-timer-hook';
import './StockTimer.scss';

function Timer({ expiryTimestamp }) {
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp});
  return (
    <div style={{textAlign: 'center'}} className='timer'>
      <div className='timer-item'>{days}</div>
      <div className='timer-divider'>:</div>
      <div className='timer-item'>{hours}</div>
      <div className='timer-divider'>:</div>
      <div className='timer-item'>{minutes}</div>
      <div className='timer-divider'>:</div>
      <div className='timer-item'>{seconds}</div>
    </div>
  );
}

const StockTimer =()=>{
  const time = new Date();
  time.setSeconds(time.getSeconds() + 6000); // 10 minutes timer
  return (
    <div className='stock-timer'>
      <h1>All product gets <span>10%</span> off</h1>
      <p>Offer will end very soon</p>
      <Timer  expiryTimestamp={time} />
    </div>
  );
}
export default StockTimer;