const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Post must have title"],
  },
  body: {
    type: String,
    required: [true, "Body must have title"],
  },
});

const Post = model("Post", postSchema);

module.exports = Post;
