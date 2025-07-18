import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Import the centralized API URL

function CreatePost() {
  const [post, setPost] = useState({ name: "", description: "", image: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, post);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input
        placeholder="Name"
        required
        onChange={(e) => setPost({ ...post, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        required
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      ></textarea>
      <input
        placeholder="Image URL (optional)"
        onChange={(e) => setPost({ ...post, image: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default CreatePost;
