import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/api";
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
      const response = await api.post("/post", finalPost);

      setPosts([...posts, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      try {
        await api.delete(`/post/${postId}`);
        const newPosts = posts.filter((post) => post.id !== postId);
        setPosts(newPosts);
      } catch (error) {
        setError(error.message);
      }
    } else {
      console.log("You chose not to delete the post!");
    }
  };

  const handleEditPost = async (updatePost) => {
    try {
      const response = await api.patch(`/post/${updatePost.id}`, updatePost);

      const updatedPosts = posts.map((post) =>
        post.id === response.data.id ? response.data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        // console.log(response)
        if (response && response.data) {
          setPosts(response.data);
        }
      } catch (error){
        if (error.response) {
          setError(`Error from server: status: ${error.response.status} - Message: Data ${error.response.statusText}`);
          // console.log(error)
         
        } else {
          setError(error.message);
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="ml-4">
        <h1 className=" text-3xl p-4 ">API Request with Axios</h1>
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
