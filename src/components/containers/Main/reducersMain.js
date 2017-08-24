const initialState = {
  configuration: {},
  genresList: {},
  movieListArray: [],
  requestError: '',
  page: 1,
  list: 'popular',
  queryText: '',
  totalPages: 1,
  language: 'en-US',
  isPageLoaded: false,
  isSearching: false,
  searchFailed: false,
  menu: false,
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case 'CONFIGURATION_SUCCESS':
      return { ...state, configuration: action.configuration };

    case 'GENRES_SUCCESS':
      return { ...state, genresList: action.genresList };

    case 'LIST_SUCCESS':
      return { ...state,
        movieListArray: action.movieListArray,
        totalPages: action.totalPages,
        isPageLoaded: true,
        page: action.page,
        list: action.list,
        isSearching: action.isSearching,
        requestError: '',
        queryText: action.queryText,
        searchFailed: false,
      };
    case 'SEARCH_FAILED':
      return { ...state,
        queryText: action.queryText,
        isPageLoaded: true,
        isSearching: true,
        searchFailed: true,
      };

    case 'LOADING':
      return { ...state, isPageLoaded: false };

    case 'CHANGE_LANGUAGE':
      return { ...state, language: action.language };

    case 'MENU_TOGGLE':
      return { ...state, menu: action.menu };

    case 'FAIL':
      return { ...state, requestError: action.requestError };

    default:
      return state;
  }
}
