export const initialState = {
  search: '',
  query: '',
  numberResult: 10,
  gifs: [],
  totalCount: 0,
  isLoading: false,
  error: false,
  hasMore: false,
};

const GifReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.value };
    case 'SET_QUERY':
      return { ...state, query: state.search };
    case 'FECTH_GIFS':
      return { ...state, gifs: action.payload };
    case 'LOAD_MORE':
      return { ...state, numberResult: state.numberResult + 20 };
    case '':
      return { ...state };
    case '':
      return { ...state };
    case '':
      return { ...state };
    case '':
      return { ...state };
    default:
      return state;
  }
};
