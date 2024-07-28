const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Načítání konfigurace z config.env
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Nahrazení <PASSWORD> skutečným heslem z config.env
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3017;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
