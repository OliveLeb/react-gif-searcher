import React, { useState } from 'react';
import useGiphy from './useGiphy';

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
        result.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <video autoPlay loop src={item.link} />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
