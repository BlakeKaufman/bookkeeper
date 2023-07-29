import express from "express";
import bodyParser from "body-parser";
import newsRouts from "./routs/news.js";

// import cors from "cors";

const app = express(); //init the express object
const PORT = 8000; // port for a server

app.use(bodyParser.json()); // saying we are using json data in our applicatoin
// app.use(cors());

app.use("/v1/news", newsRouts); // makes all calls in users.js start with /users

app.get("/", (req, res) => {
  res.send("Hello from Homepage");
}); //expecing a get request

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); //starts local host
