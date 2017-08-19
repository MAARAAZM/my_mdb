import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../style/Main.css';
import Button from './Button';
import * as actionsMain from '../actions/actionsMain';

const ChangePageButtons = (props) => {
  const lang = props.language;
  return (
    <div>
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

ChangePageButtons.propTypes = {
  language: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    page: state.main.page,
    totalPages: state.main.totalPages,
    language: state.main.language,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePage: bindActionCreators(actionsMain.changePage, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePageButtons);
