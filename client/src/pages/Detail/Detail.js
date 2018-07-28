import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      isUpdate: false,
      redirectTo: null
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    console.log(this.props)
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedBook = {...this.state.book}
    updatedBook[name] = value

    this.setState({
      book: updatedBook
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.book.title && this.state.book.author) {
      API.patchBook(this.props.match.params.id, this.state.book)
        .then(res => this.setState({isUpdate:false}))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <div class="container">
        <div class="row"><h1>Update Trip:</h1></div>
        <div class="row">
        <h1>
              {this.state.book.title} by {this.state.book.author}
            </h1>
            <h1>Synopsis</h1>
            <p>
              {this.state.book.synopsis}
            </p>
            <button onClick={() => this.handleUpdate(true)}>Update</button>
            <Link to="/dashboard">← Back to Dashboard</Link>
        </div>
      </div>
    
  );

  getUpdateform = () => (
    <Container fluid>
      <Row>
        <Col size="md-10 md-offset-1">
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
              onClick={this.handleFormSubmit}
            >
              Submit Book
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );

  render() {
    if (this.state.isUpdate) return this.getUpdateform();
    else return this.getUpdateform();
  }
}

export default Detail;
