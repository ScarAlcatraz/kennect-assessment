import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../component/Search";

const Home = () => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [searchedPosts, setSearchPosts] = useState([]);

  const handleParentSearch = (response) => {
    setSearchPosts(response.data);
  };

  useEffect(() => {
    const fetchFeedPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts/");
        setFeedPosts(response.data);
      } catch (error) {
        console.error("Error fetching feed posts:", error.response.data.msg);
      }
    };

    fetchFeedPosts();
  }, []);

  return (
    <div className="container max-w-screen-xl mx-auto mt-8">
      <Search handleParentSearch={handleParentSearch} />
      <div className="flex">
        <Link
          to="/createPost"
          className="w-1/6 mr-5 flex items-center justify-center text-center max-h-12 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Create Post
        </Link>
        <div className="container">
          {searchedPosts.length !== 0 ? (
            <ul className="pl-4">
              {searchedPosts.posts.map((post) => (
                <li key={post._id} className="mb-4 border p-4 rounded-md">
                  <Link
                    to={`/home/${post._id}`}
                    className="text-lg font-semibold"
                  >
                    {post.description}
                  </Link>
                  <p className="text-gray-600">
                    {post.firstName} {post.lastName}
                  </p>
                  <p className="text-gray-600">
                    Updated at: {new Date(post.updatedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : feedPosts.length > 0 && searchedPosts.length === 0 ? (
            <ul className="pl-4">
              {feedPosts.map((post) => (
                <li key={post._id} className="mb-4 border p-4 rounded-md">
                  <Link
                    to={`/home/${post._id}`}
                    className="text-lg font-semibold"
                  >
                    {post.description}
                  </Link>
                  <p className="text-gray-600">
                    {post.firstName} {post.lastName}
                  </p>
                  <p className="text-gray-600">
                    Updated at: {new Date(post.updatedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No posts available. Create a post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

// {feedPosts.map((post) => (
//   <li key={post._id} className="mb-4 border p-4 rounded-md">
//     <Link
//       to={`/home/${post._id}`}
//       className="text-lg font-semibold"
//     >
//       {post.description}
//     </Link>
// <p className="text-gray-600">
//   {post.firstName} {post.lastName}
// </p>
// <p className="text-gray-600">
//   Updated at: {new Date(post.updatedAt).toLocaleString()}
// </p>
// <p className="text-gray-600">User ID: {post.userId}</p>
//   </li>
// ))}
