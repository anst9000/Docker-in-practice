let express = require("express");
let path = require("path");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let app = express();
require("dotenv").config();

let username = process.env.MONGO_USERNAME;
let password = process.env.MONGO_PASSWORD;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile-picture", function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
});

console.log("username is", username);
console.log("password is", password);

// use when starting application locally
let mongoUrlLocal = `mongodb://${username}:${password}@127.0.0.1:27017`;
console.log(mongoUrlLocal);
// use when starting application as docker container
let mongoUrlDocker = `mongodb://${username}:${password}@mongodb`;

app.post("/update-profile", function (req, res) {
  let userObj = req.body;

  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) {
      console.log("Some error with connection");
      throw err;
    }

    console.log("Seem to be connected...");

    let db = client.db("user-account");
    userObj["userid"] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(
      myquery,
      newvalues,
      { upsert: true },
      function (err, res) {
        if (err) throw err;
        client.close();
      }
    );
  });
  // Send response
  res.send(userObj);
});

app.get("/get-profile", function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db("user-account");

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
