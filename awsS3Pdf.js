const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const app = express();
const { S3Client } = require("@aws-sdk/client-s3"); // Helper function that creates an Amazon S3 service client module.
const { PutObjectCommand } = require("@aws-sdk/client-s3");
app.use(fileUpload());
// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const files = "simandhar-edu-assets/Evaluations/"; // Path to and name of object. For example '../myFiles/index.js'.
  const fileStream = fs.createReadStream(files);

  // Set the parameters
  const uploadParams = {
    Bucket: "simandhar-edu-assets",
    // Add the required 'Key' parameter using the 'path' module.
    Key: path.basename(files),
    // Add the required 'Body' parameter
    Body: fileStream,
  };

  const run = async () => {
    try {
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      console.log("Success", data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
});

app.listen(3000, () => console.log("Server Started..."));


