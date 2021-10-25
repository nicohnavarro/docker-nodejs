const { Router } = require("express");
const router = Router();

const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.route("/").get(getAllPost).post(createPost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
