import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function EditPost() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all posts then find the one matching the id
    axios.get(`${API}?search=`).then((res) => {
      const found = res.data.find((p) => p._id === id);
      setPost(found);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${API}/${id}`, post);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        value={post.name || ""}
        onChange={(e) => setPost({ ...post, name: e.target.value })}
      />
      <textarea
        value={post.description || ""}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />
      <input
        value={post.image || ""}
        onChange={(e) => setPost({ ...post, image: e.target.value })}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditPost;
