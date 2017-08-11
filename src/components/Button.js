import React, { Component } from 'react';
import './Button.css';


class Button extends Component {


    render() {
        return (
            <button data-evval={this.props.evval} onClick={this.props.buttonAction} className={this.props.className+' Button'}>{this.props.value}</button>
        )


    }
}

export default Button