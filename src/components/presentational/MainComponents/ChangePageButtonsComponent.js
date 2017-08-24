import React from 'react';
import PropTypes from 'prop-types';
import './ChangePageButtons.css';
import { Button } from './';

const ChangePageButtonsComponent = (props) => {
  const lang = props.language;
  return (
    <div className="ChangePage" >
      <Button
        className="ChangePage__Button"
        evval="dec"
        buttonAction={props.changePage}
        value="<"
      />
      <span>{`${lang === 'ru' ? 'Страница' : 'Page'} ${
        props.page} ${lang === 'ru' ? 'из' : 'of'} ${props.totalPages} `}</span>
      <Button
        className="ChangePage__Button"
        evval="inc"
        buttonAction={props.changePage}
        value=">"
      />
    </div>
  );
};

ChangePageButtonsComponent.propTypes = {
  language: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default ChangePageButtonsComponent;
