import React, { useReducer, useEffect } from 'react';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import ThemeContext from '../contexts/ThemeContext';

const initialState = {
  toggleTheme: true,
  light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
  dark: { syntax: '#ddd', ui: '#333', bg: '#555' },
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH_THEME':
      return {
        ...state,
        toggleTheme: !state.toggleTheme,
      };
    case 'SWITCH_DARK':
      return {
        ...state,
        theme: 'dark',
      };
    case 'SWITCH_lIGHT':
      return {
        ...state,
        theme: 'light',
      };
    default:
      return state;
  }
};

export const { Context, Provider } = ThemeContext(themeReducer, initialState);

const Theme = () => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const { toggleTheme } = state;
  const button = {
    fontSize: '1.5rem',
  };
  useEffect(() => {
    console.log(toggleTheme);
  });

  return (
    <div>
      {toggleTheme ? (
        <BsToggleOn
          style={button}
          onClick={() => {
            dispatch({ type: 'SWITCH_THEME' });
          }}
        />
      ) : (
        <BsToggleOff
          style={button}
          onClick={() => {
            dispatch({ type: 'SWITCH_THEME' });
          }}
        />
      )}
    </div>
  );
};

export default Theme;
