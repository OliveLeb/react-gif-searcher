import React, { useState, useRef, useCallback, useContext } from 'react';
import useGiphy from '../useGiphy';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Search = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [numberResult, setNumberResult] = useState(25);
  const [result, isLoading, hasMore, error] = useGiphy(query, numberResult);
  const { state } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = state;
  const theme = isLightTheme ? light : dark;

  const observer = useRef();
  const lastGifsRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setNumberResult((prevNumberResult) => prevNumberResult + 25);
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
    <div
      style={{
        background: theme.bg,
        color: theme.syntax,
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>GIF SEARCHER</h1>
      <form onSubmit={onSubmit}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search for GIFS !'
        />
        <button type='submit'>Search</button>
      </form>
      <br />
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          width: '60%',
          margin: 'auto',
        }}
      >
        {result.map((item, index) => {
          if (result.length === index + 1) {
            return (
              <div key={item.id} ref={lastGifsRef}>
                <video autoPlay loop src={item.link} />
              </div>
            );
          } else {
            return (
              <div key={item.id}>
                <video autoPlay loop src={item.link} />
              </div>
            );
          }
        })}
      </div>
      <div>{isLoading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  );
};

export default Search;
