const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Unhandled Exception 💥 Shutting Down");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"));

console.log(process.env.NODE_ENV);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App is running of port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection 💥 Shutting Down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM recievd. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
