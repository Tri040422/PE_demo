const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");

router.get("/", controller.getPosts);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
