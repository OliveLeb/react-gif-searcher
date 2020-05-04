import React from 'react';

const GifDetail = ({ title, id, link, Glink }) => {
  return (
    <>
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
