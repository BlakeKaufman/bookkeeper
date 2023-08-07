// const express = require("express");
// const mysql = require("mysql2");
import DBinformation from "../databaseInformation.json";
import { MongoClient, ServerApiVersion } from "mongodb";
// const app = express();
// const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${DBinformation.user}:${DBinformation.pass}@${DBinformation.user}.zgq19jn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export async function handler(event, context) {
  const newData = event.body ? JSON.parse(event.body) : null; //sanitation

  // Sample data to be inserted

  if (!newData) {
    // Handle empty request body or invalid JSON format
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body or empty payload" }),
    };
  }
  try {
    await client.connect();

    const database = client.db("Users"); // Replace 'mydb' with your database name

    const booksCollection = database.collection("books");

    // Find all books associated with the user's userId
    const books = await booksCollection.find({ user: newData }).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(books),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
    // console.error("Error:", error);
    // return [];
  } finally {
    client.close();
  }
}
