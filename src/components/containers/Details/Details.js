import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollToTopOnMount, LoadIndicator, RequestErrorMassage } from './../../presentational/CommonComponents';
import { MovieDatailedInformation, PreloadImage } from './../../presentational/DetailedComponents';
import * as actions from './../../../actions/actions';
import * as actionsDetailed from './actionsDetailed';


class Details extends Component {
  componentDidMount() {
    this.props.fetchGenres();
    this.props.fetchConfiguration();
    this.props.fetchMovieDetails(this.props.match.params.movieId, this.props.language);
  }

  componentDidUpdate() {
    if (this.props.movieDetails.id !== +this.props.match.params.movieId && this.props.isDetailsLoaded) {
      this.props.fetchMovieDetails(this.props.match.params.movieId, this.props.language);
    }
  }

  renderDetails() {
    if (this.props.configuration.secure_base_url && this.props.isDetailsLoaded && this.props.isImageLoaded) {
      return (
        <MovieDatailedInformation
          language={this.props.language}
          configuration={this.props.configuration}
          movieDetails={this.props.movieDetails}
          genresList={this.props.genresList}
          collection={this.props.collection}
          recommended={this.props.recommended}
        />
      );
    }
    return <LoadIndicator />;
  }


  render() {
    return (<div>
      <ScrollToTopOnMount />
      <RequestErrorMassage requestError={this.props.requestError} />
      <PreloadImage
        isDetailsLoaded={this.props.isDetailsLoaded}
        configuration={this.props.configuration}
        movieDetails={this.props.movieDetails}
        onImageLoad={this.props.onImageLoad}
        isImageLoaded={this.props.isImageLoaded}
      />
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
  genresList: PropTypes.object.isRequired,
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

