const express = require("express");
const mysql = require("mysql2");
const DBinformation = require("../databaseInformation.json");
const app = express();

// Create a database connection pool
const connection = mysql.createConnection({
  host: DBinformation.host,
  user: DBinformation.user,
  password: DBinformation.pass,
  database: DBinformation.database,
});
// app.use(express.json());

export async function handler(event, context) {
  const { bookISBN } = JSON.parse(event.body);

  // Insert the data into the database
  connection.query(
    "INSERT INTO books (isbn) VALUES (?)",
    bookISBN,
    (err, result) => {
      console.log(err, result);
      // if (err) {
      //   console.error("Error inserting data:", err);
      //   // res.status(500).send("Error inserting data");
      // } else {
      //   console.log("Data inserted successfully");
      //   // res.status(201).json({
      //   //   message: "Data inserted successfully",
      //   //   postId: result.insertId,
      //   // });
      // }
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify("testing"),
  };
}
