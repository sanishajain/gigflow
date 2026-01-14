import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://gigflow-1-i4rk.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (!res.ok) {
      alert("Registration failed");
      return;
    }

    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input className="w-full border p-2 mb-3" placeholder="Name"
          value={name} onChange={e => setName(e.target.value)} />

        <input className="w-full border p-2 mb-3" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <input type="password" className="w-full border p-2 mb-3" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />

        <button className="bg-black text-white w-full py-2">Register</button>
      </form>
    </div>
  );
}
