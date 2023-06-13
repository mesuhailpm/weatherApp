import axios from 'axios'

const key  = 'dfaa888e786c46b69e385936231206'
const URL = 'https://api.weatherapi.com/v1'
export const fetchWeatherBySearch = async (query) =>{
    try {
        const response = await axios.get(`${URL}/forecast.json?key=${key}&q=${query}`)
        console.log(response)
        return response.data
        
    } catch (error) {
        
        console.log(error)
    }
    
    
}