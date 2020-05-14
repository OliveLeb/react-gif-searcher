import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searcher from './components/Searcher';
import Header from './components/Header';
import Explication from './components/Explication';
import { Provider as ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Searcher />
          </Route>
          <Route path='/explication' exact>
            <Explication />
          </Route>
          <Route path='/search/:query' exact>
            <Searcher />
          </Route>
          <Route path='/:slug' exact>
            <Searcher />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
