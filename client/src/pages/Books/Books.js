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
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)

  }

  
  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.getUser();
    this.loadBooks();
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
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
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
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div class="container">
        <div class="row"><h1>Welcome {this.state.username}</h1></div>
        <div class="row">
          
          {this.state.books.length ? (
            <div>
            <h3>Your past trips:</h3>
            <List>
              {this.state.books.map(book => {
                return (
                  <ListItem key={book._id}>
                      <span><strong>Where:</strong> {book.title} &nbsp;&nbsp; <strong>When:</strong> {book.author}</span>
                      <a href={"/books/" + book._id}><button>Update</button></a>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                );
              })}
            </List>
            </div>
          ) : (
              <h3>Share where you've been and get recommendations of where to go next!</h3>
            )}
          <button type="button" class="btn btn-outline-primary"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a recent trip</button>
          <div class="button"></div>
        </div>
      </div>


    );
  }
}

export default Books;
