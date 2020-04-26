import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Theme = () => {
  const { state, dispatch } = useContext(ThemeContext);
  const { isLightTheme } = state;

  const button = {
    fontSize: '1.5rem',
  };

  return (
    <div>
      {isLightTheme ? (
        <FaSun
          style={button}
          onClick={() => dispatch({ type: 'SWITCH_THEME' })}
        />
      ) : (
        <FaMoon
          style={button}
          onClick={() => dispatch({ type: 'SWITCH_THEME' })}
        />
      )}
    </div>
  );
};

export default Theme;
