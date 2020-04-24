import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useGiphy = (query, numberResult) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        /* const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Hhbv6st4fTi0nMlOXxdRHfBjReZQXjWY&q=${query}&limit=10&offset=0&rating=G&lang=en
              `);
        const json = await response.json();
        
        setResult(
          response.data.map((item) => {
            return item.images.preview.mp4;
          })
        );*/
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=Hhbv6st4fTi0nMlOXxdRHfBjReZQXjWY&q=${query}&limit=${numberResult}&offset=0&rating=G&lang=en`
        );
        setResult(
          response.data.data.map((item) => {
            return item.images.preview.mp4;
          })
        );
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== '') fetchData();
  }, [query, isLoading, result, numberResult]);
  return [result];
};

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [numberResult, setNumberResult] = useState(10);
  const [result, isLoading] = useGiphy(query, numberResult);

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div>
      <h1>GIF SEARCHER</h1>
      <form onSubmit={onSubmit}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search for GIFS !'
        />
        <button type='submit'>Search</button>
        <label>
          GIFS par page :
          <select
            value={numberResult}
            onChange={(e) => setNumberResult(e.target.value)}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
          </select>
        </label>
      </form>
      <br />
      {isLoading ? (
        <p>Searching...</p>
      ) : (
        result.map((item) => <video autoPlay loop key={item} src={item} />)
      )}
    </div>
  );
}

export default App;
