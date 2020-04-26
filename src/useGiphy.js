import { useEffect, useState } from 'react';
import axios from 'axios';

const useGiphy = (query, numberResult) => {
  const [result, setResult] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const url = `https://api.giphy.com/v1/gifs/search?api_key=g5XEHugGVJ9S3c3ojjpKmHs0facB024N&q=${query}&limit=${numberResult}&offset=0&rating=G&lang=en`;

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
              size: {
                height: item.images.preview.height,
                width: item.images.preview.width,
              },
            };
          })
        );
        setTotalCount(response.data.pagination.total_count);
        setHasMore(totalCount > response.data.pagination.count);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError(true);
      } finally {
        setIsLoading(false);
        return () => cancel();
      }
    };
    if (query !== '') fetchData();
  }, [numberResult, query, url, hasMore, totalCount]);
  return [result, isLoading, hasMore, error, totalCount];
};

export default useGiphy;
