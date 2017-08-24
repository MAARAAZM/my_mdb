const initialState = {
  movieDetails: {},
  isDetailsLoaded: false,
  belongsToCollection: 0,
  recommended: [],
  collection: [],
  isImageLoaded: false,
};

export default function details(state = initialState, action) {
  switch (action.type) {
    case 'MOVIE_DETAILS_SUCCESS':
      return { ...state,
        movieDetails: action.movieDetails,
        recommended: action.recommended,
        isDetailsLoaded: true,
        collection: [],
      };
    case 'COLLECTION_SUCCESS':
      return { ...state,
        collection: action.collection,
        isDetailsLoaded: true,
      };

    case 'IMAGE_SUCCESS':
      return { ...state, isImageLoaded: true };

    case 'DETAILS_LOADING':
      return { ...state, isDetailsLoaded: false, isImageLoaded: false };
    default:
      return state;
  }
}
