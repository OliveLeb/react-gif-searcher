import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Theme = () => {
  const { state, switchTheme } = useContext(ThemeContext);
  const { isLightTheme } = state;

  const button = {
    fontSize: '1.5rem',
  };

  return (
    <div>
      {isLightTheme ? (
        <FaSun style={button} onClick={switchTheme} />
      ) : (
        <FaMoon style={button} onClick={switchTheme} />
      )}
    </div>
  );
};

export default Theme;
