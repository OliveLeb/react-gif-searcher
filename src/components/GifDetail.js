import React from 'react';

const GifDetail = ({ title, id, link }) => {
  return (
    <div key={id}>
      <h2>{title}</h2>
      <img src={link} alt={title} autoPlay />
    </div>
  );
};

export default GifDetail;
