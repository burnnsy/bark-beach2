const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./descriptions');
const { images } = require('./photos');
const DogBeach = require('../models/dogbeach');

mongoose.connect('mongodb://localhost:27017/bark-beach', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database Connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await DogBeach.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const member = Boolean(Math.floor(Math.random() * 2));
    const beach = new DogBeach({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      image: `${sample(images)}`,
      description:
        "Whatever enamel pin slow-carb artisan yr brunch gochujang aesthetic. Wayfarers hashtag flexitarian crucifix succulents synth 3 wolf moon tattooed. Before they sold out beard distillery gastropub helvetica small batch normcore narwhal disrupt lyft pour-over man bun fanny pack. Pop-up keytar yuccie authentic DIY meh cold-pressed iceland YOLO flannel. Retro sustainable authentic biodiesel four dollar toast live-edge sartorial forage narwhal 90's knausgaard humblebrag. Retro swag activated charcoal, hella 3 wolf moon trust fund vexillologist vegan air plant.",
      membership: member,
    });
    await beach.save();
  }
};

seedDB().then(() => mongoose.connection.close());
