import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
import '../style/MovieList.css';


const MovieList = props => (<div className={`MovieList${props.classMod}`}>
  {props.movieListArray.map(movie => (<Movie key={movie.id} movie={movie} classMod={props.classMod} />))}
</div>
);

MovieList.propTypes = {
  movieListArray: PropTypes.array.isRequired,
  classMod: PropTypes.string.isRequired,
};

export default MovieList;
