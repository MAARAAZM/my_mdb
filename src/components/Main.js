import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../style/Main.css';
import MovieList from './MovieList';
import Header from './Header';
import ChangePageButtons from './ChangePageButtons';
import * as actions from '../actions/actions';
import * as actionsMain from '../actions/actionsMain';

class Main extends Component {
  componentDidMount() {
    this.props.fetchConfiguration();
    this.props.fetchGenres();
    this.props.fetchMovieList(1, 'popular');
  }

  renderMovieList() {
    const lang = this.props.language;
    if (this.props.requestError) return <div className="App__Error">{this.props.requestError}</div>;
    if (this.props.searchFailed && this.props.isPageLoaded) {
      return (<div className="App__NoResults">
        {`${lang === 'ru' ? 'Поиск по запросу' : 'Search request'} '${
          this.props.queryText}' ${lang === 'ru' ? 'не дал результатов' : 'has no results'}`}
      </div>);
    }
    if (this.props.isPageLoaded) {
      return (<div>
        <MovieList movieListArray={this.props.movieListArray} classMod="_Main" />
        <ChangePageButtons />
      </div>
      );
    }
    return (<div className="App__LoadIndicator">
      <img className="App-logo" src="Logo.svg" alt="Logo" />
        Loading...
    </div>
    );
  }

  render() {
    return (
      <div className="App" style={{ position: this.props.menu ? 'fixed' : '' }}>
        <Header />
        <ChangePageButtons />
        <div>{this.renderMovieList()}</div>
      </div>
    );
  }
}

Main.propTypes = {
  requestError: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  movieListArray: PropTypes.array.isRequired,
  isPageLoaded: PropTypes.bool.isRequired,
  queryText: PropTypes.string.isRequired,
  searchFailed: PropTypes.bool.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchConfiguration: PropTypes.func.isRequired,
  fetchMovieList: PropTypes.func.isRequired,
  menu: PropTypes.bool.isRequired,
};


function mapStateToProps(state) {
  return {
    requestError: state.main.requestError,
    list: state.main.list,
    page: state.main.page,
    movieListArray: state.main.movieListArray,
    totalPages: state.main.totalPages,
    isPageLoaded: state.main.isPageLoaded,
    isSearching: state.main.isSearching,
    queryText: state.main.queryText,
    searchFailed: state.main.searchFailed,
    language: state.main.language,
    menu: state.main.menu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGenres: bindActionCreators(actions.fetchGenres, dispatch),
    fetchConfiguration: bindActionCreators(actions.fetchConfiguration, dispatch),
    fetchMovieList: bindActionCreators(actionsMain.fetchMovieList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

