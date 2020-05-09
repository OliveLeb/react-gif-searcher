import { useRef, useCallback, useState } from 'react';

const InfiniteScroll = (props) => {
  //  const [offsetGif, setOffsetGif] = useState(0);
  const observer = useRef(null);
  const lastGifsRef = useCallback(
    (node) => {
      if (props.isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && props.hasMore) {
            //  setOffsetGif((prevOffSetGif) => prevOffSetGif + props.numberResult);
          }
        },
        {
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);
    },
    [props]
  );
  return [lastGifsRef];
};

export default InfiniteScroll;
