import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';

function Navbar() {

    const [weather, setWeather] = useState();
    const { latitude, longitude } = usePosition();

    const getWeatherData = async (lat, lon) => {
        const key = process.env.REACT_APP_WEATHER_API_KEY;
        const lang = navigator.language.split('-')[0];

        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`)
            setWeather(data);
        } catch {
            alert('Bi teslik var sanki...');
        }

    }
    useEffect(() => {
        latitude && longitude && getWeatherData(latitude, longitude);
    }, [latitude, longitude])

    if (!weather) {
        return <p>Loading...</p>
    }


    return (
        <div className='container '>
            <div className='row'>
                <div className='col navbar navbar-light bg-light'>
                    <div className="container d-flex justify-content-start">
                        <h6><a className="navbar-brand" href="#">News</a></h6>
                    </div>

                </div>
                <div className='col navbar navbar-light bg-light'>
                    <div className="container d-flex justify-content-center">
                        <h4>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
                    </div>

                </div>
                <div className='col navbar navbar-light bg-light'>
                    <div className="container d-flex justify-content-end">
                        <h6>{weather.name} / {weather.main.temp}°C</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
