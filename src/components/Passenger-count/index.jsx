import React, { useState } from 'react'
// import Button from '../button/button'
import './passenger.css'

function PassengerCount({ passengerCount, onPassengerCountChange }) {
    const [value, setValue] = useState(passengerCount);

    function increment() {
        setValue((prev) => {
            const newValue = prev + 1;
            onPassengerCountChange(newValue);  
            return newValue;
        });
    }

    function decrement() {
        if (value > 1) {
            setValue((prev) => {
                const newValue = prev - 1;
                onPassengerCountChange(newValue);  
                return newValue;
            });
        }
    }

  return (
    <div className='main-container'>
        <div className='passenger-cont'>
        <svg width="35" height="35" viewBox="0 0 32 32" fill="none" class="current-stroke c-blue c-pointer" onClick={decrement}><path d="M9 16H23" stroke="#3366CC" stroke-linecap="round" stroke-linejoin="round"></path><rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#3366CC"></rect></svg>
            <div>{`${value} ${value == 1 ? 'Seat':'Seats' }`}</div>
            <svg width="35" height="35" viewBox="0 0 32 32" fill="none" class="current-stroke c-blue c-pointer" onClick={increment}><path d="M16 9V23M9 16H23" stroke="#3366CC" stroke-linecap="round" stroke-linejoin="round"></path><rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#3366CC"></rect></svg>
        </div>
        {/* <div className='search-data'>

        </div> */}
        
    </div>
  )
}

export default PassengerCount