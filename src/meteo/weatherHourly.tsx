import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { API_KEY } from '../libs/weatherDec';
import { useIndex } from '../context/indexContext';
import { getWindDirection } from './weatherData';
import { SkeletonMeteoDetail } from '../skeleton/skeletonMeteoDetail';
import { WeatherHourlyData, cacheHourly } from '../libs/weatherDec';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const HourlyForecastChart = () => {
    const [forecastData, setForecastData] = useState<WeatherHourlyData | null>(null);
    const { coordonnees, setIndex } = useIndex();

    const getHourlyWeather = async () => {
        try {
            const cacheKeyH = `${coordonnees?.latitude},${coordonnees?.longitude}`;
            if (cacheHourly[cacheKeyH]) {
                setForecastData(cacheHourly[cacheKeyH]);
                return;
            }
            const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    lat: coordonnees?.latitude,
                    lon: coordonnees?.longitude,
                    units: 'metric',
                    lang: 'fr',
                    cnt: 9,
                    appid: API_KEY,
                }
            });
            cacheHourly[cacheKeyH] = response.data;
            setTimeout(() => {
                setForecastData(response.data);
            }, 2000);
        } catch (error) {
            setIndex(0);
            console.error("Erreur dans l'extraction des données météorologiques via l'API", error);
        }
    };

    useEffect(() => {
        if(coordonnees)
        getHourlyWeather();
    }, [coordonnees]);

    setInterval(() => {
        getHourlyWeather();
      }, 7200000);//2h

    const data = {
        labels: forecastData?.list.map(item => {
            const date = new Date(item.dt * 1000);
            const hours = date.getHours();
            const direction = getWindDirection(item.wind.deg);
            return `${hours}h\n${item.weather[0].description}\n${item.wind.speed} m/s ${direction}\n${item.clouds.all}%`;
        }),
        datasets: [
            {
                label: 'Température (°C)',
                data: forecastData?.list.map(item => item.main.temp),
                fill: false,
                backgroundColor: '#1E40AF',
                borderColor: '#1E40AF',
                pointBackgroundColor: '#0EA5E9',
                pointBorderColor: '#0EA5E9',
            },
        ],
    };

    return (
        <div className='bg-gray-50 p-4 rounded-lg shadow-lg sm:w-full sm:overflow-x-auto'>
            {forecastData ? (
                <Line 
                    data={data} 
                    options={{ 
                        plugins: { 
                            legend: { 
                                labels: { color: '#1E3A8A', font: { size: 12 } } 
                            } 
                        },
                        scales: {
                            x: { 
                                ticks: { 
                                    color: '#1E3A8A',
                                    callback: function(value) {
                                        const label = this.getLabelForValue(value as number);
                                        return label.split('\n');
                                    }
                                } 
                            },
                            y: { 
                                ticks: { 
                                    color: '#1E3A8A', 
                                    font: { size: 12 } 
                                } 
                            } 
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                    }} 
                    height={300}
                />
            ) : (
                <SkeletonMeteoDetail/>
            )}
        </div>
    );
};
