import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <>
      <div>
        <p>
          2020 - Made By{' '}
          <a
            href='https://cv.lebelolivier.fr/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Olivier Lebel
          </a>{' '}
          Using{' '}
          <a
            href='https://giphy.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Giphy
          </a>{' '}
          API
        </p>
      </div>
      <Navigation />
    </>
  );
};

export default Header;
