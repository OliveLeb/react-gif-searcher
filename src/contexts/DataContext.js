import React, { createContext, useReducer } from 'react';

const DataContext = (reducer, initialState) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    /*
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }*/

    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};

export default DataContext;
