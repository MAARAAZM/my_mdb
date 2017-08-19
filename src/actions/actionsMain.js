import { fetchGenres } from './actions';

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

export function fetchMovieList(page, list) {
  return (dispatch, getState) => {
    const language = getState().main.language;
    dispatch({ type: 'LOADING' });
    const url = `https://api.themoviedb.org/3/movie/${
      list}?region=${language.slice(-2).toUpperCase()}&page=${page}&language=${language}&api_key=`;
    fetch(url + apiKey).then(res => res.json()).then((data) => {
      if ('status_message' in data) {
        dispatch({
          type: 'FAIL',
          requestError: data.status_message,
        });
        return;
      }
      // console.log('fetchMovieList');
      dispatch({
        type: 'LIST_SUCCESS',
        movieListArray: data.results,
        totalPages: data.total_pages,
        page: data.page,
        list,
        requestError: '',
        isSearching: false,
        queryText: '',
      });
    }).catch(() => dispatch({
      type: 'FAIL',
      requestError: 'Failed to load resource',
    }));
  };
}

export function searchMovieRequest(page, text, list) {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING' });
    const language = getState().main.language;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      apiKey}&language=${language}&query=${text}&page=${
      page}&include_adult=false&region=${language.slice(-2).toUpperCase()}`;
    fetch(url).then(res => res.json()).then((data) => {
      // console.log('searchMovieRequest');
      if ('status_message' in data) {
        dispatch({
          type: 'FAIL',
          requestError: data.status_message,
        });
        return;
      }
      if (data.total_results === 0) {
        dispatch({
          type: 'SEARCH_FAILED',
          queryText: text,
        });
      } else {
        dispatch({
          type: 'LIST_SUCCESS',
          movieListArray: data.results,
          totalPages: data.total_pages,
          page: data.page,
          isPageLoaded: true,
          isSearching: true,
          queryText: text,
          list,
        });
      }
    }).catch(() => dispatch({
      type: 'FAIL',
      requestError: 'Failed to load resource',
    }));
  };
}

export function changeLanguage(e) {
  return (dispatch, getState) => {
    if (e.target.dataset.evval === 'en-US' && e.target.dataset.evval !== getState().main.language) {
      dispatch({ type: 'CHANGE_LANGUAGE', language: 'en-US' });
      dispatch(fetchGenres());
      dispatch(fetchMovieList(getState().main.page, getState().main.list));
    }
    if (e.target.dataset.evval === 'ru' && e.target.dataset.evval !== getState().main.language) {
      dispatch({ type: 'CHANGE_LANGUAGE', language: 'ru' });
      dispatch(fetchGenres());
      dispatch(fetchMovieList(getState().main.page, getState().main.list));
    }
  };
}

export function showMenu() {
  return (dispatch, getState) => {
    dispatch({ type: 'MENU_TOGGLE', menu: !getState().main.menu });
  };
}

export function changeList(e) {
  return (dispatch, getState) => {
    if (getState().main.list !== e.target.dataset.evval ||
      getState().main.isSearching || getState().main.page !== 1) {
      dispatch(fetchMovieList(1, e.target.dataset.evval));
    }
  };
}

export function changePage(e) {
  return (dispatch, getState) => {
    let val = 0;
    const page = getState().main.page;
    const queryText = getState().main.queryText;
    const list = getState().main.list;
    if (e.target.dataset.evval === 'inc' && page < getState().main.totalPages) val = 1;
    if (e.target.dataset.evval === 'dec' && page > 1) val = -1;
    if (getState().main.isSearching) {
      if (val) dispatch(searchMovieRequest(page + val, queryText, list));
    } else if (val) dispatch(fetchMovieList(page + val, list));
  };
}

export function searchMovie(e) {
  return (dispatch, getState) => {
    if (e.target.value.length > 2) {
      dispatch(searchMovieRequest(1, e.target.value, getState().main.list));
    }
    if (e.target.value.length === 2 && getState().main.isSearching) {
      dispatch(fetchMovieList(1, getState().main.list));
    }
  };
}
