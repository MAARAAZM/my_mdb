import React from 'react';
import PropTypes from 'prop-types';
import './RecommendedMovies.css';
import { MovieList } from './../../presentational/CommonComponents';

const RecommendedMoviesComponent = (props) => {
  if (props.recommended.length) {
    return (<div>
      <p className="RecommendedMovies__Title">
        {`${props.language === 'ru' ? 'Вам также понравится' : 'Recommended Movies'}`}
      </p>
      <MovieList
        movieListArray={props.recommended}
        classMod="_Detailed"
        configuration={props.configuration}
        genresList={props.genresList}
      />
    </div>);
  }
  return null;
};

RecommendedMoviesComponent.propTypes = {
  recommended: PropTypes.array.isRequired,
  configuration: PropTypes.object.isRequired,
  genresList: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};


export default RecommendedMoviesComponent;
