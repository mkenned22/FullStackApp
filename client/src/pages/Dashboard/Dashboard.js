import React from "react";
import axios from 'axios';
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import UpdateBtn from "../../components/UpdateBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: {},
      where: "",
      when: "",
      tripNotes: "",
      loggedIn: true,
      username: null,
      toUpdate: false,
      toSubmit: false
    };

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  // When the component mounts, load all trips and save them to this.state.trips
  componentDidMount() {
    this.getUser();
  }

  handleUpdate(toUpdate) {
    this.setState({
      toUpdate: toUpdate
    })
  }

  handleSubmit(toSubmit) {
    this.setState({
      toSubmit: toSubmit
    })
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
        this.loadTrips(response.data.user.username)
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  // Loads all trips  and sets them to this.state.trips
  loadTrips = (uid) => {
    API.getTrips(uid)
      .then(res =>
        this.setState({ trips: res.data, where: "", when: "", tripNotes: "" })
      )
      .catch(err => console.log(err));
  };

  getTrip = trip => {
    console.log(trip)
    API.getTrip(trip)
      .then(res => this.setState({
        trip: res.data,
        toUpdate: true
      }))
      .catch(err => console.log(err));
  };

  // Deletes a trip from the database with a given id, then reloads trips from the db
  deleteTrip = id => {
    API.deleteTrip(id)
      .then(res => this.loadTrips(this.state.username))
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleSubmitChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedTrip = { ...this.state.trip }
    updatedTrip[name] = value

    this.setState({
      trip: updatedTrip
    });
  };

  // When the form is submitted, use the API.saveTrip method to save the trip data
  // Then reload trips from the database
  handleFormSubmit = event => {
    event.preventDefault();
    this.handleSubmit(false);
    if (this.state.where && this.state.when) {
      API.saveTrip({
        where: this.state.where,
        when: this.state.when,
        tripNotes: this.state.tripNotes,
        uid: this.state.username
      })
        .then(res => this.loadTrips(this.state.username))
        .catch(err => console.log(err));
    }
  };

  handleFormUpdate = event => {
    event.preventDefault();
    this.handleUpdate(false);
    if (this.state.trip.where && this.state.trip.when) {
      API.patchTrip(this.state.trip._id, this.state.trip)
        .then(res => this.loadTrips(this.state.username))
        .catch(err => console.log(err));
    }
  };



  getReadOnly = () => (
    <div class="container">
      <div class="row"><h1>Welcome {this.state.username}</h1></div>
      {this.state.trips.length ? (
        <div>
          <h3>Your past trips:</h3>
          <List>
            {this.state.trips.map(trip => {
              return (
                <ListItem key={trip._id}>
                  <span><strong>Where:</strong> {trip.where} &nbsp;&nbsp; <strong>When:</strong> {trip.when}</span>
                  <UpdateBtn onClick={() => this.getTrip(trip._id)} />
                  <DeleteBtn onClick={() => this.deleteTrip(trip._id)} />
                </ListItem>
              );
            })}
          </List>
        </div>
      ) : (
          <h3>Share where you've been and get recommendations of where to go next!</h3>
        )}
      <button type="button" class="btn btn-outline-primary" onClick={() => this.handleSubmit(true)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button>
    </div>
  );

  getSubmitForm = () => (
    <div class="container">
      <div class="row"><h1>Welcome {this.state.username}</h1></div>
      {this.state.trips.length ? (
        <div>
          <h3>Your past trips:</h3>
          <List>
            {this.state.trips.map(trip => {
              return (
                <ListItem key={trip._id}>
                  <span><strong>Where:</strong> {trip.where} &nbsp;&nbsp; <strong>When:</strong> {trip.when}</span>
                  <UpdateBtn onClick={() => this.getTrip(trip._id)} />
                  <DeleteBtn onClick={() => this.deleteTrip(trip._id)} />
                </ListItem>
              );
            })}
          </List>
        </div>
      ) : (
          <h3>Share where you've been and get recommendations of where to go next!</h3>
        )}
      <button type="button" class="btn btn-outline-primary" onClick={() => this.handleSubmit(true)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button>
      <form>
        <Input
          value={this.state.where}
          onChange={this.handleSubmitChange}
          name="where"
          placeholder="Where (required)"
        />
        <Input
          value={this.state.when}
          onChange={this.handleSubmitChange}
          name="when"
          placeholder="When (required)"
        />
        <FormBtn
          disabled={!(this.state.when && this.state.where)}
          onClick={this.handleFormSubmit}
        >
          Submit Trip
              </FormBtn>
      </form>
    </div>
  );

  getUpdateForm = () => (
<form>
            <Input
              value={this.state.trip.where}
              onChange={this.handleInputChange}
              name="where"
              placeholder="Where (required)"
            />
            <Input
              value={this.state.trip.when}
              onChange={this.handleInputChange}
              name="when"
              placeholder="When (required)"
            />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.trip.when && this.state.trip.where)}
              onClick={this.handleFormUpdate}
            >
              Submit Trip
            </FormBtn>
          </form>
  );

  render() {
    if (this.state.toSubmit) return this.getSubmitForm();
    else if (this.state.toUpdate) return this.getUpdateForm();
    else return this.getReadOnly();
  }
}



export default Dashboard;
