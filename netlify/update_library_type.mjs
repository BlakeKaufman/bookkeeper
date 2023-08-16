"use strict";

// const express = require("express");
// const mysql = require("mysql2");
import DBinformation from "../databaseInformation.json";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
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
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");
    // Access the database and collection
    const database = client.db("Users"); // Replace 'mydatabase' with your database name
    const collection = database.collection("books"); // Replace 'mycollection' with your collection name

    // Convert the _id string to ObjectId
    const objectId = new ObjectId(newData._id);
    // setting finished date if library type is finished
    let finishedDate;
    console.log(newData);
    if (newData.book[9].value.toLowerCase() === "finished") {
      finishedDate = new Date().getFullYear();
    }

    // updating prev entry in DB
    const result = await collection.updateOne(
      {
        _id: objectId,
      },
      {
        $set: {
          book: newData.book,
          finishedDate: finishedDate ? finishedDate : null,
        },
      },
      { upsert: true }
    );

    // Sending back
    return {
      statusCode: 200,
      body: JSON.stringify("Document updated successfully"),
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
