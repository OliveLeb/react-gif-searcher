import { useEffect, useState } from 'react';
import axios from 'axios';

const useGiphy = (query, numberResult) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        /* const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Hhbv6st4fTi0nMlOXxdRHfBjReZQXjWY&q=${query}&limit=10&offset=0&rating=G&lang=en
                    `);
              const json = await response.json();
              
              setResult(
                response.data.map((item) => {
                  return item.images.preview.mp4;
                })
              );*/
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=Hhbv6st4fTi0nMlOXxdRHfBjReZQXjWY&q=${query}&limit=${numberResult}&offset=0&rating=G&lang=en`
        );
        setResult(
          response.data.data.map((item) => {
            return {
              id: item.id,
              link: item.images.preview.mp4,
              title: item.title,
            };
          })
        );
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== '') fetchData();
  }, [query, isLoading, numberResult]);
  return [result];
};

export default useGiphy;
