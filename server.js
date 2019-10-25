const express = require("express");
const app = express();
const conncetDB = require("./config/db");

// importing models DB model
const Todo = require("./models/Todo");
const User = require("./models/User");

// importing routes
const user = require("./routes/user");
const todo = require("./routes/todo");

conncetDB();

// Init middleware
app.use(express.json({ extended: false }));

// Iinit route
app.use("/api/v1/user", user);

PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is runnnig on port ${PORT}`);
});
