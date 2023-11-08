
import { useState } from 'react';
import './App.css';
import { useEffect, useRef } from 'react';



function App() {
  var [value, setValue] = useState()


  const [query, setQuery] = useState();
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









  var [data, setData] = useState([]);
  useEffect(() => {

    fetch("https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=a856b9dec52b4f412babb3c0575f68d7&safe_search=1&format=json&nojsoncallback=1")
      .then(res => res.json())
      .then((data) => {
        setData(data.photos.photo)
        console.log(data.photos.photo)
      })
      .catch(error => console.log(error))
    console.log("lihkujbjk")
  }, [])



  var [search, setSearch] = useState([])
  useEffect(() => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad5a26e733b559f679f7e64bec3480c9&text=${query}&safe_search=1&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then((data) => {
        setSearch(data.photos.photo)
        console.log(data.photos.photo)
      })
      .catch(error => console.log(error))
    console.log("second")
  }, [query])
  function getValue() {
    var v = document.getElementById("searchValue").value
    setValue(v)
    console.log(v)
  }






  if (query ==" ") {
    return (
      <div className="App">
        <div className='header'>
          <p className='heading'>Search Photos</p>
          {/* <input type="text" placeholder='search' id='searchValue' className='searchBar' onChange={getValue}  /> */}
          <div className="search-bar" ref={searchInputRef} onClick={handleInputClick}>
          <input
            id='searchValue' className='searchBar'
            type="text" 
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleInputKeyPress}
          />
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



        {/* <div className="search-bar" ref={searchInputRef} onClick={handleInputClick}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
        {suggestionsVisible && (
          <div className="suggestions">
            {searchHistory.map((item, index) => (
              <div key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div> */}






        <div className='section'>
          {
            data.map((e, index) =>
              <div className='images' key={index}>

                <img className='img' src={`https://live.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`} alt="Logo" />

              </div>
            )
          }
        </div>


      </div>
    );
  }
  else {
    return (
      <div className="App">
      <div className='header'>
        <p className='heading'>Search Photos</p>
        {/* <input type="text" placeholder='search' id='searchValue' className='searchBar' onChange={getValue}  /> */}
        <div className="search-bar" ref={searchInputRef} onClick={handleInputClick}>
        <input
          id='searchValue' className='searchBar'
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
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

        <div className='section' >
          {
            search.map((e, index) =>
              <div className='images' key={index}>

                <img className='img' src={`https://live.staticflickr.com/${e.server}/${e.id}_${e.secret}.jpg`} alt="Logo" />

              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
