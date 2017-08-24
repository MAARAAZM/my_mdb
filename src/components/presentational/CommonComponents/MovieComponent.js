import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Movie.css';

const renderGenres = (ids, genresList) => {
  let genresString = [];
  for (let i = 0; i < ids.length; i++) {
    genresString += genresList[ids[i]];
    if (i !== ids.length - 1) { genresString += ', '; }
  }
  return <span>{genresString}</span>;
};

const MovieComponent = (props) => {
  const movie = props.movie;
  const mod = props.classMod;
  const cfg = props.configuration;
  const poster = movie.poster_path ? cfg.secure_base_url + cfg.poster_sizes[2] + movie.poster_path : 'no-image.png';
  const date = movie.release_date ? `\u{1f4c5} ${movie.release_date.slice(0, 4)}` : '...';
  const overview = movie.overview ? `${movie.overview.slice(0, 100)}...` : '...';
  return (
    <Link to={{ pathname: `/${movie.id}` }} className={`Movie${mod}`} >
      <img src={poster} alt="Poster" className={`Movie__Poster${mod}`} />
      <div className={`Movie__Describe${mod}`}>
        <h3 className={`Movie__MovieTitle${mod}`}>{movie.title}</h3>
        <p className={`Movie__ReleaseDate${mod}`}>{date}</p>
        <span className={`Movie__Rate${mod}`}>{`${movie.vote_average}★`}</span>
        <p className={`Movie__Genre${mod}`}>{renderGenres(movie.genre_ids, props.genresList)}</p>
        <p className={`Movie__Overview${mod}`}>{overview}</p>
      </div>
    </Link>
  );
};

MovieComponent.propTypes = {
  genresList: PropTypes.object.isRequired,
  configuration: PropTypes.object.isRequired,
  classMod: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
};


export default MovieComponent;
