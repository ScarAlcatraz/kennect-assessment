import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data.msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <input
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
      <p className="mt-4 text-center">
        Already a user?{" "}
        <Link to="/" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
