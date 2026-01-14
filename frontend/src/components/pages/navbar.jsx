import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "https://gigflow-1-i4rk.onrender.com";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/profile`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="font-bold">GigFlow</h1>
      {!user ? (
        <div>
          <Link to="/login">Login</Link>{" "}
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div>
          <span className="mr-3">Hi {user.name}</span>
          <Link to="/dashboard">Dashboard</Link>{" "}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
