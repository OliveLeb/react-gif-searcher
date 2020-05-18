import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ slug, history, search, dispatch, query }) => {
  const submitSearch = (dispatch) => {
    return (e) => {
      e.preventDefault();
      if (slug) {
        history.push('/');
      }
      dispatch({
        type: 'ON_SUBMIT',
      });
    };
  };

  return (
    <form onSubmit={submitSearch(dispatch)}>
      <div
        style={{
          display: 'flex',
          width: '80%',
          margin: 'auto',
        }}
      >
        <input
          value={search}
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH', value: e.target.value })
          }
          placeholder='Search for GIFS !'
          style={{
            border: 'none',
            height: '2em',
            width: '100%',
            paddingLeft: '10px',
            fontSize: '1.5rem',
          }}
        />

        <button
          type='submit'
          style={{
            alignSelf: 'center',
            fontSize: '1.5em',
            border: 'none',
            padding: '12px',
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          {' '}
          <BsSearch style={{ display: 'block' }} />{' '}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
