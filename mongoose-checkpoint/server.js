// server.js

// ---------------------------------------------
// STEP 1: Import dependencies
// ---------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Loads variables from .env

const app = express();
const PORT = 5000;

// ---------------------------------------------
// STEP 2: Connect to MongoDB Atlas
// ---------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ Connection error:", err));

// ---------------------------------------------
// STEP 3: Define Schema and Model
// ---------------------------------------------
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

// ---------------------------------------------
// STEP 4: Create and Save a Single Record
// ---------------------------------------------
async function createAndSavePerson() {
  try {
    const person = new Person({
      name: "John",
      age: 25,
      favoriteFoods: ["pizza", "pasta"],
    });

    const data = await person.save();
    console.log("✅ Person saved:", data);
  } catch (err) {
    console.error("❌ Error saving person:", err);
  }
}

// ---------------------------------------------
// STEP 5: Create Many Records
// ---------------------------------------------
async function createManyPeople() {
  const arrayOfPeople = [
    { name: "Mary", age: 30, favoriteFoods: ["burritos", "salad"] },
    { name: "David", age: 22, favoriteFoods: ["rice", "chicken"] },
    { name: "Jane", age: 29, favoriteFoods: ["burritos", "tacos"] },
  ];

  try {
    const data = await Person.create(arrayOfPeople);
    console.log("✅ Multiple people created:", data);
  } catch (err) {
    console.error("❌ Error creating people:", err);
  }
}

// ---------------------------------------------
// STEP 6: Find People by Name
// ---------------------------------------------
async function findPeopleByName(personName) {
  try {
    const data = await Person.find({ name: personName });
    console.log(`✅ Found people named ${personName}:`, data);
  } catch (err) {
    console.error("❌ Error finding people:", err);
  }
}

// ---------------------------------------------
// STEP 7: Find One Person by Favorite Food
// ---------------------------------------------
async function findOneByFood(food) {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    console.log(`✅ Found one person who likes ${food}:`, data);
  } catch (err) {
    console.error("❌ Error finding person:", err);
  }
}

// ---------------------------------------------
// STEP 8: Find Person by ID
// ---------------------------------------------
async function findPersonById(personId) {
  try {
    const data = await Person.findById(personId);
    console.log("✅ Found person by ID:", data);
  } catch (err) {
    console.error("❌ Error finding person by ID:", err);
  }
}

// ---------------------------------------------
// STEP 9: Classic Update (Find, Edit, Save)
// ---------------------------------------------
async function findEditThenSave(personId) {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");
    const updated = await person.save();
    console.log("✅ Updated person:", updated);
  } catch (err) {
    console.error("❌ Error updating person:", err);
  }
}

// ---------------------------------------------
// STEP 10: Find One and Update (Set Age to 20)
// ---------------------------------------------
async function findAndUpdate(personName) {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true } // Return updated document
    );
    console.log("✅ Updated person age:", updatedPerson);
  } catch (err) {
    console.error("❌ Error updating person:", err);
  }
}

// ---------------------------------------------
// STEP 11: Delete One Person by ID
// ---------------------------------------------
async function deletePersonById(personId) {
  try {
    const deletedPerson = await Person.findByIdAndDelete(personId);
    console.log("✅ Deleted person:", deletedPerson);
  } catch (err) {
    console.error("❌ Error deleting person:", err);
  }
}

// ---------------------------------------------
// STEP 12: Delete Many People Named 'Mary'
// ---------------------------------------------
async function deleteManyMarys() {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log("✅ All Marys deleted:", result);
  } catch (err) {
    console.error("❌ Error deleting Marys:", err);
  }
}

// ---------------------------------------------
// STEP 13: Complex Query (Find, Sort, Limit, Select)
// ---------------------------------------------
async function complexQuery() {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 }) // Sort alphabetically
      .limit(2) // Limit to 2 results
      .select({ name: 1, favoriteFoods: 1, _id: 0 }); // Hide _id and age

    console.log("✅ Complex query result:", data);
  } catch (err) {
    console.error("❌ Error in complex query:", err);
  }
}

// ---------------------------------------------
// STEP 14: Call Functions (Uncomment as Needed)
// ---------------------------------------------
// Uncomment only one at a time for testing

// createAndSavePerson();
// createManyPeople();
// findPeopleByName("Mary");
// findOneByFood("burritos");
// findPersonById('6909b7d0d9dc40719a1a1c87');
// findEditThenSave('6909b7d0d9dc40719a1a1c87');
// findAndUpdate("John");
// deletePersonById('6909b7d0d9dc40719a1a1c87');
// deleteManyMarys();
complexQuery();

// ---------------------------------------------
// Start Express Server
// ---------------------------------------------
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
