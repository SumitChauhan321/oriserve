// src/Search.js

import React, { useState, useEffect, useRef } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    // Load search history from localStorage when the component mounts
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(savedHistory);
  }, []);

  useEffect(() => {
    // Save search history to localStorage whenever it changes
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = () => {
    if (query) {
      setSearchHistory([...searchHistory, query]);
      setQuery('');
    }
    // Perform your search here
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestionsVisible(false);
  };

  const handleInputClick = () => {
    setSuggestionsVisible(true);
  };

  const handleOutsideClick = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setSuggestionsVisible(false);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSuggestionsVisible(false);
      handleSearch();
    }
  };

  return (
    <div>
      <div className="search-bar" ref={searchInputRef} onClick={handleInputClick}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
        {suggestionsVisible && (
          <div className="suggestions">
            {searchHistory.map((item, index) => (
              <div key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
