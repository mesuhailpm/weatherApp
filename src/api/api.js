import axios from 'axios'

const key  = 'dfaa888e786c46b69e385936231206'
const URL = 'http://api.weatherapi.com/v1'
export const fetchWeatherBySearch = async (query) =>{
    try {
        const response = await axios.get(`${URL}/current.json?key=${key}&q=${query}`)
        return response.data
        
    } catch (error) {
        
        console.log(error)
    }
    
    
}