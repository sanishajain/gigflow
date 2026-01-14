import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUser);

    fetch(`${API_BASE_URL}/api/gigs/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setGigs);
  }, [navigate, token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}

      <h2 className="text-xl mt-6">My Gigs</h2>

      {gigs.map(gig => (
        <div key={gig._id} className="border p-3 mt-3">
          <h3>{gig.title}</h3>
          <p>{gig.description}</p>
          <p>Status: {gig.status}</p>
        </div>
      ))}
    </div>
  );
}
