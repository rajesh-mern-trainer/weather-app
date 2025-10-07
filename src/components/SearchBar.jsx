import { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSearch(input.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex p-4 bg-white/50 backdrop-blur-md rounded-xl shadow-lg mb-6">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter city name..."
                className="flex-grow p-3 text-lg bg-transparent focus:outline-none placeholder-gray-700/80"
                disabled={isLoading}
            />
            <button
                type="submit"
                className="ml-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
            >
                {isLoading ? 'fetching...' : (
                    <span className="text-xl">→</span>
                )}
            </button>
        </form>
    );
};


export default SearchBar