import React from 'react';
import SEARCH_ICON_BLACK from "../images/icons8-search-64.png";
import REMOVE_ICON from "../images/icons8-remove-64.png";

const SearchHistory = ({ history, onRemoveHistoryItem }) => {
    return (
        <div className="mt-4 bg-[#d5c0ed] rounded-3xl p-7 w-full">
            <h2 className="text-xl mb-2">Search History</h2>
            <ul className="list-none list-inside flex flex-col gap-5">
                {history.length > 0 ? history.map((item, index) => {
                    const { query, data } = item;
                    const { timeSearch } = data;
                    console.log('item', item);
                    return (
                        <li key={index} className="bg-[#E5DAF5] rounded-2xl p-4 flex flex-row items-center justify-between">
                            <p className="max-w-[250px]">
                                {query}
                            </p>
                            <div className="flex flex-row gap-2 items-center">
                                <p className='mr-1'>{timeSearch}</p>
                                <button className="rounded-full bg-white p-3 shadow-xl">
                                    <img src={SEARCH_ICON_BLACK} alt="search-icon" width={20} height={20} />
                                </button>
                                <button onClick={() => onRemoveHistoryItem(query)} className="rounded-full bg-white p-3 shadow-xl">
                                    <img src={REMOVE_ICON} alt="search-icon" width={20} height={20} />
                                </button>
                            </div>
                        </li>
                    )
                }) : <p className="p-5 text-center">No history found!!</p>}
            </ul>
        </div>
    );
};

export default React.memo(SearchHistory);