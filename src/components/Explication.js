import React, { useContext } from 'react';
import { Context as ThemeContext } from '../contexts/ThemeContext';

const Explication = () => {
  const { state } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = state;
  const theme = isLightTheme ? light : dark;

  return (
    <div
      style={{
        background: theme.ui,
        color: theme.syntax,
        minHeight: '100vh',
        padding: '10px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          paddingTop: '50px',
          marginBottom: '50px',
        }}
      >
        <h1>Comment j'ai fait ?</h1>
      </div>

      <div>
        <ul>
          <h4>Récupération data giphy</h4>
          <li>Récupération de la valeur du input dans un useState</li>
          <li>Création d'un custom hook</li>
          <li>
            Envoie du input dans le custom hook + ajout dans l'url de l'api
            Giphy
          </li>
          <li>UseEffect() => async getData() =>await axios.get(url)</li>
          <li>
            Pour l'infinite scrolling, utilisation de IntersectionObserver()
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul>
          <h4>Thème jour/nuit</h4>
          <li>useReducer + createContext</li>
          <li>Provider + useContext</li>
        </ul>
      </div>
    </div>
  );
};

export default Explication;
