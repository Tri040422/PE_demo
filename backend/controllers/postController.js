const Post = require("../models/Post");

// Get all posts
exports.getPosts = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  let posts = await Post.find(query);
  if (sort === "asc") posts.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "desc") posts.sort((a, b) => b.name.localeCompare(a.name));

  res.json(posts);
};

// Create post
exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
};

// Update post
exports.updatePost = async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete post
exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};
