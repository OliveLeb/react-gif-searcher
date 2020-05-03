import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searcher from './components/Searcher';
import Header from './components/Header';
import Explication from './components/Explication';
//import GifDetail from './components/GifDetail';
import { Provider as ThemeProvider } from './contexts/ThemeContext';
//import GifsList from './components/GifsList';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Searcher />
          </Route>
          <Route path='/:idGif' exact>
            <Searcher />
          </Route>
          <Route path='/explication'>
            <Explication />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
