import React from 'react'
import "../App.css"
const MainCard = () => {
  const d = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[d.getMonth()];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];

  function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
  
  return (
    <div className='maincard'>
      <div className="city text-right font-semibold text-3xl">London</div>
      <div className="con text-right mt-2 text-xl">GB</div>
      <div className="absolute mb-5 flex w-full gap-10 bottom-0">
        <div className="dtime">
          <div className="time text-2xl" id='time'></div>
          <div className="date">{`${day}, ${d.getDate()} ${month} ${d.getFullYear()}` } </div>
        </div>
        <div className="deg absolute right-10 bottom-1 text-6xl">18°C</div>
      </div>
    </div>
  )
}

export default MainCard
