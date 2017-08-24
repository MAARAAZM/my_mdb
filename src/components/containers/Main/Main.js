import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MovieList, RequestErrorMassage, LoadIndicator } from './../../presentational/CommonComponents';
import { Header, ChangePageButtons, SearchFailedMassage } from './../../presentational/MainComponents';
import * as actions from './../../../actions/actions';
import * as actionsMain from './actionsMain';

class Main extends Component {
  componentDidMount() {
    this.props.fetchConfiguration();
    this.props.fetchGenres(this.props.language);
    this.props.fetchMovieList(1, 'popular', this.props.language);
  }

  changeLanguage = (event) => this.props.changeLanguage(
    event.target.dataset.evval,
    this.props.page,
    this.props.list,
    this.props.language
  );

  showMenu = () => this.props.showMenu(this.props.menu);

  changeList = (event) => this.props.changeList(
    event.target.dataset.evval,
    this.props.page,
    this.props.list,
    this.props.language,
    this.props.isSearching
  );

  changePage = (event) => this.props.changePage(
    event.target.dataset.evval,
    this.props.page,
    this.props.list,
    this.props.language,
    this.props.isSearching,
    this.props.totalPages,
    this.props.queryText
  );

  searchMovie = (event) => this.props.searchMovie(
    event.target.value,
    this.props.list,
    this.props.language,
    this.props.isSearching);



  renderMovieList() {
    if (this.props.isPageLoaded) {
      return (<div>
        <MovieList
          movieListArray={this.props.movieListArray}
          classMod="_Main"
          configuration={this.props.configuration}
          genresList={this.props.genresList}
        />
        <ChangePageButtons
          language={this.props.language}
          page={this.props.page}
          totalPages={this.props.totalPages}
          changePage={this.changePage}
        />
      </div>
      );
    }
    return <LoadIndicator />
  }

  render() {
    return (
      <div style={{ position: this.props.menu ? 'fixed' : '' }}>
        <Header
          language={this.props.language}
          menu={this.props.menu}
          showMenu={this.showMenu}
          changeList={this.changeList}
          changeLanguage={this.changeLanguage}
          searchMovie={this.searchMovie}
        />
        <ChangePageButtons
          language={this.props.language}
          page={this.props.page}
          totalPages={this.props.totalPages}
          changePage={this.changePage}
        />
        <RequestErrorMassage requestError={this.props.requestError} />
        <SearchFailedMassage
          searchFailed={this.props.searchFailed}
          isPageLoaded={this.props.isPageLoaded}
          queryText={this.props.queryText}
          language={this.props.language}
        />
        {this.renderMovieList()}
      </div>
    );
  }
}

Main.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
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
  genresList: PropTypes.object.isRequired,
  configuration: PropTypes.object.isRequired,
  showMenu: PropTypes.func.isRequired,
  changeList: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  searchMovie: PropTypes.func.isRequired,
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
    genresList: state.main.genresList,
    configuration: state.main.configuration,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGenres: bindActionCreators(actions.fetchGenres, dispatch),
    fetchConfiguration: bindActionCreators(actions.fetchConfiguration, dispatch),
    fetchMovieList: bindActionCreators(actionsMain.fetchMovieList, dispatch),
    changePage: bindActionCreators(actionsMain.changePage, dispatch),
    showMenu: bindActionCreators(actionsMain.showMenu, dispatch),
    changeLanguage: bindActionCreators(actionsMain.changeLanguage, dispatch),
    changeList: bindActionCreators(actionsMain.changeList, dispatch),
    searchMovie: bindActionCreators(actionsMain.searchMovie, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

