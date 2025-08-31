"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register_me } from "@/Services/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Cookies.get("token")) router.push("/");
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    const data = await register_me(formData);
    setLoading(false);

    if (data.success) {
      toast.success(data.message || "Registered successfully!");
      setTimeout(() => router.push("/auth/login"), 1500);
    } else {
      toast.error(data.message || "Registration failed");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 text-black">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
          />
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
            {loading ? <TailSpin height="20" width="20" color="white" /> : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-orange-600 font-medium">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
