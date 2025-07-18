import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../api";

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API}?search=${search}&sort=${sort}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [search, sort]);

  const deletePost = async (id) => {
    if (window.confirm("Are you sure to delete this post?")) {
      await axios.delete(`${API}/${id}`);
      const res = await axios.get(`${API}?search=${search}&sort=${sort}`);
      setPosts(res.data);
    }
  };

  return (
    <div>
      <h2>Post List</h2>
      <Link to="/create">Create New Post</Link>
      <br />
      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setSort(e.target.value)} value={sort}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <ul>
        {posts.map((p) => (
          <li key={p._id}>
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            {p.image && <img src={p.image} alt="" width="100" />}
            <br />
            <Link to={`/edit/${p._id}`}>Edit</Link>
            <button onClick={() => deletePost(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostListPage;
