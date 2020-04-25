import React, { useReducer, useEffect, useContext } from 'react';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { Context as ThemeContext } from '../contexts/ThemeContext';
//import ThemeContext from '../contexts/ThemeContext';
/*
const initialState = {
  isLightTheme: true,
  light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
  dark: { syntax: '#ddd', ui: '#333', bg: '#555' },
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH_THEME':
      return {
        ...state,
        isLightTheme: !state.isLightTheme,
      };
    default:
      return state;
  }
};*/
/*
const switchState = (dispatch) => {
  return () => dispatch({ type: 'SWITCH_THEME' });
};*/
/*
export const { Context, Provider } = ThemeContext(
  themeReducer,
   { switchState },
  initialState
);*/

const Theme = () => {
  const { state, dispatch } = useContext(ThemeContext);
  const { isLightTheme } = state;
  //const theme = isLightTheme ? light : dark;
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
