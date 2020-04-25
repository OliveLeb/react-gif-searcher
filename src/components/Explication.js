import React, { useContext } from 'react';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Explication = () => {
  const { state } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = state;
  const theme = isLightTheme ? light : dark;

  return (
    <div style={{ background: theme.bg, color: theme.syntax }}>
      Comment j'ai fait ?
    </div>
  );
};

export default Explication;
