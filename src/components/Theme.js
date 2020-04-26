import React, { useContext } from 'react';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
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
        <BsToggleOn
          style={button}
          onClick={() => dispatch({ type: 'SWITCH_THEME' })}
        />
      ) : (
        <BsToggleOff
          style={button}
          onClick={() => dispatch({ type: 'SWITCH_THEME' })}
        />
      )}
    </div>
  );
};

export default Theme;
