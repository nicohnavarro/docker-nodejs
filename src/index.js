const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_PORT,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_USER,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");

const app = express();
const mongo_url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Succesfully connected to DB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Docker + Node + Redis + Mongo</h1>");
});

app.use("/api/v1/posts", postRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
