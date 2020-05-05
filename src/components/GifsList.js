import React from 'react';
import { Link } from 'react-router-dom';
import MasonryLayout from './MasonryLayout';
import PropTypes from 'prop-types';

const GifsList = ({ gifs, lastGifsRef }) => {
  MasonryLayout.propTypes = {
    columns: PropTypes.number.isRequired,
    gap: PropTypes.number.isRequired,
    key: PropTypes.array,
    children: PropTypes.arrayOf(PropTypes.element),
  };
  MasonryLayout.defaultProps = {
    columns: 4,
    gap: 20,
  };

  return (
    <>
      {
        <MasonryLayout columns={4} gap={0.5}>
          {gifs.map((item, index) => {
            if (gifs.length === index + 1) {
              return (
                <Link to={`/${item.param}`} key={item.id}>
                  <img
                    //key={item.id}
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
              );
            } else {
              return (
                <Link to={`/${item.param}`} key={item.id}>
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
              );
            }
          })}
        </MasonryLayout>
      }
    </>
  );
};

export default GifsList;
