import { React, useEffect, useState } from 'react'
import "../App.css"
const Card = () => {
  const [value, setvalue] = useState("");
  const [weatherdata, setweatherdata] = useState({
    temperature : "N/A",
    humidity : "N/A",
    visibility : "N/A",
    windspeed : "N/A",
  }); 

  const apiKeys = {
    key: "a903b7d120461e61581d08768c69f466",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const searchCity = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeys.key}`)
    const data = await res.json()
    setweatherdata({
      temperature : data.main.temp,
    humidity : data.main.humidity,
    visibility : data.visibility,
    windspeed : data.wind.speed, 
    icon :data.weather[0].icon,
    desc :data.weather[0].description,
    city : data.name,
    country : data.sys.country
    })
  }
  const weatherdataforlocation = async(lat,lon) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeys.key}`)
    const data = await res.json()
    console.log(data);
    
    setweatherdata({
      temperature : data.main.temp,
    humidity : data.main.humidity,
    visibility : data.visibility,
    windspeed : data.wind.speed, 
    icon :data.weather[0].icon,
    desc :data.weather[0].description,
    city : data.name,
    country : data.sys.country
    })
  }

  const fetchCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      weatherdataforlocation(position.coords.latitude,position.coords.longitude)
    })
  }
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const changeValue = (e) => {
    setvalue(e.target.value);
  }
  
  return (
    <div className='card'>
      <div className="icon "><img className='box-shadow-xl' width={150} src={`https://openweathermap.org/img/wn/${weatherdata.icon}@2x.png`} alt="" /></div>
      <div className="atmosphere">{weatherdata.desc}</div>
      <div className="input my-2">
        <input placeholder='Search any city?' type="text" className='bg-transparent border-b mx-2' onChange={changeValue} />
        <button onClick={()=>searchCity(value)}>search</button>
      </div>
      <b className='mt-5'>{weatherdata.city},{weatherdata.country}</b>
      <table className='w-full mt-4'>
        <tbody>
          <tr className=' flex w-[100%] justify-between border-t px-2'>
            <td>Temperature</td>
            <td>{ Math.floor(weatherdata.temperature)}°C</td>
          </tr>
          <tr className='mt-3 flex w-[100%] justify-between border-t px-2'>
            <td>Humidity</td>
            <td>{weatherdata.humidity}%</td>
          </tr>
          <tr className='mt-3 flex w-[100%] justify-between border-t px-2'>
            <td>Visibility</td>
            <td>{weatherdata.visibility} mi</td>
          </tr>
          <tr className='mt-3 flex w-[100%] justify-between border-t px-2'>
            <td>Wind Speed</td>
            <td>{weatherdata.windspeed} Km/h</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Card
