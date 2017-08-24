import React from 'react';
import PropTypes from 'prop-types';
import './MovieDetailedInformation.css';
import { MovieCollection, RecommendedMovies } from './';

const renderGenres = (genres) => {
  let genresString = [];
  for (let i = 0; i < genres.length; i++) {
    genresString += genres[i].name;
    if (i !== genres.length - 1) { genresString += ', '; }
  }
  return <span>{genresString}</span>;
};

const MovieDatailedInformationComponent = (props) => {
  const lang = props.language;
  const cfg = props.configuration;
  const movie = props.movieDetails;
  let backdropPath = 'no-image.png';
  let posterPath = 'no-image.png';
  if (movie.poster_path) posterPath = cfg.secure_base_url + cfg.poster_sizes[3] + movie.poster_path;
  if (movie.backdrop_path) backdropPath = `${cfg.secure_base_url}original${movie.backdrop_path}`;

  return (<div className="MovieDatailedInformation" style={{ backgroundImage: `url(${backdropPath})` }}>
    <div className="MovieDatailedInformation__Wrapper">
      <h3 className="MovieDatailedInformation__MovieTitle">{movie.title}</h3>
      <h4 className="MovieDatailedInformation__Tagline">{`"${movie.tagline}"`}</h4>
      <img src={posterPath} alt="Poster" className="MovieDatailedInformation__Poster" />
      <div className="MovieDatailedInformation__Describe">
        <p className="MovieDatailedInformation__ReleaseDate">{`\u{1f4c5} ${movie.release_date.slice(0, 4)}`}</p>
        <span className="MovieDatailedInformation__Rate">{`${movie.vote_average}★`}</span>
        <p className="MovieDatailedInformation__Genre">{renderGenres(movie.genres)}</p>
        <p className="MovieDatailedInformation__Overview">{movie.overview}</p>
        <p className="MovieDatailedInformation__Countries">{'Countries: '}{renderGenres(movie.production_countries)}</p>
        <p className="MovieDatailedInformation__Companies">{'Companies: '}{renderGenres(movie.production_companies)}</p>
        <p className="MovieDatailedInformation__Budget">{`${lang === 'ru' ? 'Бюджет' : 'Budget'}: $${
          Math.round(movie.budget / 1000000)} ${lang === 'ru' ? 'млн' : 'bln'}`}</p>
        <p className="MovieDatailedInformation__Revenue">{`${lang === 'ru' ? 'Сборы' : 'Revenue'}: $${
          Math.round(movie.revenue / 1000000)} ${lang === 'ru' ? 'млн' : 'bln'}`}</p>
      </div>
      <div className="MovieDatailedInformation__CollectionWrapper">
        <MovieCollection
          configuration={props.configuration}
          genresList={props.genresList}
          collection={props.collection}
          language={props.language}
          movieDetails={props.movieDetails}
        />
      </div>
      <RecommendedMovies
        recommended={props.recommended}
        configuration={props.configuration}
        genresList={props.genresList}
        language={props.language}
      />
    </div>
  </div>
  );
};

MovieDatailedInformationComponent.propTypes = {
  language: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  movieDetails: PropTypes.object.isRequired,
  genresList: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  recommended: PropTypes.array.isRequired,
};


export default MovieDatailedInformationComponent;

