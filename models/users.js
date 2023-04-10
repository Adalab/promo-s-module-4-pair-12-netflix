const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moviesSchema = new Schema(
  {
    user: String,
    password: String,
    name: String,
    email: String,
    plan_details: String,
  },
  { collection: 'users' }
);
const Users = mongoose.model('users', moviesSchema);
module.exports = Users;