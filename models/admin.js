const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hotels: {
    type: Array,
    default: [],
  },
});

const Admin = mongoose.model("admin", adminSchema);

exports.Admin = Admin;
