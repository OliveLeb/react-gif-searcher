import { useEffect, useState } from 'react';
import axios from 'axios';

const useGiphy = (query, numberResult, offsetGif) => {
  const [gifs, setGifs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const url = `https://api.giphy.com/v1/gifs/search?api_key=g5XEHugGVJ9S3c3ojjpKmHs0facB024N&q=${query}&limit=${numberResult}&offset=${offsetGif}&rating=G&lang=en`;

  useEffect(() => {
    setGifs([]);
  }, [query]);

  useEffect(() => {
    let cancel;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await axios.get(url, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
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
        setTotalCount(response.data.pagination.total_count);
        setHasMore(
          response.data.pagination.total_count > response.data.pagination.count
        );
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError(true);
      } finally {
        setIsLoading(false);
        return () => cancel();
      }
    };
    if (query !== '') fetchData();
  }, [query, url, numberResult, offsetGif]);

  return [gifs, isLoading, hasMore, error, totalCount];
};

export default useGiphy;
