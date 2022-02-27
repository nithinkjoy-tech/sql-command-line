const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
    validate: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
  },
  email: {
    type: String,
    required: true,
    validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  address: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    minlength: 5,
    maxlength: 50,
    default: null,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  resettoken: {
    type: Object,
    default: null,
  },
  bookedHotelDetails: {
    type: Array,
    default: [],
  },
  previousBookedHotelDetails: {
    type: Array,
    default: [],
  },
  reviewedHotelIds: {
    type: Array,
    default: [],
  },
  reviewIds: {
    type: Array,
    default: [],
  },
});

const Guest = mongoose.model("guest", guestSchema);

exports.Guest = Guest;
