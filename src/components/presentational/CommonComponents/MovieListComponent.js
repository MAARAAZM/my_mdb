import React from 'react';
import PropTypes from 'prop-types';
import Movie from './MovieComponent';
import './MovieList.css';


const MovieListComponent = props => (
  <div
    className={`MovieList${props.classMod}`}
    style={{ background: props.classMod === '_Main' ? '#b6b6b6 fixed url("./movie.jpg")' : '' }}
  >
    {props.movieListArray.map(movie => (<Movie
      key={movie.id}
      movie={movie}
      classMod={props.classMod}
      genresList={props.genresList}
      configuration={props.configuration}
    />))}
  </div>
);

MovieListComponent.propTypes = {
  genresList: PropTypes.object.isRequired,
  configuration: PropTypes.object.isRequired,
  movieListArray: PropTypes.array.isRequired,
  classMod: PropTypes.string.isRequired,
};

export default MovieListComponent;
