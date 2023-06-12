import React, { useEffect, useState } from 'react'
import { fetchWeatherBySearch } from './api/api'
import './App.css'


export default function App () {
    const [city,setCity] = useState('')
    const [keyWord,setkeyword] = useState('')
    const [weatherData,setWeatherData] = useState({})

    console.log(weatherData)

    const handleKeyPress = (e) =>{
        if(e.key === 'Enter') setkeyword(e.target.value)
    }

            useEffect(() => {
                const fetchWeather = async (location) => 
                {   const data = await fetchWeatherBySearch(location)
                    setWeatherData (data)
                }
                fetchWeather(keyWord);
            }
                
        ,[keyWord])


        return(
        <div className='App'>
            <label>Type the city</label>
            <input onChange={(e)=>setCity(e.target.value)} value={city} onKeyPress={handleKeyPress}></input>
            <p>{weatherData?.location?.name} </p>


        </div>
    )
    
}