import React from "react";
import PropTypes from 'prop-types';
import "./UpdateBtn.css";

class UpdateBtn extends React.Component {
  
  render () {
    return (
      <span className="update-btn" onClick={this.props.onClick}>
        ✗
      </span>
    );
  }
}

UpdateBtn.props = {
  onClick: PropTypes.func
}

export default UpdateBtn;
