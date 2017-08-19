import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Throttle } from 'react-throttle';
import * as actionsMain from '../actions/actionsMain';
import '../style/Main.css';
import Button from './Button';


const Header = (props) => {
  const lang = props.language;
  return (
    <div className="App-header">
      <img
        className="App__MenuButton"
        onClick={props.showMenu}
        src="hamburger.svg"
        alt="MenuButton"
      />
      <div className="App__LogoWrapper">
        <img className="App-logo" src="Logo.svg" alt="Logo" />
        <h2 className="App-Title">My Movie Database</h2>
      </div>
      <div className="App__MainMenu" style={{ left: `${-(!props.menu * 300)}px` }}>
        <Button
          className="Header__Button"
          evval="popular"
          buttonAction={props.changeList}
          value={lang === 'ru' ? 'Популярные фильмы' : 'Popular'}
        />
        <Button
          className="Header__Button"
          evval="top_rated"
          buttonAction={props.changeList}
          value={lang === 'ru' ? 'Топ рейтинг' : 'Top Rated'}
        />
        <Button
          className="Header__Button"
          evval="now_playing"
          buttonAction={props.changeList}
          value={lang === 'ru' ? 'Сейчас в прокате' : 'Now Playing'}
        />
        <Button
          className="Header__Button"
          evval="upcoming"
          buttonAction={props.changeList}
          value={lang === 'ru' ? 'Скоро в прокате' : 'Upcoming'}
        />
        <Throttle time="500" handler="onChange">
          <input
            className="Main__Search"
            type="text"
            placeholder="Search..."
            onChange={props.searchMovie}
          />
        </Throttle>
        <Button
          evval="en-US"
          buttonAction={props.changeLanguage}
          className="Header_ChangeLanguage"
          value="EN"
        />
        <Button
          evval="ru"
          buttonAction={props.changeLanguage}
          className="Header_ChangeLanguage"
          value="RU"
        />
      </div>
      <div
        className="Main__MenuCover"
        onClick={props.showMenu}
        hidden={!props.menu}
      />
    </div>
  );
};

Header.propTypes = {
  language: PropTypes.string.isRequired,
  menu: PropTypes.bool.isRequired,
  showMenu: PropTypes.func.isRequired,
  changeList: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  searchMovie: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    language: state.main.language,
    menu: state.main.menu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showMenu: bindActionCreators(actionsMain.showMenu, dispatch),
    changeLanguage: bindActionCreators(actionsMain.changeLanguage, dispatch),
    changeList: bindActionCreators(actionsMain.changeList, dispatch),
    changePage: bindActionCreators(actionsMain.changePage, dispatch),
    searchMovie: bindActionCreators(actionsMain.searchMovie, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
