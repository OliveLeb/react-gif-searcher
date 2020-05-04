import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

const GifDetail = ({ title, id, link, Glink, history }) => {
  const goBack = () => {
    history.goBack();
  };
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
      <div key={id}>
        <h2>{title}</h2>
        <img src={link} alt={title} autoPlay />
      </div>
      <div>
        <a href={Glink} target='_blank' rel='noopener noreferrer'>
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
