/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { fetchWeather, fetchSuggestions } from '../api/weatherApi';
import { debounce } from '../utils/debounce';
import SEARCH_ICON from "../images/search-icon.png";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debouncedFetchSuggestions = useCallback(
        debounce(async (query) => {
            try {
                const data = await fetchSuggestions(query);
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching the suggestions', error);
            }
        }, 500),
        []
    );

    const onInputChanged = (query) => {
        setQuery(query);
        if (query.trim()) {
            debouncedFetchSuggestions(query);
        } else {
            setShowSuggestions(false);
        }
    }

    const handleSearch = async (selectedQuery) => {
        const searchQuery = selectedQuery || query;
        if (searchQuery.trim()) {
            try {
                const data = await fetchWeather(searchQuery);
                onSearch(searchQuery, data);
                setQuery('');
                setShowSuggestions(false);
            } catch (error) {
                console.error('Error fetching the weather data', error);
            }
        }
    };

    const handleSuggestionClick = (location) => {
        setQuery(location);
        handleSearch(location);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onInputChanged(e.target.value)}
                    placeholder="Search for a city"
                    className="border-0 py-2 px-5 w-full bg-secondary rounded-3xl text-black h-[50px]"
                />
                <button onClick={() => handleSearch()} className="bg-primary p-2 w-[50px] h-[50px] rounded-2xl flex justify-center items-center">
                    <img src={SEARCH_ICON} alt="search-icon" width={25} height={25} />
                </button>
            </div>
            {showSuggestions && <ul className="absolute z-10 bg-secondary border rounded w-full mt-1">
                {suggestions.length > 0 ? suggestions.map((suggestion, index) => {
                    const { name, region, country } = suggestion;
                    const location = `${name}, ${region}, ${country}`;
                    return (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(location)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {location}
                        </li>
                    )
                }) : (
                    <li className="w-full h-full flex justify-center items-center p-2">Can't find the location. Please try again</li>
                )}
            </ul>}
        </div>
    );
};

export default SearchBar;