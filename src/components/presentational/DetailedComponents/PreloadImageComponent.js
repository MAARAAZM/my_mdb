import React from 'react';
import PropTypes from 'prop-types';
import './PreloadImage.css';


const PreloadImageComponent = (props) => {
  if (props.configuration.secure_base_url && props.isDetailsLoaded && !props.isImageLoaded) {
    const cfg = props.configuration;
    const movie = props.movieDetails;
    let backdropPath = 'no-image.png';
    if (movie.backdrop_path) backdropPath = `${cfg.secure_base_url}original${movie.backdrop_path}`;
    return (
      <img className="Details__Preload" onLoad={props.onImageLoad} src={backdropPath} alt="background" />
    );
  }
  return null;
};

PreloadImageComponent.propTypes = {
  isDetailsLoaded: PropTypes.bool.isRequired,
  isImageLoaded: PropTypes.bool.isRequired,
  configuration: PropTypes.object.isRequired,
  movieDetails: PropTypes.object.isRequired,
  onImageLoad: PropTypes.func.isRequired,
};


export default PreloadImageComponent;
