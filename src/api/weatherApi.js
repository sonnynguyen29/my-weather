import axios from 'axios';
import { format } from 'date-fns';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (query) => {
    const response = await axios.get(`${BASE_URL}/current.json`, {
        params: {
            key: API_KEY,
            q: query,
        },
    });


    const now = new Date();
    const timeSearch = format(now, 'dd:MM:yyyy hh:mm aa');

    return {
        ...response.data,
        timeSearch,
    };
};

export const fetchSuggestions = async (query) => {
    const response = await axios.get(`${BASE_URL}/search.json`, {
        params: {
            key: API_KEY,
            q: query,
        },
    });

    return response.data.map((item) => ({
        id: item.id,
        name: item.name,
        region: item.region,
        country: item.country,
    }));
};