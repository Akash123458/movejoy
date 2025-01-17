const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    times: [{ type: String, required: true }] // Array of showtimes
});

const dateSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Date like "Aug 18"
    day: { type: String, required: true },  // Day like "Fri", "Sat"
    cinemas: [cinemaSchema] // Array of cinema objects
});

const showtimesSchema = new mongoose.Schema({
    movie_id: { type: String, required: true }, // Reference to the movie
    dates: [dateSchema] // Array of date objects
});

const Showtimes = mongoose.model('Showtimes', showtimesSchema);

module.exports = Showtimes;
