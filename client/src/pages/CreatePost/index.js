import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const user = useSelector((state) => state.user);
  const userId = user._id;

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/posts/createPost",
        {
          userId,
          description,
        }
      );
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response.data.msg);
    }
  };
  console.log(description)
  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Write a post..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleCreatePost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
