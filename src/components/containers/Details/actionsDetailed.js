const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

export function fetchCollection(belongsToCollection, language) {
  return (dispatch) => {
    dispatch({ type: 'DETAILS_LOADING' });
    const url = `https://api.themoviedb.org/3/collection/${
      belongsToCollection}?region=${language.slice(-2).toUpperCase()}&language=${language}&api_key=`;
    fetch(url + apiKey).then(res => res.json()).then((data) => {
      if ('status_message' in data) {
        dispatch({
          type: 'FAIL',
          requestError: data.status_message,
        });
        return;
      }
      // console.log('fetchCollection');
      dispatch({
        type: 'COLLECTION_SUCCESS',
        collection: data.parts,
      });
    }).catch(() => dispatch({
      type: 'FAIL',
      requestError: 'Failed to load resource',
    }));
  };
}

export function fetchMovieDetails(Id, language) {
  return (dispatch) => {
    dispatch({ type: 'DETAILS_LOADING' });
    const url = `https://api.themoviedb.org/3/movie/${Id}?language=${language}&api_key=${apiKey
    }&append_to_response=recommendations`;
    fetch(url).then(res => res.json()).then((data) => {
      if ('status_message' in data) {
        dispatch({
          type: 'FAIL',
          requestError: data.status_message,
        });
        return;
      }
      let id = 0;
      if (data.belongs_to_collection) {
        id = data.belongs_to_collection.id;
      }
      // console.log('fetchMovieDetails');
      dispatch({
        type: 'MOVIE_DETAILS_SUCCESS',
        movieDetails: data,
        requestError: '',
        recommended: data.recommendations.results.slice(0, 8),
      });
      if (id) dispatch(fetchCollection(id, language));
    }).catch(() => dispatch({
      type: 'FAIL',
      requestError: 'Failed to load resource',
    }));
  };
}


export function onImageLoad() {
  return (dispatch) => {
    dispatch({ type: 'IMAGE_SUCCESS' });
  };
}