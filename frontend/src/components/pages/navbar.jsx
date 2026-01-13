import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">GigFlow</h1>
      <div className="space-x-4">

        {!user ? (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <span className="font-semibold">Hi, {user.name}</span>
                    <Link to="/" className="hover:underline">Home</Link>

            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/create-gig" className="hover:underline">Post Gig</Link>
            <Link to="/gigs">Browse Gigs</Link>
            <Link to="/my-bids">My Bids</Link>


            <button onClick={logout} className="hover:underline ml-2">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
