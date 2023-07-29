const express = require("express");

const app = express();

app.get("/api", (req, res) => {
  console.log("Connected to React");
  res.send(JSON.stringify("lets go"));
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
