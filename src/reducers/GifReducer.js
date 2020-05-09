export const initialState = {
  search: '',
  query: '',
  gifs: [],
  numberResult: 20,
  totalCount: 0,
  offsetGif: 0,
  isLoading: false,
  error: false,
  hasMore: false,
  truc: false,
};

const GifReducer = (etat, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...etat, search: action.value };
    case 'ON_SUBMIT':
      return {
        ...etat,
        query: etat.search,
        numberResult: 20,
        offsetGif: 0,
      };
    case 'FETCH_INIT':
      return { ...etat, isLoading: true, error: false };
    case 'FETCH_SUCCESS':
      return {
        ...etat,
        isLoading: false,
        isError: false,
        //gifs: action.payload,
      };
    case 'FETCH_FAILURE':
      return { ...etat, isLoading: false, isError: true };
    case 'TOTAL_COUNT':
      return { ...etat, totalCount: action.payload };
    case 'HAS_MORE':
      return { ...etat, hasMore: action.payload };
    case 'TOGGLE_ISLOADING':
      return { ...etat, isLoading: !etat.isLoading };
    case 'SET_ERROR':
      return { ...etat, error: !etat.error };
    case 'INC_OFFSET':
      return {
        ...etat,
        offsetGif: etat.offsetGif + etat.numberResult,
      };
    case 'RESET_GIFS':
      return { ...etat, gifs: [] };
    default:
      return etat;
  }
};

export default GifReducer;
