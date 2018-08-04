import axios from "axios";

export default {
  // Gets all books
  getTrips: function (id) {
    return axios.get("/api/dashboard/trips/" + id);
  },
  // Deletes the book with the given id
  deleteTrip: function (id) {
    return axios.delete("/api/dashboard/" + id);
  },
  // Saves a book to the database
  saveTrip: function (tripData) {
    return axios.post("/api/dashboard", tripData);
  },
  //Gets the book with the given id
  getTrip: function (id) {
    return axios.get("/api/dashboard/" + id);
  },
  patchTrip: function (id, tripData) {
    return axios.patch("/api/dashboard/" + id, tripData);
  },
};
