"use client";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Login useEffect - Token:", token);
    if (token) {
      // window.location.replace("/admin");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    if (!formData.get("username") || !formData.get("password")) {
      setError("Fields can't be empty");
      setTimeout(() => setError(""), 5000);
      return;
    }
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(
        "https://api.creeksideinverness.org/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        console.log("Login failed - Status:", response.status);
        setError("Could not login");
        setTimeout(() => setError(""), 5000);
        return; // Exit early on failure
      }
      const result = await response.json();
      console.log("Login success - Response:", result);
      const { token, refreshToken } = result;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refreshToken);
      window.location.replace("/admin");
    } catch (error) {
      console.error("Login error:", error);
      setError("Could not login");
      setTimeout(() => setError(""), 5000);
    }
  };
  unstable_noStore();
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* logo here */}
          <Image
            alt="Your Company"
            src="/path/to/your/logo.png"
            width={32}
            height={32}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
              {error && <p className="text-red-500 mt-1">{error}</p>}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
