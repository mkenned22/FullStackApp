import React from "react";
import axios from 'axios';
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      title: "",
      author: "",
      synopsis: "",
      loggedIn: true,
      username: null,
      isUpdate: false
    };

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.getUser();
    //this.loadBooks("mkenned22@gmail.com");
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  updateUser (userObject) {
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
        this.loadBooks(response.data.user.username)
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = (uid) => {
    API.getBooks(uid)
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks(this.state.username))
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    this.handleUpdate(false);
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis,
        uid: this.state.username
      })
        .then(res => this.loadBooks(this.state.username))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <div class="container">
        <div class="row"><h1>Welcome {this.state.username}</h1></div>
        {this.state.books.length ? (
            <div>
            <h3>Your past trips:</h3>
            <List>
              {this.state.books.map(book => {
                return (
                  <ListItem key={book._id}>
                      <span><strong>Where:</strong> {book.title} &nbsp;&nbsp; <strong>When:</strong> {book.author}</span>
                      <a href={"/dashboard/" + book._id}><button>Update</button></a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                );
              })}
            </List>
            </div>
          ) : (
              <h3>Share where you've been and get recommendations of where to go next!</h3>
            )}
          <button type="button" class="btn btn-outline-primary" onClick={() => this.handleUpdate(true)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button>
      </div>
  );

  getUpdateform = () => (
    <div class="container">
        <div class="row"><h1>Welcome {this.state.username}</h1></div>
        {this.state.books.length ? (
            <div>
            <h3>Your past trips:</h3>
            <List>
              {this.state.books.map(book => {
                return (
                  <ListItem key={book._id}>
                      <span><strong>Where:</strong> {book.title} &nbsp;&nbsp; <strong>When:</strong> {book.author}</span>
                      <a href={"/dashboard/" + book._id}><button>Update</button></a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                );
              })}
            </List>
            </div>
          ) : (
              <h3>Share where you've been and get recommendations of where to go next!</h3>
            )}
          <button type="button" class="btn btn-outline-primary" onClick={() => this.handleUpdate(true)}><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button>
          <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Where (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
      </div>
  );

  render() {
    if (this.state.isUpdate) return this.getUpdateform();
    else return this.getReadOnly();
  }
}

  

export default Books;
