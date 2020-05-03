import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { BsSearch } from 'react-icons/bs';
//import Spinner from 'react-bootstrap/Spinner';
import useGiphy from '../useGiphy';
import { Context as ThemeContext } from '../contexts/ThemeContext';
import GifsList from './GifsList';

const Search = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [numberResult, setNumberResult] = useState(20);
  const [offsetGif, setOffsetGif] = useState(0);

  const [gifs, isLoading, hasMore, error, totalCount] = useGiphy(
    query,
    numberResult,
    offsetGif
  );
  const { state } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = state;
  const theme = isLightTheme ? light : dark;

  const observer = useRef(null);
  const lastGifsRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setOffsetGif((prevOffSetGif) => prevOffSetGif + numberResult);
          }
        },
        {
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, numberResult]
  );

  const gifRef = useRef(null);
  const gifObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      //console.log(entries);
      entries.forEach((entry) => {
        // if (entry.intersectionRatio > 0) {
        if (entry.isIntersecting) {
          const currentGif = entry.target;
          // console.log(`${currentGif.title} lazy loading`);
          const newGifSrc = currentGif.dataset.src;
          if (!newGifSrc) {
            console.error('Gif source invalid');
          } else {
            currentGif.src = newGifSrc;
            currentGif.setAttribute('autoPlay', 'true');
            //currentGif.classList.remove('gifRendered');
          }
          // intObs.unobserve(node);
        } else {
          entry.target.removeAttribute('autoPlay');
          //entry.target.src = '';
          //intObs.unobserve(node);
        }
      });
    });
    intObs.observe(node);
  }, []);

  useEffect(() => {
    gifRef.current = document.querySelectorAll('.gifRendered');
    if (gifRef.current) {
      gifRef.current.forEach((gif) => gifObserver(gif));
    }
  }, [gifObserver, gifRef, gifs]);

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setNumberResult(20);
  };

  return (
    <>
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

        {
          <GifsList
            gifs={gifs}
            lastGifsRef={lastGifsRef}
            numberResult={numberResult}
          />
        }

        <div>
          {
            isLoading && 'Loading ...'
            //(

            // <>
            //   <Spinner animation='grow' variant='danger' />
            //  <Spinner animation='grow' variant='warning' />
            //    <Spinner animation='grow' variant='info' />
            //  </>
            //  )
          }
        </div>

        <div>{error && 'Error'}</div>
      </div>
    </>
  );
};

export default Search;
