import React, { useEffect, useState } from 'react'
import { fetchWeatherBySearch } from './api/api'
import './App.css'


export default function App () {
    const [city,setCity] = useState('')
    const [keyWord,setkeyword] = useState('New york')
    const [weatherData,setWeatherData] = useState({})
    const [showCelsius, setShowCelsius] = useState(true)
    const [unit,setUnit] = useState('C')

    const toggleCelsius = () => {
        setShowCelsius((prevState)  => !prevState)
        setUnit(prevState=> {if (prevState === 'C') return 'F'; return 'C'})

    }
    const handleKeyPress = (e) =>{
        if(e.key === 'Enter') if (e.target.value.length){setkeyword(e.target.value);setCity('')}
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
            <input onChange={(e)=>setCity(e.target.value)} value={city} placeholder='Search...' onKeyPress={handleKeyPress}></input>
            <div className="weather">
                <div className="left">
                    <h3>{weatherData?.location?.name}</h3>
                    <h4>{weatherData?.location?.country}</h4>
                    <div className="temperature">
                        <h1 className="temperature--c">{weatherData?.current?.[showCelsius ? 'temp_c' : 'temp_f']}
                            <sup className={showCelsius ? 'disabled' : 'clickable'} onClick={toggleCelsius}>&deg;C</sup>
                            <sup>{' '}|{' '}</sup>
                            <sup className={!showCelsius ? 'disabled' : 'clickable'} onClick={toggleCelsius}> &deg;F</sup>
                        </h1>
                        {/* <h5 className="temperature--f">{weatherData?.current?.temp_f}<sup>&deg;f</sup></h5> */}
                        {/* <h4 className="temperature--f">Feels like {weatherData?.current?.feelslike_c}<sup>&deg;c</sup></h4> */}
                        <h4 className="temperature--f">Feels like {weatherData?.current?.[showCelsius ? 'feelslike_c': 'feelslike_f']}<sup>&deg;{unit}</sup></h4>
                    </div>
                </div>

                <div className="right">
                    <img src={weatherData?.current?.condition.icon}></img>
                    <p> {weatherData?.current?.condition.text} </p>

                    <div className="minmax">
                        <h5>High: {weatherData?.forecast?.forecastday[0].day?.[showCelsius ? 'maxtemp_c': 'maxtemp_f']}<sup>&deg;{unit}</sup></h5>
                        <h5>Low: {weatherData?.forecast?.forecastday[0].day?.[showCelsius ? 'mintemp_c' : 'mintemp_f']}<sup>&deg;{unit}</sup></h5>
                    </div>
                </div>

            </div>
            <div className="forecast">
                {weatherData?.forecast?.forecastday[0].hour.map((hour,index)=>(
                    <div key={index} className={`card ${!hour.is_day ? 'dark':''}`}>
                        <p>{hour.time.split(' ')[1]}</p>
                        {hour?.[showCelsius ? 'dewpoint_c' : 'dewpoint_f']} &deg;{unit}
                        <img src={hour.condition.icon} />
                    </div>
                ))}

            </div>


        </div>
    )
    
}