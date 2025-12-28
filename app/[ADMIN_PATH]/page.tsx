"use client";

import { useState } from "react";

interface User {
  _id: string;
  name: string;
  foodChoice?: string;
  fortunes: string[];
}

interface Message {
  _id: string;
  userId: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/data", {
        headers: {
          "Authorization": "Basic " + btoa(`${username}:${password}`)
        }
      });

      if (!res.ok) throw new Error("User / password səhvdir");

      const data = await res.json();
      setUsers(data.users);
      setMessages(data.messages);
      setLoggedIn(true);
    } catch (err: unknown) {
      if (err instanceof Error){
        setError(err.message);
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 bg-[url('/scene1/outside_bg.webp')] bg-cover bg-center"></div>
        <form
          onSubmit={handleLogin}
          className="bg-black/20 backdrop-blur-2xl p-6 rounded-xl shadow-md w-80"
        >
          <h1 className="text-xl font-bold mb-4 text-center">Xoş gəldin, Zumrudella🎁✨</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded mb-3 bg-black/10 backdrop-blur-2xl text-white focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-black/10 backdrop-blur-2xl rounded mb-3 text-white focus:outline-none"
            required
          />

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-400 text-white py-2 rounded cursor-pointer"
            disabled={loading}
          >
            {loading ? "Gözlə..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen text-white relative">
      <div className="absolute inset-0 bg-[url('/scene2/room_bg.webp')] bg-cover bg-center"></div>
      <div className="absolute inset-0 overflow-hidden p-6">
      <div className="w-full h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 p-6 w-11/12 mx-auto bg-black/20 backdrop-blur-md rounded-xl overflow-hidden">Zumrud Panel</h1>
      <h2 className="text-xl mb-2 p-6 w-11/12 mx-auto">Guests</h2>
      <table className="table-auto border-collapse border border-black/30 w-11/12 p-4 mb-6 mx-auto rounded-xl bg-black/20 backdrop-blur-md overflow-hidden">
        <thead>
          <tr className="bg-black/10 backdrop-blur-md">
            <th className="border border-black/30 px-3 py-1">Name</th>
            <th className="border border-black/30 px-3 py-1">Food Choice</th>
            <th className="border border-black/30 px-3 py-1">Fortunes</th>
            <th className="border border-black/30 px-3 py-1">Message</th>
            <th className="border border-black/30 px-3 py-1">Time</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const userMessage = messages.find((m) => m.userId === u._id);
            return (
              <tr key={u._id} className="hover:bg-black/20 backdrop-blur-md cursor-default">
                <td className="border border-black/30 px-3 py-1">{u.name}</td>
                <td className="border border-black/30 px-3 py-1">{u.foodChoice || "-"}</td>
                <td className="border border-black/30 px-3 py-1">{u.fortunes.join("🎁 ") || "-"}</td>
                <td className="border border-black/30 px-3 py-1">{userMessage?.message || "-"}</td>
              <td className="border border-black/30 px-3 py-1">
          {userMessage?.createdAt
            ? new Date(userMessage.createdAt).toLocaleString("az-AZ", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}
