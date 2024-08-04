export const cache: { [key: string]: WeatherData } = {};
export const cacheDaily: { [key: string]: WeatherDailyData[] } = {};
export const cacheHourly: { [key: string]: WeatherHourlyData } = {};

export interface WeatherHourlyData {
    list: {
        dt: number;
        main: {
            temp: number;
        };
        weather: {
            description: string;
        }[];
        wind: {
            speed: number;
            deg: number;
        };
        clouds: {
            all: number;
        };
    }[];
}

export interface WeatherDailyData {
    date: string;
    tempMin: number;
    tempMax: number;
    description: string;
    icon: string;
  }

export type WeatherData = {
    coord: {
        lat: number;
        lon: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    name: string;
};

export const API_KEY = "c6dea39f86ea31dc114f0a4f0eec8fa9";
//export const API_KEY = "32e86d776eb8ce9b9f1863c60ee8f317";