import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import Theme from './Theme';

const Navigation = () => {
  return (
    <nav>
      <div>
        <NavLink to='/' className={styles.link}>
          Accueil
        </NavLink>
        <NavLink to='/explication' className={styles.link}>
          Explication
        </NavLink>
      </div>
      <Theme />
    </nav>
  );
};

export default Navigation;
