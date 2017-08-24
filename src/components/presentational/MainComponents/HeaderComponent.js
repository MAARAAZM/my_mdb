import React from 'react';
import PropTypes from 'prop-types';
import { Throttle } from 'react-throttle';
import './Header.css';
import { Button } from './';


const HeaderComponent = (props) => {
  const lang = props.language;
  return (
    <div className="Header">
      <img
        className="Header__MenuButton"
        onClick={props.showMenu}
        src="hamburger.svg"
        alt="MenuButton"
      />
      <div className="Header__LogoWrapper">
        <img className="Header__Logo" src="./Logo.svg" alt="Logo" />
        <h2 className="Header__Title">My Movie Database</h2>
      </div>
      <div className="Header__MainMenu" style={{ left: `${-(!props.menu * 300)}px` }}>
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
            className="Header__Search"
            type="text"
            placeholder="Search..."
            onChange={props.searchMovie}
          />
        </Throttle>
        <Button
          evval="en-US"
          buttonAction={props.changeLanguage}
          className="Header__ChangeLanguage"
          value="EN"
        />
        <Button
          evval="ru"
          buttonAction={props.changeLanguage}
          className="Header__ChangeLanguage"
          value="RU"
        />
      </div>
      <div
        className="Header__MenuCover"
        onClick={props.showMenu}
        hidden={!props.menu}
      />
    </div>
  );
};

HeaderComponent.propTypes = {
  language: PropTypes.string.isRequired,
  menu: PropTypes.bool.isRequired,
  showMenu: PropTypes.func.isRequired,
  changeList: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  searchMovie: PropTypes.func.isRequired,
};

export default HeaderComponent;
