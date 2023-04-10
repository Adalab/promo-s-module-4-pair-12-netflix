const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moviesSchema = new Schema(
  {
    name: String,
    lastname: String,
    country: String,
    birthday: String
  },
  { collection: 'actors' }
);
const Actors = mongoose.model('actors', moviesSchema);
module.exports = Actors;