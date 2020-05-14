import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

const GifDetail = ({ oneGif, history }) => {
  const [gif, setGif] = useState({});
  const storedGif = sessionStorage.getItem('gif');

  const goBack = () => {
    history.goBack();
    sessionStorage.clear();
  };

  useEffect(() => {
    if (storedGif) {
      setGif(JSON.parse(storedGif));
    } else {
      setGif(oneGif);
      sessionStorage.setItem('gif', JSON.stringify(oneGif));
    }
  }, [oneGif, storedGif]);
  return (
    <>
      <div style={{ textAlign: 'left', marginLeft: '10%' }}>
        <button
          onClick={goBack}
          style={{ border: 'none', background: 'transparent' }}
        >
          <IoMdArrowRoundBack /> Retour
        </button>
      </div>
      <div key={gif.id}>
        <h2>{gif.title}</h2>
        <img src={gif.linkDetail} alt={gif.title} autoPlay />
      </div>
      <div>
        <a href={gif.Glink} target='_blank' rel='noopener noreferrer'>
          Voir sur Giphy
          <img
            src={require(`../assets/giphy-seeklogo.com.svg`)}
            alt='Voir sur Giphy.com'
            height='20'
            width='auto'
          />
        </a>
      </div>
    </>
  );
};

export default GifDetail;
