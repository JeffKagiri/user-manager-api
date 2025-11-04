// models/person.js
const mongoose = require('mongoose');

// Create the schema for a Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create the model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
