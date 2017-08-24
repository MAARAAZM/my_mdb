import React from 'react';
import PropTypes from 'prop-types';
import './RequestErrorMassage.css';


const RequestErrorMassageComponent = (props) => {
  if (props.requestError) return <div className="RequestErrorMassage">{props.requestError}</div>;
  return null;
};

RequestErrorMassageComponent.propTypes = {
  requestError: PropTypes.string.isRequired,
};


export default RequestErrorMassageComponent;

