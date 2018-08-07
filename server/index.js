require("dotenv").config();
const express = require("express");
// const { json } = require("body-parser");
// const cors = require("cors");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const app = express();

// app.use(json());
// app.use(cors());

// using credentials to access AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// function that uploads a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

app.get("/media", async (req, res) => {
  // console.log("AWS DATA =>", data);
  // if (err) return console.log(err);
  // allKeys = data.Contents.map(
  //   val => `https://s3.amazonaws.com/${process.env.S3_BUCKET}/${val.Key}`
  // );
  // console.log("All Keys", allKeys);
  // res.status(200).json(allKeys);
  var response = await s3
    .listObjectsV2({
      Bucket: process.env.S3_BUCKET
    })
    .promise();
  console.log(response);
  res.status(200).send(response);
});

// s3 post endpoint
app.post("/test-upload", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      // INSERT FILE NAME BELOW
      const fileName = `${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

const port = 6978;
app.listen(port, () => {
  console.log(`${port} baby!`);
});