import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // 🔥 FIX
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">GigFlow</h1>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hi, {user.name}</span>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-gig">Post Gig</Link>
            <Link to="/gigs">Browse Gigs</Link>
            <Link to="/my-bids">My Bids</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
