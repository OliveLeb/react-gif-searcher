import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import GifReducer, { initialState } from './reducers/GifReducer';

const useGiphy = (query, numberResult, offsetGif) => {
  const [etat, dispatch] = useReducer(GifReducer, initialState);
  const { /*gifs,*/ hasMore, isLoading, error, totalCount } = etat;
  const [gifs, setGifs] = useState([]);

  const url = `https://api.giphy.com/v1/gifs/search?api_key=g5XEHugGVJ9S3c3ojjpKmHs0facB024N&q=${query}&limit=${numberResult}&offset=${offsetGif}&rating=G&lang=en`;

  useEffect(() => {
    setGifs([]);
    //dispatch({ type: 'RESET' });
  }, [query]);

  useEffect(() => {
    let cancel;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const response = await axios.get(url, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        dispatch({
          type:
            'FETCH_SUCCESS' /*
          payload: response.data.data.map((item) => {
            return {
              id: item.id,
              param: item.slug,
              linkPrev: item.images.original.webp,
              linkDetail: item.images.original.url,
              linkGiphy: item.url,
              title: item.title,
              size: {
                width: item.images.preview_webp.width,
                height: item.images.preview_webp.height,
              },
            };
          })*/,
        });
        setGifs((prevGifs) => {
          return [
            ...new Set([
              ...prevGifs,
              ...response.data.data.map((item) => {
                return {
                  id: item.id,
                  param: item.slug,
                  linkPrev: item.images.original.webp,
                  linkDetail: item.images.original.url,
                  linkGiphy: item.url,
                  title: item.title,
                  size: {
                    width: item.images.preview_webp.width,
                    height: item.images.preview_webp.height,
                  },
                };
              }),
            ]),
          ];
        });

        dispatch({
          type: 'TOTAL_COUNT',
          payload: response.data.pagination.total_count,
        });

        dispatch({
          type: 'HAS_MORE',
          payload:
            response.data.pagination.total_count >
            response.data.pagination.count,
        });
      } catch (error) {
        if (axios.isCancel(error)) return;
        dispatch({
          type: 'FETCH_FAILURE',
        });
      } finally {
        return () => cancel();
      }
    };
    if (query !== '') fetchData();
  }, [query, url]);

  return [gifs, isLoading, hasMore, error, totalCount];
};

export default useGiphy;
