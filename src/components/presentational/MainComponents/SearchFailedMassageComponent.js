import React from 'react';
import PropTypes from 'prop-types';
import './SearchFailedMassage.css';

const SearchFailedMassageComponent = (props) => {
  if (props.searchFailed && props.isPageLoaded) {
    return (<div className="SearchFailedMassage" style={{ background: '#b6b6b6 fixed url("./movie.jpg")' }} >
      {`${props.language === 'ru' ? 'Поиск по запросу' : 'Search request'} '${
        props.queryText}' ${props.language === 'ru' ? 'не дал результатов' : 'has no results'}`}
    </div>);
  }
  return null;
};

SearchFailedMassageComponent.propTypes = {
  searchFailed: PropTypes.bool.isRequired,
  isPageLoaded: PropTypes.bool.isRequired,
  queryText: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};


export default SearchFailedMassageComponent;
