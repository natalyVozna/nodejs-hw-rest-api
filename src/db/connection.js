const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectMongo = async () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Database connection successful"))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = {
  connectMongo,
};
