import React from 'react';
import PropTypes from 'prop-types';
import '../style/Button.css';


const Button = props => (<button
  data-evval={props.evval}
  onClick={props.buttonAction}
  className={`${props.className} Button`}
>{props.value}</button>
);

Button.propTypes = {
  evval: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
