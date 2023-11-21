import axios from "axios";
import { useState } from "react";

const Search = ({ handleParentSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/posts/find`, {
        searchTerm,
      });
      handleParentSearch(response);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div className="flex mb-8 items-center gap-2">
      <input
        className="w-full p-2 border rounded-md focus:outline-none"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <button
        className="w-1/6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
