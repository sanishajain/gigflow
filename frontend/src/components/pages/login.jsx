import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://gigflow-1-i4rk.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      alert("Invalid login");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input className="w-full border p-2 mb-3" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <input type="password" className="w-full border p-2 mb-3" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />

        <button className="bg-black text-white w-full py-2">Login</button>
      </form>
    </div>
  );
}
