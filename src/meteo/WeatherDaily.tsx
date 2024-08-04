import { useEffect, useState } from 'react';
import axios from 'axios'
import { format, getHours } from 'date-fns';
import { roundToHalf } from './Weather';
import { WeatherDailyData, cacheDaily, API_KEY } from "../libs/weatherDec"
import { useIndex } from '../context/indexContext';
import { SkeletonCard } from '../skeleton/skeletonCard'

const WeatherDaily = () => {
  const [forecast, setForecast] = useState<WeatherDailyData[] | null>(null);
  const {coordonnees} = useIndex();

  const  getDailyWeather = async () => {
    try {
        const cacheKeyD = `${coordonnees?.latitude},${coordonnees?.longitude}`;
            if (cacheDaily[cacheKeyD]) {
                setForecast(cacheDaily[cacheKeyD]);
                return;
            }
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast',{
        params: {
            lat: coordonnees?.latitude,
            lon: coordonnees?.longitude,
            units: 'metric',
            lang: 'fr',
            appid: API_KEY,
        }
    });

      const data = await response.data;

      const dailyData: Record<string, {
        tempMin: number;
        tempMax: number;
        description: string;
        icon: string;
      }> = {};

      data.list.forEach((entry: any) => {
        const date = format(new Date(entry.dt * 1000), 'yyyy-MM-dd');
        const hour = getHours(new Date(entry.dt * 1000));
        const isDaytime = hour >= 6 && hour <= 18;

        if (isDaytime) {
          if (!dailyData[date]) {
            dailyData[date] = {
              tempMin: entry.main.temp_min,
              tempMax: entry.main.temp_max,
              description: entry.weather[0].description,
              icon: entry.weather[0].icon,
            };
          } else {
            dailyData[date].tempMin = Math.min(dailyData[date].tempMin, entry.main.temp_min);
            dailyData[date].tempMax = Math.max(dailyData[date].tempMax, entry.main.temp_max);
          }
        }
      });

      const today = format(new Date(), 'yyyy-MM-dd');

      const formattedData = Object.keys(dailyData)
        .filter(date => date !== today) 
        .slice(0, 7)
        .map(date => ({
          date,
          ...dailyData[date]
        }));
        cacheDaily[cacheKeyD] = formattedData;
        setTimeout(() => {
      setForecast(formattedData);
        },2000);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
    }
  };

  useEffect(() => {
    if(coordonnees)
    getDailyWeather();
  }, [coordonnees]);

  setInterval(() => {
    getDailyWeather();
  }, 21600000);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Prévisions Météo Quotidiennes</h2>
      <div className="flex flex-wrap sm:flex-nowrap overflow-x-auto space-y-2 sm:space-y-0 sm:space-x-4 pb-4">
      {forecast
          ?
          forecast.map((day, index) => (
          <div key={index} className="w-full sm:w-72 bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex-shrink-0 sm:flex-none">
            <div className="flex items-center">
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
                className="w-16 h-16 mr-4"
              />
              <div className="flex-1">
                <span className="block text-lg font-semibold text-gray-700">{day.date}</span>
                <span className="block text-gray-600">{day.description}</span>
                <span className="block text-blue-600 font-medium">
                  {roundToHalf(day.tempMin)}° / {roundToHalf(day.tempMax)}°
                </span>
              </div>
            </div>
          </div>
       ))
       : Array(5)
           .fill(0)
           .map((_, index) => <SkeletonCard key={index} />)}
      </div>
    </div>
  );
};

export { WeatherDaily };
