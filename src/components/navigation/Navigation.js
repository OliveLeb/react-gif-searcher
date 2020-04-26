import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Theme from '../Theme';
import { Context as ThemeContext } from '../../contexts/ThemeContext';

const Navigation = () => {
  const { state } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = state;
  const theme = isLightTheme ? light : dark;

  return (
    <nav style={{ background: theme.ui, color: theme.syntax }}>
      <div className={styles.nav}>
        <div>
          <NavLink
            to='/'
            className={styles.link}
            style={{ color: theme.syntax }}
          >
            Accueil
          </NavLink>
          <NavLink
            to='/explication'
            className={styles.link}
            style={{ color: theme.syntax }}
          >
            Explication
          </NavLink>
        </div>
        <Theme />
      </div>
    </nav>
  );
};

export default Navigation;
