import React from 'react';

const GifDetail = ({ title, id, link }) => {
  return (
    <div key={id}>
      {title}
      <img src={link} alt={title} autoPlay />
    </div>
  );
};

export default GifDetail;
