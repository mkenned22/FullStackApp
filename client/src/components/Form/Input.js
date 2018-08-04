import React from "react";
import PropTypes from 'prop-types';
import "./style.css"

class Input extends React.Component {
  // Destructuring the type, className, children and onClick props, applying them to the button element

  render() {

    return (

      <div class="inner-addon left-addon">
        <i class={this.props.icon}></i>
        <input type={this.props.type} class="form-control" {...this.props} />
      </div>
    )
  }
}

Input.props = {
  icon: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string
}

export default Input
