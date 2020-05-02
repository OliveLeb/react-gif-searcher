import React from 'react';

const GifsList = ({ gifs, lastGifsRef }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          width: 'calc(200px * 4 + 3em)',
          justifyContent: 'space-between',
          margin: 'auto',
        }}
      >
        {gifs.map((item, index) => {
          if (gifs.length === index + 1) {
            return (
              <div key={item.id} style={{ width: '200px', height: 'auto' }}>
                <video
                  autoPlay
                  loop
                  data-src={item.link}
                  src='https://via.placeholder.com/200x200'
                  title={item.title}
                  ref={lastGifsRef}
                  className='gifRendered'
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            );
          } else {
            return (
              <div key={item.id} style={{ width: '200px', height: 'auto' }}>
                <video
                  autoPlay
                  loop
                  data-src={item.link}
                  title={item.title}
                  src='https://via.placeholder.com/200x200'
                  className='gifRendered'
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default GifsList;
