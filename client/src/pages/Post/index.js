import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Post = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const userId = user._id;

  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error.response.data.msg);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/posts/${id}`, {
        newComment,
        userId,
      });
      setPost(response);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <h2 className="text-2xl font-bold mb-4">Post : {post._id}</h2>
      <div className="container mt-8 rounded-md shadow-md p-3">
        <p className=" text-lg">{post.description}</p>
        <div className="mt-8">
          <p className="text-gray-600 font-semibold">
            {post.firstName} {post.lastName}
          </p>
          <p className="text-gray-600">
            Posted on: {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Comments</h3>
        <ul>
          {post.comments.map((comment) => (
            <li key={comment.userId} className="rounded-md shadow-md p-4 mb-2">
              <h3 className="font-bold">
                {comment.firstName} {comment.lastName}
              </h3>
              {comment.text}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
