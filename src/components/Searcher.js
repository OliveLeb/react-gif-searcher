import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useGiphy from '../useGiphy';
import { Context as ThemeContext } from '../contexts/ThemeContext';
import GifsList from './GifsList';
import GifDetail from './GifDetail';
import SearchBar from './SearchBar';

import GifReducer, { initialState } from '../reducers/GifReducer';
//import InfiniteScroll from '../customHooks/InfiniteScroll';

const Search = () => {
  const { state } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = state;
  const theme = isLightTheme ? light : dark;
  const [etat, dispatch] = useReducer(GifReducer, initialState);
  const { search, query, numberResult, offsetGif } = etat;
  const { slug } = useParams();
  const history = useHistory();

  const [gifs, isLoading, hasMore, error, totalCount] = useGiphy(
    query,
    numberResult,
    offsetGif
  );

  const gifById = (slug) => {
    const oneGif = gifs.find((item) => item.param === slug);
    return (
      <GifDetail
        title={oneGif.title}
        id={oneGif.id}
        link={oneGif.linkDetail}
        Glink={oneGif.linkGiphy}
        history={history}
        dispatch={dispatch}
      />
    );
  };

  const observer = useRef(null);
  const lastGifsRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            dispatch({ type: 'INC_OFFSET' });
          }
        },
        {
          threshold: 1.0,
        }
      );
      console.log(node);
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
  /*
  const [lastGifsRef] = InfiniteScroll({
    isLoading,
    hasMore,
    numberResult,
    //  offsetGif,
  });*/

  const gifRef = useRef(null);
  const gifObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentGif = entry.target;
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

  return (
    <>
      <div
        style={{
          background: theme.ui,
          color: theme.syntax,
          minHeight: 'calc(100vh - 88px)',
          textAlign: 'center',
          paddingTop: '50px',
        }}
      >
        <h1>GIF SEARCHER</h1>
        <SearchBar
          slug={slug}
          history={history}
          dispatch={dispatch}
          search={search}
          query={query}
        />
        <br />

        {slug ? (
          gifById(slug)
        ) : (
          <div>
            {' '}
            {query} {totalCount !== 0 ? totalCount + ' resultats' : null}{' '}
            <GifsList
              gifs={gifs}
              lastGifsRef={lastGifsRef}
              numberResult={numberResult}
              dispatch={dispatch}
            />
          </div>
        )}

        <div>{isLoading && 'Loading ...'}</div>

        <div>{error && 'Error'}</div>
      </div>
    </>
  );
};

export default Search;
