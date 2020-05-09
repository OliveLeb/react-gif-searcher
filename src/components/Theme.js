import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Theme = () => {
  const { state, dispatch } = useContext(ThemeContext);
  const { isLightTheme } = state;

  const button = {
    fontSize: '1.5rem',
    cursor: 'pointer',
  };
  const switchTheme = () => {
    return dispatch({ type: 'SWITCH_THEME' });
  };
  /*
  const switchTheme = () => {
    console.log('this works');
  };*/

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
