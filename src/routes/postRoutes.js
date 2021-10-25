const { Router } = require("express");
const router = Router();

const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const protect = require("../middlewares/authMiddleware");

router.route("/").get(protect, getAllPost).post(protect, createPost);
router
  .route("/:id")
  .get(protect, getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
