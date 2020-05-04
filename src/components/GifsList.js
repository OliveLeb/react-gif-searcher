import React from 'react';
import { Link } from 'react-router-dom';

const GifsList = ({ gifs, lastGifsRef }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          maxWidth: 'calc(200px * 4 + 4em)',
          justifyContent: 'center',
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
                  margin: '0 0.5em',
                }}
              >
                {
                  <Link to={`/${item.param}`}>
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
                  margin: '0 0.5em 10px',
                }}
              >
                {
                  <Link to={`/${item.param}`}>
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
