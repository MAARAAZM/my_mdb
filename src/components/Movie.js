import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/MovieList.css';

class Movie extends Component {
  renderGenres(ids) {
    let genresString = [];
    for (let i = 0; i < ids.length; i++) {
      genresString += this.props.genresList[ids[i]];
      if (i !== ids.length - 1) { genresString += ', '; }
    }
    return <span>{genresString}</span>;
  }

  render() {
    const movie = this.props.movie;
    const mod = this.props.classMod;
    const cfg = this.props.configuration;
    const poster = movie.poster_path ? cfg.secure_base_url + cfg.poster_sizes[2] + movie.poster_path : 'no-image.png';
    const date = movie.release_date ? `\u{1f4c5} ${movie.release_date.slice(0, 4)}` : '...';
    const overview = movie.overview ? `${movie.overview.slice(0, 100)}...` : '...';
    return (
      <Link to={{ pathname: `/${movie.id}` }} className={`MovieList__Movie${mod}`} >
        <img src={poster} alt="Poster" className={`MovieList__Poster${mod}`} />
        <div className={`MovieList__Describe${mod}`}>
          <h3 className={`MovieList__MovieTitle${mod}`}>{movie.title}</h3>
          <p className={`MovieList__ReleaseDate${mod}`}>{date}</p>
          <span className={`MovieList__Rate${mod}`}>{`${movie.vote_average}★`}</span>
          <p className={`MovieList__Genre${mod}`}>{this.renderGenres(movie.genre_ids)}</p>
          <p className={`MovieList__Overview${mod}`}>{overview}</p>
        </div>
      </Link>
    );
  }
}

Movie.propTypes = {
  genresList: PropTypes.object.isRequired,
  configuration: PropTypes.object.isRequired,
  classMod: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    configuration: state.main.configuration,
    genresList: state.main.genresList,
  };
}

export default connect(mapStateToProps)(Movie);
