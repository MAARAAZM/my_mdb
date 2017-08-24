import React from 'react';
import PropTypes from 'prop-types';
import './MovieCollection.css';
import { MovieList } from './../../presentational/CommonComponents';

const MovieCollectionComponent = (props) => {
  if (props.collection.length) {
    let backdropPath = 'no-image.png';
    const collection = props.movieDetails.belongs_to_collection;
    if (collection.backdrop_path) {
      backdropPath = `${props.configuration.secure_base_url}w780${collection.backdrop_path}`;
    }
    return (<div className="MovieCollection" style={{ backgroundImage: `url(${backdropPath})` }} >
      <div className="MovieCollection__Cover">
        <p className="MovieCollection__Title">
          {`${props.language === 'ru' ? 'Часть серии' : 'Part of'} "${collection.name}"`}
        </p>
        <MovieList
          movieListArray={props.collection}
          classMod="_Detailed"
          configuration={props.configuration}
          genresList={props.genresList}
        />
      </div>
    </div>);
  }
  return null;
};

MovieCollectionComponent.propTypes = {
  configuration: PropTypes.object.isRequired,
  genresList: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  movieDetails: PropTypes.object.isRequired,
};


export default MovieCollectionComponent;
