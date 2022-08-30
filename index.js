const express = require("express");
const Datastore = require("nedb");

const app = express();

app.listen(3000, () => console.log("listening"));
app.use(express.static("public"));
app.use(express.json());

const easyBoard = new Datastore("easy.db");
const mediumBoard = new Datastore("medium.db");
const hardBoard = new Datastore("hard.db");

easyBoard.loadDatabase();
mediumBoard.loadDatabase();
hardBoard.loadDatabase();

app.post("/api", (request, response) => {
  console.log("in post");
  console.log(request.body);

  const difficulty = request.body.difficulty;
  const time = request.body.time;
  const userName = request.body.userName;

  const data = { time, userName };

  if (difficulty == 1) {
    easyBoard.insert(data);
  } else if (difficulty == 2) {
    mediumBoard.insert(data);
  } else if (difficulty == 3) {
    hardBoard.insert(data);
  }

  response.json({
    status: "success",
  });
});

app.get("/easyapi", (request, response) => {
  console.log("in get");
  easyBoard
    .find({})
    .sort({ time: 1 })
    .exec((err, data) => {
      if (err) {
        console.log(err);
        response.end();
        return;
      }
      response.json(data);
    });
});

app.get("/mediumapi", (request, response) => {
  mediumBoard
    .find({})
    .sort({ time: 1 })
    .exec((err, data) => {
      if (err) {
        console.log(err);
        response.end();
        return;
      }
      response.json(data);
    });
});

app.get("/hardapi", (request, response) => {
  hardBoard
    .find({})
    .sort({ time: 1 })
    .exec((err, data) => {
      if (err) {
        console.log(err);
        response.end();
        return;
      }
      response.json(data);
    });
});
