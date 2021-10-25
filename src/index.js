const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_PORT,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_USER,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});
const cors = require("cors");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

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
app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      httpOnly: true,
      maxAge: 300000,
    },
  })
);
let counter = 0;
app.use(express.json());
app.get("/api", (req, res) => {
  res.send("<h1>Docker + Node + Redis + Mongo</h1>");
  console.log(`Counting: ${counter++}`);
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
