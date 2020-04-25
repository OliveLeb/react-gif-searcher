import React, { useState, useRef, useCallback } from 'react';
import useGiphy from './useGiphy';
import Header from './components/Header';

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [numberResult, setNumberResult] = useState(10);
  const [result, isLoading, hasMore, error] = useGiphy(query, numberResult);

  const observer = useRef();
  const lastGifsRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setNumberResult((prevNumberResult) => prevNumberResult + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setNumberResult(10);
  };

  return (
    <>
      <Header />
      <div>
        <h1>GIF SEARCHER</h1>
        <form onSubmit={onSubmit}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for GIFS !'
          />
          <button type='submit'>Search</button>
          {/*<label>
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
        </label>*/}
        </form>
        <br />
        {result.map((item, index) => {
          if (result.length === index + 1) {
            return (
              <div key={item.id} ref={lastGifsRef}>
                <h3>{item.title}</h3>
                <video autoPlay loop src={item.link} />
              </div>
            );
          } else {
            return (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <video autoPlay loop src={item.link} />
              </div>
            );
          }
        })}
        <div>{isLoading && 'Loading...'}</div>
        <div>{error && 'Error'}</div>
      </div>
    </>
  );
}

export default App;
