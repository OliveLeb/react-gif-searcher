import { useEffect, useState } from 'react';
import axios from 'axios';

const useGiphy = (query, numberResult) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const url = `https://api.giphy.com/v1/gifs/search?api_key=Hhbv6st4fTi0nMlOXxdRHfBjReZQXjWY&q=${query}&limit=${numberResult}&offset=0&rating=G&lang=en`;

  useEffect(() => {
    let cancel;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await axios.get(url, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setResult(
          response.data.data.map((item) => {
            return {
              id: item.id,
              link: item.images.preview.mp4,
              title: item.title,
            };
          })
        );
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
  }, [numberResult, query, url, hasMore]);
  return [result, isLoading, hasMore, error];
};

export default useGiphy;
