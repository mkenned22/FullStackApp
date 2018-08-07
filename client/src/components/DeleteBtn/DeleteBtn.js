import React from "react";
import PropTypes from 'prop-types';
import "./DeleteBtn.css";

class DeleteBtn extends React.Component {
  
  render () {
    return (
      <button type="button" class="btn btn-success" onClick={this.props.onClick}>Delete</button>
    );
  }
}

DeleteBtn.props = {
  onClick: PropTypes.func
}

export default DeleteBtn;
