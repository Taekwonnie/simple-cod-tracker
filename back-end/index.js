// ./src/index.js

// importing the dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import https from "https";

import API from "call-of-duty-api";
import api from "./cod-api/cod.js";
import fs from "fs";
// defining the Express app
const app = express();
app.use(express.json());
API.login(
  "MTgzNDE0NTcxMjczMzE3NzQ5Nzg6MTY1MzYxNzg1MjUwOTo2MzVhNjQzMzRjNzM3YTFkYzdlOTVkZmVkYzAzNmFjNg"
);

var key = fs.readFileSync("./ssl/selfsignkey.key");
var cert = fs.readFileSync("./ssl/selfsignssl.crt");

var options = {
  key: key,
  cert: cert,
};

var server = https.createServer(options, app);

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Using cors
app.use(cors());

//Defining the cod api routes
app.use("/api", api);

server.listen(3002, () => {
  console.log("https starting on port 3002");
});
