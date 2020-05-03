import React from 'react';
import { Link } from 'react-router-dom';

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
              <div
                key={item.id}
                style={{
                  width: '200px',
                  minHeight: `calc(${item.size.height} * 200 / ${item.size.width})`,
                }}
              >
                {
                  <Link to={`/${item.id}`}>
                    <img
                      data-src={item.linkPrev}
                      src=''
                      title={item.title}
                      alt={item.title}
                      ref={lastGifsRef}
                      className='gifRendered'
                      style={{
                        width: '100%',
                        height: 'auto',
                        background: 'green',
                      }}
                    />
                  </Link>
                }
              </div>
            );
          } else {
            return (
              <div
                key={item.id}
                style={{
                  width: '200px',
                  minHeight: `calc(${item.size.height} * 200 / ${item.size.width})`,
                  marginBottom: '10px',
                }}
              >
                {
                  <Link to={`/${item.id}`}>
                    <img
                      data-src={item.linkPrev}
                      title={item.title}
                      alt={item.title}
                      src=''
                      className='gifRendered'
                      style={{
                        width: '100%',
                        height: 'auto',
                        background: 'green',
                        display: 'block',
                      }}
                    />
                  </Link>
                }
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default GifsList;
