import React, { useState } from 'react'
import './Weathe.css'

function Weather() {
    let [data , setData]= useState("")
    let [weather , setWeather]= useState("")

    let handleChange=(e)=>{
        setData(e.target.value)    
    }

    const search=(e)=>{        
        if(e.key === "Enter"){
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${'1c89d68e0c447c963d38fcde07c9cf95'}`)  
          .then(res => res.json())
          .then(result =>{
            setWeather(result);   
            console.log(result);
                     
            setData("");
          })
        }
    }
    const dateBuilder =(d)=>{
        let months=["January" , "February" , "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days=["Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let day=days[d.getDay()];
        let date=d.getDate();
        let month=months[d.getMonth()];
        let year=d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    }
  return (
    <div className={(typeof weather.main !="undefined")?(((weather.main.temp) > 16+273.15 )? "app-warm" :"app"):"app-warm"}>
        <main>
            <div className='search-box'>
                <input type='text' className='search-bar' placeholder='Search Location to see weather' value={data}  onChange={handleChange} onKeyDown={search}/>
            </div>
            {(typeof weather.main != "undefined")?(
                <div>
                <div className='location-box'>
                    <div className='location'>
                       {weather.name} , {weather.sys.country}
                    </div>
                    <div className='date'>{dateBuilder(new Date())}</div>

                </div>
                <div className='weather-box'>
                    <div className='temp'>
                        {Math.round(weather.main.temp -273.15)}°C
                    </div>
                    <div className='weather'>
                        {weather.weather[0].main}
                    </div>
                </div>
            </div>
            ):("")}
        </main>
    </div>
  )
}

export default Weather;