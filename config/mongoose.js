const mongoose = require('mongoose');

main().catch(err => console.log(`Error connecting to MongoDB: ${err.message}`));

async function main() {
  try {
    await mongoose.connect('mongodb+srv://coderamit32:o6qMs751BB92ib7q@prakhar1.oljzrgn.mongodb.net/?retryWrites=true&w=majority&appName=prakhar1');
    console.log('Successfully connected to MongoDB !');
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err.message}`);
  }
}


// o6qMs751BB92ib7q