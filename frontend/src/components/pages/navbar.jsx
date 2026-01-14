import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await fetch("https://gigflow-1-i4rk.onrender.com/api/auth/logout", {
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">GigFlow</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/create-gig" className="hover:underline">Post Gig</Link>
        <Link to="/gigs">Browse Gigs</Link>
        <Link to="/my-bids">My Bids</Link>
        <button onClick={logout} className="hover:underline ml-2">Logout</button>
      </div>
    </nav>
  );
}
