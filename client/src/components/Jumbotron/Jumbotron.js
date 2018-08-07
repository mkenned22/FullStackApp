import React from "react";
import { Route, Redirect } from 'react-router-dom'
import API from "../../utils/API";

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

  constructor(props) {
    super(props);
    this.state = {
      trips:[]
    };
}

handleFormSubmit = event => {

  // event.preventDefault();
  // if (this.state.search) {
  //   API.searchTrips(this.state.search)
  //     .then(res => this.setState(
  //       {
  //         where: "Dublin, Ireland",
  //         highlights : "Definitely need to go the the Guinness Storehouse, Jameson Whiskey Distillery, and Kilmainham Gaul. If you are looking for a great meal, make sure to book reservations for Vintage Kitchen well in advance of your trip.",
  //         changes : "Nothing, I really enjoyed my time in Dublin."
  //       },
  //       {
  //         where : "Galway, Ireland", 
  //         highlights : "The Cliffs of Moher are only about an hour from Galway, would definitely recommend that. Additionally, I would make every effort to go to the Aryan Islands. Will most definitely be the highlight of your trip. Any bar on Shop Street in Galway will be great craic. Stop in the Queys for live music.",
  //         changes : "The only thing I would do differently is stay longer."
  //       }
  //     )
  //     .catch(err => console.log(err)))
  // }
};

handleSubmitChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <div class="container" style={containerStyles}>
        <div class="jumbotron" style={jumbotronStyles}>
        <h2 id="journey" style={titleStyle}>Find your next escape...</h2>
          <div class="row">
            <div class="col-lg-6 col-lg-offset-3">
              <div class="input-group" style={inputStyles}>
                <input value={this.state.search} onChange={this.handleSubmitChange} class="form-control input-lg" id="inputlg" type="text" placeholder="Search for..." />
                <span class="input-group-btn">
                  <a href="/search"><button class="btn btn-default btn-lg" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button></a>
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
