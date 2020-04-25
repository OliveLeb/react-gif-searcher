import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Searcher from './components/Searcher';
import Header from './components/Header';
import Explication from './components/Explication';
import { Provider as ThemeProvider } from './components/Theme';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
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
