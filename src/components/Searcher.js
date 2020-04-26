import React, { useState, useRef, useCallback, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import useGiphy from '../useGiphy';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Search = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [numberResult, setNumberResult] = useState(40);

  const [result, isLoading, hasMore, error, totalCount] = useGiphy(
    query,
    numberResult
  );
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
          setNumberResult((prevNumberResult) => prevNumberResult + 40);
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
        background: theme.ui,
        color: theme.syntax,
        minHeight: '100vh',
        textAlign: 'center',
        paddingTop: '50px',
      }}
    >
      <h1>GIF SEARCHER</h1>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: 'flex',
            width: 'calc(200px * 4 + 3em)',
            margin: 'auto',
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for GIFS !'
            style={{
              border: 'none',
              height: '2em',
              width: '100%',
              paddingLeft: '10px',
              fontSize: '1.5rem',
            }}
          />
          <button
            type='submit'
            style={{
              alignSelf: 'center',
              fontSize: '1.5em',
              border: 'none',
              padding: '12px',
              cursor: 'pointer',
              background: '#fff',
            }}
          >
            {' '}
            <BsSearch style={{ display: 'block' }} />{' '}
          </button>
        </div>
      </form>
      <br />
      <div>
        {' '}
        {query} {totalCount !== 0 ? totalCount + ' resultats' : null}{' '}
      </div>
      <div style={{ width: 'calc(200px * 4 + 3em)', margin: 'auto' }}>
        <div style={{ columns: 4, columnGap: '1em' }}>
          {result.map((item, index) => {
            if (result.length === index + 1) {
              return (
                <div
                  key={item.id}
                  ref={lastGifsRef}
                  style={{ width: '200px', marginBottom: '1em' }}
                >
                  <video
                    autoPlay
                    loop
                    src={item.link}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={item.id}
                  style={{ width: '200px', marginBottom: '1em' }}
                >
                  <video
                    autoPlay
                    loop
                    src={item.link}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div>{isLoading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  );
};

export default Search;
