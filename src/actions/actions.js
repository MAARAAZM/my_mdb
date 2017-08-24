const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

export function fetchConfiguration() {
  return (dispatch) => {
    const url = 'https://api.themoviedb.org/3/configuration?api_key=';
    fetch(url + apiKey).then(res => res.json()).then((data) => {
      if ('status_message' in data) {
        dispatch({
          type: 'FAIL',
          requestError: data.status_message,
        });
        return;
      }
      // console.log('fetchConfiguration');
      dispatch({
        type: 'CONFIGURATION_SUCCESS',
        configuration: data.images,
      });
    }).catch(() => dispatch({
      type: 'FAIL',
      requestError: 'Failed to load resource',
    }));
  };
}

export function fetchGenres(language) {
  return (dispatch) => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=${language}&api_key=`;
    fetch(url + apiKey).then(res => res.json()).then((data) => {
      if ('status_message' in data) {
        dispatch({
          type: 'FAIL',
          requestError: data.status_message,
        });
        return;
      }
      const genresList = {};
      data.genres.map((genres) => {
        genresList[genres.id] = genres.name;
        return data;
      });
      // console.log('fetchGenres');
      dispatch({
        type: 'GENRES_SUCCESS',
        genresList,
      });
    }).catch(() => dispatch({
      type: 'FAIL',
      requestError: 'Failed to load resource',
    }));
  };
}
