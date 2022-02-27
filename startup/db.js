const mongoose=require("mongoose")

module.exports = function () {
    mongoose
      .connect("mongodb://127.0.0.1:27017/hotelbook", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log("connected to database"))
      .catch(err => console.log(err));
  };