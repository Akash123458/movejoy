const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    duration: { type: String, required: true },
    genre: { type: String, required: true },
    trailer: { type: String, required: true },
    description: { type: String, required: true }
});

const Movies = mongoose.model('Movies', MoviesSchema);

module.exports = Movies;
