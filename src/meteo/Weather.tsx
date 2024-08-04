import { useEffect, useState } from "react";
import axios from 'axios';
import { useIndex } from "../context/indexContext";
import { MeteoMap } from "./map";
import { ContenuMeteo } from "./weatherData";
import { SkeletonContenuMeteo } from "../skeleton/skeletonMeteoData";
import SkeletonMapMeteo from "../skeleton/skeletonMapMeteo";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { WeatherData } from "../libs/weatherDec";
import { cache } from "../libs/weatherDec";
import { API_KEY } from "../libs/weatherDec";
import { HourlyForecastChart } from "./weatherHourly"
import { WeatherDaily } from './WeatherDaily'


export const roundToHalf = (num:any) => {
    return Math.round(num * 2) / 2;
};

export const Weather = () => {
    const { coordonnees,setIndex } = useIndex();
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleString("fr-FR", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      );

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date().toLocaleString("fr-FR", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
        }, []);

    const getWeather = async () => {
        const cacheKey = coordonnees ? `${coordonnees.latitude},${coordonnees.longitude}`: '0,0';
    if (cache[cacheKey]){
      setWeatherData(cache[cacheKey]);
      console.log("Vrai");
    } else {
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: coordonnees?.latitude,lon: coordonnees?.longitude,
                    units: 'metric',
                    lang: 'fr',
                    appid: API_KEY,
                }
            });
            console.log("Faux");
            cache[cacheKey] = response.data;
            setTimeout(() => {
                setWeatherData(response.data);
            }
            , 2000);
        } catch (error) {
            setIndex(0);
            console.error("Erreur dans l'extraction des données météorologiques via l'API", error);
        }
    }
    };

    useEffect(() => {
        if (coordonnees) getWeather();
      }, [coordonnees]);

    setInterval(() => {
        getWeather();
      }, 3600000);

    console.log(cache);

    return (
<div className="min-h-screenjustify-center bg-gradient-to-br from-blue-500 to-blue-900 text-white py-10">
        <div className="mx-auto max-w-6xl h-1/3 w-full bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg my-10 sm:flex">
            <div className="sm:w-1/2 p-4">
            { weatherData ? (<>
            <h4>{currentTime} <br /></h4>
        <div className="flex items-center mb-4 mt-10">
            <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            className="w-24 h-24 mr-4"
            />
            <span className="text-6xl ml-2">{roundToHalf(weatherData.main.temp)}°C</span>
        </div>
        <p className="text-2xl mb-10">{weatherData.weather[0].description}</p>
        <h1 className="flex text-2xl font-bold mb-4">
            <FaMapMarkerAlt /> <span className="ml-5">{weatherData.name}, {weatherData.sys.country}</span>
        </h1>
        <p className="mb-4 font-bold text-sm">
            <span className="ml-4 text-sm">{roundToHalf(weatherData.main.temp_min)}° / {roundToHalf(weatherData.main.temp_max)}°</span> Ressenti {roundToHalf(weatherData.main.feels_like)}°
        </p>
        <div className="sm:hidden w-full p-4 flex items-center justify-center">
            {coordonnees && weatherData ? (<MeteoMap lat={coordonnees.latitude} long={coordonnees.longitude} name={weatherData.name} country={weatherData.sys.country} /> ) : ( <SkeletonMapMeteo />)
            }
        </div>
         <ContenuMeteo weatherData={weatherData} /> 
         </>
         ) : ( 
         <SkeletonContenuMeteo /> 
         )}
            </div>
            <div className="hidden sm:block w-1/2 p-4 flex items-center justify-center">
            {coordonnees && weatherData ? (<MeteoMap lat={coordonnees.latitude} long={coordonnees.longitude} name={weatherData.name} country={weatherData.sys.country} /> ) : ( <SkeletonMapMeteo />)
            }
            </div>
    </div>
    <div className=" p-6 bg-sky-100/25 rounded-lg shadow-lg mt-16">
        <WeatherDaily/>
    </div>
    <div className=" mx-auto p-6 bg-sky-100/25 rounded-lg shadow-lg mt-16">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Prévisions sur 24 h</h1>
        <HourlyForecastChart />
    </div>
</div>

    );
};