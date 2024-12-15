"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../assets/siwalogo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      setErrorMessage("");

      console.log("Sending data:", { username, password });

      const response = await axios.post("http://10.10.97.248:3001/", {
        username,
        password,
      });

      console.log("Response:", response);

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);

        setUsername("");
        setPassword("");

        router.push("/Dashboard/upcomingevents");
      }
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response) {
        setErrorMessage(
          `Error: ${error.response.data.message || "Something went wrong."}`
        );
      } else if (error.message) {
        setErrorMessage(`Network error: ${error.message}`);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo" width={160} height={160} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
