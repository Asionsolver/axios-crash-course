import { useEffect, useState } from "react";
import "./App.css";
// import api from "./api/api";
import axios from "axios";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost.jsx";
import Posts from "./components/Post";
// import initialPosts from "./data/db.js";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // post I am editing
  const [error, setError] = useState(null);

  const handleAddPost = async (newPost) => {
    try {
      const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;

      const finalPost = { id: id.toString(), ...newPost };
      const response = await axios.post(
        "http://localhost:8000/post",
        finalPost
      );

      setPosts([...posts, response.data]);
    } catch (error) {
      if (error.response) {
        // error came from the server
        setError(
          `Error from server: status ${error.response.status} - message ${error.response.data}`
        );
      } else {
        // network error, did not reach to the server
        setError(error.message);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      try {
        await axios.delete(`http://localhost:8000/post/${postId}`);
        const newPosts = posts.filter((post) => post.id !== postId);
        setPosts(newPosts);
      } catch (error) {
        if (error.response) {
          // error came from the server
          setError(
            `Error from server: status ${error.response.status} - message ${error.response.data}`
          );
        } else {
          // network error, did not reach to the server
          setError(error.message);
        }
      }
    } else {
      console.log("You chose not to delete the post!");
    }
  };

  const handleEditPost = (updatePost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatePost.id ? updatePost : post
    );
    setPosts(updatedPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/post");
        if (response && response.data) {
          setPosts(response.data);
        }
      } catch (error) {
        if (error.response) {
          // error came from the server
          setError(
            `Error from server: status ${error.response.status} - message ${error.response.data}`
          );
        } else {
          // network error, did not reach to the server
          setError(error.message);
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        <h1>API Request with Axios</h1>
        <hr />

        <div>
          <Posts
            posts={posts}
            onDeletePost={handleDeletePost}
            onEditClick={setPost}
          />

          <hr />

          {!post ? (
            <AddPost onAddPost={handleAddPost} />
          ) : (
            <EditPost post={post} onEditPost={handleEditPost} />
          )}

          {error && (
            <>
              <hr />
              <div className="error">{error}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
