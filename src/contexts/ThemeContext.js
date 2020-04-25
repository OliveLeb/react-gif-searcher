import DataContext from '../contexts/DataContext';

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
};

export const { Context, Provider } = DataContext(themeReducer, initialState);
