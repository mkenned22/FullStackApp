import React from "react";
import PropTypes from 'prop-types';
import "./UpdateBtn.css";

class UpdateBtn extends React.Component {
  
  render () {
    return (
      <button type="button" class="btn btn-dark" onClick={this.props.onClick}>Update</button>
    );
  }
}

UpdateBtn.props = {
  onClick: PropTypes.func
}

export default UpdateBtn;
