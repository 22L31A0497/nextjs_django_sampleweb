"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login_me } from "@/Services/auth";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Cookies.get("token")) router.push("/");
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    const data = await login_me(formData);
    setLoading(false);

    if (data.success) {
      Cookies.set("token", data.token);
      toast.success(data.message || "Login successful");
      setTimeout(() => router.push("/"), 1500);
    } else {
      toast.error(data.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 text-black">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white p-2 rounded flex justify-center"
          >
            {loading ? <TailSpin height="20" width="20" color="white" /> : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
