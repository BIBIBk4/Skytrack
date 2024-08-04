import { FaWind, FaTint, FaTachometerAlt, FaCloud, FaArrowUp, FaSun, FaMoon, FaWater, FaMountain } from 'react-icons/fa';
import moment from 'moment';

export const getWindDirection = (deg:any) => {
    if (deg > 337.5) return 'N';
    if (deg > 292.5) return 'NW';
    if (deg > 247.5) return 'W';
    if (deg > 202.5) return 'SW';
    if (deg > 157.5) return 'S';
    if (deg > 122.5) return 'SE';
    if (deg > 67.5) return 'E';
    if (deg > 22.5) return 'NE';
    return 'N';
};

export const ContenuMeteo = ({weatherData}:any) => {

    return(
        <>
        <div className="sm:text-lg">
            <div className="flex justify-left">
            <div className="mr-8">
            <div className="flex items-center mb-2">
                <FaWind className="text-2xl mr-2" />
                <p>{weatherData.wind.speed} m/s {getWindDirection(weatherData.wind.deg)}</p>
                <FaArrowUp className="ml-2 transform" style={{ transform: `rotate(${weatherData.wind.deg}deg)` }} />
            </div>
            <div className="flex items-center mb-2">
                <FaTachometerAlt className="text-2xl mr-2" />
                <p>{weatherData.main.pressure} hPa</p>
            </div>
            <div className="flex items-center mb-2">
                <FaTint className="text-2xl mr-2" />
                <p>Humidité: {weatherData.main.humidity}%</p>
            </div>
            <div className="flex items-center mb-2">
                <FaCloud className="text-2xl mr-2" />
                <p>Couverture nuageuse: {weatherData.clouds.all}%</p>
            </div>
            <div className="flex items-center mb-2">
                <p>Visibilité: {weatherData.visibility / 1000} km</p>
            </div>
            </div>
            <div>
            <div className="flex items-center mb-2">
                <FaSun className="text-2xl mr-2" />
                <p>Lever du soleil: {moment.unix(weatherData.sys.sunrise).format("HH:mm")}</p>
            </div>
            <div className="flex items-center mb-2">
                <FaMoon className="text-2xl mr-2" />
                <p>Coucher du soleil: {moment.unix(weatherData.sys.sunset).format("HH:mm")}</p>
            </div>
        <div className="flex items-center mb-2">
            <FaWater className="text-2xl mr-2" />
            <p>Niveau de la mer: {weatherData.main.sea_level} m</p>
        </div>
        <div className="flex items-center mb-2">
            <FaMountain className="text-2xl mr-2" />
            <p>Niveau du sol: {weatherData.main.grnd_level} m</p>
        </div>
            </div>
            </div>
        </div>
    </>
    );
}