import React from "react";

const containerStyles = {
  "display": "flex",
  "min-height": "calc(100vh - 120px)"
}

const jumbotronStyles = {
  "background-color": 'transparent',
  "text-align": 'center',
  "margin": "auto"
}

const inputStyles = {
  "text-align": 'center',
  "margin": "auto"
}

const titleStyle = {
  "color":"white"
}

class Jumbotron extends React.Component {

  render() {

    return (
      <div class="container" style={containerStyles}>
        <div class="jumbotron" style={jumbotronStyles}>
          <h2 id="journey" style={titleStyle}>Start your next journey...</h2>
          <div class="row">
            <div class="col-lg-6 col-lg-offset-3">
              <div class="input-group" style={inputStyles}>
                <input class="form-control input-lg" id="inputlg" type="text" placeholder="Search for..." />
                <span class="input-group-btn">
                  <button class="btn btn-default btn-lg" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}


export default Jumbotron;
