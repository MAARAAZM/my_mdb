import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../style/Details.css';
import '../style/Main.css';
import MovieList from './MovieList';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import * as actions from '../actions/actions';
import * as actionsDetailed from '../actions/actionsDetailed';

const renderGenres = (genres) => {
  let genresString = [];
  for (let i = 0; i < genres.length; i++) {
    genresString += genres[i].name;
    if (i !== genres.length - 1) { genresString += ', '; }
  }
  return <span>{genresString}</span>;
};


class Details extends Component {
  componentDidMount() {
    this.props.fetchGenres();
    this.props.fetchConfiguration();
    this.props.fetchMovieDetails(this.props.match.params.movieId);
  }

  componentDidUpdate() {
    if (this.props.movieDetails.id !== +this.props.match.params.movieId && this.props.isDetailsLoaded) {
      this.props.fetchMovieDetails(this.props.match.params.movieId);
    }
  }

  renderCollection() {
    if (this.props.collection.length) {
      let backdropPath = 'no-image.png';
      const collection = this.props.movieDetails.belongs_to_collection;
      if (collection.backdrop_path) {
        backdropPath = `${this.props.configuration.secure_base_url}w780${collection.backdrop_path}`;
      }
      return (<div className="Movie__Collection" style={{ backgroundImage: `url(${backdropPath})` }} >
        <div className="Movie__CollectionCover">
          <p className="Movie__MovieTitle">
            {`${this.props.language === 'ru' ? 'Часть серии' : 'Part of'} "${collection.name}"`}
          </p>
          <MovieList movieListArray={this.props.collection} classMod="_Detailed" />
        </div>
      </div>);
    }
    return '';
  }

  renderRecommended() {
    if (this.props.recommended.length) {
      return (<div>
        <p className="Movie__MovieTitle">
          {`${this.props.language === 'ru' ? 'Вам также понравится' : 'Recommended Movies'}`}
        </p>
        <MovieList movieListArray={this.props.recommended} classMod="_Detailed" />
      </div>);
    }
    return '';
  }


  renderDetails() {
    if (this.props.requestError) return <div className="App__Error">{this.props.requestError}</div>;

    if (this.props.configuration.secure_base_url && this.props.isDetailsLoaded) {
      const lang = this.props.language;
      const cfg = this.props.configuration;
      const movie = this.props.movieDetails;
      let backdropPath = 'no-image.png';
      let posterPath = 'no-image.png';
      if (movie.poster_path) posterPath = cfg.secure_base_url + cfg.poster_sizes[3] + movie.poster_path;
      if (movie.backdrop_path) backdropPath = `${cfg.secure_base_url}original${movie.backdrop_path}`;

      if (!this.props.isImageLoaded) {
        return (<div className="Details__LoadIndicator">
          <img className="App-logo" src="./../Logo.svg" alt="Logo" />Loading...
          <img className="Details__Preload" onLoad={this.props.onImageLoad} src={backdropPath} alt="background" />
        </div>);
      }

      return (<div className="Movie" style={{ backgroundImage: `url(${backdropPath})` }}>
        <div className="Movie__Wrapper">
          <h3 className="Movie__MovieTitle">{movie.title}</h3>
          <h4 className="Movie__Tagline">{`"${movie.tagline}"`}</h4>
          <img src={posterPath} alt="Poster" className="Movie__Poster" />
          <div className="Movie__Describe">
            <p className="Movie__ReleaseDate">{`\u{1f4c5} ${movie.release_date.slice(0, 4)}`}</p>
            <span className="Movie__Rate">{`${movie.vote_average}★`}</span>
            <p className="Movie__Genre">{renderGenres(movie.genres)}</p>
            <p className="Movie__Overview">{movie.overview}</p>
            <p className="Movie__Countries">{'Countries: '}{renderGenres(movie.production_countries)}</p>
            <p className="Movie__Companies">{'Companies: '}{renderGenres(movie.production_companies)}</p>
            <p className="Movie__Budget">{`${lang === 'ru' ? 'Бюджет' : 'Budget'}: $${
              Math.round(movie.budget / 1000000)} ${lang === 'ru' ? 'млн' : 'bln'}`}</p>
            <p className="Movie__Revenue">{`${lang === 'ru' ? 'Сборы' : 'Revenue'}: $${
              Math.round(movie.revenue / 1000000)} ${lang === 'ru' ? 'млн' : 'bln'}`}</p>
          </div>
          <div className="Movie__CollectionWrapper">{this.renderCollection()}</div>
          <div>{this.renderRecommended()}</div>
        </div>
      </div>);
    }
    return (<div className="Details__LoadIndicator">
      <img className="App-logo" src="./../Logo.svg" alt="Logo" />Loading...
    </div>);
  }


  render() {
    return (<div>
      <ScrollToTopOnMount />
      {this.renderDetails()}
    </div>);
  }
}


Details.propTypes = {
  match: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  movieDetails: PropTypes.object.isRequired,
  isDetailsLoaded: PropTypes.bool.isRequired,
  isImageLoaded: PropTypes.bool.isRequired,
  requestError: PropTypes.string.isRequired,
  configuration: PropTypes.object.isRequired,
  collection: PropTypes.array.isRequired,
  recommended: PropTypes.array.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchConfiguration: PropTypes.func.isRequired,
  fetchMovieDetails: PropTypes.func.isRequired,
  onImageLoad: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    movieDetails: state.details.movieDetails,
    isDetailsLoaded: state.details.isDetailsLoaded,
    isImageLoaded: state.details.isImageLoaded,
    collection: state.details.collection,
    recommended: state.details.recommended,
    requestError: state.main.requestError,
    genresList: state.main.genresList,
    configuration: state.main.configuration,
    language: state.main.language,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGenres: bindActionCreators(actions.fetchGenres, dispatch),
    fetchConfiguration: bindActionCreators(actions.fetchConfiguration, dispatch),
    fetchMovieDetails: bindActionCreators(actionsDetailed.fetchMovieDetails, dispatch),
    onImageLoad: bindActionCreators(actionsDetailed.onImageLoad, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);

