// const express = require("express");
// const mysql = require("mysql2");
import DBinformation from "../databaseInformation.json";
import { MongoClient, ServerApiVersion } from "mongodb";
// const app = express();
// const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${DBinformation.user}:${DBinformation.user}@${DBinformation.user}.zgq19jn.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export async function handler(event, context) {
  const client = new MongoClient(uri);
  const newData = event.body ? JSON.parse(event.body) : null; //sanitation
  console.log(event);
  // Sample data to be inserted

  if (!newData) {
    // Handle empty request body or invalid JSON format
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body or empty payload" }),
    };
  }
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("Users"); // Replace 'mydatabase' with your database name
    const collection = database.collection("books"); // Replace 'mycollection' with your collection name

    // Insert the data
    const result = await collection.insertOne(newData);
    console.log("Data inserted successfully:", result.insertedId);
    return {
      statusCode: 200,
      body: JSON.stringify(result.insertedId),
    };
  } catch (error) {
    console.error("Error inserting data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  } finally {
    // Close the connection when done
    client.close();
  }
}
