import React from "react";
import axios from 'axios';
//import DatePicker from "../../components/DatePicker";
import DeleteBtn from "../../components/DeleteBtn";
import UpdateBtn from "../../components/UpdateBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import './style.css'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: {},
      where: "",
      to: "",
      from: "",
      cost: "",
      rating: "",
      people: "",
      highlights: "",
      changes: "",
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
        this.setState({ 
          trips: res.data, 
          where: "", 
          to: "",
          from: "",
          cost: "",
          rating: "",
          people: "",
          highlights: "",
          changes: ""
        })
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
    if (this.state.where && this.state.from && this.state.to && this.state.cost && this.state.people && this.state.highlights && this.state.changes) {
      API.saveTrip({
        where: this.state.where,
        from: this.state.from,
        to: this.state.to,
        cost: this.state.cost,
        people: this.state.people,
        highlights: this.state.highlights,
        changes: this.state.changes,
        uid: this.state.username
      })
        .then(res => this.loadTrips(this.state.username))
        .catch(err => console.log(err));
    }
  };

  handleFormUpdate = event => {
    event.preventDefault();
    this.handleUpdate(false);
    if (this.state.trip.where) {
      API.patchTrip(this.state.trip._id, this.state.trip)
        .then(res => this.loadTrips(this.state.username))
        .catch(err => console.log(err));
    }
  };



  getReadOnly = () => (
    <div class="container greyBackground">
      <div class="row">
        <div class="col-md-6">
          <h3>Your Travel Blog</h3>
          {this.state.trips.length ? (
            <div>
              <List>
                {this.state.trips.map(trip => {
                  return (
                    <ListItem key={trip._id}>
                      <span>
                        <strong>Where:</strong> {trip.where}<br />
                        <strong>From:</strong> {trip.from}<br />
                        <strong>To:</strong> {trip.to}<br />
                        <strong>Cost:</strong> ${trip.cost}<br />
                        <strong>People:</strong> {trip.people}<br />
                        <strong>Highlights:</strong> {trip.highlights}<br />
                        <strong>This to do differently:</strong> {trip.changes}<br />
                      </span>
                      <UpdateBtn onClick={() => this.getTrip(trip._id)} />
                      <DeleteBtn onClick={() => this.deleteTrip(trip._id)} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          ) : (
              <h5>Share where you've been and get we can help with recommendations of where to go next!</h5>
            )}
        </div>
        <div class="col-md-6">
          <h3>Just Got Back?</h3>
          <h5>Tell us about your most recent trip!</h5>
          {/* <button type="button" class="btn btn-outline-primary" onClick={() => this.handleSubmit(true)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button> */}
          <form>
            <div class="row formMargin">
              <div class="col-md-12">
                <span>Where</span>
                <Input
                  value={this.state.where}
                  onChange={this.handleSubmitChange}
                  icon="glyphicon glyphicon-map-marker"
                  type="text"
                  name="where"
                  placeholder="Somewhere Awesome"
                />
              </div>
            </div>
            <div class="row formMargin">
              <div class="col-md-6">
                <span>From</span>
                <Input
                  icon="glyphicon glyphicon-calendar"
                  value={this.state.from}
                  onChange={this.handleSubmitChange}
                  type="date"
                  name="from"
                  placeholder="From"
                />
              </div>
              <div class="col-md-6">
                <span>To</span>
                <Input
                  icon="glyphicon glyphicon-calendar"
                  value={this.state.to}
                  onChange={this.handleSubmitChange}
                  type="date"
                  name="to"
                  placeholder="To"
                />
              </div>
            </div>
            <div class="row formMargin">
              <div class="col-md-12">
                <span>Approximate Cost</span>
                <Input
                  value={this.state.cost}
                  onChange={this.handleSubmitChange}
                  icon="glyphicon glyphicon-usd"
                  type="number"
                  name="cost"
                  placeholder="Hopefully not a lot"
                />
              </div>
            </div>
            <div class="row formMargin">
              <div class="col-md-12">
                <span>How many people did you go with?</span>
                <Input
                  value={this.state.people}
                  onChange={this.handleSubmitChange}
                  icon="glyphicon glyphicon-user"
                  type="number"
                  name="people"
                  placeholder="Solo or with Friends"
                />
              </div>
            </div>
            <div class="row formMargin">
              <div class="col-md-12">
                <span>Some Highlights</span>
                <Input
                  value={this.state.highlights}
                  onChange={this.handleSubmitChange}
                  icon="glyphicon glyphicon-thumbs-up"
                  type="textarea"
                  name="highlights"
                  placeholder="Activities, Dining, Accomodations, etc."
                />
              </div>
            </div>
            <div class="row formMargin">
              <div class="col-md-12">
                <span>Things to do differently next time</span>
                <Input
                  value={this.state.changes}
                  onChange={this.handleSubmitChange}
                  icon="glyphicon glyphicon-thumbs-down"
                  type="textarea"
                  name="changes"
                  placeholder="Activities, Dining, Accomodations, etc."
                />
              </div>
            </div>
            {/* <div class="row formMargin">
            <div class="col-md-12">
            <p>Overall Rating</p>
            <div class="row rating formMargin">
              <label>
                <input type="radio" name="stars" value="1" />
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="2" />
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="3" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="4" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="5" />
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
              </label>
            </div>
            </div>
            </div> */}
            <div>
              <FormBtn
                //disabled={!(this.state.where && this.state.to)}
                onClick={this.handleFormSubmit}
              >
                Submit
            </FormBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div class="container">
    //   <div class="row"><h1>Welcome {this.state.username}</h1></div>
    //   {this.state.trips.length ? (
    //     <div>
    //       <h3>Your past trips:</h3>
    //       <List>
    //         {this.state.trips.map(trip => {
    //           return (
    //             <ListItem key={trip._id}>
    //               <span><strong>Where:</strong> {trip.where} &nbsp;&nbsp; <strong>When:</strong> {trip.when}</span>
    //               <UpdateBtn onClick={() => this.getTrip(trip._id)} />
    //               <DeleteBtn onClick={() => this.deleteTrip(trip._id)} />
    //             </ListItem>
    //           );
    //         })}
    //       </List>
    //     </div>
    //   ) : (
    //       <h3>Share where you've been and get recommendations of where to go next!</h3>
    //     )}
    //   <button type="button" class="btn btn-outline-primary" onClick={() => this.handleSubmit(true)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button>
    // </div>
  );

  getSubmitForm = () => (
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          {this.state.trips.length ? (
            <div>
              <h3>Your Travel Blog:</h3>
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
              <h5>Share where you've been and get we can help with recommendations of where to go next!</h5>
            )}
        </div>
        <div class="col-md-6">
          <h3>Just Got Back?</h3>
          <h5>Tell us about your most recent trip!</h5>
          {/* <button type="button" class="btn btn-outline-primary" onClick={() => this.handleSubmit(true)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button> */}
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
              Submit
              </FormBtn>
          </form>
        </div>
      </div>
    </div>
  );

  getUpdateForm = () => (
    <form>
      <div class="container greyBackground">
      <div class="row formMargin">
        <div class="col-md-12">
          {/* <h3>Update Trip Detail</h3> */}
        </div>
      </div>
        <div class="row formMargin">
          <div class="col-md-12">
            <span>Where</span>
            <Input
              value={this.state.trip.where}
              onChange={this.handleInputChange}
              icon="glyphicon glyphicon-map-marker"
              type="text"
              name="where"
              placeholder="Somewhere Awesome"
            />
          </div>
        </div>
        <div class="row formMargin">
          <div class="col-md-6">
            <span>From</span>
            <Input
              icon="glyphicon glyphicon-calendar"
              value={this.state.trip.from}
              onChange={this.handleInputChange}
              type="date"
              name="from"
              placeholder="From"
            />
          </div>
          <div class="col-md-6">
            <span>To</span>
            <Input
              icon="glyphicon glyphicon-calendar"
              value={this.state.trip.to}
              onChange={this.handleInputChange}
              type="date"
              name="to"
              placeholder="To"
            />
          </div>
        </div>
        <div class="row formMargin">
          <div class="col-md-12">
            <span>Approximate Cost</span>
            <Input
              value={this.state.trip.cost}
              onChange={this.handleInputChange}
              icon="glyphicon glyphicon-usd"
              type="number"
              name="cost"
              placeholder="Hopefully not a lot"
            />
          </div>
        </div>
        <div class="row formMargin">
          <div class="col-md-12">
            <span>How many people did you go with?</span>
            <Input
              value={this.state.trip.people}
              onChange={this.handleInputChange}
              icon="glyphicon glyphicon-user"
              type="number"
              name="people"
              placeholder="Solo or with Friends"
            />
          </div>
        </div>
        <div class="row formMargin">
          <div class="col-md-12">
            <span>Some Highlights</span>
            <Input
              value={this.state.trip.highlights}
              onChange={this.handleInputChange}
              icon="glyphicon glyphicon-thumbs-up"
              type="textarea"
              name="highlights"
              placeholder="Activities, Dining, Accomodations, etc."
            />
          </div>
        </div>
        <div class="row formMargin">
          <div class="col-md-12">
            <span>Things to do differently next time</span>
            <Input
              value={this.state.trip.changes}
              onChange={this.handleInputChange}
              icon="glyphicon glyphicon-thumbs-down"
              type="textarea"
              name="changes"
              placeholder="Activities, Dining, Accomodations, etc."
            />
          </div>
        </div>
      
      <button onClick={() => this.handleUpdate(false)}>Cancel</button>
      <FormBtn
        //disabled={!(this.state.trip.when && this.state.trip.where)}
        onClick={this.handleFormUpdate}
      >
        Submit Trip
            </FormBtn>
            </div>
    </form>
  );

  render() {
    if (this.state.toSubmit) return this.getSubmitForm();
    else if (this.state.toUpdate) return this.getUpdateForm();
    else return this.getReadOnly();
  }
}



export default Dashboard;
