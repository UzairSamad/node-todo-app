const express = require("express");
const app = express();
const conncetDB = require("./config/db");

conncetDB();

app.use(express.json({ extended: false }));

PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is runnnig on port ${PORT}`);
});
