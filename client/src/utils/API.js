import axios from "axios";

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/dashboard");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/dashboard/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/dashboard", bookData);
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/dashboard/" + id);
  },
  patchBook: function (id, bookData) {
    return axios.patch("/api/dashboard/" + id, bookData);
  },
};
