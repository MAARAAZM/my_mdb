import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';


const ButtonComponent = props => (<button
  data-evval={props.evval}
  onClick={props.buttonAction}
  className={`${props.className} Button`}
>{props.value}</button>
);

ButtonComponent.propTypes = {
  evval: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ButtonComponent;
