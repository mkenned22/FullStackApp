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
      books: [],
      book: {},
      title: "",
      author: "",
      synopsis: "",
      loggedIn: true,
      username: null,
      toUpdate: false,
      toSubmit: false
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

  getBook = book => {
    console.log(book)
    API.getBook(book)
      .then(res => this.setState({
        book: res.data,
        toUpdate: true
      }))
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks(this.state.username))
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

    const updatedBook = { ...this.state.book }
    updatedBook[name] = value

    this.setState({
      book: updatedBook
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    this.handleSubmit(false);
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

  handleFormUpdate = event => {
    event.preventDefault();
    this.handleUpdate(false);
    if (this.state.book.title && this.state.book.author) {
      API.patchBook(this.state.book._id, this.state.book)
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
                  <UpdateBtn onClick={() => this.getBook(book._id)} />
                  <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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
      {this.state.books.length ? (
        <div>
          <h3>Your past trips:</h3>
          <List>
            {this.state.books.map(book => {
              return (
                <ListItem key={book._id}>
                  <span><strong>Where:</strong> {book.title} &nbsp;&nbsp; <strong>When:</strong> {book.author}</span>
                  <UpdateBtn onClick={() => this.getBook(book._id)} />
                  <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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
          value={this.state.title}
          onChange={this.handleSubmitChange}
          name="title"
          placeholder="Where (required)"
        />
        <Input
          value={this.state.author}
          onChange={this.handleSubmitChange}
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

  getUpdateForm = () => (
<form>
            <Input
              value={this.state.book.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              value={this.state.book.author}
              onChange={this.handleInputChange}
              name="author"
              placeholder="Author (required)"
            />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.book.author && this.state.book.title)}
              onClick={this.handleFormUpdate}
            >
              Submit Book
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
