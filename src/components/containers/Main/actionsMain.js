import { fetchGenres } from '../../../actions/actions';

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

export function fetchMovieList(page, list, language) {
  return (dispatch) => {
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

export function searchMovieRequest(page, text, list, language) {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
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

export function changeLanguage(evval, page, list, language) {
  return (dispatch) => {
    if (evval === 'en-US' && evval !== language) {
      dispatch({ type: 'CHANGE_LANGUAGE', language: 'en-US' });
      dispatch(fetchGenres(evval));
      dispatch(fetchMovieList(page, list, evval));
    }
    if (evval === 'ru' && evval !== language) {
      dispatch({ type: 'CHANGE_LANGUAGE', language: 'ru' });
      dispatch(fetchGenres(evval));
      dispatch(fetchMovieList(page, list, evval));
    }
  };
}

export function showMenu(menu) {
  return (dispatch) => {
    dispatch({ type: 'MENU_TOGGLE', menu: !menu });
  };
}

export function changeList(evval, page, list, language, isSearching) {
  return (dispatch) => {
    if (list !== evval || isSearching || page !== 1) {
      dispatch(fetchMovieList(1, evval, language));
    }
  };
}

export function changePage(evval, page, list, language, isSearching, totalPages, queryText) {
  return (dispatch) => {
    let val = 0;
    if (evval === 'inc' && page < totalPages) val = 1;
    if (evval === 'dec' && page > 1) val = -1;
    if (isSearching) {
      if (val) dispatch(searchMovieRequest(page + val, queryText, list, language));
    } else if (val) dispatch(fetchMovieList(page + val, list, language));
  };
}

export function searchMovie(value, list, language, isSearching) {
  return (dispatch) => {
    if (value.length > 2) {
      dispatch(searchMovieRequest(1, value, list, language));
    }
    if (value.length === 2 && isSearching) {
      dispatch(fetchMovieList(1, list, language));
    }
  };
}
