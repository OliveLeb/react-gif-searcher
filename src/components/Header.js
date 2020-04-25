import React, { useContext } from 'react';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const { state } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = state;
  const theme = isLightTheme ? light : dark;
  return (
    <>
      <div style={{ background: theme.bg, color: theme.syntax }}>
        <p>
          2020 - Made By{' '}
          <a
            href='https://cv.lebelolivier.fr/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.syntax }}
          >
            Olivier Lebel
          </a>{' '}
          with the help of{' '}
          <a
            href='https://giphy.com/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.syntax }}
          >
            Giphy's
          </a>{' '}
          API
        </p>
      </div>
    </>
  );
};

export default Header;