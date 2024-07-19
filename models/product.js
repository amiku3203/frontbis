const mongoose= require("mongoose");

// Define the payment plan schema
const paymentPlanSchema = new mongoose.Schema({
  plotSize: Number,
  plotCost: Number,
  bookingAmount: Number,
  balanceAmount: Number,
  emi: String,
});

// Define the info section schema, embedding the payment plan schema
const infoSectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  paymentPlans: [paymentPlanSchema], // Embedding payment plans
  images: [String],
  location: String,
  mapIframe: String,
});

// Create the InfoSection model
const InfoSection =    mongoose.model('InfoSection', infoSectionSchema);

module.exports= InfoSection;
