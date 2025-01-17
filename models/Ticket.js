const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Movie document
    ref: "Movies",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // User who booked the ticket (Optional)
    ref: "User",
    require: true,
  },
  seats: {
    type: [String], // Array of seat numbers
  },
  cinema: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: String,
  },
  day: {
    type: String,
  },
  price: {
    type: String,
  },
  location: {
    type: String,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  session_id: {
    type: String,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
