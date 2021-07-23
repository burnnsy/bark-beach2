const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const DogBeach = require('./models/dogbeach');

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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('beaches/home', { webTitle: 'Bark Beach' });
});

app.get('/beaches', async (req, res) => {
  const beaches = await DogBeach.find({});
  res.render('beaches/index', { beaches, webTitle: 'All Beaches' });
});

app.get('/beaches/new', (req, res) => {
  res.render('beaches/new', { webTitle: 'New Beach' });
});

app.post('/beaches', async (req, res) => {
  const newBeach = new DogBeach(req.body);
  await newBeach.save();
  res.redirect('/beaches');
});

app.get('/beaches/:id', async (req, res) => {
  const { id } = req.params;
  const beach = await DogBeach.findById(id);
  res.render('beaches/details', { beach, webTitle: 'All Beaches' });
});

app.get('/beaches/:id/edit', async (req, res) => {
  const { id } = req.params;
  const beach = await DogBeach.findById(id);
  res.render('beaches/edit', { beach, webTitle: `Edit ${beach.title}` });
});

app.put('/beaches/:id', async (req, res) => {
  const { id } = req.params;
  const beach = await DogBeach.findByIdAndUpdate(id, req.body);
  res.redirect(`/beaches/${id}`);
});

app.delete('/beaches/:id', async (req, res) => {
  const { id } = req.params;
  await DogBeach.findByIdAndDelete(id);
  res.redirect('/beaches');
});

app.listen(3000, () => {
  console.log('Sever Up');
});
