const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogBeachSchema = new Schema({
  title: String,
  image: String,
  membership: Boolean,
  description: String,
  location: String,
});

module.exports = mongoose.model('DogBeach', DogBeachSchema);
