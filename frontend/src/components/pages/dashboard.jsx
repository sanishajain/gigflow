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

  const deleteGig = async (id) => {
    const confirm = window.confirm("Delete this gig?");
    if (!confirm) return;

    const res = await fetch(`${API_BASE_URL}/api/gigs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setGigs(prev => prev.filter(g => g._id !== id));
    } else {
      alert("Cannot delete assigned gig");
    }
  };

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

      {gigs.length === 0 && <p>No gigs yet</p>}

      {gigs.map(gig => (
        <div key={gig._id} className="border p-3 mt-3 rounded">
          <h3 className="font-bold">{gig.title}</h3>
          <p>{gig.description}</p>
          <p>Status: {gig.status}</p>

          {gig.status === "assigned" && (
            <p className="text-green-600">
              Assigned to: {gig.assignedTo?.name}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate(`/gig/${gig._id}/bids`)}
              className="bg-black text-white px-3 py-1"
            >
              View Bids
            </button>

            <button
              onClick={() => deleteGig(gig._id)}
              className="bg-red-600 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
